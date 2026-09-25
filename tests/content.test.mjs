import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TOPICS, makeQuestion, readingQuestions, levelInfo, rewardsAt, buildMission, answer, nextQuestion, finishMission, shootoutQuestion, finishShootout, BADGES, unlockedPlanets, PLANETS } from '../js/engine.js';
import { PASSAGES } from '../js/content/reading.js';
import { GRAMMAR } from '../js/content/grammar.js';
import { VOCAB } from '../js/content/vocab.js';
import { misspell, YEAR2, YEAR34, YEAR56, _test } from '../js/content/spelling.js';
import { defaultState, resetProgress, exportCode, importCode } from '../js/state.js';

const strip = (s) => String(s).replace(/<[^>]+>/g, '');

function checkQuestion(q, where) {
  assert.ok(q.prompt && typeof q.prompt === 'string', `${where}: prompt`);
  assert.ok(Array.isArray(q.options) && q.options.length >= 2 && q.options.length <= 4, `${where}: option count ${q.options && q.options.length}`);
  assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length, `${where}: answer index`);
  const plain = q.options.map(strip);
  assert.equal(new Set(plain).size, plain.length, `${where}: duplicate options ${JSON.stringify(plain)} for ${strip(q.prompt)}`);
  for (const s of [q.prompt, q.hint, q.explain, ...q.options]) {
    assert.ok(!/undefined|NaN|null|Infinity|\[object/.test(String(s)), `${where}: bad text "${s}"`);
  }
  for (const o of plain) {
    const n = Number(o.replace(/[£,p°C cm²]/g, '').replace('−', '-'));
    if (/^-/.test(o)) assert.fail(`${where}: raw minus in "${o}"`);
    if (!Number.isNaN(n) && /^−?[\d,.]+$/.test(o)) assert.ok(Number.isFinite(n), `${where}: option ${o}`);
  }
}

test('every generated topic question is well formed at every level', () => {
  for (const [id, t] of Object.entries(TOPICS)) {
    if (!t.gen) continue;
    for (let d = 1; d <= t.max; d++) {
      for (let i = 0; i < 400; i++) checkQuestion(makeQuestion(id, d), `${id} d${d}`);
    }
  }
});

test('numeric maths answers are right', () => {
  // Spot-check the ones whose prompt is a plain sum.
  for (let i = 0; i < 3000; i++) {
    for (const id of ['times', 'addsub']) {
      const d = 1 + (i % 7);
      const q = makeQuestion(id, d);
      const m = strip(q.prompt).replace(/,/g, '').match(/^(\d+) ([+−×÷]) (\d+)(?: × (\d+))? = \?$/);
      if (!m) continue;
      const a = Number(m[1]), b = Number(m[3]);
      let v = { '+': a + b, '−': a - b, '×': a * b, '÷': a / b }[m[2]];
      if (m[4]) v *= Number(m[4]);
      assert.equal(Number(strip(q.options[q.answer]).replace(/,/g, '')), v, strip(q.prompt));
    }
  }
});

test('reading passages have three questions with unique options', () => {
  assert.ok(PASSAGES.length >= 30);
  const ids = new Set();
  for (const p of PASSAGES) {
    assert.ok(!ids.has(p.id), `duplicate id ${p.id}`);
    ids.add(p.id);
    assert.equal(p.qs.length, 3, p.id);
    assert.ok(p.word && p.word.word && p.word.meaning, p.id);
    for (const q of readingQuestions(p)) checkQuestion(q, p.id);
  }
  for (let d = 1; d <= 6; d++) assert.ok(PASSAGES.filter((p) => p.d === d).length >= 5, `level ${d}`);
});

test('grammar and vocab banks have unique options', () => {
  for (const g of GRAMMAR) assert.equal(new Set(g.o).size, g.o.length, g.q);
  for (const v of VOCAB) assert.equal(new Set([v[3], ...v[4]]).size, 4, v[2]);
});

test('misspellings are never the word itself or another real word', () => {
  for (const w of [...YEAR2, ...YEAR34, ...YEAR56]) {
    for (let i = 0; i < 20; i++) {
      for (const m of misspell(w)) {
        assert.notEqual(m, w);
        assert.ok(!_test.REAL.has(m.toLowerCase()), `${w} -> ${m}`);
      }
    }
  }
});

test('levels need more stars as you go up', () => {
  assert.deepEqual(levelInfo(0), { level: 1, into: 0, need: 90, title: 'Star Cadet' });
  assert.equal(levelInfo(90).level, 2);
  assert.equal(levelInfo(89).level, 1);
  assert.equal(levelInfo(90 + 120).level, 3);
  assert.ok(rewardsAt(2).some((r) => r.kind === 'bonus'));
  assert.ok(rewardsAt(6).some((r) => r.kind === 'planet' && r.planet === 'fraction'));
  assert.ok(rewardsAt(3).some((r) => r.kind === 'wardrobe'));
  assert.equal(unlockedPlanets(10).length, Object.keys(PLANETS).length);
});

test('a whole mission plays through, levels up and saves a day', () => {
  const s = defaultState();
  s.name = 'Test';
  const m = buildMission(s);
  assert.equal(m.qs.length, 10);
  assert.equal(m.qs.filter((q) => q.topic === 'reading').length, 3);
  assert.ok(m.qs.every((q) => TOPICS[q.topic].unlock <= 1));
  do {
    const q = m.qs[m.i];
    const r = answer(s, m, q.answer);
    assert.ok(r.correct && r.done);
  } while (nextQuestion(m));
  const res = finishMission(s, m);
  assert.equal(res.correct, 10);
  assert.ok(res.perfect);
  assert.equal(res.stars, 120);
  assert.equal(res.levelAfter, 2);
  assert.ok(res.rewards.some((r) => r.kind === 'bonus'));
  assert.ok(res.newBadges.some((b) => b.id === 'first'));
  assert.ok(res.newBadges.some((b) => b.id === 'perfect'));
  assert.equal(s.totals.missions, 1);
  assert.equal(Object.keys(s.days).length, 1);
  assert.equal(s.wordBank.length >= 1, true);
});

test('wrong then right gives half stars; wrong twice gives none and lowers difficulty', () => {
  const s = defaultState();
  s.settings.startYear = 4;
  const m = buildMission(s);
  const q = m.qs[0];
  const d0 = s.skills[q.topic].d;
  const wrongs = q.options.map((_, i) => i).filter((i) => i !== q.answer);
  assert.equal(answer(s, m, wrongs[0]).done, false);
  assert.equal(answer(s, m, wrongs[0]), null, 'the same wrong answer twice is ignored');
  const r = answer(s, m, wrongs[1] ?? q.answer);
  assert.ok(r.done);
  if (wrongs.length > 1) {
    assert.equal(r.stars, 0);
    assert.ok(s.skills[q.topic].d < d0);
  }
});

test('shootout questions have three answers', () => {
  const s = defaultState();
  for (let i = 0; i < 200; i++) {
    const q = shootoutQuestion(s);
    assert.equal(q.options.length, 3);
    assert.ok(q.answer >= 0);
  }
  const r = finishShootout(s, 3);
  assert.equal(r.stars, 9);
  assert.ok(r.newBadges.some((b) => b.id === 'hattrick'));
});

test('reset keeps settings and flags but clears progress; backups round-trip', () => {
  const s = defaultState();
  s.name = 'Captain';
  s.stars = 500;
  s.settings.pin = '1234';
  s.flags.push({ note: 'x' });
  const code = exportCode(s);
  const back = importCode(code);
  assert.equal(back.stars, 500);
  assert.equal(back.name, 'Captain');
  const r = resetProgress(s);
  assert.equal(r.stars, 0);
  assert.equal(r.name, '');
  assert.equal(r.settings.pin, '1234');
  assert.equal(r.flags.length, 1);
  assert.throws(() => importCode(btoa('{"hello":1}')));
});

test('every badge can be tested on a fresh state without errors', () => {
  const s = defaultState();
  for (const b of BADGES) assert.ok(!b.test(s), b.id);
});

test('the one-off fresh start wipes test progress once and never again', async () => {
  const { load, save, freshStartOnce } = await import('../js/state.js');
  const mem = new Map();
  const storage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
  const tested = defaultState();
  tested.name = 'Tester';
  tested.stars = 900;
  tested.settings.pin = '1234';
  tested.settings.extraMissions = true;
  save(tested, storage);
  const first = load(storage);
  assert.equal(first.name, '');
  assert.equal(first.stars, 0);
  assert.equal(first.settings.pin, null);
  assert.equal(first.settings.extraMissions, false);
  first.name = 'Ada';
  first.stars = 50;
  save(first, storage);
  assert.equal(freshStartOnce(storage), false);
  const later = load(storage);
  assert.equal(later.name, 'Ada');
  assert.equal(later.stars, 50);
});
