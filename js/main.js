// 11 Plus Hero: the screens and the flow between them.

import { load, save, resetProgress, exportCode, importCode } from './state.js';
import * as E from './engine.js';
import { comet, star, moon, planetIcon, badgeIcon, lockIcon, ICON } from './art.js';
import { sfx, setSound } from './sound.js';
import { esc, todayKey, pick, rint } from './util.js';
import { PASSAGES } from './content/reading.js';

const VERSION = '1.0.1';
const app = document.getElementById('app');
const live = document.getElementById('live');

let S = load();
let view = { name: 'home' };
let queue = []; // celebrations still to show after a mission
let shootTimer = null;
let nextTimer = null;

setSound(S.settings.sound);
if (S.mission && S.mission.date !== todayKey()) S.mission = null;

function persist() {
  save(S);
}

function go(name, params = {}) {
  clearTimeout(shootTimer);
  clearTimeout(nextTimer);
  view = { name, ...params };
  render();
  window.scrollTo(0, 0);
}

function render() {
  const fn = SCREENS[view.name] || SCREENS.home;
  app.innerHTML = fn();
  if (view.onEnter) {
    const f = view.onEnter;
    view.onEnter = null;
    f();
  }
  const focus = app.querySelector('[data-autofocus]');
  if (focus) focus.focus();
}

function say(text) {
  live.textContent = '';
  setTimeout(() => { live.textContent = text.replace(/<[^>]+>/g, ''); }, 50);
}

function toast(text) {
  document.querySelectorAll('.toast').forEach((t) => t.remove());
  const t = document.createElement('div');
  t.className = 'toast';
  t.setAttribute('role', 'status');
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

function confetti(n = 70) {
  const box = document.createElement('div');
  box.className = 'confetti';
  const colours = ['#FFC857', '#FF8C6B', '#6EE7B7', '#7CC7FF', '#B69CFF', '#F4F1FF'];
  for (let i = 0; i < n; i++) {
    const c = document.createElement('i');
    c.style.left = Math.random() * 100 + '%';
    c.style.background = pick(colours);
    c.style.animationDuration = 2.2 + Math.random() * 1.8 + 's';
    c.style.animationDelay = Math.random() * 0.7 + 's';
    c.style.transform = `rotate(${rint(0, 360)}deg)`;
    box.appendChild(c);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 5000);
}

function floatStars(n) {
  const el = document.createElement('div');
  el.className = 'plus';
  el.innerHTML = `+${n} ${star(36)}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}

const plural = (n, word) => `${n.toLocaleString('en-GB')} ${word}${n === 1 ? '' : 's'}`;
const strip = (s) => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

// A fixed sprinkle of background stars.
const STARS = [[6, 5], [22, 3], [44, 8], [64, 2], [86, 9], [93, 20], [4, 26], [78, 30], [30, 18], [55, 24], [12, 44], [90, 48], [70, 60], [8, 70], [40, 90], [85, 82]];
function starsBg(n = STARS.length) {
  return `<div class="stars-bg" aria-hidden="true">${STARS.slice(0, n).map(([x, y], i) => `<i class="${i % 4 === 0 ? 'g' : ''}" style="left:${x}%;top:${y}%;animation-delay:${(i * 0.37) % 3}s"></i>`).join('')}</div>`;
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

// ------------------------------------------------------------------ screens

const SCREENS = {};

SCREENS.onboarding = () => `
<section class="screen center">
  ${starsBg()}
  <div style="height:30px"></div>
  <div class="bob">${comet({ mood: 'excited', size: 170 })}</div>
  <h1>Hi! I'm Comet</h1>
  <p class="speech muted" style="max-width:320px">I'm a baby space unicorn, and I need a captain to fly with me through the stars. Will you be my captain?</p>
  <form class="field" data-form="name" autocomplete="off">
    <label for="name" class="muted">What's your name, Captain?</label>
    <input id="name" name="name" class="input" maxlength="20" autocapitalize="words" enterkeyhint="go" required data-autofocus>
    <button class="btn" type="submit" style="margin-top:8px">Blast off!</button>
  </form>
</section>`;

function cometLine(L, done, sleeping, resume) {
  const toGo = L.need - L.into;
  if (sleeping && !resume) return 'Zzz… it’s past bedtime. I’m dreaming about stars. See you tomorrow!';
  if (resume) return 'We’re halfway through a mission. Shall we finish it?';
  if (S.totals.missions === 0) return `Welcome aboard, Captain ${esc(S.name)}! Let’s fly our very first mission together.`;
  if (done && !S.settings.extraMissions) return 'Brilliant work tonight! Come back tomorrow for more stars.';
  if (done) return 'That was fun! Fancy another mission?';
  const lines = [
    `Only ${toGo} more stars and we reach Level ${L.level + 1}. Shall we fly?`,
    `I’ve been practising my times tables all day. Ready, Captain?`,
    `${toGo} stars to Level ${L.level + 1}! Let’s go and get them.`,
    `Tonight’s mission is ready. I packed snacks!`,
  ];
  return lines[new Date().getDate() % lines.length];
}

SCREENS.home = () => {
  if (!S.name) return SCREENS.onboarding();
  const L = E.levelInfo(S.stars);
  const done = E.missionDoneToday(S);
  const sleeping = E.asleep(S);
  const m = S.mission;
  const plan = { 5: 'MMRRE', 10: 'MMMERRRMEM', 15: 'MMMERRRMEMMEMME' }[S.settings.missionLength] || 'MMMERRRMEM';
  const count = (c) => plan.split('').filter((x) => x === c).length;
  const today = todayKey();
  const days = E.weekDays();
  const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const unlocked = E.unlockedPlanets(L.level);

  let mission;
  if (m) {
    mission = `
      <div class="between"><h2>Mission in progress</h2><span class="muted small">question ${m.i + 1} of ${m.qs.length}</span></div>
      <button class="btn" data-act="resume">Carry on</button>`;
  } else if (sleeping) {
    mission = `
      <div class="row">${moon(34)}<h2>Comet is asleep</h2></div>
      <p class="muted">It’s past bedtime. Missions open again tomorrow.</p>`;
  } else if (done && !S.settings.extraMissions) {
    mission = `
      <div class="row">${star(30)}<h2>Mission complete!</h2></div>
      <p class="muted">You’ve done tonight’s mission. Come back tomorrow for the next one.</p>
      <button class="btn soft" data-act="nav" data-to="stickers">Look at my sticker book</button>`;
  } else {
    mission = `
      <div class="between"><h2>${done ? 'Bonus mission' : 'Tonight’s mission'}</h2><span class="muted small">about ${S.settings.missionLength} mins</span></div>
      <div class="mix">
        <div><b style="color:var(--sky)">${count('M')}</b>Maths</div>
        <div><b style="color:var(--lilac)">${count('R')}</b>Reading</div>
        <div><b style="color:var(--mint)">${count('E')}</b>Words</div>
      </div>
      <button class="btn" data-act="start">${done ? 'One more mission' : 'Start mission'}</button>`;
  }

  return `
<section class="screen">
  ${starsBg(8)}
  <div class="between">
    <div class="col" style="gap:2px">
      <span class="hello">${greeting()}</span>
      <h1>Hi, Captain ${esc(S.name)}</h1>
    </div>
    <div class="row" style="gap:6px">
      <button class="icon-btn" data-act="sound" aria-label="${S.settings.sound ? 'Turn sound off' : 'Turn sound on'}">${S.settings.sound ? ICON.soundOn : ICON.soundOff}</button>
      <span class="chip">${star(20)}<span>${S.stars.toLocaleString('en-GB')}</span></span>
    </div>
  </div>

  <div class="card comet-card">
    ${comet({ mood: sleeping && !m ? 'sleepy' : 'happy', wearing: S.wearing, size: 100 })}
    <div class="col" style="gap:6px">
      <div class="speech-name">Comet says</div>
      <p class="speech">${cometLine(L, done, sleeping, !!m)}</p>
    </div>
  </div>

  <div class="col" style="gap:8px">
    <div class="between" style="font-size:15px"><span>Level ${L.level} · ${L.title}</span><span class="muted">${L.into} / ${L.need}</span></div>
    <div class="bar" role="progressbar" aria-label="Stars towards the next level" aria-valuemin="0" aria-valuemax="${L.need}" aria-valuenow="${L.into}"><span style="width:${Math.round((100 * L.into) / L.need)}%"></span></div>
  </div>

  <div class="card alt col" style="gap:14px">${mission}</div>

  <div class="col">
    <div class="between"><span style="font-size:15px">This week</span><span class="muted small">Rest nights never break anything</span></div>
    <div class="week">${days.map((k, i) => {
      const did = S.days[k] && S.days[k].missions > 0;
      const style = did ? 'full' : k === today ? 'today' : k < today ? 'rest' : 'future';
      return `<div class="${k === today ? 'today' : ''}">${moon(30, style)}<span>${names[i]}</span></div>`;
    }).join('')}</div>
  </div>

  <div class="col">
    <span style="font-size:15px">Planets</span>
    <div class="planets">${Object.entries(E.PLANETS).map(([id, p]) => {
      const open = unlocked.includes(id);
      const at = Math.min(...Object.values(E.TOPICS).filter((t) => t.planet === id).map((t) => t.unlock));
      return open
        ? `<div class="planet">${planetIcon(p.icon, p.color, 36)}<span>${p.name}</span></div>`
        : `<div class="planet locked">${lockIcon(26)}<span>${p.name}<br>Level ${at}</span></div>`;
    }).join('')}</div>
  </div>

  ${nav('home')}
</section>`;
};

function nav(on) {
  return `<nav class="nav" aria-label="Main">
    <button class="${on === 'home' ? 'on' : ''}" data-act="nav" data-to="home">${ICON.rocket}Mission</button>
    <button class="${on === 'stickers' ? 'on' : ''}" data-act="nav" data-to="stickers">${ICON.book}Sticker book</button>
    <button data-act="nav" data-to="gate">${ICON.lock}Grown-ups</button>
  </nav>`;
}

// ----- the mission

function passageHtml(p) {
  const paras = p.text.split('\n\n').map((t) => `<p>${esc(t)}</p>`).join('');
  return `<article class="passage"><h3>${esc(p.title)}</h3>${paras}</article>`;
}

function layoutFor(q) {
  const plain = q.options.map(strip);
  const short = plain.every((o) => o.length <= 7);
  if (!short) return '';
  return q.options.length === 3 ? 'three' : 'two';
}

SCREENS.mission = () => {
  const m = S.mission;
  if (!m) return SCREENS.home();
  const q = m.qs[m.i];
  const t = E.TOPICS[q.topic];
  const P = E.PLANETS[t.planet];
  const last = m.last; // set once the question is finished
  const p = q.passageId ? E.passageById(q.passageId) : null;
  const isSum = !p && /^[^a-z]*=\s*\?$/i.test(strip(q.prompt)) && strip(q.prompt).length < 24;

  const options = q.options.map((o, i) => {
    let cls = '';
    if (last && i === q.answer) cls = 'right';
    else if (m.wrong.includes(i)) cls = 'wrong';
    const dis = last || m.wrong.includes(i) ? 'disabled' : '';
    return `<button class="ans ${cls}" data-act="answer" data-i="${i}" ${dis}>${o}</button>`;
  }).join('');

  let feedback = '';
  if (last) {
    const good = last.result !== 'wrong';
    const titles = ['Brilliant!', 'Stellar!', 'Super star!', 'Out of this world!', 'Spot on!', 'Fantastic!'];
    const title = last.result === 'first' ? titles[m.i % titles.length] : last.result === 'second' ? 'Got it!' : 'That was a tricky one';
    feedback = `
      <div class="feedback ${good ? 'good' : 'nearly'}">
        <div class="between"><span class="title">${title}</span>${last.stars ? `<span class="row" style="gap:4px;color:var(--gold)">${star(20)}+${last.stars}</span>` : ''}</div>
        <p>${good ? '' : 'The right answer is shown in green. '}${q.explain}</p>
        <button class="btn" data-act="next" data-autofocus>${m.i + 1 < m.qs.length ? 'Next question' : 'Finish mission'}</button>
      </div>`;
  } else if (m.wrong.length) {
    feedback = `
      <div class="feedback nearly">
        <span class="title">Nearly! Have another go</span>
        <p>${q.hint}</p>
      </div>`;
  } else if (view.hint) {
    feedback = `<div class="hintbox">${ICON.bulb}<span>${q.hint}</span></div>`;
  } else {
    feedback = `<button class="hintbox" data-act="hint">${ICON.bulb}<span>Stuck? Tap here and Comet will give you a hint.</span></button>`;
  }

  return `
<section class="screen">
  <div class="topbar">
    <button class="icon-btn" data-act="leave" aria-label="Leave the mission (it will be saved)">${ICON.close}</button>
    <div class="progress" style="grid-template-columns:repeat(${m.qs.length},minmax(0,1fr))" aria-label="Question ${m.i + 1} of ${m.qs.length}">
      ${m.qs.map((_, i) => `<i class="${i < m.i || (i === m.i && last) ? 'done' : i === m.i ? 'now' : ''}"></i>`).join('')}
    </div>
  </div>
  <div class="where">
    ${planetIcon(P.icon, P.color, 40)}
    <div><div class="display" style="color:${P.color}">${P.name}</div><div class="muted small">Question ${m.i + 1} of ${m.qs.length} · ${t.name}</div></div>
  </div>
  ${p ? passageHtml(p) : ''}
  <div class="question ${isSum ? 'big' : p ? '' : 'card'}">${q.prompt}</div>
  <div class="answers ${layoutFor(q)}">${options}</div>
  ${feedback}
</section>`;
};

// ----- after a mission

SCREENS.summary = () => {
  const r = view.res;
  return `
<section class="screen center">
  ${starsBg()}
  <div style="height:24px"></div>
  <div class="bob">${comet({ mood: 'excited', wearing: S.wearing, size: 150 })}</div>
  <h1>Mission complete!</h1>
  <p class="muted" style="max-width:300px">${r.perfect ? 'Every single one right first time. A perfect mission, plus 20 bonus stars!' : r.correct >= r.total - 2 ? 'What a brilliant mission, Captain!' : 'You kept going and finished the mission. Well done!'}</p>
  <div class="stat3">
    <div><b style="color:var(--mint)">${r.correct}/${r.total}</b><span>right</span></div>
    <div><b style="color:var(--gold)">+${r.stars}</b><span>stars</span></div>
    <div><b style="color:var(--lilac)">${r.words}</b><span>words in your bank</span></div>
  </div>
  <div class="grow"></div>
  <button class="btn" data-act="continue" data-autofocus>Continue</button>
</section>`;
};

function rewardIcon(r) {
  if (r.kind === 'planet' || r.kind === 'topic') { const p = E.PLANETS[r.planet]; return planetIcon(p.icon, p.color, 40); }
  if (r.kind === 'wardrobe') return comet({ wearing: r.item, size: 44, label: '' });
  return `<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="14" fill="#F4F1FF"/><path d="M20 12l6 4.5-2.3 7h-7.4L14 16.5z" fill="#1A1446"/></svg>`;
}

SCREENS.levelup = () => {
  const L = E.levelInfo(S.stars);
  const lvl = view.level;
  return `
<section class="screen center celebrate">
  <div style="height:30px"></div>
  <div class="kicker">LEVEL UP!</div>
  <div style="position:relative;width:260px;height:230px;display:flex;align-items:center;justify-content:center">
    <svg class="rays" viewBox="0 0 300 300" aria-hidden="true"><g fill="#FFFFFF" opacity="0.07">${Array.from({ length: 12 }, (_, i) => `<path d="M150 150 L140 0 L160 0 Z" transform="rotate(${i * 30} 150 150)"/>`).join('')}</g></svg>
    <div class="bigLevel"><span style="font-size:18px;font-weight:800">Level</span><b>${lvl}</b></div>
  </div>
  <h1 style="font-size:30px;line-height:1.2">You’re a<br>${E.titleFor(lvl)}!</h1>
  <p class="muted" style="max-width:300px">Comet is so proud of you, Captain ${esc(S.name)}.</p>
  ${view.rewards.length ? `<div class="col" style="width:100%">${view.rewards.map((r) => `<div class="reward">${rewardIcon(r)}<div>${esc(r.name)}<small>${esc(r.detail)}</small></div></div>`).join('')}</div>` : ''}
  <div class="grow"></div>
  <p class="muted small">Next: ${L.need - L.into} stars to Level ${L.level + 1}</p>
  <button class="btn" data-act="continue" data-autofocus>${view.rewards.length ? 'Collect my rewards' : 'Hooray!'}</button>
</section>`;
};

SCREENS.badge = () => {
  const b = view.badge;
  return `
<section class="screen center celebrate">
  ${starsBg()}
  <div style="height:50px"></div>
  <div class="kicker">NEW STICKER!</div>
  <div class="bigLevel" style="background:${b.color}">${badgeIcon(b.icon, 90)}</div>
  <h1>${esc(b.name)}</h1>
  <p class="muted">${esc(b.how)}</p>
  <div class="grow"></div>
  <button class="btn" data-act="continue" data-autofocus>Stick it in my book</button>
</section>`;
};

SCREENS.goodnight = () => {
  const L = E.levelInfo(S.stars);
  const t = view.tonight || { stars: 0, correct: 0, total: 0 };
  const week = E.weekDays().filter((k) => S.days[k] && S.days[k].missions > 0).length;
  const canShoot = view.canShoot && L.level >= E.SHOOTOUT_LEVEL;
  const nextUnlock = Object.values(E.TOPICS).filter((x) => x.unlock > L.level).sort((a, b) => a.unlock - b.unlock)[0];
  const toGo = L.need - L.into;
  let tomorrow = `${toGo} more stars to Level ${L.level + 1}.`;
  if (nextUnlock && nextUnlock.unlock === L.level + 1) {
    const newPlanet = !E.unlockedPlanets(L.level).includes(nextUnlock.planet);
    tomorrow = newPlanet
      ? `Only ${toGo} stars until <b style="color:var(--mint)">${E.PLANETS[nextUnlock.planet].name}</b> opens up!`
      : `Only ${toGo} stars until <b style="color:var(--mint)">${nextUnlock.name}</b> arrives on ${E.PLANETS[nextUnlock.planet].name}!`;
  }
  return `
<section class="screen center" style="background:var(--bg-deep)">
  ${starsBg()}
  <div style="height:40px"></div>
  <div style="position:relative">${comet({ mood: 'sleepy', wearing: S.wearing, size: 150, label: 'Comet, asleep' })}<span class="zz" aria-hidden="true">z</span></div>
  <h1>Great flying tonight</h1>
  <p class="muted" style="max-width:300px">Comet is getting sleepy and dreaming about tomorrow’s adventure.</p>
  <div class="stat3">
    <div><b style="color:var(--gold)">+${t.stars}</b><span>stars tonight</span></div>
    <div><b style="color:var(--mint)">${t.correct}/${t.total}</b><span>right</span></div>
    <div><b style="color:var(--lilac)">${week}</b><span>${week === 1 ? 'night' : 'nights'} this week</span></div>
  </div>
  <p class="small muted" style="padding:12px 16px;border:2px dashed var(--surface-2);border-radius:18px;width:100%">${tomorrow}</p>
  <div class="grow"></div>
  ${canShoot ? `<button class="btn" data-act="shootout">Bonus round: penalty shootout</button>` : ''}
  ${S.settings.extraMissions && !E.asleep(S) ? `<button class="btn ghost" data-act="start">One more mission</button>` : ''}
  <button class="btn soft" data-act="goodnight" ${canShoot ? '' : 'data-autofocus'}>Goodnight, Comet</button>
</section>`;
};

// ----- penalty shootout

const KICKS = 5;
const KICK_SECONDS = 8;

SCREENS.shootout = () => {
  const v = view;
  const q = v.q;
  const kicks = Array.from({ length: KICKS }, (_, i) => `<i class="${v.results[i] === true ? 'goal' : v.results[i] === false ? 'miss' : ''}"></i>`).join('');
  const shot = v.phase === 'result';
  const dir = v.dir || 'L';
  const keeperDir = shot ? (v.scored ? (dir === 'L' ? 'R' : 'L') : dir === 'C' ? '' : dir) : '';
  return `
<section class="screen">
  <div class="between">
    <div><div class="small" style="letter-spacing:1.5px;color:var(--mint)">BONUS ROUND</div><h1 style="font-size:26px">Penalty shootout</h1></div>
    <div class="chip score">${v.goals} goal${v.goals === 1 ? '' : 's'}</div>
  </div>
  <div class="pitch">
    <svg class="field" viewBox="0 0 350 270" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="350" height="120" fill="#16203F"/>
      <g stroke="#F4F1FF" stroke-width="1" opacity="0.25"><path d="M45 40h260M45 60h260M45 80h260M45 100h260M75 30v100M105 30v100M135 30v100M165 30v100M195 30v100M225 30v100M255 30v100M285 30v100"/></g>
      <path d="M45 130 V28 H305 V130" fill="none" stroke="#F4F1FF" stroke-width="7" stroke-linejoin="round"/>
      <rect y="130" width="350" height="140" fill="#1C4A3A"/>
      <path d="M0 170h350M0 220h350" stroke="#235A47" stroke-width="22"/>
      <path d="M95 130 L60 200 H290 L255 130" fill="none" stroke="#F4F1FF" stroke-width="3" opacity="0.6"/>
    </svg>
    <svg class="keeper ${keeperDir}" viewBox="0 0 56 70" aria-hidden="true"><circle cx="28" cy="12" r="11" fill="#FF8C6B"/><rect x="15" y="24" width="26" height="36" rx="10" fill="#FF8C6B"/><path d="M15 32 L2 18 M41 32 L54 18" stroke="#FF8C6B" stroke-width="8" stroke-linecap="round"/></svg>
    <svg class="ball ${shot ? dir : ''}" viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="15" fill="#F4F1FF"/><path d="M17 9l6 4.5-2.3 7h-7.4L11 13.5z" fill="#141B3C"/></svg>
    ${shot ? `<div class="shout ${v.scored ? 'goal' : 'saved'}">${v.scored ? 'GOAL!' : v.timeout ? 'Too slow!' : 'Saved!'}</div>` : ''}
  </div>
  <div class="kicks" aria-label="${v.goals} goals from ${v.results.length} kicks">${kicks}</div>
  ${shot ? '' : `<div class="col" style="gap:6px"><div class="between muted small"><span>Kick ${v.kick + 1} of ${KICKS} · answer fast to shoot!</span></div><div class="timer"><span style="animation:shrink ${KICK_SECONDS}s linear forwards"></span></div></div>`}
  <div class="question big">${q.prompt}</div>
  <div class="answers three">${q.options.map((o, i) => `<button class="ans ${shot && i === q.answer ? 'right' : ''}" data-act="kick" data-i="${i}" ${shot ? 'disabled' : ''}>${o}</button>`).join('')}</div>
</section>`;
};

function startKick() {
  view.q = E.shootoutQuestion(S);
  view.phase = 'ask';
  view.scored = false;
  view.timeout = false;
  render();
  clearTimeout(shootTimer);
  shootTimer = setTimeout(() => takeKick(-1), KICK_SECONDS * 1000);
}

function takeKick(i) {
  if (view.name !== 'shootout' || view.phase !== 'ask') return;
  clearTimeout(shootTimer);
  const scored = i === view.q.answer;
  view.phase = 'result';
  view.scored = scored;
  view.timeout = i === -1;
  view.dir = pick(['L', 'R', 'C']);
  view.results.push(scored);
  if (scored) { view.goals++; sfx.goal(); } else sfx.saved();
  render();
  say(scored ? 'Goal!' : 'Saved!');
  nextTimer = setTimeout(() => {
    view.kick++;
    if (view.kick < KICKS) startKick();
    else finishShootout();
  }, 1500);
}

function finishShootout() {
  const goals = view.goals;
  const tonight = view.tonight;
  const res = E.finishShootout(S, goals);
  persist();
  if (tonight) tonight.stars += res.stars;
  queue = [];
  if (res.levelAfter > res.levelBefore) queue.push({ type: 'levelup', level: res.levelAfter, rewards: res.rewards });
  for (const b of res.newBadges) queue.push({ type: 'badge', badge: b });
  queue.push({ type: 'goodnight', tonight, canShoot: false });
  go('shootoutEnd', { goals, stars: res.stars });
}

SCREENS.shootoutEnd = () => `
<section class="screen center">
  ${starsBg()}
  <div style="height:40px"></div>
  <div class="bob">${comet({ mood: view.goals >= 3 ? 'excited' : 'happy', wearing: S.wearing, size: 150 })}</div>
  <h1>You scored ${view.goals} out of ${KICKS}!</h1>
  <p class="muted">${view.goals === KICKS ? 'A perfect shootout! The crowd goes wild!' : view.goals >= 3 ? 'What a performance, Captain!' : 'Good effort! The more you practise your tables, the more you’ll score.'}</p>
  <div class="chip score">${star(22)} +${view.stars} stars</div>
  <div class="grow"></div>
  <button class="btn" data-act="continue" data-autofocus>Continue</button>
</section>`;

// ----- sticker book

SCREENS.stickers = () => {
  const L = E.levelInfo(S.stars);
  const got = E.BADGES.filter((b) => S.badges[b.id]).length;
  const unlockedP = E.unlockedPlanets(L.level);
  const words = [...S.wordBank].reverse();
  return `
<section class="screen">
  <div class="row"><button class="icon-btn" data-act="nav" data-to="home" aria-label="Back">${ICON.back}</button><h1 class="grow" style="font-size:26px">Sticker book</h1><span class="muted">${got} / ${E.BADGES.length}</span></div>
  <div class="badges">${E.BADGES.map((b) => S.badges[b.id]
    ? `<button class="badge" data-act="badgeinfo" data-id="${b.id}"><span class="disc" style="background:${b.color}">${badgeIcon(b.icon, 38)}</span>${esc(b.name)}</button>`
    : `<button class="badge locked" data-act="badgeinfo" data-id="${b.id}"><span class="disc">${lockIcon(24)}</span>${esc(b.name)}</button>`).join('')}</div>

  <div class="card col" style="gap:14px">
    <div class="between"><h2>Comet’s wardrobe</h2><span class="muted small">Tap to dress up</span></div>
    <div class="row" style="gap:14px;align-items:center">
      ${comet({ wearing: S.wearing, size: 110 })}
      <div class="wardrobe grow">
        <button data-act="wear" data-id="" aria-pressed="${!S.wearing}">Nothing</button>
        ${E.WARDROBE.map((w) => L.level >= w.level
          ? `<button data-act="wear" data-id="${w.id}" aria-pressed="${S.wearing === w.id}">${w.name}</button>`
          : `<div>Level ${w.level}</div>`).join('')}
      </div>
    </div>
  </div>

  <div class="col">
    <span style="font-size:15px">Planets</span>
    <div class="planets">${Object.entries(E.PLANETS).map(([id, p]) => unlockedP.includes(id)
      ? `<div class="planet">${planetIcon(p.icon, p.color, 36)}<span>${p.name}</span></div>`
      : `<div class="planet locked">${lockIcon(26)}<span>${p.name}</span></div>`).join('')}</div>
  </div>

  <div class="col">
    <div class="between"><span style="font-size:15px">My word bank</span><span class="muted small">${plural(S.wordBank.length, 'word')}</span></div>
    ${words.length ? `<div class="words">${words.map((w) => `<div><b>${esc(w.word)}</b>: ${esc(w.meaning)}</div>`).join('')}</div>` : '<p class="muted small">New words from your missions will appear here.</p>'}
  </div>
</section>`;
};

// ----- grown-ups: PIN gate

SCREENS.gate = () => {
  const setting = !S.settings.pin;
  const stage = view.stage || (setting ? 'new' : 'enter');
  if (stage === 'forgot') {
    return `
<section class="screen center">
  <div class="row" style="align-self:stretch"><button class="icon-btn" data-act="nav" data-to="home" aria-label="Back">${ICON.back}</button></div>
  <h1>Forgotten your PIN?</h1>
  <p class="muted" style="max-width:300px">Answer this grown-up sum and the PIN will be removed. You can set a new one in the settings.</p>
  <form class="field" data-form="forgot">
    <label for="sum" class="muted">What is ${view.a} × ${view.b}?</label>
    <input id="sum" class="input" inputmode="numeric" pattern="[0-9]*" autocomplete="off" data-autofocus>
    <button class="btn" type="submit">Check</button>
  </form>
</section>`;
  }
  const title = stage === 'new' ? 'Grown-ups: choose a 4-digit PIN' : stage === 'confirm' ? 'Type the same PIN again' : 'Grown-ups only';
  const entry = view.entry || '';
  return `
<section class="screen center">
  <div class="row" style="align-self:stretch"><button class="icon-btn" data-act="nav" data-to="home" aria-label="Back">${ICON.back}</button></div>
  <div style="height:10px"></div>
  ${lockIcon(40, '#FFC857')}
  <h1 style="font-size:24px">${title}</h1>
  <p class="muted small" style="max-width:300px">${stage === 'enter' ? 'Enter your PIN to see progress and settings.' : 'This keeps the settings and the reset button away from little fingers.'}</p>
  ${view.error ? `<p style="color:var(--coral)">${esc(view.error)}</p>` : ''}
  <div class="pin-dots" aria-label="${entry.length} of 4 digits entered">${[0, 1, 2, 3].map((i) => `<i class="${i < entry.length ? 'on' : ''}"></i>`).join('')}</div>
  <div class="pad">
    ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button data-act="pin" data-n="${n}">${n}</button>`).join('')}
    <button class="blank" tabindex="-1" aria-hidden="true"></button>
    <button data-act="pin" data-n="0">0</button>
    <button data-act="pinback" aria-label="Delete">${ICON.back}</button>
  </div>
  ${stage === 'enter' ? '<button class="btn ghost small" data-act="forgot">Forgotten PIN?</button>' : ''}
</section>`;
};

// ----- grown-ups

function topicRows() {
  const rows = Object.entries(E.TOPICS)
    .filter(([id]) => S.skills[id] && S.skills[id].attempts > 0)
    .map(([id, t]) => {
      const sk = S.skills[id];
      const acc = E.accuracy(sk, 3);
      const pct = acc === null ? null : Math.round(acc * 100);
      const weak = pct !== null && pct < 60 && sk.recent.length >= 5;
      return `<div class="topic">
        <div class="between"><span>${t.name}</span><span class="${weak ? 'weak-text' : 'muted'}">${pct === null ? 'just started' : pct + '%'}${weak ? ' · needs practice' : ''}</span></div>
        <div class="tbar"><span class="${weak ? 'weak' : ''}" style="width:${pct === null ? 0 : pct}%"></span></div>
        <div class="muted small">Working at ${E.yearLabel(sk.d)} level · ${sk.attempts} answered</div>
      </div>`;
    });
  return rows.length ? rows.join('') : '<p class="muted">Progress by topic appears here after the first mission.</p>';
}

function tipText() {
  const worked = Object.entries(E.TOPICS).filter(([id]) => S.skills[id] && S.skills[id].recent.length >= 5);
  if (!worked.length) return 'Sit with her for the first mission or two. Children stick with apps they share with a grown-up.';
  const [id, t] = worked.sort((a, b) => E.accuracy(S.skills[a[0]]) - E.accuracy(S.skills[b[0]]))[0];
  const tips = {
    times: 'Chant a times table in the car or on the walk to school. Little and often beats long sessions.',
    addsub: 'Ask her to add up the prices when you’re shopping, or work out change.',
    problems: 'For word problems, ask her to say what the question wants before she works anything out.',
    place: 'Read big numbers aloud together: house numbers, prices, distances on road signs.',
    sequences: 'Play "what comes next?" with counting patterns: 3, 6, 9… or 50, 45, 40…',
    fractions: 'Share out food: half a pizza, a quarter of the grapes, a third of the biscuits.',
    measures: 'Ask her to read the clock and work out how long until tea or bedtime.',
    shape: 'Spot shapes and right angles around the house and count their sides.',
    reading: 'After reading together, ask "why do you think...?" questions, not just "what happened?"',
    spelling: 'Try "look, say, cover, write, check" with two or three words a night.',
    vocab: 'When you meet a new word, ask her to use it in a sentence of her own.',
    grammar: 'Play spot-the-mistake with a sentence you write out with a missing capital or full stop.',
  };
  return `${t.name} is her trickiest topic at the moment. ${tips[id]}`;
}

SCREENS.grownups = () => {
  const w = E.weekSummary(S);
  const L = E.levelInfo(S.stars);
  const set = S.settings;
  const opt = (v, cur, label) => `<option value="${v}" ${String(v) === String(cur) ? 'selected' : ''}>${label}</option>`;
  const times = ['', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00'];
  return `
<section class="screen grown">
  <div class="row"><button class="icon-btn" data-act="nav" data-to="home" aria-label="Back to the app">${ICON.back}</button>
    <div><h1 style="font-size:24px">Grown-ups</h1><div class="muted small">Captain ${esc(S.name || '(not set)')} · Level ${L.level} · ${E.overallYear(S)} overall</div></div></div>

  <div class="col" style="gap:8px"><h2>This week</h2>
  <div class="kpis">
    <div><b>${w.nights}</b><span>nights</span></div>
    <div><b>${w.minutes}</b><span>minutes</span></div>
    <div><b>${w.questions}</b><span>questions</span></div>
    <div><b>${w.pct === null ? '–' : w.pct + '%'}</b><span>right</span></div>
  </div>
  <p class="muted small">All time: ${plural(E.nightsTotal(S), 'night')}, ${plural(S.totals.missions, 'mission')}, ${plural(S.totals.questions, 'question')}, ${plural(S.wordBank.length, 'word')} learned.</p></div>

  <div class="gcard"><div class="between"><h2>By topic</h2><span class="muted small">last 20 answers</span></div>${topicRows()}</div>

  <div class="tip"><b>Chat about it at breakfast</b><br>${tipText()}</div>

  <div class="gcard" style="gap:0">
    <h2 style="margin-bottom:6px">Settings</h2>
    <label class="setting"><span>Mission length</span><select data-change="missionLength">${opt(5, set.missionLength, '5 questions')}${opt(10, set.missionLength, '10 questions')}${opt(15, set.missionLength, '15 questions')}</select></label>
    <label class="setting"><span>Comet goes to sleep at</span><select data-change="sleepTime">${times.map((t) => opt(t, set.sleepTime, t ? t.replace(/^(\d+):/, (_, h) => `${h - 12}:`) + ' pm' : 'Never (off)')).join('')}</select></label>
    <div class="setting"><span>Allow extra missions on the same day</span><button class="switch" role="switch" aria-checked="${set.extraMissions}" aria-label="Allow extra missions" data-act="toggle" data-key="extraMissions"></button></div>
    <div class="setting"><span>Sounds</span><button class="switch" role="switch" aria-checked="${set.sound}" aria-label="Sounds" data-act="toggle" data-key="sound"></button></div>
    <label class="setting"><span>Starting point for new topics</span><select data-change="startYear">${[3, 4, 5, 6].map((y) => opt(y, set.startYear, 'Year ' + y)).join('')}</select></label>
    <div class="setting"><span class="muted small">Move every topic to the starting point now (useful for testing, or if she finds it too easy)</span><button class="btn ghost small" data-act="applyYear">Apply</button></div>
    <div class="setting"><span>PIN</span><button class="btn ghost small" data-act="changePin">Change PIN</button></div>
  </div>

  <div class="gcard">
    <h2>Check the questions</h2>
    <p class="muted small">See sample questions for any topic at any level, with answers, and flag anything that’s wrong or pitched badly. This doesn’t affect her progress.</p>
    <button class="btn" data-act="nav" data-to="preview">Open question checker</button>
    ${S.flags.length ? `<button class="btn ghost" data-act="nav" data-to="flags">Flagged questions (${S.flags.length})</button>` : ''}
  </div>

  <div class="gcard">
    <h2>Backup</h2>
    <p class="muted small">Progress is saved on this phone only. Copy a backup code and keep it in your notes to move progress to a new phone.</p>
    <button class="btn ghost" data-act="backup">Copy backup code</button>
    ${view.restore ? `<textarea id="restoreCode" aria-label="Backup code" placeholder="Paste a backup code here"></textarea><button class="btn" data-act="restoreGo">Restore from this code</button>` : `<button class="btn ghost" data-act="restore">Restore from a code</button>`}
  </div>

  <div class="gcard">
    <h2>Start again from the beginning</h2>
    <p class="muted small">Clears the name, stars, levels, stickers, word bank and all progress on this phone. Settings, the PIN and flagged questions are kept.</p>
    ${view.confirmReset
      ? `<p><b>Are you sure? This can’t be undone.</b></p><button class="btn danger" data-act="resetGo">Yes, start again</button><button class="btn ghost" data-act="resetCancel">Cancel</button>`
      : `<button class="btn ghost" data-act="reset">Start again…</button>`}
  </div>

  <p class="muted small" style="text-align:center">11 Plus Hero ${VERSION} · Nothing is sent anywhere: all progress stays on this phone.</p>
</section>`;
};

// ----- question checker for the teacher

function previewQuestions() {
  const topic = view.topic || 'times';
  const d = view.d || 1;
  if (topic === 'reading') {
    return PASSAGES.filter((p) => p.d === Math.min(d, 6)).map((p) => ({ passage: p, qs: E.readingQuestions(p) }));
  }
  return [{ qs: Array.from({ length: 6 }, () => E.makeQuestion(topic, d)) }];
}

SCREENS.preview = () => {
  const topic = view.topic || 'times';
  const t = E.TOPICS[topic];
  const d = Math.min(view.d || 1, t.max);
  if (!view.items) view.items = previewQuestions();
  let n = 0;
  const blocks = view.items.map((blk) => {
    const qs = blk.qs.map((q) => {
      const k = n++;
      const flagged = view.flagged && view.flagged.includes(k);
      return `<div class="pq">
        <div class="meta">${t.name} · level ${q.d} (${E.yearLabel(q.d)})</div>
        <div>${q.prompt}</div>
        <ol>${q.options.map((o, i) => `<li class="${i === q.answer ? 'ok' : ''}">${o}${i === q.answer ? ' ✓' : ''}</li>`).join('')}</ol>
        <div class="muted small"><b>Hint:</b> ${q.hint}</div>
        <div class="muted small"><b>After answering:</b> ${q.explain}</div>
        ${flagged ? '<div class="flagged">Flagged. Thank you!</div>' : view.flagging === k
          ? `<textarea id="flagNote" aria-label="What’s wrong with this question?" placeholder="What’s wrong? (e.g. too hard for this level, confusing wording, wrong answer)"></textarea><button class="btn" data-act="flagSave" data-k="${k}">Save flag</button>`
          : `<button class="btn ghost small" data-act="flag" data-k="${k}">${ICON.flag} Flag this question</button>`}
      </div>`;
    }).join('');
    return blk.passage ? `<div class="gcard">${passageHtml(blk.passage)}${qs}</div>` : `<div class="gcard">${qs}</div>`;
  }).join('');
  return `
<section class="screen grown">
  <div class="row"><button class="icon-btn" data-act="nav" data-to="grownups" aria-label="Back">${ICON.back}</button><h1 style="font-size:24px">Question checker</h1></div>
  <div class="gcard">
    <label class="setting"><span>Topic</span><select data-change="pvTopic">${Object.entries(E.TOPICS).map(([id, x]) => `<option value="${id}" ${id === topic ? 'selected' : ''}>${x.name}</option>`).join('')}</select></label>
    <label class="setting"><span>Level</span><select data-change="pvLevel">${Array.from({ length: t.max }, (_, i) => i + 1).map((l) => `<option value="${l}" ${l === d ? 'selected' : ''}>Level ${l} (${E.yearLabel(l)})</option>`).join('')}</select></label>
    <p class="muted small">Unlocks for her at star level ${t.unlock}. ${topic === 'reading' ? 'Every passage at this level is shown.' : 'Questions are made fresh each time, so tap below for more.'}</p>
    ${topic === 'reading' ? '' : '<button class="btn ghost" data-act="pvMore">Show different questions</button>'}
  </div>
  ${blocks}
</section>`;
};

SCREENS.flags = () => `
<section class="screen grown">
  <div class="row"><button class="icon-btn" data-act="nav" data-to="grownups" aria-label="Back">${ICON.back}</button><h1 style="font-size:24px">Flagged questions</h1></div>
  <p class="muted small">Copy these and send them over, and the questions can be fixed in the next update.</p>
  <button class="btn" data-act="flagsCopy">Copy all as text</button>
  ${S.flags.map((f) => `<div class="gcard" style="gap:6px"><div class="muted small">${esc(f.date)} · ${esc(f.topic)} · level ${f.d}${f.passage ? ' · ' + esc(f.passage) : ''}</div><div>${esc(f.prompt)}</div><div class="muted small">Options: ${esc(f.options.join(' / '))} (answer: ${esc(f.answer)})</div><div><b>Note:</b> ${esc(f.note || '(no note)')}</div></div>`).join('')}
  ${view.confirmClear ? '<button class="btn danger" data-act="flagsClearGo">Yes, clear them all</button>' : '<button class="btn ghost" data-act="flagsClear">Clear all flags</button>'}
</section>`;

// ------------------------------------------------------------------ actions

function startMission() {
  S.mission = E.buildMission(S);
  persist();
  sfx.tap();
  go('mission');
}

function finishMission() {
  const m = S.mission;
  const res = E.finishMission(S, m);
  S.mission = null;
  const tonight = { stars: res.stars, correct: res.correct, total: res.total };
  queue = [{ type: 'summary', res }];
  if (res.levelAfter > res.levelBefore) queue.push({ type: 'levelup', level: res.levelAfter, rewards: res.rewards });
  for (const b of res.newBadges) queue.push({ type: 'badge', badge: b });
  queue.push({ type: 'goodnight', tonight, canShoot: true });
  persist();
  nextCelebration();
}

function nextCelebration() {
  const c = queue.shift();
  if (!c) return go('home');
  if (c.type === 'summary') return go('summary', { res: c.res, onEnter: () => { confetti(40); sfx.levelUp(); } });
  if (c.type === 'levelup') {
    const wear = c.rewards.find((r) => r.kind === 'wardrobe');
    if (wear) { S.wearing = wear.item; persist(); }
    S.levelSeen = c.level;
    persist();
    return go('levelup', { level: c.level, rewards: c.rewards, onEnter: () => { confetti(90); sfx.levelUp(); say(`Level up! Level ${c.level}`); } });
  }
  if (c.type === 'badge') return go('badge', { badge: c.badge, onEnter: () => { confetti(40); sfx.sticker(); } });
  if (c.type === 'goodnight') return go('goodnight', { tonight: c.tonight, canShoot: c.canShoot });
  return go('home');
}

function pinDigit(n) {
  const entry = (view.entry || '') + n;
  view.error = '';
  if (entry.length < 4) { view.entry = entry; return render(); }
  const stage = view.stage || (S.settings.pin ? 'enter' : 'new');
  if (stage === 'enter') {
    if (entry === S.settings.pin) return go('grownups');
    return go('gate', { stage: 'enter', error: 'That PIN isn’t right. Try again.' });
  }
  if (stage === 'new') return go('gate', { stage: 'confirm', first: entry });
  if (stage === 'confirm') {
    if (entry === view.first) {
      S.settings.pin = entry;
      persist();
      toast('PIN saved');
      return go('grownups');
    }
    return go('gate', { stage: 'new', error: 'The two PINs didn’t match. Choose one again.' });
  }
}

const ACTIONS = {
  nav(el) {
    const to = el.dataset.to;
    if (to === 'gate') return go('gate', { stage: S.settings.pin ? 'enter' : 'new' });
    go(to);
  },
  sound() {
    S.settings.sound = !S.settings.sound;
    setSound(S.settings.sound);
    persist();
    if (S.settings.sound) sfx.tap();
    render();
  },
  start() {
    if (E.asleep(S)) return toast('Comet is asleep. Missions open again tomorrow!');
    startMission();
  },
  resume() { S.mission.qStartedAt = Date.now(); go('mission'); },
  leave() { persist(); go('home'); },
  hint() { view.hint = true; render(); },
  answer(el) {
    const m = S.mission;
    const i = Number(el.dataset.i);
    const r = E.answer(S, m, i);
    if (!r) return;
    if (r.done) {
      m.last = { result: r.result, stars: r.stars };
      if (r.correct) { sfx.right(); floatStars(r.stars); } else sfx.nearly();
      say(r.correct ? 'Correct!' : 'Not this time. The right answer is shown.');
    } else {
      sfx.nearly();
      say('Nearly! Have another go.');
    }
    persist();
    render();
  },
  next() {
    const m = S.mission;
    m.last = null;
    view.hint = false;
    if (E.nextQuestion(m)) { persist(); render(); window.scrollTo(0, 0); } else finishMission();
  },
  continue() { nextCelebration(); },
  goodnight() { sfx.goodnight(); go('home'); },
  shootout() {
    const tonight = view.tonight;
    sfx.whistle();
    view = { name: 'shootout', kick: 0, goals: 0, results: [], tonight };
    startKick();
  },
  kick(el) { takeKick(Number(el.dataset.i)); },
  wear(el) { S.wearing = el.dataset.id || null; persist(); sfx.tap(); render(); },
  badgeinfo(el) {
    const b = E.BADGES.find((x) => x.id === el.dataset.id);
    toast(S.badges[b.id] ? `${b.name}: ${b.how} (got it!)` : `To get this sticker: ${b.how.toLowerCase()}`);
  },
  pin(el) { pinDigit(el.dataset.n); },
  pinback() { view.entry = (view.entry || '').slice(0, -1); render(); },
  forgot() { go('gate', { stage: 'forgot', a: rint(13, 29), b: rint(13, 29) }); },
  changePin() { go('gate', { stage: 'new' }); },
  toggle(el) {
    const k = el.dataset.key;
    S.settings[k] = !S.settings[k];
    if (k === 'sound') setSound(S.settings.sound);
    persist();
    render();
  },
  applyYear() {
    const d = E.YEAR_START[S.settings.startYear];
    for (const id of Object.keys(E.TOPICS)) E.skill(S, id).d = Math.min(d, E.TOPICS[id].max);
    persist();
    toast(`Every topic now starts at Year ${S.settings.startYear} level`);
  },
  async backup() {
    const ok = await copyText(exportCode(S));
    toast(ok ? 'Backup code copied. Paste it into your notes.' : 'Could not copy. Try again.');
  },
  restore() { view.restore = true; render(); },
  restoreGo() {
    const code = document.getElementById('restoreCode').value;
    try {
      const pin = S.settings.pin;
      S = importCode(code);
      S.settings.pin = pin;
      if (S.mission && S.mission.date !== todayKey()) S.mission = null;
      setSound(S.settings.sound);
      persist();
      toast('Progress restored');
      go('grownups');
    } catch (err) {
      toast(err.message.includes('11 Plus Hero') ? err.message : 'That code didn’t work. Check it was copied in full.');
    }
  },
  reset() { view.confirmReset = true; render(); },
  resetCancel() { view.confirmReset = false; render(); },
  resetGo() {
    S = resetProgress(S);
    queue = [];
    persist();
    toast('All progress cleared. Ready for a new captain!');
    go('home');
  },
  pvMore() { view.items = null; view.flagged = []; view.flagging = null; render(); },
  flag(el) { view.flagging = Number(el.dataset.k); render(); const ta = document.getElementById('flagNote'); if (ta) ta.focus(); },
  flagSave(el) {
    const k = Number(el.dataset.k);
    let n = 0;
    for (const blk of view.items) {
      for (const q of blk.qs) {
        if (n++ !== k) continue;
        S.flags.push({
          date: todayKey(),
          topic: E.TOPICS[q.topic].name,
          d: q.d,
          passage: blk.passage ? blk.passage.title : '',
          prompt: strip(q.prompt),
          options: q.options.map(strip),
          answer: strip(q.options[q.answer]),
          note: (document.getElementById('flagNote') || {}).value || '',
        });
      }
    }
    view.flagged = [...(view.flagged || []), k];
    view.flagging = null;
    persist();
    render();
  },
  async flagsCopy() {
    const text = S.flags.map((f, i) => `${i + 1}. [${f.topic}, level ${f.d}${f.passage ? ', ' + f.passage : ''}] ${f.prompt}\n   Options: ${f.options.join(' / ')} (answer: ${f.answer})\n   Note: ${f.note || '(none)'}`).join('\n\n');
    const ok = await copyText(`11 Plus Hero flagged questions\n\n${text}`);
    toast(ok ? 'Copied. Paste it into a message.' : 'Could not copy.');
  },
  flagsClear() { view.confirmClear = true; render(); },
  flagsClearGo() { S.flags = []; persist(); go('grownups'); },
};

app.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el || el.disabled) return;
  const fn = ACTIONS[el.dataset.act];
  if (fn) fn(el, e);
});

app.addEventListener('change', (e) => {
  const el = e.target.closest('[data-change]');
  if (!el) return;
  const k = el.dataset.change;
  if (k === 'pvTopic') { view.topic = el.value; view.d = 1; view.items = null; view.flagged = []; return render(); }
  if (k === 'pvLevel') { view.d = Number(el.value); view.items = null; view.flagged = []; return render(); }
  S.settings[k] = k === 'missionLength' || k === 'startYear' ? Number(el.value) : el.value;
  persist();
  toast('Saved');
});

app.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target.dataset.form;
  if (form === 'name') {
    const name = e.target.name.value.trim().replace(/\s+/g, ' ').slice(0, 20);
    if (!name) return;
    S.name = name;
    persist();
    sfx.levelUp();
    confetti(50);
    go('home');
  }
  if (form === 'forgot') {
    const v = Number(document.getElementById('sum').value);
    if (v === view.a * view.b) {
      S.settings.pin = null;
      persist();
      toast('PIN removed. You can set a new one in Settings.');
      go('grownups');
    } else {
      toast('Not quite. Try again.');
    }
  }
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && view.name === 'home') {
    if (S.mission && S.mission.date !== todayKey()) { S.mission = null; persist(); }
    render();
  }
});

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

render();
