// Spelling questions from the national curriculum word lists: Year 2 common
// exception words for the start, then the statutory Year 3/4 and Year 5/6
// lists. Wrong options are made by the mistakes children really make
// (doubling, dropping a silent letter, ie/ei, sound-alike spellings) and are
// never real words or American spellings.

import { pick, shuffle, rint, choices } from '../util.js';

export const YEAR2 = ['after', 'again', 'any', 'bath', 'beautiful', 'because', 'both', 'break', 'busy', 'child', 'children', 'class', 'climb', 'clothes', 'could', 'door', 'every', 'everybody', 'eye', 'father', 'floor', 'friend', 'great', 'half', 'hour', 'improve', 'many', 'money', 'move', 'once', 'parents', 'people', 'pretty', 'prove', 'said', 'school', 'should', 'sugar', 'sure', 'water', 'where', 'whole', 'would', 'laugh', 'answer'];

export const YEAR34 = ['accident', 'actually', 'address', 'answer', 'appear', 'arrive', 'believe', 'bicycle', 'breath', 'breathe', 'build', 'busy', 'business', 'calendar', 'caught', 'centre', 'century', 'certain', 'circle', 'complete', 'consider', 'continue', 'decide', 'describe', 'different', 'difficult', 'disappear', 'early', 'earth', 'eight', 'eighth', 'enough', 'exercise', 'experience', 'experiment', 'extreme', 'famous', 'favourite', 'February', 'forward', 'forwards', 'fruit', 'grammar', 'group', 'guard', 'guide', 'heard', 'heart', 'height', 'history', 'imagine', 'increase', 'important', 'interest', 'island', 'knowledge', 'learn', 'length', 'library', 'material', 'medicine', 'mention', 'minute', 'natural', 'naughty', 'notice', 'occasion', 'occasionally', 'often', 'opposite', 'ordinary', 'particular', 'peculiar', 'perhaps', 'popular', 'position', 'possess', 'possession', 'possible', 'potatoes', 'pressure', 'probably', 'promise', 'purpose', 'quarter', 'question', 'recent', 'regular', 'reign', 'remember', 'sentence', 'separate', 'special', 'straight', 'strange', 'strength', 'suppose', 'surprise', 'therefore', 'though', 'although', 'thought', 'through', 'various', 'weight', 'woman', 'women'];

export const YEAR56 = ['accommodate', 'accompany', 'according', 'achieve', 'aggressive', 'amateur', 'ancient', 'apparent', 'appreciate', 'attached', 'available', 'average', 'awkward', 'bargain', 'bruise', 'category', 'cemetery', 'committee', 'communicate', 'community', 'competition', 'conscience', 'conscious', 'controversy', 'convenience', 'correspond', 'criticise', 'curiosity', 'definite', 'desperate', 'determined', 'develop', 'dictionary', 'disastrous', 'embarrass', 'environment', 'equipment', 'equipped', 'especially', 'exaggerate', 'excellent', 'existence', 'explanation', 'familiar', 'foreign', 'forty', 'frequently', 'government', 'guarantee', 'harass', 'hindrance', 'identity', 'immediately', 'individual', 'interfere', 'interrupt', 'language', 'leisure', 'lightning', 'marvellous', 'mischievous', 'muscle', 'necessary', 'neighbour', 'nuisance', 'occupy', 'occur', 'opportunity', 'parliament', 'persuade', 'physical', 'prejudice', 'privilege', 'profession', 'programme', 'pronunciation', 'queue', 'recognise', 'recommend', 'relevant', 'restaurant', 'rhyme', 'rhythm', 'sacrifice', 'secretary', 'shoulder', 'signature', 'sincere', 'sincerely', 'soldier', 'stomach', 'sufficient', 'suggest', 'symbol', 'system', 'temperature', 'thorough', 'twelfth', 'variety', 'vegetable', 'vehicle', 'yacht'];

// Real words a mistake could accidentally produce; a "wrong" option must
// never be one of these.
const REAL = new Set([
  ...YEAR2, ...YEAR34, ...YEAR56,
  'hole', 'our', 'brake', 'wait', 'herd', 'ate', 'rain', 'reign', 'new', 'there', 'their', 'wear', 'were', 'whose', 'past', 'passed',
  'right', 'write', 'bathe', 'breath', 'breathe', 'lose', 'loose', 'quiet', 'quite', 'though', 'through', 'thought', 'tough', 'woman',
  'women', 'heart', 'hart', 'heard', 'hear', 'here', 'eye', 'i', 'wood', 'would', 'could', 'should', 'aloud', 'allowed', 'peace', 'piece',
  'mist', 'missed', 'guest', 'guessed', 'grate', 'great', 'weight', 'wait', 'eight', 'ate', 'sure', 'shore', 'door', 'dour', 'floor', 'flour',
  'hour', 'our', 'prove', 'move', 'rhyme', 'rime', 'forward', 'foreword', 'medicine', 'minute', 'busy', 'bust', 'build', 'billed', 'guard',
  'guide', 'fruit', 'group', 'grope', 'earth', 'early', 'learn', 'length', 'circle', 'certain', 'curtain', 'accept', 'except', 'effect',
  'affect', 'occupy', 'occur', 'queue', 'cue', 'twelfth', 'centre', 'center', 'favorite', 'favourite', 'program', 'programme', 'recognize',
  'criticize', 'color', 'neighbor', 'marvelous', 'jewelry', 'shoulder', 'soldier', 'solider', 'breathe', 'lightening', 'lightning',
  'desert', 'dessert', 'stationary', 'stationery', 'principal', 'principle', 'advice', 'advise', 'device', 'devise', 'practice', 'practise',
  'licence', 'license', 'proceed', 'precede', 'descent', 'dissent', 'decent', 'moral', 'morale', 'rhythm', 'accident', 'address', 'dress',
  'strange', 'stranger', 'complete', 'compete', 'separate', 'desperate', 'bargain', 'forty', 'fourty', 'harass', 'embarrass',
]);

// Each rule returns a changed copy of the word, or null if it doesn't apply.
const RULES = [
  // undouble a double letter: accommodate -> acommodate
  (w) => { const m = [...w.matchAll(/([bcdfglmnprstz])\1/g)]; if (!m.length) return null; const x = pick(m); return w.slice(0, x.index) + x[1] + w.slice(x.index + 2); },
  // double a single consonant after a vowel: necessary -> neccessary
  (w) => { const m = [...w.matchAll(/[aeiou]([bcdfglmnprst])(?!\1)[aeiouy]/g)]; if (!m.length) return null; const x = pick(m); const i = x.index + 1; return w.slice(0, i) + x[1] + w.slice(i); },
  // ie <-> ei: believe -> beleive, weight -> wieght
  (w) => (w.includes('ie') ? w.replace('ie', 'ei') : w.includes('ei') ? w.replace('ei', 'ie') : null),
  // drop an unstressed middle vowel: different -> diffrent
  (w) => { const m = [...w.slice(0, -2).matchAll(/(?<=[bcdfghklmnprstvz])[aeiou](?=[bcdfghklmnprstvz])/g)].filter((x) => x.index > 1); if (!m.length) return null; const x = pick(m); return w.slice(0, x.index) + w.slice(x.index + 1); },
  // swap a middle vowel for one that sounds similar: separate -> seperate
  (w) => { const m = [...w.matchAll(/[aeiou]/g)].filter((x) => x.index > 0 && x.index < w.length - 1); if (!m.length) return null; const x = pick(m); const alt = { a: 'e', e: 'i', i: 'e', o: 'u', u: 'o' }[x[0]]; return w.slice(0, x.index) + alt + w.slice(x.index + 1); },
  // sound-alike spellings
  (w) => {
    const subs = [[/tion$/, 'shun'], [/sion$/, 'tion'], [/cian$/, 'tion'], [/ture$/, 'cher'], [/sure$/, 'shure'], [/ough/, 'uff'], [/ough/, 'ow'], [/ought/, 'ort'], [/augh/, 'arf'], [/aught/, 'ort'], [/ph/, 'f'], [/wh/, 'w'], [/^kn/, 'n'], [/mb$/, 'm'], [/gh/, ''], [/le$/, 'el'], [/el$/, 'le'], [/ck/, 'k'], [/c(?=[ei])/, 's'], [/s(?=[ei])/, 'c'], [/que$/, 'k'], [/y$/, 'ey'], [/ey$/, 'y'], [/ous$/, 'us'], [/ious$/, 'ous'], [/ance$/, 'ence'], [/ence$/, 'ance'], [/ant$/, 'ent'], [/ent$/, 'ant'], [/able$/, 'ible'], [/ible$/, 'able'], [/ea/, 'ee'], [/ai/, 'ay'], [/our/, 'ower'], [/ure$/, 'er'], [/ise$/, 'ice'], [/rh/, 'r'], [/ch(?=[aeiour])/, 'k'], [/sc/, 's'], [/x/, 'cks'], [/cc/, 'x'], [/ou/, 'ow'], [/y(?=[^aeiou])/, 'i'], [/u(?=[aeio])/, ''], [/^w(?=r)/, ''], [/(?<=[a-z])e$/, ''], [/(?<=[^aeiou])$/, 'e']];
    const ok = subs.filter(([re]) => re.test(w));
    if (!ok.length) return null;
    const [re, to] = pick(ok);
    return w.replace(re, to);
  },
];

export function misspell(word, n = 3) {
  const out = new Set();
  let guard = 0;
  while (out.size < n && guard++ < 200) {
    const rule = pick(RULES);
    const v = rule(word);
    if (!v || v === word || v.length < 3) continue;
    const lower = v.toLowerCase();
    if (REAL.has(lower) || out.has(v)) continue;
    // A capitalised word keeps its capital.
    out.add(v);
  }
  return [...out];
}

function listFor(d) {
  if (d <= 2) return YEAR2;
  if (d <= 4) return YEAR34;
  if (d <= 6) return YEAR56.slice(0, 60);
  return YEAR56;
}

export function spelling(d) {
  const list = listFor(d);
  const word = pick(list);
  const wrong = misspell(word, 3);
  if (wrong.length < 3) return spelling(d);
  if (d >= 3 && Math.random() < 0.3) {
    // "Which word is spelt wrongly?": one mistake among three correct words.
    const others = shuffle(list.filter((w) => w !== word)).slice(0, 3);
    const bad = wrong[0];
    const c = choices(bad, others);
    return {
      prompt: 'Which word is spelt <b>wrongly</b>?',
      ...c,
      hint: 'Say each word slowly in your head. Which one looks odd?',
      explain: `It should be spelt <b>${word}</b>.`,
      spellWord: word,
    };
  }
  const c = choices(word, wrong);
  return {
    prompt: 'Which word is spelt correctly?',
    ...c,
    hint: 'Look for double letters and silent letters. Which one looks right?',
    explain: `<b>${word}</b> is the correct spelling.`,
    spellWord: word,
  };
}

export const _test = { RULES, REAL, rint };
