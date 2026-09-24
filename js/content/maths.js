// Maths question generators. Each takes a difficulty from 1 to 8 and returns
// { prompt, options, answer, hint, explain }. Difficulty follows the KS2
// curriculum: 1-2 is Year 3, 3-4 Year 4, 5-6 Year 5, 7-8 Year 6 (the level
// the curriculum-based Trafford test expects by the summer of Year 5 and
// beyond, for stretch).

import { rint, pick, shuffle, fmt, money, numChoices, choices, frac, MINUS, TIMES, DIVIDE } from '../util.js';

const an = (w) => (/^[aeiou]/i.test(w) ? 'an ' : 'a ') + w;

const NAMES = ['Sam', 'Mia', 'Leo', 'Ava', 'Zara', 'Omar', 'Priya', 'Noah', 'Isla', 'Ben', 'Amira', 'Jack', 'Ella', 'Theo'];

// ---------- times tables ----------

function timesFact(a, b) {
  const ans = a * b;
  const [x, y] = Math.random() < 0.5 ? [a, b] : [b, a];
  return {
    prompt: `${x} ${TIMES} ${y} = ?`,
    ...numChoices(ans, [ans + a, ans - a, ans + b, ans - b, a + b, ans + 10, ans - 1, ans + 1]),
    hint: `Count up in ${a}s, ${b} jump${b === 1 ? "" : "s"}: ${a}, ${a * 2}, ${a * 3}…`,
    explain: `${x} ${TIMES} ${y} = ${ans}`,
  };
}

function divFact(a, b) {
  const n = a * b;
  return {
    prompt: `${n} ${DIVIDE} ${a} = ?`,
    ...numChoices(b, [b + 1, b - 1, b + 2, a, n - a, b * 2]),
    hint: `Think: what times ${a} makes ${n}?`,
    explain: `${a} ${TIMES} ${b} = ${n}, so ${n} ${DIVIDE} ${a} = ${b}`,
  };
}

export function times(d) {
  const tables = {
    1: [2, 5, 10],
    2: [2, 3, 4, 5, 10],
    3: [3, 4, 8],
    4: [6, 7, 9, 11, 12],
  };
  if (d <= 2) return timesFact(pick(tables[d]), rint(1, d === 1 ? 10 : 12));
  if (d <= 4) {
    const a = pick(tables[d]);
    const b = rint(2, 12);
    return Math.random() < 0.35 ? divFact(a, b) : timesFact(a, b);
  }
  if (d === 5) {
    const a = rint(3, 12);
    const b = rint(3, 12);
    return Math.random() < 0.5 ? divFact(a, b) : timesFact(a, b);
  }
  if (d === 6) {
    const a = rint(3, 12);
    const b = rint(3, 12);
    const n = a * b;
    if (Math.random() < 0.5) {
      return {
        prompt: `? ${TIMES} ${a} = ${n}`,
        ...numChoices(b, [b + 1, b - 1, n - a, a, b + 2]),
        hint: `Count in ${a}s until you reach ${n}. How many jumps?`,
        explain: `${b} ${TIMES} ${a} = ${n}`,
      };
    }
    return {
      prompt: `${n} ${DIVIDE} ? = ${b}`,
      ...numChoices(a, [a + 1, a - 1, b, a + 2]),
      hint: `What times ${b} makes ${n}?`,
      explain: `${n} ${DIVIDE} ${a} = ${b}`,
    };
  }
  if (d === 7) {
    const a = rint(2, 9);
    const b = rint(2, 9);
    if (Math.random() < 0.5) {
      const ans = a * 10 * b;
      return {
        prompt: `${a * 10} ${TIMES} ${b} = ?`,
        ...numChoices(ans, [a * b, ans * 10, ans + 10, ans - 10, (a + 1) * 10 * b]),
        hint: `Work out ${a} ${TIMES} ${b} first, then make it 10 times bigger.`,
        explain: `${a} ${TIMES} ${b} = ${a * b}, so ${a * 10} ${TIMES} ${b} = ${ans}`,
      };
    }
    const n = a * b * 100;
    return {
      prompt: `${fmt(n)} ${DIVIDE} ${a} = ?`,
      ...numChoices(b * 100, [b * 10, b * 1000, b * 100 + 100, (b - 1) * 100]),
      hint: `Work out ${a * b} ${DIVIDE} ${a} first, then think about the hundreds.`,
      explain: `${a * b} ${DIVIDE} ${a} = ${b}, so ${fmt(n)} ${DIVIDE} ${a} = ${b * 100}`,
    };
  }
  // d8: two-digit by one-digit, or three numbers
  if (Math.random() < 0.6) {
    const a = rint(12, 49);
    const b = rint(3, 9);
    const ans = a * b;
    const tens = Math.floor(a / 10) * 10;
    return {
      prompt: `${a} ${TIMES} ${b} = ?`,
      ...numChoices(ans, [ans + 10, ans - 10, tens * b + (a % 10), ans + b, ans - b]),
      hint: `Split ${a} into ${tens} and ${a % 10}. Multiply each by ${b}, then add.`,
      explain: `${tens} ${TIMES} ${b} = ${tens * b} and ${a % 10} ${TIMES} ${b} = ${(a % 10) * b}, so the answer is ${ans}`,
    };
  }
  const a = rint(2, 5);
  const b = rint(2, 6);
  const c = rint(2, 5);
  const ans = a * b * c;
  return {
    prompt: `${a} ${TIMES} ${b} ${TIMES} ${c} = ?`,
    ...numChoices(ans, [a * b + c, a + b + c, ans + a, ans - c, a * b * (c + 1)]),
    hint: `Do ${a} ${TIMES} ${b} first, then multiply by ${c}.`,
    explain: `${a} ${TIMES} ${b} = ${a * b}, and ${a * b} ${TIMES} ${c} = ${ans}`,
  };
}

// ---------- adding and taking away ----------

// Mistakes children really make: forgetting to carry, or taking the smaller
// digit from the larger one in every column.
function addNoCarry(a, b) {
  let r = 0, p = 1;
  while (a > 0 || b > 0) {
    r += (((a % 10) + (b % 10)) % 10) * p;
    a = Math.floor(a / 10); b = Math.floor(b / 10); p *= 10;
  }
  return r;
}
function subNoBorrow(a, b) {
  let r = 0, p = 1;
  while (a > 0 || b > 0) {
    r += Math.abs((a % 10) - (b % 10)) * p;
    a = Math.floor(a / 10); b = Math.floor(b / 10); p *= 10;
  }
  return r;
}

function noCrossPair(digits) {
  // two numbers of `digits` digits whose columns add to < 10
  let a = 0, b = 0, p = 1;
  for (let i = 0; i < digits; i++) {
    const x = i === digits - 1 ? rint(1, 7) : rint(0, 8);
    const y = rint(i === digits - 1 ? 1 : 0, 9 - x - (i === digits - 1 ? 1 : 0));
    a += x * p; b += y * p; p *= 10;
  }
  return [a, b];
}

function sumQ(a, b) {
  const ans = a + b;
  return {
    prompt: `${fmt(a)} + ${fmt(b)} = ?`,
    ...numChoices(ans, [addNoCarry(a, b), ans + 10, ans - 10, ans + 1, ans - 1, ans + 100, ans - 100]),
    hint: `Add the ones first, then the tens${a >= 100 ? ', then the hundreds' : ''}. Remember to carry!`,
    explain: `${fmt(a)} + ${fmt(b)} = ${fmt(ans)}`,
  };
}
function diffQ(a, b) {
  if (b > a) [a, b] = [b, a];
  const ans = a - b;
  return {
    prompt: `${fmt(a)} ${MINUS} ${fmt(b)} = ?`,
    ...numChoices(ans, [subNoBorrow(a, b), ans + 10, ans - 10, ans + 1, ans - 1, ans + 100]),
    hint: `Try counting on from ${fmt(b)} up to ${fmt(a)}, or take away in jumps.`,
    explain: `${fmt(a)} ${MINUS} ${fmt(b)} = ${fmt(ans)}`,
  };
}

export function addsub(d) {
  const add = Math.random() < 0.5;
  if (d === 1) {
    if (add) { const a = rint(1, 8) * 10 + rint(0, 5); return sumQ(a, rint(1, 9 - (a % 10))); }
    const a = rint(2, 9) * 10 + rint(4, 9); return diffQ(a, rint(1, a % 10));
  }
  if (d === 2) {
    const [a, b] = noCrossPair(2);
    return add ? sumQ(a, b) : diffQ(a + b, b);
  }
  if (d === 3) {
    // Always crossing a ten: carrying when adding, exchanging when taking away.
    const a = rint(1, 6) * 10 + rint(3, 9);
    if (add) return sumQ(a, rint(1, 2) * 10 + rint(10 - (a % 10), 9));
    const big = rint(5, 9) * 10 + rint(0, 6);
    return diffQ(big, rint(1, 3) * 10 + rint((big % 10) + 1, 9));
  }
  if (d === 4) return add ? sumQ(rint(120, 899), rint(12, 99)) : diffQ(rint(201, 999), rint(15, 99));
  if (d === 5) return add ? sumQ(rint(125, 599), rint(125, 399)) : diffQ(rint(401, 999), rint(118, 399));
  if (d === 6) return add ? sumQ(rint(1200, 6999), rint(150, 999)) : diffQ(rint(2001, 9999), rint(150, 999));
  if (d === 7) return add ? sumQ(rint(1250, 5999), rint(1250, 3999)) : diffQ(rint(4001, 9999), rint(1150, 3999));
  // d8: missing numbers and money
  if (Math.random() < 0.5) {
    const b = rint(125, 499);
    const ans = rint(210, 599);
    const total = ans + b;
    return {
      prompt: `? + ${fmt(b)} = ${fmt(total)}`,
      ...numChoices(ans, [total + b, ans + 10, ans - 10, subNoBorrow(total, b), ans + 100]),
      hint: `To find the missing number, take ${fmt(b)} away from ${fmt(total)}.`,
      explain: `${fmt(total)} ${MINUS} ${fmt(b)} = ${fmt(ans)}`,
    };
  }
  const a = rint(105, 699);
  const b = rint(105, 499);
  const ans = a + b;
  return {
    prompt: `${money(a)} + ${money(b)} = ?`,
    ...numChoices(ans, [ans + 10, ans - 10, ans + 100, ans - 100, addNoCarry(a, b)], money),
    hint: 'Add the pounds, then the pence. 100p makes another pound.',
    explain: `${money(a)} + ${money(b)} = ${money(ans)}`,
  };
}

// ---------- word problems ----------

const PROBLEMS = {
  1: [
    () => { const n = pick(NAMES), a = rint(4, 12), b = rint(3, 8); return { t: `${n} has ${a} shiny stars. Comet gives ${n} ${b} more. How many stars does ${n} have now?`, ans: a + b, op: `${a} + ${b} = ${a + b}` }; },
    () => { const a = rint(10, 20), b = rint(3, 9); return { t: `There are ${a} rabbits in a field. ${b} hop away. How many rabbits are left?`, ans: a - b, op: `${a} ${MINUS} ${b} = ${a - b}` }; },
    () => { const a = rint(5, 11), b = rint(4, 9); return { t: `A team scores ${a} goals in the first half and ${b} goals in the second half. How many goals altogether?`, ans: a + b, op: `${a} + ${b} = ${a + b}` }; },
  ],
  2: [
    () => { const n = pick(NAMES), a = rint(31, 59), b = rint(12, 29); return { t: `${n} has ${a} football stickers and gives ${b} to a friend. How many stickers does ${n} have left?`, ans: a - b, op: `${a} ${MINUS} ${b} = ${a - b}` }; },
    () => { const a = rint(24, 58), b = rint(17, 39); return { t: `A rocket travels ${a} km before lunch and ${b} km after lunch. How far does it travel in total?`, ans: a + b, op: `${a} + ${b} = ${a + b}` }; },
    () => { const a = rint(60, 95), b = rint(18, 45); return { t: `A zoo has ${a} penguins. ${b} of them are swimming. How many are not swimming?`, ans: a - b, op: `${a} ${MINUS} ${b} = ${a - b}` }; },
  ],
  3: [
    () => { const a = rint(3, 6), b = rint(4, 10); return { t: `There are ${a} rockets. Each rocket carries ${b} astronauts. How many astronauts are there altogether?`, ans: a * b, op: `${a} ${TIMES} ${b} = ${a * b}` }; },
    () => { const g = rint(3, 6), each = rint(3, 8); return { t: `${g * each} carrots are shared equally between ${g} rabbits. How many carrots does each rabbit get?`, ans: each, op: `${g * each} ${DIVIDE} ${g} = ${each}` }; },
    () => { const b = pick([4, 5, 8, 10]), a = rint(3, 9); return { t: `Unicorn treats come in bags of ${b}. How many treats are in ${a} bags?`, ans: a * b, op: `${a} ${TIMES} ${b} = ${a * b}` }; },
  ],
  4: [
    () => { const p = rint(3, 19) * 5; return { t: `A comic costs ${p}p. How much change do you get from £1?`, ans: 100 - p, op: `100p ${MINUS} ${p}p = ${100 - p}p`, money: true }; },
    () => { const size = 6, n = rint(3, 6) * size + rint(1, 5); const ans = Math.ceil(n / size); return { t: `Eggs go in boxes of ${size}. How many boxes are needed for ${n} eggs?`, ans, op: `${n} ${DIVIDE} ${size} = ${Math.floor(n / size)} remainder ${n % size}, so you need one more box: ${ans}`, extra: [Math.floor(n / size)] }; },
    () => { const seats = pick([4, 5]), kids = rint(4, 8) * seats + rint(1, seats - 1); const ans = Math.ceil(kids / seats); return { t: `${kids} children are going to football practice. Each car takes ${seats} children. How many cars are needed?`, ans, op: `${kids} ${DIVIDE} ${seats} = ${Math.floor(kids / seats)} remainder ${kids % seats}, so ${ans} cars`, extra: [Math.floor(kids / seats)] }; },
  ],
  5: [
    () => { const a = rint(3, 6), b = rint(6, 9), c = rint(3, 9); return { t: `A zoo has ${a} enclosures with ${b} penguins in each. ${c} penguins move to a new zoo. How many penguins are left?`, ans: a * b - c, op: `${a} ${TIMES} ${b} = ${a * b}, then ${a * b} ${MINUS} ${c} = ${a * b - c}`, extra: [a * b, a * b + c] }; },
    () => { const n = pick(NAMES), a = rint(25, 45), b = rint(12, 24), c = rint(8, 19); return { t: `${n} reads ${a} pages on Monday and ${b} pages on Tuesday. The book has ${a + b + c} pages. How many pages are left to read?`, ans: c, op: `${a} + ${b} = ${a + b}, then ${a + b + c} ${MINUS} ${a + b} = ${c}`, extra: [a + b] }; },
  ],
  6: [
    () => { const n = pick(NAMES), p = rint(3, 9) * 5, q = rint(4, 12) * 5, k = rint(2, 4); const ans = k * p + q; return { t: `${n} buys ${k} pencils at ${money(p)} each and a ruler for ${money(q)}. How much does ${n} spend?`, ans, op: `${k} ${TIMES} ${money(p)} = ${money(k * p)}, plus ${money(q)} = ${money(ans)}`, money: true, extra: [p + q, k * (p + q)] }; },
    () => { const price = rint(12, 30) * 10, k = rint(2, 3); const ans = 1000 - price * k; return { t: `Football socks cost ${money(price)} a pair. How much change from £10 for ${k} pairs?`, ans, op: `${k} ${TIMES} ${money(price)} = ${money(price * k)}, then £10 ${MINUS} ${money(price * k)} = ${money(ans)}`, money: true, extra: [1000 - price] }; },
  ],
  7: [
    () => { const q = pick([[1, 4, 'a quarter'], [3, 4, 'three quarters'], [1, 3, 'a third'], [2, 3, 'two thirds'], [2, 5, 'two fifths']]), whole = q[1] * rint(4, 9); const ans = whole / q[1] * q[0]; return { t: `A team scored ${whole} goals this season. Maya scored ${q[2]} of them. How many goals did Maya score?`, ans, op: `${whole} ${DIVIDE} ${q[1]} = ${whole / q[1]}, then ${TIMES} ${q[0]} = ${ans}`, extra: [whole / q[1], whole - ans] }; },
    () => { const speed = rint(11, 25) * 5, h = rint(3, 7); return { t: `A spaceship travels ${speed} km every hour. How far does it travel in ${h} hours?`, ans: speed * h, op: `${speed} ${TIMES} ${h} = ${speed * h}` }; },
  ],
  8: [
    () => { const c = rint(3, 6), ad = rint(6, 9), nc = rint(2, 4), na = rint(1, 3); const ans = c * nc + ad * na; return { t: `Zoo tickets cost £${c} for children and £${ad} for adults. How much do ${na} adult${na > 1 ? 's' : ''} and ${nc} children pay?`, ans: ans * 100, op: `${nc} ${TIMES} £${c} = £${c * nc} and ${na} ${TIMES} £${ad} = £${ad * na}, total £${ans}`, money: true, extra: [(c + ad) * 100, (c * na + ad * nc) * 100] }; },
    () => { const per = rint(3, 6), days = 7, weeks = rint(2, 4); const ans = per * days * weeks; return { t: `Comet eats ${per} star biscuits every day. How many biscuits does Comet eat in ${weeks} weeks?`, ans, op: `${weeks} weeks = ${weeks * 7} days, and ${weeks * 7} ${TIMES} ${per} = ${ans}`, extra: [per * weeks, per * 5 * weeks] }; },
  ],
};

export function problems(d) {
  const p = pick(PROBLEMS[d])();
  const f = p.money ? money : fmt;
  const step = p.money ? (p.ans >= 1000 ? 100 : 10) : Math.max(1, Math.round(p.ans * 0.1));
  const near = p.money ? [p.ans + step * 2, p.ans - step * 2] : [p.ans + 1, p.ans - 1];
  return {
    prompt: p.t,
    ...numChoices(p.ans, [...(p.extra || []), p.ans + step, p.ans - step, ...near], f),
    hint: 'Read it again slowly. What do you know, and what are you trying to find?',
    explain: p.op,
  };
}

// ---------- place value ----------

const ROMAN = [[100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
function roman(n) {
  let s = '';
  for (const [v, r] of ROMAN) while (n >= v) { s += r; n -= v; }
  return s;
}

function digitValue(n) {
  const s = String(n);
  const i = rint(0, s.length - 1);
  const digit = Number(s[i]);
  if (digit === 0) return digitValue(n + 1);
  const place = 10 ** (s.length - 1 - i);
  const ans = digit * place;
  // Only highlight the one digit we mean, even when it repeats.
  const shown = s
    .split('')
    .map((c, j) => (j > 0 && (s.length - j) % 3 === 0 ? ',' : '') + (j === i ? `<b class="hl">${c}</b>` : c))
    .join('');
  return {
    prompt: `What is the value of the highlighted digit in ${shown}?`,
    ...numChoices(ans, [digit, digit * place * 10, place >= 10 ? digit * place / 10 : digit * 100, n]),
    hint: 'Say the number out loud. Which column is the digit in: ones, tens, hundreds or thousands?',
    explain: `The ${digit} is in the ${['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands'][s.length - 1 - i]} column, so it is worth ${fmt(ans)}`,
  };
}

function roundQ(n, to) {
  const ans = Math.round(n / to) * to;
  const down = Math.floor(n / to) * to;
  return {
    prompt: `Round ${fmt(n)} to the nearest ${fmt(to)}.`,
    ...numChoices(ans, [down === ans ? down + to : down, ans + to, ans - to, n]),
    hint: `Which two multiples of ${fmt(to)} is ${fmt(n)} between? Which is it closer to?`,
    explain: `${fmt(n)} is closer to ${fmt(ans)}`,
  };
}

export function place(d) {
  if (d === 1) {
    if (Math.random() < 0.5) {
      const t = rint(1, 9), o = rint(0, 9);
      return {
        prompt: `What number is ${t} tens and ${o} ones?`,
        ...numChoices(t * 10 + o, [o * 10 + t, t + o, t * 100 + o, t * 10 + o + 10]),
        hint: 'Tens go in the first column, ones in the second.',
        explain: `${t} tens is ${t * 10}, plus ${o} ones makes ${t * 10 + o}`,
      };
    }
    return digitValue(rint(21, 99));
  }
  if (d === 2) {
    const r = Math.random();
    if (r < 0.4) return digitValue(rint(102, 999));
    if (r < 0.7) {
      const n = rint(10, 98) * 10 + rint(0, 9);
      const more = Math.random() < 0.5;
      const ans = more ? n + 10 : n - 10;
      return {
        prompt: `What is 10 ${more ? 'more' : 'less'} than ${n}?`,
        ...numChoices(ans, [more ? n + 1 : n - 1, more ? n + 100 : n - 100, more ? n - 10 : n + 10]),
        hint: 'Only the tens digit changes (unless it goes past 9 or below 0).',
        explain: `${n} ${more ? '+' : MINUS} 10 = ${ans}`,
      };
    }
    const nums = new Set();
    while (nums.size < 4) nums.add(rint(305, 989));
    const list = [...nums];
    const ans = Math.max(...list);
    return {
      prompt: 'Which number is the biggest?',
      ...choices(fmt(ans), list.filter((x) => x !== ans).map(fmt)),
      hint: 'Compare the hundreds first. If they match, compare the tens.',
      explain: `${fmt(ans)} is the biggest`,
    };
  }
  if (d === 3) return Math.random() < 0.6 ? roundQ(rint(12, 98) + (Math.random() < 0.3 ? rint(1, 8) * 100 : 0), 10) : digitValue(rint(1002, 9999));
  if (d === 4) {
    if (Math.random() < 0.5) return roundQ(rint(1010, 9890), 100);
    const n = rint(1100, 8900);
    const more = Math.random() < 0.5;
    const ans = more ? n + 1000 : n - 1000;
    return {
      prompt: `What is 1,000 ${more ? 'more' : 'less'} than ${fmt(n)}?`,
      ...numChoices(ans, [more ? n + 100 : n - 100, more ? n + 10 : n - 10, more ? n - 1000 : n + 1000]),
      hint: 'Only the thousands digit changes.',
      explain: `${fmt(n)} ${more ? '+' : MINUS} 1,000 = ${fmt(ans)}`,
    };
  }
  if (d === 5) {
    const n = rint(4, 99);
    if (Math.random() < 0.5) {
      return {
        prompt: `What number is <b>${roman(n)}</b> in Roman numerals?`,
        ...numChoices(n, [n + 1, n - 1, n + 10, n - 10, n + 5]),
        hint: 'I = 1, V = 5, X = 10, L = 50, C = 100. A smaller one before a bigger one means take away.',
        explain: `${roman(n)} = ${n}`,
      };
    }
    const wrong = [roman(n + 1), roman(Math.max(1, n - 1)), roman(n + 10), roman(Math.max(1, n - 10))];
    return {
      prompt: `How do you write ${n} in Roman numerals?`,
      ...choices(roman(n), wrong),
      hint: 'I = 1, V = 5, X = 10, L = 50, C = 100.',
      explain: `${n} = ${roman(n)}`,
    };
  }
  if (d === 6) {
    if (Math.random() < 0.5) return roundQ(rint(10100, 98900), 1000);
    const start = rint(1, 6), drop = start + rint(1, 6);
    const ans = start - drop;
    return {
      prompt: `The temperature is ${start}°C. It falls by ${drop} degrees. What is the temperature now?`,
      ...numChoices(ans, [drop - start, ans - 1, ans + 1, start + drop], (x) => `${fmt(x)}°C`, { allowNeg: true }),
      hint: `Count down ${drop} from ${start}. Past 0 the numbers go negative.`,
      explain: `${start} ${MINUS} ${drop} = ${fmt(ans)}, so it is ${fmt(ans)}°C`,
    };
  }
  if (d === 7) return Math.random() < 0.5 ? digitValue(rint(100001, 989999)) : roundQ(rint(110000, 989000), 10000);
  // d8: decimals
  const r = Math.random();
  if (r < 0.4) {
    const n = (rint(1, 9) + rint(11, 99) / 100);
    const s = n.toFixed(2);
    const which = pick(['tenths', 'hundredths']);
    const digit = which === 'tenths' ? s[2] : s[3];
    if (digit === '0') return place(8);
    return {
      prompt: `In ${s}, what is the ${digit} worth?`,
      ...choices(`${digit} ${which}`, [`${digit} ones`, `${digit} ${which === 'tenths' ? 'hundredths' : 'tenths'}`, `${digit} tens`]),
      hint: 'After the decimal point: first tenths, then hundredths.',
      explain: `The ${digit} is in the ${which} column`,
    };
  }
  if (r < 0.7) {
    const a = rint(2, 9) / 10;
    const b = Number((a - 0.1 + rint(1, 9) / 100).toFixed(2));
    const nums = shuffle([a, b, Number((b - 0.05).toFixed(2)), Number((a / 10).toFixed(2))]).filter((x) => x > 0);
    const ans = Math.max(...nums);
    return {
      prompt: 'Which number is the biggest?',
      ...choices(String(ans), nums.filter((x) => x !== ans).map(String)),
      hint: 'Compare the tenths first. 0.7 is the same as 0.70.',
      explain: `${ans} is the biggest`,
    };
  }
  const n = Number((rint(1, 19) + rint(1, 99) / 100).toFixed(2));
  const ans = Math.round(n);
  return {
    prompt: `Round ${n} to the nearest whole number.`,
    ...numChoices(ans, [Math.floor(n) === ans ? ans + 1 : ans - 1, ans + 10, Math.round(n * 10)]),
    hint: 'Look at the tenths digit. 5 or more rounds up.',
    explain: `${n} rounds to ${ans}`,
  };
}

// ---------- sequences ----------

function seqQ(terms, missingAt, ans, rule) {
  const shown = terms.map((t, i) => (i === missingAt ? '?' : fmt(t))).join(', ');
  const step = terms[1] - terms[0];
  return {
    prompt: `What is the missing number?<div class="seq">${shown}</div>`,
    ...numChoices(ans, [ans + 1, ans - 1, ans + step, ans - step, ans + 10], fmt, { allowNeg: ans < 0 || terms.some((t) => t < 0) }),
    hint: 'What is the gap between each number? Is it the same every time?',
    explain: rule,
  };
}

function stepSeq(steps, len = 5, allowDown = false) {
  const step = pick(steps) * (allowDown && Math.random() < 0.4 ? -1 : 1);
  let start = rint(0, 12) * Math.abs(step);
  if (step < 0) start = Math.abs(step) * (len + rint(1, 8));
  const terms = Array.from({ length: len }, (_, i) => start + step * i);
  const at = Math.random() < 0.6 ? len - 1 : rint(1, len - 2);
  return seqQ(terms, at, terms[at], `It goes ${step > 0 ? 'up' : 'down'} in ${fmt(Math.abs(step))}s, so the missing number is ${fmt(terms[at])}`);
}

export function sequences(d) {
  if (d === 1) return stepSeq([2, 5, 10]);
  if (d === 2) return stepSeq([3, 4, 50, 100]);
  if (d === 3) return stepSeq([4, 8, 25, 50], 5, true);
  if (d === 4) return stepSeq([6, 7, 9, 1000], 5, true);
  if (d === 5) {
    const step = pick([2, 3, 4, 5]);
    const start = step * rint(2, 3);
    const terms = Array.from({ length: 6 }, (_, i) => start - step * i);
    return seqQ(terms, 5, terms[5], `It goes down in ${step}s, past zero: ${fmt(terms[5])}`);
  }
  if (d === 6) {
    const start = rint(1, 5);
    const terms = [start];
    for (let i = 1; i < 6; i++) terms.push(terms[i - 1] + i);
    return seqQ(terms, 5, terms[5], 'The gap grows by one each time: +1, +2, +3, +4, +5');
  }
  if (d === 7) {
    if (Math.random() < 0.5) {
      const s = rint(1, 4);
      const terms = Array.from({ length: 5 }, (_, i) => (s + i) ** 2);
      return seqQ(terms, 4, terms[4], `These are square numbers: ${s + 4} ${TIMES} ${s + 4} = ${terms[4]}`);
    }
    const s = rint(2, 6);
    const terms = Array.from({ length: 5 }, (_, i) => s * 2 ** i);
    return seqQ(terms, 4, terms[4], 'Each number is double the one before');
  }
  if (Math.random() < 0.5) {
    const terms = [1, 1, 2, 3, 5, 8, 13];
    return seqQ(terms, 6, 13, 'Add the two numbers before: 5 + 8 = 13');
  }
  const terms = [1, 3, 6, 10, 15, 21];
  return seqQ(terms, 5, 21, 'Triangle numbers: the gap grows by one each time');
}

// ---------- fractions ----------

export function fractions(d) {
  if (d === 1) {
    const q = Math.random() < 0.5 ? 2 : 4;
    const n = q * rint(2, 10);
    const ans = n / q;
    return {
      prompt: `What is ${q === 2 ? 'half' : 'a quarter'} of ${n}?`,
      ...numChoices(ans, [n / (q === 2 ? 4 : 2), ans + 1, ans - 1, n - ans, n * 2]),
      hint: q === 2 ? `Share ${n} into 2 equal groups.` : `Halve ${n}, then halve it again.`,
      explain: `${n} ${DIVIDE} ${q} = ${ans}`,
    };
  }
  if (d === 2) {
    const q = pick([3, 5, 10]);
    const n = q * rint(2, 9);
    const ans = n / q;
    return {
      prompt: `What is ${frac(1, q)} of ${n}?`,
      ...numChoices(ans, [n - ans, ans + 1, ans - 1, n / 2 === Math.floor(n / 2) ? n / 2 : ans + 2]),
      hint: `Share ${n} into ${q} equal groups. How many in one group?`,
      explain: `${n} ${DIVIDE} ${q} = ${ans}`,
    };
  }
  if (d === 3) {
    const [a, b] = pick([[3, 4], [2, 3], [2, 5], [3, 5], [3, 10], [7, 10]]);
    const n = b * rint(2, 9);
    const ans = (n / b) * a;
    return {
      prompt: `What is ${frac(a, b)} of ${n}?`,
      ...numChoices(ans, [n / b, n - ans, ans + n / b, ans - 1]),
      hint: `First find ${frac(1, b)} of ${n}, then multiply by ${a}.`,
      explain: `${n} ${DIVIDE} ${b} = ${n / b}, and ${n / b} ${TIMES} ${a} = ${ans}`,
    };
  }
  if (d === 4) {
    const [a, b] = pick([[1, 2], [1, 3], [1, 4], [2, 3], [3, 4], [2, 5]]);
    const k = rint(2, 4);
    const right = frac(a * k, b * k);
    const wrong = [frac(a + k, b + k), frac(a * k, b), frac(a, b * k), frac(a * k + 1, b * k)];
    return {
      prompt: `Which fraction is the same as ${frac(a, b)}?`,
      ...choices(right, wrong),
      hint: 'Multiply the top and the bottom by the same number.',
      explain: `${frac(a, b)} = ${right} (top and bottom ${TIMES} ${k})`,
    };
  }
  if (d === 5) {
    const b = pick([5, 7, 8, 9, 10, 12]);
    const x = rint(1, b - 3), y = rint(1, b - x - 1);
    const add = Math.random() < 0.6;
    const top = add ? x + y : Math.max(x, y) - Math.min(x, y);
    if (!add && top === 0) return fractions(5);
    const q = add ? `${frac(x, b)} + ${frac(y, b)}` : `${frac(Math.max(x, y), b)} ${MINUS} ${frac(Math.min(x, y), b)}`;
    return {
      prompt: `${q} = ?`,
      ...choices(frac(top, b), [frac(top, b * 2), frac(top + 1, b), frac(Math.max(1, top - 1), b), frac(add ? x * y : top, b * (add ? 1 : 2))]),
      hint: 'When the bottom numbers match, only add or take away the top numbers.',
      explain: `${q} = ${frac(top, b)}`,
    };
  }
  if (d === 6) {
    if (Math.random() < 0.5) {
      const b = pick([5, 7, 8, 9, 10]);
      const tops = shuffle([...Array(b - 1).keys()].map((i) => i + 1)).slice(0, 4);
      const ans = Math.max(...tops);
      return {
        prompt: 'Which fraction is the biggest?',
        ...choices(frac(ans, b), tops.filter((t) => t !== ans).map((t) => frac(t, b))),
        hint: 'The bottoms are the same, so look at the tops.',
        explain: `${frac(ans, b)} has the most parts`,
      };
    }
    const bottoms = sample4([2, 3, 4, 5, 6, 8, 10]);
    const ans = Math.min(...bottoms);
    return {
      prompt: 'Which fraction is the biggest?',
      ...choices(frac(1, ans), bottoms.filter((b) => b !== ans).map((b) => frac(1, b))),
      hint: 'Sharing a pizza between fewer people gives everyone a bigger slice.',
      explain: `${frac(1, ans)} is biggest: the fewer the parts, the bigger each part`,
    };
  }
  if (d === 7) {
    const pairs = [[1, 2, '0.5'], [1, 4, '0.25'], [3, 4, '0.75'], [1, 10, '0.1'], [3, 10, '0.3'], [7, 10, '0.7'], [1, 5, '0.2'], [2, 5, '0.4'], [9, 100, '0.09'], [23, 100, '0.23']];
    const [a, b, dec] = pick(pairs);
    const wrong = [`${a}.${b}`, `0.${a}${b}`, pairs.filter((p) => p[2] !== dec).map((p) => p[2])[rint(0, 3)], dec === '0.5' ? '0.2' : '0.5'];
    return {
      prompt: `What is ${frac(a, b)} as a decimal?`,
      ...choices(dec, wrong),
      hint: 'Think of it as a fraction of 100 or of 10.',
      explain: `${frac(a, b)} = ${dec}`,
    };
  }
  const [pc, n] = pick([[10, rint(3, 20) * 10], [50, rint(4, 30) * 2], [25, rint(2, 20) * 4], [20, rint(2, 20) * 5], [75, rint(2, 12) * 4]]);
  const ans = (n * pc) / 100;
  return {
    prompt: `What is ${pc}% of ${n}?`,
    ...numChoices(ans, [n / 10, n / 2, n / 4, n - ans, ans + pc].filter((x) => Number.isInteger(x))),
    hint: '50% is half, 25% is a quarter, 10% is a tenth.',
    explain: `${pc}% of ${n} = ${ans}`,
  };
}

function sample4(list) {
  return shuffle(list).slice(0, 4);
}

// ---------- measures: time, money, length, mass ----------

function clock(h, m) {
  return `${h}:${String(m).padStart(2, '0')}`;
}

export function measures(d) {
  if (d === 1) {
    const facts = [
      ['How many minutes are in an hour?', 60, [100, 30, 24, 50]],
      ['How many days are in a week?', 7, [5, 10, 12, 6]],
      ['How many months are in a year?', 12, [10, 52, 7, 24]],
      ['How many hours are in a day?', 24, [12, 60, 7, 100]],
      ['How many seconds are in a minute?', 60, [100, 10, 30, 24]],
      ['How many centimetres are in a metre?', 100, [10, 1000, 60, 50]],
    ];
    const [q, ans, wrong] = pick(facts);
    return { prompt: q, ...numChoices(ans, wrong), hint: 'Think about a clock, a calendar or a metre stick.', explain: `The answer is ${ans}` };
  }
  if (d === 2) {
    if (Math.random() < 0.5) {
      const coins = sample4([1, 2, 5, 10, 20, 50]).slice(0, 3);
      const ans = coins.reduce((s, c) => s + c, 0);
      return {
        prompt: `What do these coins make? ${coins.map((c) => `<span class="coin">${c}p</span>`).join(' ')}`,
        ...numChoices(ans, [ans + 10, ans - 5, ans + 5, ans - 10, ans + 1], money),
        hint: 'Start with the biggest coin and count on.',
        explain: `${coins.join('p + ')}p = ${ans}p`,
      };
    }
    const p = rint(1, 19) * 5;
    return {
      prompt: `An apple costs ${p}p. How much change from £1?`,
      ...numChoices(100 - p, [100 - p + 10, 100 - p - 10, p, 100 - p + 5], money),
      hint: `Count on from ${p}p to 100p.`,
      explain: `100p ${MINUS} ${p}p = ${100 - p}p`,
    };
  }
  if (d === 3) {
    const r = Math.random();
    if (r < 0.4) {
      const m = rint(2, 9);
      return { prompt: `How many centimetres are in ${m} metres?`, ...numChoices(m * 100, [m * 10, m * 1000, m + 100, m * 100 + 10]), hint: '1 metre = 100 centimetres.', explain: `${m} ${TIMES} 100 = ${m * 100} cm` };
    }
    if (r < 0.7) {
      const cm = rint(2, 9);
      return { prompt: `How many millimetres are in ${cm} cm?`, ...numChoices(cm * 10, [cm * 100, cm + 10, cm * 10 + 1, cm]), hint: '1 centimetre = 10 millimetres.', explain: `${cm} ${TIMES} 10 = ${cm * 10} mm` };
    }
    const h = rint(1, 9), m = pick([15, 20, 30, 45]);
    const ans = 60 * h + m;
    return { prompt: `How many minutes is ${h} hour${h > 1 ? 's' : ''} and ${m} minutes?`, ...numChoices(ans, [100 * h + m, h * 10 + m, ans + 10, ans - 15]), hint: '1 hour = 60 minutes.', explain: `${h} ${TIMES} 60 = ${60 * h}, plus ${m} = ${ans} minutes` };
  }
  if (d === 4) {
    const h = rint(1, 10), m = pick([0, 10, 15, 20, 30, 40, 45]);
    const dur = pick([15, 20, 25, 30, 35, 40, 45, 50]);
    const end = h * 60 + m + dur;
    const eh = Math.floor(end / 60), em = end % 60;
    const wrong = [clock(h, (m + dur) % 100), clock(eh, (em + 10) % 60), clock(eh + 1, em), clock(h, Math.min(59, m + dur % 60))];
    return {
      prompt: `A film starts at ${clock(h, m)} and lasts ${dur} minutes. What time does it finish?`,
      ...choices(clock(eh > 12 ? eh - 12 : eh, em), wrong.map((w) => w)),
      hint: `Count on to the next hour first, then add the minutes left.`,
      explain: `${clock(h, m)} + ${dur} minutes = ${clock(eh > 12 ? eh - 12 : eh, em)}`,
    };
  }
  if (d === 5) {
    const r = Math.random();
    if (r < 0.5) {
      const kg = rint(2, 9);
      const half = Math.random() < 0.4;
      const ans = kg * 1000 + (half ? 500 : 0);
      const label = half ? `${kg}½ kg` : `${kg} kg`;
      return { prompt: `How many grams are in ${label}?`, ...numChoices(ans, [kg * 100 + (half ? 50 : 0), kg * 1000 + (half ? 5 : 0), kg * 10000, ans + 100]), hint: '1 kilogram = 1,000 grams.', explain: `${label} = ${fmt(ans)} g` };
    }
    const l = pick([[1, 2, 500], [1, 4, 250], [3, 4, 750]]);
    return { prompt: `How many millilitres are in ${frac(l[0], l[1])} of a litre?`, ...numChoices(l[2], [l[2] / 10, l[2] * 10, 1000 - l[2], 100]), hint: '1 litre = 1,000 millilitres.', explain: `${frac(l[0], l[1])} of 1,000 ml = ${l[2]} ml` };
  }
  if (d === 6) {
    const h = rint(1, 11), m = pick([5, 15, 20, 30, 45, 50]);
    const pm = Math.random() < 0.6;
    const ans = `${String(pm ? h + 12 : h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    const wrong = [`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`, `${String(pm ? h + 10 : h + 12).padStart(2, '0')}:${String(m).padStart(2, '0')}`, `${String(pm ? h + 12 : h).padStart(2, '0')}:${String((m + 10) % 60).padStart(2, '0')}`, `${String(pm ? h + 2 : h + 1).padStart(2, '0')}:${String(m).padStart(2, '0')}`];
    return {
      prompt: `What is ${clock(h, m)} ${pm ? 'pm' : 'am'} on a 24-hour clock?`,
      ...choices(ans, wrong),
      hint: pm ? 'For pm times, add 12 to the hour.' : 'Morning times stay the same, with a 0 in front if needed.',
      explain: `${clock(h, m)} ${pm ? 'pm' : 'am'} = ${ans}`,
    };
  }
  if (d === 7) {
    const a = rint(12, 45) * 10, b = rint(8, 30) * 10, c = rint(5, 25) * 10;
    const total = a + b + c;
    const paid = total < 1000 ? 1000 : 2000;
    const ans = paid - total;
    return {
      prompt: `Leo buys a football for ${money(a)}, shin pads for ${money(b)} and a drink for ${money(c)}. He pays with a £${paid / 100} note. How much change does he get?`,
      ...numChoices(ans, [total, ans + 100, ans - 100, ans + 10, paid - a - b], money),
      hint: 'Add up the prices first, then take the total away from the note.',
      explain: `Total ${money(total)}, and £${paid / 100} ${MINUS} ${money(total)} = ${money(ans)}`,
    };
  }
  const opts = [
    () => { const km = rint(1, 9) + 0.5; return { q: `How many metres are in ${km} km?`, ans: km * 1000, w: [km * 100, km * 10, km * 1000 + 500], h: '1 km = 1,000 m.', e: `${km} ${TIMES} 1,000 = ${fmt(km * 1000)} m` }; },
    () => { const h = rint(1, 4); return { q: `How many minutes are in ${h}½ hours?`, ans: h * 60 + 30, w: [h * 100 + 50, h * 60 + 50, h * 60], h: '1 hour = 60 minutes, and half an hour = 30 minutes.', e: `${h} ${TIMES} 60 + 30 = ${h * 60 + 30}` }; },
    () => { const w = rint(2, 5), dd = rint(1, 6); return { q: `How many days are in ${w} weeks and ${dd} days?`, ans: w * 7 + dd, w: [w * 10 + dd, w * 5 + dd, w + dd], h: '1 week = 7 days.', e: `${w} ${TIMES} 7 + ${dd} = ${w * 7 + dd}` }; },
  ];
  const o = pick(opts)();
  return { prompt: o.q, ...numChoices(o.ans, o.w), hint: o.h, explain: o.e };
}

// ---------- shape ----------

export function shape(d) {
  if (d === 1) {
    const shapes = [['triangle', 3], ['square', 4], ['pentagon', 5], ['hexagon', 6], ['octagon', 8]];
    const [name, n] = pick(shapes);
    if (Math.random() < 0.5) {
      return { prompt: `How many sides does ${an(name)} have?`, ...numChoices(n, [n + 1, n - 1, n + 2, 4]), hint: 'Picture the shape and count its straight sides.', explain: `${an(name).replace(/^a/, 'A')} has ${n} sides` };
    }
    return { prompt: `Which shape has ${n} sides?`, ...choices(name, shapes.filter((s) => s[1] !== n).map((s) => s[0])), hint: 'Tri means 3, pent means 5, hex means 6, oct means 8.', explain: `${an(name).replace(/^a/, 'A')} has ${n} sides` };
  }
  if (d === 2) {
    const s = rint(2, 12);
    return { prompt: `A square has sides of ${s} cm. What is its perimeter?`, ...numChoices(4 * s, [s * s, 2 * s, s + 4, 4 * s + 4], (x) => `${x} cm`), hint: 'Perimeter is the distance all the way round. A square has 4 equal sides.', explain: `${s} + ${s} + ${s} + ${s} = ${4 * s} cm` };
  }
  if (d === 3) {
    const l = rint(4, 15), w = rint(2, l - 1);
    return { prompt: `A rectangle is ${l} cm long and ${w} cm wide. What is its perimeter?`, ...numChoices(2 * (l + w), [l + w, l * w, 2 * l + w, 2 * (l + w) + 2], (x) => `${x} cm`), hint: 'Add all four sides: long + wide + long + wide.', explain: `${l} + ${w} + ${l} + ${w} = ${2 * (l + w)} cm` };
  }
  if (d === 4) {
    const l = rint(3, 12), w = rint(2, 9);
    return { prompt: `A rectangle is ${l} cm long and ${w} cm wide. What is its area?`, ...numChoices(l * w, [2 * (l + w), l + w, l * w + l, l * w - w], (x) => `${x} cm²`), hint: 'Area is the space inside. Multiply the length by the width.', explain: `${l} ${TIMES} ${w} = ${l * w} cm²` };
  }
  if (d === 5) {
    if (Math.random() < 0.6) {
      const a = pick([rint(10, 80), 90, rint(95, 170)]);
      const ans = a < 90 ? 'acute' : a === 90 ? 'a right angle' : 'obtuse';
      return { prompt: `An angle of ${a}° is…`, ...choices(ans, ['acute', 'a right angle', 'obtuse', 'a straight line'].filter((x) => x !== ans)), hint: 'Acute is less than 90°. Obtuse is between 90° and 180°.', explain: `${a}° is ${ans}` };
    }
    const turns = pick([['a half turn', 2], ['a whole turn', 4], ['a three-quarter turn', 3], ['a quarter turn', 1]]);
    return { prompt: `How many right angles are in ${turns[0]}?`, ...numChoices(turns[1], [turns[1] + 1, turns[1] * 2, 90]), hint: 'A quarter turn is one right angle.', explain: `${turns[0]} is ${turns[1]} right angle${turns[1] > 1 ? 's' : ''}` };
  }
  if (d === 6) {
    const a = rint(25, 155);
    return { prompt: `Two angles sit on a straight line. One is ${a}°. What is the other?`, ...numChoices(180 - a, [360 - a, 90 - a > 0 ? 90 - a : 200 - a, 180 - a + 10, a], (x) => `${x}°`), hint: 'Angles on a straight line add up to 180°.', explain: `180 ${MINUS} ${a} = ${180 - a}°` };
  }
  if (d === 7) {
    if (Math.random() < 0.5) {
      const a = rint(30, 80), b = rint(30, 180 - a - 20);
      const c = 180 - a - b;
      return { prompt: `Two angles in a triangle are ${a}° and ${b}°. What is the third angle?`, ...numChoices(c, [360 - a - b, 90 - a > 0 ? 90 - a : c + 20, c + 10, c - 10], (x) => `${x}°`), hint: 'The angles in a triangle add up to 180°.', explain: `180 ${MINUS} ${a} ${MINUS} ${b} = ${c}°` };
    }
    const s = pick([['square', 4], ['rectangle', 2], ['equilateral triangle', 3], ['regular hexagon', 6], ['circle', 'lots']]);
    if (s[1] === 'lots') return shape(7);
    return { prompt: `How many lines of symmetry does ${an(s[0])} have?`, ...numChoices(s[1], [s[1] + 1, s[1] * 2, s[1] === 2 ? 4 : 2, 1]), hint: 'A line of symmetry folds the shape into two matching halves.', explain: `${an(s[0]).replace(/^a/, 'A')} has ${s[1]} lines of symmetry` };
  }
  const r = Math.random();
  if (r < 0.4) {
    const l = rint(6, 14), w = rint(2, l - 1);
    const p = 2 * (l + w);
    return { prompt: `A rectangle has a perimeter of ${p} cm. Its length is ${l} cm. What is its width?`, ...numChoices(w, [p - l, p / 2, w + 2, p - 2 * l], (x) => `${x} cm`), hint: `Two lengths make ${2 * l} cm. What is left for the two widths?`, explain: `${p} ${MINUS} ${2 * l} = ${2 * w}, and ${2 * w} ${DIVIDE} 2 = ${w} cm` };
  }
  const facts = [['faces', 6, [8, 12, 4]], ['edges', 12, [6, 8, 10]], ['vertices (corners)', 8, [6, 12, 4]]];
  const [what, n, wrong] = pick(facts);
  return { prompt: `How many ${what} does a cube have?`, ...numChoices(n, wrong), hint: 'Picture a dice.', explain: `A cube has ${n} ${what}` };
}
