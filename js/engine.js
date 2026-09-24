// The game rules: topics and planets, levels and rewards, adaptive
// difficulty, building a night's mission, marking answers and badges.
// Everything here works on the plain state object from state.js, so it can be
// tested without a browser.

import { times, addsub, problems, place, sequences, fractions, measures, shape } from './content/maths.js';
import { spelling } from './content/spelling.js';
import { grammar } from './content/grammar.js';
import { vocab } from './content/vocab.js';
import { PASSAGES } from './content/reading.js';
import { pick, shuffle, clamp, todayKey, choices } from './util.js';

export const PLANETS = {
  number: { name: 'Number Planet', color: '#7CC7FF', icon: 'ringed' },
  story: { name: 'Story Moon', color: '#B69CFF', icon: 'moon' },
  spell: { name: 'Spell Station', color: '#6EE7B7', icon: 'station' },
  grammar: { name: 'Grammar Galaxy', color: '#FF8C6B', icon: 'galaxy' },
  fraction: { name: 'Fraction Falls', color: '#FFC857', icon: 'halves' },
  measure: { name: 'Measure Mountain', color: '#F7A8D0', icon: 'mountain' },
  shape: { name: 'Shape Nebula', color: '#A8E06C', icon: 'shapes' },
};

export const TOPICS = {
  times: { name: 'Times tables', planet: 'number', unlock: 1, kind: 'maths', gen: times, max: 8 },
  addsub: { name: 'Adding and taking away', planet: 'number', unlock: 1, kind: 'maths', gen: addsub, max: 8 },
  problems: { name: 'Word problems', planet: 'number', unlock: 1, kind: 'maths', gen: problems, max: 8 },
  place: { name: 'Place value', planet: 'number', unlock: 2, kind: 'maths', gen: place, max: 8 },
  sequences: { name: 'Number patterns', planet: 'number', unlock: 5, kind: 'maths', gen: sequences, max: 8 },
  fractions: { name: 'Fractions and percentages', planet: 'fraction', unlock: 6, kind: 'maths', gen: fractions, max: 8 },
  measures: { name: 'Time, money and measures', planet: 'measure', unlock: 8, kind: 'maths', gen: measures, max: 8 },
  shape: { name: 'Shape and angles', planet: 'shape', unlock: 10, kind: 'maths', gen: shape, max: 8 },
  reading: { name: 'Reading', planet: 'story', unlock: 1, kind: 'reading', max: 6 },
  spelling: { name: 'Spelling', planet: 'spell', unlock: 1, kind: 'english', gen: spelling, max: 8 },
  vocab: { name: 'Word meanings', planet: 'spell', unlock: 3, kind: 'english', gen: vocab, max: 6 },
  grammar: { name: 'Grammar and punctuation', planet: 'grammar', unlock: 4, kind: 'english', gen: grammar, max: 5 },
};

// Difficulty 1-8 mapped to the school year it matches.
export function yearLabel(d) {
  if (d < 3) return 'Year 3';
  if (d < 5) return 'Year 4';
  if (d < 7) return 'Year 5';
  return 'Year 6';
}
export const YEAR_START = { 3: 1, 4: 3, 5: 5, 6: 7 };

// ---------------- levels ----------------

export const TITLES = ['Star Cadet', 'Moon Walker', 'Rocket Rider', 'Comet Chaser', 'Planet Spotter', 'Star Navigator', 'Word Explorer', 'Galaxy Explorer', 'Nebula Ranger', 'Asteroid Ace', 'Solar Voyager', 'Cosmic Captain', 'Supernova Scholar', 'Constellation Keeper', 'Starship Commander', 'Galaxy Guardian', 'Universe Wizard', 'Astro Legend', 'Space Superstar', 'Star Captain Supreme'];

export function starsForLevel(n) {
  return 60 + 30 * n; // stars needed to go from level n to n + 1
}

export function levelInfo(stars) {
  let level = 1;
  let left = stars;
  while (left >= starsForLevel(level)) {
    left -= starsForLevel(level);
    level++;
  }
  return { level, into: left, need: starsForLevel(level), title: titleFor(level) };
}

export function titleFor(level) {
  if (level <= TITLES.length) return TITLES[level - 1];
  return `${TITLES[TITLES.length - 1]} ${level - TITLES.length + 1}`;
}

export const WARDROBE = [
  { id: 'helmet', name: 'Space helmet', level: 3 },
  { id: 'football', name: 'Football kit', level: 5 },
  { id: 'rainbow', name: 'Rainbow mane', level: 7 },
  { id: 'crown', name: 'Starry crown', level: 9 },
  { id: 'scarf', name: 'Cosy scarf', level: 12 },
  { id: 'glasses', name: 'Cool sunglasses', level: 15 },
];

export const SHOOTOUT_LEVEL = 2;

// What a new level brings, for the level-up screen.
export function rewardsAt(level) {
  const out = [];
  if (level === SHOOTOUT_LEVEL) out.push({ kind: 'bonus', name: 'Bonus round unlocked', detail: 'Times-table penalty shootout' });
  const planetsBefore = new Set(Object.values(TOPICS).filter((t) => t.unlock < level).map((t) => t.planet));
  for (const [id, t] of Object.entries(TOPICS)) {
    if (t.unlock !== level) continue;
    if (!planetsBefore.has(t.planet)) {
      out.push({ kind: 'planet', planet: t.planet, name: `New planet: ${PLANETS[t.planet].name}`, detail: t.name });
      planetsBefore.add(t.planet);
    } else {
      out.push({ kind: 'topic', planet: t.planet, topic: id, name: `New on ${PLANETS[t.planet].name}`, detail: t.name });
    }
  }
  for (const w of WARDROBE) if (w.level === level) out.push({ kind: 'wardrobe', item: w.id, name: `${w.name} for Comet`, detail: 'New in the wardrobe' });
  return out;
}

export function unlockedTopics(level) {
  return Object.keys(TOPICS).filter((id) => TOPICS[id].unlock <= level);
}

export function unlockedPlanets(level) {
  return [...new Set(unlockedTopics(level).map((id) => TOPICS[id].planet))];
}

// ---------------- skills ----------------

export function skill(state, topic) {
  if (!state.skills[topic]) {
    state.skills[topic] = { d: YEAR_START[state.settings.startYear] || 1, attempts: 0, first: 0, second: 0, recent: [] };
  }
  return state.skills[topic];
}

// Recent accuracy (0-1), or null if not enough answers yet.
export function accuracy(sk, min = 5) {
  if (!sk || sk.recent.length < min) return null;
  return sk.recent.reduce((s, x) => s + x, 0) / sk.recent.length;
}

function questionLevel(sk, max) {
  const base = Math.floor(sk.d);
  const r = Math.random();
  let d = base;
  if (r < 0.2) d = base + 1; // a stretch question
  else if (r < 0.32) d = base - 1; // a confidence booster
  return clamp(d, 1, max);
}

export function updateSkill(sk, result, qd, max) {
  sk.attempts++;
  if (result === 'first') {
    sk.first++;
    sk.d += qd > Math.floor(sk.d) ? 0.35 : 0.25;
  } else if (result === 'second') {
    sk.second++;
    sk.d -= 0.05;
  } else {
    sk.d -= 0.3;
  }
  sk.d = clamp(sk.d, 1, max + 0.99);
  sk.recent.push(result === 'first' ? 1 : result === 'second' ? 0.5 : 0);
  if (sk.recent.length > 20) sk.recent.shift();
}

// ---------------- questions ----------------

export function makeQuestion(topic, d) {
  const t = TOPICS[topic];
  const q = t.gen(clamp(d, 1, t.max));
  return { topic, d: clamp(d, 1, t.max), ...q };
}

export function readingQuestions(passage) {
  return passage.qs.map((item) => {
    const c = choices(item.o[0], item.o.slice(1), item.o.length);
    return {
      topic: 'reading',
      d: passage.d,
      passageId: passage.id,
      prompt: item.q,
      ...c,
      hint: item.h,
      explain: `The answer is <b>${item.o[0]}</b>.`,
    };
  });
}

export function passageById(id) {
  return PASSAGES.find((p) => p.id === id);
}

function pickPassage(state, d) {
  const lvl = clamp(Math.round(d), 1, 6);
  const seen = state.seenPassages || {};
  // Unseen at this level first, then unseen one level down, then the one
  // seen longest ago at this level.
  for (const l of [lvl, lvl - 1, lvl + 1, lvl - 2]) {
    const unseen = PASSAGES.filter((p) => p.d === l && !seen[p.id]);
    if (unseen.length) return pick(unseen);
  }
  const atLevel = PASSAGES.filter((p) => p.d === lvl);
  return atLevel.sort((a, b) => (seen[a.id] || '').localeCompare(seen[b.id] || ''))[0];
}

function weightedPick(ids, weight) {
  const ws = ids.map(weight);
  let r = Math.random() * ws.reduce((s, w) => s + w, 0);
  for (let i = 0; i < ids.length; i++) {
    r -= ws[i];
    if (r <= 0) return ids[i];
  }
  return ids[ids.length - 1];
}

const PLANS = {
  5: 'MMRRE',
  10: 'MMMERRRMEM',
  15: 'MMMERRRMEMMEMME',
};

export function buildMission(state, now = new Date()) {
  const { level } = levelInfo(state.stars);
  const plan = PLANS[state.settings.missionLength] || PLANS[10];
  const topics = unlockedTopics(level);
  const maths = topics.filter((id) => TOPICS[id].kind === 'maths');
  const english = topics.filter((id) => TOPICS[id].kind === 'english');
  const counts = {};
  const weight = (id) => {
    const sk = skill(state, id);
    const acc = accuracy(sk);
    let w = 1 + (acc === null ? 0.6 : 2 * (1 - acc));
    if (TOPICS[id].unlock === level && level > 1) w += 3; // just unlocked
    if (id === 'times' || id === 'problems' || id === 'spelling') w += 0.5; // the backbone
    return w / (1 + 2 * (counts[id] || 0));
  };

  const passage = pickPassage(state, skill(state, 'reading').d);
  const readingQs = readingQuestions(passage);
  const qs = [];
  let r = 0;
  for (const slot of plan) {
    if (slot === 'R') {
      if (r < readingQs.length) qs.push(readingQs[r++]);
      continue;
    }
    const pool = slot === 'M' ? maths : english;
    const id = weightedPick(pool, weight);
    counts[id] = (counts[id] || 0) + 1;
    const sk = skill(state, id);
    qs.push(makeQuestion(id, questionLevel(sk, TOPICS[id].max)));
  }
  return {
    date: todayKey(now),
    passageId: passage.id,
    qs,
    i: 0,
    wrong: [],
    results: [],
    stars: 0,
    seconds: 0,
    qStartedAt: Date.now(),
  };
}

// Mark an answer. Returns { correct, done (question finished), result, stars }.
export function answer(state, mission, choice) {
  const q = mission.qs[mission.i];
  if (!q || mission.wrong.includes(choice)) return null;
  const correct = choice === q.answer;
  const tries = mission.wrong.length;
  if (!correct && tries === 0) {
    mission.wrong.push(choice);
    return { correct: false, done: false };
  }
  const result = correct ? (tries === 0 ? 'first' : 'second') : 'wrong';
  if (!correct) mission.wrong.push(choice);
  const stars = result === 'first' ? 10 : result === 'second' ? 5 : 0;
  const t = TOPICS[q.topic];
  updateSkill(skill(state, q.topic), result, q.d, t.max);
  const spent = Math.min(180, Math.round((Date.now() - (mission.qStartedAt || Date.now())) / 1000));
  mission.seconds += spent;
  mission.results.push({ topic: q.topic, d: q.d, result, stars });
  mission.stars += stars;
  state.stars += stars;
  state.totals.questions++;
  if (result === 'first') state.totals.firstTry++;
  if (result === 'second') state.totals.secondTry++;
  if (correct && q.bankWord) addWord(state, q.bankWord);
  return { correct, done: true, result, stars };
}

export function nextQuestion(mission) {
  mission.i++;
  mission.wrong = [];
  mission.qStartedAt = Date.now();
  return mission.i < mission.qs.length;
}

export function addWord(state, w) {
  if (!state.wordBank.some((x) => x.word === w.word)) state.wordBank.push({ ...w, date: todayKey() });
}

export function finishMission(state, mission, now = new Date()) {
  const before = levelInfo(state.stars - mission.stars).level;
  const correct = mission.results.filter((r) => r.result !== 'wrong').length;
  const perfect = mission.results.length > 0 && mission.results.every((r) => r.result === 'first');
  let bonus = 0;
  if (perfect) {
    bonus = 20;
    state.totals.perfect++;
  }
  state.stars += bonus;
  const passage = passageById(mission.passageId);
  if (passage) {
    state.seenPassages[passage.id] = todayKey(now);
    addWord(state, passage.word);
  }
  const key = todayKey(now);
  const day = state.days[key] || { missions: 0, questions: 0, correct: 0, seconds: 0 };
  day.missions++;
  day.questions += mission.results.length;
  day.correct += correct;
  day.seconds += mission.seconds;
  state.days[key] = day;
  state.totals.missions++;
  state.lastMissionDate = key;
  const after = levelInfo(state.stars).level;
  const rewards = [];
  for (let l = before + 1; l <= after; l++) rewards.push(...rewardsAt(l));
  const newBadges = checkBadges(state, now);
  return {
    stars: mission.stars + bonus,
    bonus,
    perfect,
    correct,
    total: mission.results.length,
    levelBefore: before,
    levelAfter: after,
    rewards,
    newBadges,
    words: state.wordBank.length,
  };
}

// ---------------- the penalty shootout ----------------

export function shootoutQuestion(state) {
  const sk = skill(state, 'times');
  const d = clamp(Math.floor(sk.d), 1, 5);
  const q = makeQuestion('times', d);
  // Three answers only: it is a quick-fire round.
  const right = q.options[q.answer];
  const wrong = q.options.filter((_, i) => i !== q.answer).slice(0, 2);
  const opts = shuffle([right, ...wrong]);
  return { ...q, options: opts, answer: opts.indexOf(right) };
}

export function finishShootout(state, goals, now = new Date()) {
  const stars = goals * 3;
  state.stars += stars;
  state.totals.goals += goals;
  state.totals.shootouts++;
  state.totals.bestShootout = Math.max(state.totals.bestShootout, goals);
  const before = levelInfo(state.stars - stars).level;
  const after = levelInfo(state.stars).level;
  const rewards = [];
  for (let l = before + 1; l <= after; l++) rewards.push(...rewardsAt(l));
  return { stars, levelBefore: before, levelAfter: after, rewards, newBadges: checkBadges(state, now) };
}

// ---------------- nights ----------------

export function nightsTotal(state) {
  return Object.values(state.days).filter((d) => d.missions > 0).length;
}

// Monday-first dates of the current week.
export function weekDays(now = new Date()) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dow = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - dow);
  return Array.from({ length: 7 }, (_, i) => {
    const x = new Date(d);
    x.setDate(d.getDate() + i);
    return todayKey(x);
  });
}

export function missionDoneToday(state, now = new Date()) {
  const day = state.days[todayKey(now)];
  return !!(day && day.missions > 0);
}

// Is Comet asleep (after the grown-ups' bedtime, or before 5am)?
export function asleep(state, now = new Date()) {
  const t = state.settings.sleepTime;
  if (!t) return false;
  const [h, m] = t.split(':').map(Number);
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= h * 60 + m || mins < 5 * 60;
}

// ---------------- badges ----------------

export const BADGES = [
  { id: 'first', name: 'First mission', how: 'Finish your first mission', icon: 'star', color: '#FFC857', test: (s) => s.totals.missions >= 1 },
  { id: 'nights3', name: '3 nights', how: 'Practise on 3 different nights', icon: 'moon', color: '#B69CFF', test: (s) => nightsTotal(s) >= 3 },
  { id: 'nights7', name: '7 nights', how: 'Practise on 7 different nights', icon: 'moon', color: '#B69CFF', test: (s) => nightsTotal(s) >= 7 },
  { id: 'nights25', name: '25 nights', how: 'Practise on 25 different nights', icon: 'moon', color: '#B69CFF', test: (s) => nightsTotal(s) >= 25 },
  { id: 'nights50', name: '50 nights', how: 'Practise on 50 different nights', icon: 'moon', color: '#B69CFF', test: (s) => nightsTotal(s) >= 50 },
  { id: 'nights100', name: '100 nights', how: 'Practise on 100 different nights', icon: 'moon', color: '#B69CFF', test: (s) => nightsTotal(s) >= 100 },
  { id: 'perfect', name: 'Perfect mission', how: 'Get every question right first time', icon: 'sparkle', color: '#FFC857', test: (s) => s.totals.perfect >= 1 },
  { id: 'perfect5', name: 'Perfect five', how: 'Have 5 perfect missions', icon: 'sparkle', color: '#FFC857', test: (s) => s.totals.perfect >= 5 },
  { id: 'q100', name: '100 questions', how: 'Answer 100 questions', icon: 'rocket', color: '#7CC7FF', test: (s) => s.totals.questions >= 100 },
  { id: 'q500', name: '500 questions', how: 'Answer 500 questions', icon: 'rocket', color: '#7CC7FF', test: (s) => s.totals.questions >= 500 },
  { id: 'q1000', name: '1,000 questions', how: 'Answer 1,000 questions', icon: 'rocket', color: '#7CC7FF', test: (s) => s.totals.questions >= 1000 },
  { id: 'never', name: 'Never give up', how: 'Get 25 answers right on your second try', icon: 'heart', color: '#FF8C6B', test: (s) => s.totals.secondTry >= 25 },
  { id: 'words10', name: 'Bookworm', how: 'Collect 10 words in your word bank', icon: 'book', color: '#FF8C6B', test: (s) => s.wordBank.length >= 10 },
  { id: 'words50', name: 'Word wizard', how: 'Collect 50 words in your word bank', icon: 'book', color: '#FF8C6B', test: (s) => s.wordBank.length >= 50 },
  { id: 'hattrick', name: 'Hat-trick', how: 'Score 3 goals in one shootout', icon: 'ball', color: '#F4F1FF', test: (s) => s.totals.bestShootout >= 3 },
  { id: 'topscorer', name: 'Top scorer', how: 'Score 5 out of 5 in a shootout', icon: 'ball', color: '#F4F1FF', test: (s) => s.totals.bestShootout >= 5 },
  { id: 'goals50', name: 'Golden boot', how: 'Score 50 goals in shootouts', icon: 'ball', color: '#FFC857', test: (s) => s.totals.goals >= 50 },
  { id: 'times', name: 'Times-table star', how: 'Reach Year 4 level in times tables', icon: 'times', color: '#6EE7B7', test: (s) => s.skills.times && s.skills.times.d >= 3 && s.skills.times.attempts >= 10 },
  { id: 'level5', name: 'Level 5', how: 'Reach level 5', icon: 'paw', color: '#6EE7B7', test: (s) => levelInfo(s.stars).level >= 5 },
  { id: 'level10', name: 'Level 10', how: 'Reach level 10', icon: 'paw', color: '#6EE7B7', test: (s) => levelInfo(s.stars).level >= 10 },
  { id: 'level20', name: 'Level 20', how: 'Reach level 20', icon: 'paw', color: '#6EE7B7', test: (s) => levelInfo(s.stars).level >= 20 },
  { id: 'explorer', name: 'Planet explorer', how: 'Unlock every planet', icon: 'planet', color: '#A8E06C', test: (s) => unlockedPlanets(levelInfo(s.stars).level).length === Object.keys(PLANETS).length },
];

export function checkBadges(state, now = new Date()) {
  const fresh = [];
  for (const b of BADGES) {
    if (state.badges[b.id]) continue;
    if (b.test(state)) {
      state.badges[b.id] = todayKey(now);
      fresh.push(b);
    }
  }
  return fresh;
}

// ---------------- grown-ups summary ----------------

export function weekSummary(state, now = new Date()) {
  const days = weekDays(now).map((k) => state.days[k]).filter(Boolean);
  const nights = days.filter((d) => d.missions > 0).length;
  const questions = days.reduce((s, d) => s + d.questions, 0);
  const correct = days.reduce((s, d) => s + d.correct, 0);
  const minutes = Math.round(days.reduce((s, d) => s + d.seconds, 0) / 60);
  return { nights, questions, minutes, pct: questions ? Math.round((100 * correct) / questions) : null };
}

export function overallYear(state) {
  const ds = Object.keys(TOPICS)
    .filter((id) => state.skills[id] && state.skills[id].attempts > 0)
    .map((id) => state.skills[id].d);
  if (!ds.length) return yearLabel(YEAR_START[state.settings.startYear] || 1);
  return yearLabel(ds.reduce((s, x) => s + x, 0) / ds.length);
}
