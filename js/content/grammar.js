// Grammar and punctuation, following the KS2 English grammar programme of
// study: word classes, tenses, conjunctions, prefixes and suffixes,
// apostrophes, inverted commas, commas, relative clauses, modal verbs,
// parenthesis and (later) the passive, colons and semi-colons.
// In every item the first option is the right one; options are shuffled when
// the question is asked.

import { pick, choices } from '../util.js';

export const GRAMMAR = [
  // ---- d1: Year 2 and early Year 3 ----
  { d: 1, q: 'Which word is a <b>noun</b>?', o: ['rabbit', 'quickly', 'jump', 'happy'], h: 'A noun is a person, place or thing.' },
  { d: 1, q: 'Which word is a <b>verb</b>?', o: ['swim', 'blue', 'table', 'softly'], h: 'A verb is a doing or being word.' },
  { d: 1, q: 'Which word is an <b>adjective</b>?', o: ['fluffy', 'run', 'garden', 'slowly'], h: 'An adjective describes a noun.' },
  { d: 1, q: 'Which sentence needs a <b>question mark</b>?', o: ['Where is my football', 'I like football', 'Kick the ball to me', 'The ball is under the bed'], h: 'A question asks something and expects an answer.' },
  { d: 1, q: 'Which sentence is written correctly?', o: ['My dog is called Biscuit.', 'my dog is called Biscuit.', 'My dog is called biscuit.', 'My dog is called Biscuit'], h: 'Check for a capital letter at the start, a capital for names, and a full stop.' },
  { d: 1, q: 'Choose the word to finish the sentence: <i>Yesterday I ___ to the park.</i>', o: ['walked', 'walk', 'walks', 'walking'], h: '"Yesterday" tells you it has already happened.' },
  { d: 1, q: 'Choose the word to finish the sentence: <i>I saw ___ owl in the tree.</i>', o: ['an', 'a'], h: 'Use "an" before a vowel sound: a, e, i, o, u.' },
  { d: 1, q: 'Choose the best word to join the sentence: <i>I wanted to play outside ___ it was raining.</i>', o: ['but', 'and', 'or', 'so'], h: 'The second part is a problem for the first part.' },
  { d: 1, q: 'Which word should have a capital letter? <i>on saturday we went swimming.</i>', o: ['saturday', 'we', 'went', 'swimming'], h: 'Days of the week always start with a capital letter. (So does the first word of a sentence!)' },
  { d: 1, q: 'Which sentence is a <b>command</b>?', o: ['Put your shoes on.', 'Are your shoes on?', 'Your shoes are on.', 'What lovely shoes you have!'], h: 'A command tells someone to do something.' },

  // ---- d2: Year 3 ----
  { d: 2, q: 'Which word means the <b>opposite</b> of <i>happy</i>?', o: ['unhappy', 'dishappy', 'mishappy', 'inhappy'], h: 'Which prefix means "not"?' },
  { d: 2, q: 'Which word means the <b>opposite</b> of <i>appear</i>?', o: ['disappear', 'unappear', 'misappear', 'reappear'], h: '"dis" can mean the opposite.' },
  { d: 2, q: 'Which prefix means <b>again</b>, as in <i>___build</i>?', o: ['re', 'un', 'dis', 'mis'], h: 'If you build something again, you ___build it.' },
  { d: 2, q: 'Which sentence uses <b>inverted commas</b> correctly?', o: ['"Let’s go to the park," said Mia.', '"Let’s go to the park, said Mia."', 'Let’s go to the park," said Mia.', '"Let’s go to the park" said, Mia.'], h: 'Inverted commas go around the words that are actually spoken.' },
  { d: 2, q: 'Choose the best word: <i>We stayed inside ___ it was raining.</i>', o: ['because', 'but', 'or', 'until'], h: 'Which word gives a reason?' },
  { d: 2, q: 'Which word is an <b>adverb</b>? <i>The tortoise walked slowly across the road.</i>', o: ['slowly', 'walked', 'tortoise', 'road'], h: 'An adverb tells you how something is done. Many end in -ly.' },
  { d: 2, q: 'Which word is a <b>conjunction</b>? <i>I was tired, but I kept running.</i>', o: ['but', 'tired', 'kept', 'running'], h: 'A conjunction joins two parts of a sentence.' },
  { d: 2, q: 'Which sentence is an <b>exclamation</b>?', o: ['What a huge wave that is!', 'How big is the wave?', 'The wave is huge.', 'Watch out for the wave.'], h: 'An exclamation often starts with "What" or "How" and ends with !' },
  { d: 2, q: 'Choose the correct word: <i>She ___ finished her homework.</i>', o: ['has', 'have', 'having', 'is'], h: 'Say each one out loud in the sentence.' },
  { d: 2, q: 'Which word is in the same <b>word family</b> as <i>solve</i>?', o: ['solution', 'salt', 'sold', 'solar'], h: 'Word families share a root and a meaning.' },
  { d: 2, q: 'Choose the word to finish the sentence: <i>We waited for ___ hour.</i>', o: ['an', 'a'], h: 'The h in hour is silent, so it starts with a vowel sound.' },

  // ---- d3: Year 4 ----
  { d: 3, q: 'Which is correct? <i>The ___ tail was wagging.</i> (one dog)', o: ['dog’s', 'dogs', 'dogs’', 'dog'], h: 'The tail belongs to one dog. Add an apostrophe and s.' },
  { d: 3, q: 'Which is correct? <i>The two ___ bikes were red.</i>', o: ['girls’', 'girl’s', 'girls', 'girls’s'], h: 'There are two girls. For a plural ending in s, the apostrophe goes after the s.' },
  { d: 3, q: 'Which word is a <b>pronoun</b>? <i>Mia lost her hat, so she looked everywhere.</i>', o: ['she', 'lost', 'hat', 'everywhere'], h: 'A pronoun stands in for a noun, like he, she, it or they.' },
  { d: 3, q: 'Which sentence has the comma in the right place?', o: ['After lunch, we played football.', 'After, lunch we played football.', 'After lunch we, played football.', 'After lunch we played, football.'], h: 'A comma goes after a fronted adverbial (the bit at the start telling when).' },
  { d: 3, q: 'Which sentence is correct?', o: ['The cats were asleep.', 'The cat’s were asleep.', 'The cats’ were asleep.', 'The cats’s were asleep.'], h: 'A plural does not need an apostrophe unless something belongs to it.' },
  { d: 3, q: 'Choose the correct word: <i>We ___ playing football.</i>', o: ['were', 'was', 'is', 'be'], h: 'Say it out loud: "we were" or "we was"?' },
  { d: 3, q: 'Choose the correct word: <i>I ___ my homework yesterday.</i>', o: ['did', 'done', 'do', 'doed'], h: 'Which one sounds right after "I" for something already finished?' },
  { d: 3, q: 'Which is an <b>expanded noun phrase</b>?', o: ['the tiny, spotted ladybird', 'the ladybird', 'flew away', 'very quickly'], h: 'It has a noun plus extra describing words.' },
  { d: 3, q: 'Choose the right word: <i>The children put on ___ coats.</i>', o: ['their', 'there', 'they’re'], h: 'The coats belong to the children.' },
  { d: 3, q: 'Choose the right word: <i>I ate ___ many sweets!</i>', o: ['too', 'to', 'two'], h: 'Which one means "more than enough"?' },
  { d: 3, q: 'What is the short form of <i>do not</i>?', o: ['don’t', 'dont', 'do’nt', 'doesn’t'], h: 'The apostrophe goes where the letter o is missing.' },
  { d: 3, q: 'Which word is a <b>preposition</b>? <i>The cat hid under the table.</i>', o: ['under', 'hid', 'cat', 'table'], h: 'A preposition tells you where something is.' },
  { d: 3, q: 'Choose the right prefix: <i>It is ___possible to lick your elbow.</i>', o: ['im', 'un', 'dis', 'in'], h: 'Before a p, the prefix meaning "not" is usually "im".' },
  { d: 3, q: 'Which is a <b>fronted adverbial</b>?', o: ['Later that night, the owl woke up.', 'The owl woke up later that night.', 'The owl, woke up.', 'The owl woke up.'], h: 'It comes at the front of the sentence and tells when, where or how.' },

  // ---- d4: Year 5 ----
  { d: 4, q: 'Which word starts the <b>relative clause</b>? <i>The dog, which was very muddy, ran inside.</i>', o: ['which', 'dog', 'very', 'ran'], h: 'Relative clauses often start with who, which, that, where or whose.' },
  { d: 4, q: 'Which word is a <b>modal verb</b>?', o: ['might', 'run', 'happy', 'quickly'], h: 'Modal verbs show how likely something is: can, could, might, will, must.' },
  { d: 4, q: 'Which sentence is the <b>most certain</b>?', o: ['It will rain tomorrow.', 'It might rain tomorrow.', 'It could rain tomorrow.', 'It may rain tomorrow.'], h: 'Which modal verb sounds sure?' },
  { d: 4, q: 'Which sentence uses <b>brackets</b> correctly?', o: ['My aunt (who lives in Leeds) is visiting.', 'My aunt (who lives in Leeds is visiting).', '(My aunt who) lives in Leeds is visiting.', 'My (aunt who lives) in Leeds is visiting.'], h: 'The sentence should still make sense if you take out the part in brackets.' },
  { d: 4, q: 'Which word is an <b>adverb of possibility</b>?', o: ['perhaps', 'quickly', 'loudly', 'under'], h: 'It tells you how likely something is.' },
  { d: 4, q: 'Add a suffix to make <i>hope</i> an adjective.', o: ['hopeful', 'hopely', 'hopement', 'hopeness'], h: 'Which one describes a person: "a ___ person"?' },
  { d: 4, q: 'Add a suffix to make <i>simple</i> a verb.', o: ['simplify', 'simplise', 'simpleate', 'simplen'], h: 'To make something simple, you ___ it.' },
  { d: 4, q: 'Which sentence shows you are talking <b>to</b> Grandma?', o: ['Let’s eat, Grandma!', 'Let’s eat Grandma!'], h: 'A comma can save a life!' },
  { d: 4, q: 'Which sentence uses the <b>past progressive</b>?', o: ['She was reading a book.', 'She reads a book.', 'She has read a book.', 'She will read a book.'], h: 'Past progressive uses was/were + a verb ending in -ing.' },
  { d: 4, q: 'Which sentence uses the <b>present perfect</b>?', o: ['We have visited the museum.', 'We visited the museum.', 'We are visiting the museum.', 'We will visit the museum.'], h: 'Present perfect uses has or have + a past verb.' },
  { d: 4, q: 'Which word means <i>not legal</i>?', o: ['illegal', 'unlegal', 'dislegal', 'imlegal'], h: 'Before an l, the prefix meaning "not" is usually "il".' },
  { d: 4, q: 'Choose the right word: <i>The boy ___ bike was stolen called the police.</i>', o: ['whose', 'who’s', 'which', 'where'], h: 'The bike belongs to the boy.' },
  { d: 4, q: 'Which sentence uses <b>commas</b> correctly?', o: ['I packed a torch, a map, some snacks and a coat.', 'I packed a torch a map, some snacks, and a coat,', 'I packed, a torch a map some snacks and a coat.', 'I, packed a torch, a map some snacks and a coat.'], h: 'Commas separate items in a list. Usually no comma before "and".' },

  // ---- d5: Year 6 ----
  { d: 5, q: 'Which sentence is in the <b>passive</b> voice?', o: ['The ball was kicked by Leo.', 'Leo kicked the ball.', 'Leo is kicking the ball.', 'Leo will kick the ball.'], h: 'In the passive, the thing the action happens to comes first.' },
  { d: 5, q: 'Which sentence uses a <b>colon</b> correctly?', o: ['You will need three things: a pen, a ruler and a rubber.', 'You will need: three things a pen, a ruler and a rubber.', 'You will: need three things, a pen, a ruler and a rubber.', 'You will need three things a pen: a ruler and a rubber.'], h: 'A colon can introduce a list after a complete sentence.' },
  { d: 5, q: 'Which sentence uses a <b>semi-colon</b> correctly?', o: ['It was late; the stars were out.', 'It was; late the stars were out.', 'It was late the; stars were out.', 'It; was late the stars were out.'], h: 'A semi-colon joins two complete sentences that are closely linked.' },
  { d: 5, q: 'Which sentence is the most <b>formal</b>?', o: ['We request that you arrive promptly.', 'Try to get here on time.', 'Don’t be late, OK?', 'Get here quick!'], h: 'Formal writing sounds like a letter from a head teacher.' },
  { d: 5, q: 'What is the <b>subject</b> of this sentence? <i>The excited puppy chased the ball.</i>', o: ['the excited puppy', 'the ball', 'chased', 'excited'], h: 'The subject is who or what is doing the verb.' },
  { d: 5, q: 'Which sentence uses a <b>dash</b> correctly?', o: ['The storm was coming – we had to hurry.', 'The storm – was coming we had to hurry.', 'The – storm was coming we had to hurry.', 'The storm was coming we – had to hurry.'], h: 'A dash can join two linked ideas, a bit like a semi-colon.' },
  { d: 5, q: 'Which uses a <b>hyphen</b> to show the shark eats people?', o: ['a man-eating shark', 'a man eating shark'], h: 'Without the hyphen, it sounds like a man is eating a shark!' },
  { d: 5, q: 'Which word is a <b>synonym</b> of <i>begin</i>?', o: ['commence', 'conclude', 'continue', 'collapse'], h: 'A synonym means the same.' },
  { d: 5, q: 'Choose the correct <b>subjunctive</b> form: <i>If I ___ you, I would take an umbrella.</i>', o: ['were', 'was', 'am', 'be'], h: 'In formal writing, "If I ___ you" uses a special form.' },
  { d: 5, q: 'What is the <b>object</b> of this sentence? <i>Ava threw the frisbee over the fence.</i>', o: ['the frisbee', 'Ava', 'threw', 'the fence'], h: 'The object is the thing the action is done to. What did Ava throw?' },
];

// Irregular and tricky plurals and past tenses, generated for variety.
const PLURALS = [['fox', 'foxes', ['foxs', 'foxies']], ['bus', 'buses', ['buss', 'busies']], ['church', 'churches', ['churchs', 'churchies']], ['baby', 'babies', ['babys', 'babyes']], ['day', 'days', ['daies', 'dayes']], ['leaf', 'leaves', ['leafs', 'leafes']], ['wolf', 'wolves', ['wolfs', 'wolfes']], ['knife', 'knives', ['knifes', 'knifs']], ['child', 'children', ['childs', 'childes']], ['mouse', 'mice', ['mouses', 'mices']], ['tooth', 'teeth', ['tooths', 'teeths']], ['foot', 'feet', ['foots', 'feets']], ['sheep', 'sheep', ['sheeps', 'sheepes']], ['potato', 'potatoes', ['potatos', 'potatose']], ['city', 'cities', ['citys', 'cityes']], ['key', 'keys', ['kies', 'keyes']], ['dish', 'dishes', ['dishs', 'dishies']], ['puppy', 'puppies', ['puppys', 'puppyes']], ['woman', 'women', ['womans', 'womens']]];

const PAST = [['run', 'ran', ['runned', 'runs']], ['swim', 'swam', ['swimmed', 'swum']], ['catch', 'caught', ['catched', 'caughted']], ['buy', 'bought', ['buyed', 'brought']], ['think', 'thought', ['thinked', 'thunk']], ['go', 'went', ['goed', 'gone']], ['write', 'wrote', ['writed', 'written']], ['fly', 'flew', ['flied', 'flyed']], ['hop', 'hopped', ['hoped', 'hopt']], ['stop', 'stopped', ['stoped', 'stopt']], ['try', 'tried', ['tryed', 'trid']], ['carry', 'carried', ['carryed', 'carred']], ['bring', 'brought', ['bringed', 'brang']], ['teach', 'taught', ['teached', 'taughted']], ['sing', 'sang', ['singed', 'sunged']], ['take', 'took', ['taked', 'tooked']], ['sleep', 'slept', ['sleeped', 'slepted']], ['eat', 'ate', ['eated', 'eaten']]];

function pluralQ() {
  const [one, many, wrong] = pick(PLURALS);
  return {
    prompt: `One ${one}, two ___`,
    ...choices(many, [...wrong, one === many ? one + 's' : one]),
    hint: 'Some plurals just add s, some add es, and some change completely.',
    explain: `One ${one}, two <b>${many}</b>.`,
  };
}

function pastQ() {
  const [now, past, wrong] = pick(PAST);
  return {
    prompt: `Today I ${now}. Yesterday I ___.`,
    ...choices(past, [...wrong, now]),
    hint: 'Some verbs just add -ed, but lots of common ones change completely.',
    explain: `Today I ${now}, yesterday I <b>${past}</b>.`,
  };
}

export function grammar(d) {
  const lvl = Math.min(d, 5);
  if (lvl <= 3 && Math.random() < 0.25) return Math.random() < 0.5 ? pluralQ() : pastQ();
  const pool = GRAMMAR.filter((g) => g.d === lvl);
  const g = pick(pool);
  return fromBank(g);
}

export function fromBank(g) {
  const c = choices(g.o[0], g.o.slice(1), g.o.length);
  return { prompt: g.q, ...c, hint: g.h, explain: g.e || `The answer is <b>${g.o[0]}</b>.` };
}
