// Small shared helpers: random numbers, shuffling, number formatting and
// building multiple-choice options.

export function rint(lo, hi) {
  return lo + Math.floor(Math.random() * (hi - lo + 1));
}

export function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample(list, n) {
  return shuffle(list).slice(0, n);
}

export function clamp(x, lo, hi) {
  return Math.max(lo, Math.min(hi, x));
}

// 1240 -> "1,240"; negatives use a proper minus sign.
export function fmt(n) {
  const s = Math.abs(n).toLocaleString('en-GB', { maximumFractionDigits: 3 });
  return n < 0 ? '−' + s : s;
}

// Pence -> "45p" or "£1.35".
export function money(p) {
  if (p < 100) return p + 'p';
  return '£' + (p / 100).toFixed(2);
}

export const MINUS = '−';
export const TIMES = '×';
export const DIVIDE = '÷';

export function frac(n, d) {
  return `<span class="frac"><span>${n}</span><span>${d}</span></span>`;
}

export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Build options from a correct answer and candidate wrong answers. Duplicates
// and anything equal to the answer are dropped; `fill` supplies extra wrong
// answers when there are not enough. Returns { options, answer }.
export function choices(correct, wrong, count = 4, fill = null) {
  const seen = new Set([String(correct)]);
  const picked = [];
  for (const w of shuffle(wrong)) {
    const k = String(w);
    if (w === null || w === undefined || seen.has(k)) continue;
    seen.add(k);
    picked.push(w);
    if (picked.length === count - 1) break;
  }
  let guard = 0;
  while (fill && picked.length < count - 1 && guard++ < 50) {
    const w = fill();
    const k = String(w);
    if (seen.has(k)) continue;
    seen.add(k);
    picked.push(w);
  }
  const options = shuffle([correct, ...picked]);
  return { options, answer: options.indexOf(correct) };
}

// Numeric version: wrong answers must be whole numbers >= 0 (unless negatives
// are allowed) and the options are formatted with `f`.
export function numChoices(ans, wrong, f = fmt, opts = {}) {
  const allowNeg = !!opts.allowNeg;
  const ok = (w) => Number.isFinite(w) && (allowNeg || w >= 0) && w !== ans;
  const spread = Math.max(2, Math.round(Math.abs(ans) * 0.15));
  const c = choices(
    ans,
    wrong.filter(ok),
    opts.count || 4,
    () => {
      let w = ans + rint(-spread, spread);
      if (!ok(w)) w = ans + rint(1, spread + 2);
      return w;
    }
  );
  return { options: c.options.map(f), answer: c.answer };
}

export function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
