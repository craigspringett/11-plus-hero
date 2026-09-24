// Vocabulary: synonyms, opposites and meanings. A wide vocabulary is the
// biggest single help with reading comprehension. Every word answered right
// goes into the word bank with its meaning.

import { pick, choices } from '../util.js';

// [difficulty, kind, word, right answer, [wrong answers], meaning for the word bank]
// kind: s = means the same, o = opposite, m = what it means
export const VOCAB = [
  [1, 's', 'enormous', 'huge', ['tiny', 'quiet', 'clever'], 'very big'],
  [1, 's', 'tiny', 'small', ['giant', 'loud', 'fast'], 'very small'],
  [1, 's', 'shout', 'yell', ['whisper', 'walk', 'sleep'], 'to speak very loudly'],
  [1, 's', 'happy', 'glad', ['cross', 'tired', 'sad'], 'feeling good'],
  [1, 's', 'quick', 'fast', ['slow', 'heavy', 'late'], 'moving at speed'],
  [1, 'o', 'hot', 'cold', ['warm', 'sunny', 'wet'], 'very warm'],
  [1, 'o', 'full', 'empty', ['heavy', 'big', 'open'], 'holding as much as it can'],
  [1, 'o', 'noisy', 'quiet', ['loud', 'busy', 'fun'], 'making lots of sound'],
  [1, 'o', 'early', 'late', ['soon', 'first', 'quick'], 'before the usual time'],
  [1, 's', 'gloomy', 'dark', ['bright', 'shiny', 'cheerful'], 'dark and sad-feeling'],
  [1, 'm', 'nocturnal', 'awake and active at night', ['very fast', 'lives in water', 'only eats plants'], 'awake and active at night'],
  [1, 's', 'chuckle', 'laugh', ['cry', 'sneeze', 'frown'], 'a quiet laugh'],

  [2, 's', 'furious', 'very angry', ['very funny', 'very fast', 'very kind'], 'very angry'],
  [2, 's', 'peculiar', 'strange', ['ordinary', 'pretty', 'friendly'], 'odd or unusual'],
  [2, 's', 'brave', 'courageous', ['scared', 'lazy', 'rude'], 'ready to face danger'],
  [2, 's', 'glance', 'quick look', ['long stare', 'loud noise', 'gentle push'], 'a quick look'],
  [2, 'o', 'ancient', 'modern', ['old', 'broken', 'famous'], 'very, very old'],
  [2, 'o', 'generous', 'mean', ['kind', 'rich', 'giving'], 'happy to give and share'],
  [2, 'o', 'victory', 'defeat', ['win', 'trophy', 'match'], 'winning'],
  [2, 'o', 'arrive', 'depart', ['reach', 'land', 'enter'], 'to get somewhere'],
  [2, 'm', 'hibernate', 'sleep through the winter', ['fly south', 'hunt at night', 'build a nest'], 'to sleep through the winter'],
  [2, 'm', 'fragile', 'easily broken', ['very heavy', 'brightly coloured', 'very old'], 'easily broken'],
  [2, 's', 'weary', 'tired', ['excited', 'hungry', 'brave'], 'very tired'],
  [2, 's', 'dash', 'rush', ['stroll', 'creep', 'stop'], 'to move very quickly'],

  [3, 's', 'astonished', 'amazed', ['bored', 'annoyed', 'sleepy'], 'very surprised'],
  [3, 's', 'reluctant', 'unwilling', ['eager', 'thankful', 'careful'], 'not wanting to do something'],
  [3, 's', 'vast', 'immense', ['narrow', 'crowded', 'cosy'], 'extremely large'],
  [3, 's', 'feeble', 'weak', ['strong', 'fierce', 'clever'], 'very weak'],
  [3, 'o', 'rigid', 'flexible', ['stiff', 'solid', 'firm'], 'stiff, not able to bend'],
  [3, 'o', 'cautious', 'reckless', ['careful', 'shy', 'polite'], 'careful to avoid danger'],
  [3, 'o', 'abundant', 'scarce', ['plentiful', 'enormous', 'fresh'], 'more than enough'],
  [3, 'o', 'humble', 'boastful', ['modest', 'quiet', 'gentle'], 'not thinking you are better than others'],
  [3, 'm', 'habitat', 'the natural home of an animal or plant', ['a type of hat', 'a habit you cannot stop', 'a food for rabbits'], 'the natural home of an animal or plant'],
  [3, 'm', 'orbit', 'to travel round a planet or star', ['to land on the Moon', 'to shine very brightly', 'to explode'], 'to travel round a planet or star'],
  [3, 's', 'scarlet', 'red', ['blue', 'pale', 'shiny'], 'bright red'],
  [3, 's', 'devour', 'gobble', ['nibble', 'cook', 'share'], 'to eat hungrily'],

  [4, 's', 'ambitious', 'determined to succeed', ['happy to rest', 'easily scared', 'good at sums'], 'determined to succeed'],
  [4, 's', 'tranquil', 'calm', ['stormy', 'busy', 'thrilling'], 'peaceful and still'],
  [4, 's', 'conceal', 'hide', ['reveal', 'find', 'build'], 'to hide'],
  [4, 's', 'vivid', 'bright', ['dull', 'faint', 'misty'], 'strong and bright'],
  [4, 'o', 'optimistic', 'pessimistic', ['hopeful', 'cheerful', 'realistic'], 'expecting good things to happen'],
  [4, 'o', 'transparent', 'opaque', ['clear', 'glassy', 'thin'], 'see-through'],
  [4, 'o', 'expand', 'shrink', ['grow', 'stretch', 'widen'], 'to get bigger'],
  [4, 'o', 'reveal', 'conceal', ['show', 'uncover', 'display'], 'to show something hidden'],
  [4, 'm', 'predator', 'an animal that hunts others', ['an animal that is hunted', 'a plant that eats insects', 'a type of weather'], 'an animal that hunts others'],
  [4, 'm', 'evaporate', 'to turn from liquid into gas', ['to freeze solid', 'to fall as rain', 'to sink to the bottom'], 'to turn from liquid into gas'],
  [4, 's', 'plead', 'beg', ['refuse', 'order', 'mutter'], 'to ask desperately'],
  [4, 's', 'hesitate', 'pause', ['hurry', 'decide', 'shout'], 'to stop before doing something because you are unsure'],

  [5, 's', 'meticulous', 'very careful', ['very messy', 'very quick', 'very loud'], 'paying great attention to detail'],
  [5, 's', 'benevolent', 'kind', ['cruel', 'greedy', 'nervous'], 'kind and wanting to help'],
  [5, 's', 'obstinate', 'stubborn', ['obedient', 'curious', 'gentle'], 'refusing to change your mind'],
  [5, 's', 'diminish', 'decrease', ['increase', 'repair', 'celebrate'], 'to get smaller or less'],
  [5, 'o', 'frugal', 'wasteful', ['thrifty', 'careful', 'simple'], 'careful not to waste money or food'],
  [5, 'o', 'elated', 'miserable', ['overjoyed', 'excited', 'proud'], 'extremely happy'],
  [5, 'o', 'deliberate', 'accidental', ['planned', 'careful', 'slow'], 'done on purpose'],
  [5, 'o', 'scarce', 'plentiful', ['rare', 'few', 'hidden'], 'in short supply'],
  [5, 'm', 'anonymous', 'with no name given', ['written by a king', 'very famous', 'written in code'], 'with no name given'],
  [5, 'm', 'inevitable', 'certain to happen', ['impossible to see', 'unlikely to happen', 'easy to change'], 'certain to happen'],
  [5, 's', 'eerie', 'spooky', ['sunny', 'cosy', 'noisy'], 'strange and a bit frightening'],
  [5, 's', 'resilient', 'tough', ['fragile', 'lazy', 'nervous'], 'able to recover after difficulties'],

  [6, 's', 'ominous', 'threatening', ['welcoming', 'harmless', 'joyful'], 'suggesting something bad will happen'],
  [6, 's', 'tenacious', 'determined', ['feeble', 'careless', 'hesitant'], 'not giving up easily'],
  [6, 's', 'eloquent', 'well-spoken', ['silent', 'clumsy', 'rude'], 'good at expressing ideas in words'],
  [6, 'o', 'lethargic', 'energetic', ['sleepy', 'sluggish', 'idle'], 'tired and lacking energy'],
  [6, 'o', 'candid', 'secretive', ['honest', 'frank', 'open'], 'honest and direct'],
  [6, 'o', 'compassionate', 'heartless', ['caring', 'gentle', 'sympathetic'], 'caring about others’ feelings'],
  [6, 'm', 'ubiquitous', 'found everywhere', ['found nowhere', 'very expensive', 'extremely rare'], 'found everywhere'],
  [6, 'm', 'ephemeral', 'lasting a very short time', ['lasting forever', 'very heavy', 'hard to see'], 'lasting a very short time'],
];

const PROMPT = {
  s: (w) => `Which word or phrase means the <b>same</b> as <i>${w}</i>?`,
  o: (w) => `Which word is the <b>opposite</b> of <i>${w}</i>?`,
  m: (w) => `What does <i>${w}</i> mean?`,
};

export function vocab(d) {
  const lvl = Math.min(d, 6);
  const pool = VOCAB.filter((v) => v[0] === lvl);
  const [, kind, word, right, wrong, meaning] = pick(pool);
  return {
    prompt: PROMPT[kind](word),
    ...choices(right, wrong),
    hint: kind === 'o' ? 'Opposite means the complete reverse.' : 'Try each answer in a sentence in place of the word.',
    explain: `<b>${word}</b> means ${meaning}.`,
    bankWord: { word, meaning },
  };
}
