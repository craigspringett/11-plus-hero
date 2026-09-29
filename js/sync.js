// Sharing progress between phones. A family code (two words and four
// digits) links the phones; each one loads the newest progress when opened
// and saves online after changes. The PIN and flagged questions stay on
// each phone and are never uploaded.

const KEY = 'familySync.v1';
const API = '/api/progress';

const WORDS_A = ['violet', 'purple', 'glitter', 'sparkle', 'velvet', 'golden', 'silver', 'starry', 'dreamy', 'happy', 'sunny', 'cosmic', 'lucky', 'bright', 'magic', 'rosy', 'shiny', 'jolly', 'misty', 'breezy', 'lilac', 'coral', 'minty', 'fizzy', 'brave', 'clever', 'swift', 'gentle', 'bouncy', 'dazzle', 'twinkly', 'cheery'];
const WORDS_B = ['guitar', 'piano', 'drum', 'melody', 'chorus', 'encore', 'tempo', 'rhythm', 'lyric', 'stage', 'disco', 'record', 'vinyl', 'violin', 'trumpet', 'banjo', 'harp', 'flute', 'rocket', 'comet', 'planet', 'unicorn', 'panda', 'otter', 'kitten', 'puppy', 'dolphin', 'penguin', 'rabbit', 'koala', 'falcon', 'tiger'];

export function makeCode() {
  const r = (n) => Math.floor(Math.random() * n);
  const digits = String(r(10000)).padStart(4, '0');
  return `${WORDS_A[r(WORDS_A.length)]}-${WORDS_B[r(WORDS_B.length)]}-${digits}`;
}

// Accept "Violet Guitar 4821", "violet-guitar-4821" and so on.
export function tidyCode(text) {
  const parts = String(text || '').toLowerCase().match(/[a-z]+|\d+/g) || [];
  return parts.join('-');
}

export function validCode(code) {
  return /^[a-z]{3,10}-[a-z]{3,10}-\d{4}$/.test(code);
}

export function syncInfo() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || null;
  } catch {
    return null;
  }
}

export function setSyncInfo(info) {
  try {
    if (info) localStorage.setItem(KEY, JSON.stringify(info));
    else localStorage.removeItem(KEY);
  } catch {
    /* storage blocked: sharing just stays off */
  }
}

// What goes online: everything except this phone's PIN and flagged questions.
export function forUpload(state) {
  const copy = JSON.parse(JSON.stringify(state));
  copy.settings = { ...copy.settings, pin: null };
  copy.flags = [];
  return copy;
}

// What comes down replaces this phone's progress, keeping its own PIN and flags.
export function applyDownload(remoteState, local) {
  return { ...remoteState, settings: { ...remoteState.settings, pin: local.settings.pin }, flags: local.flags || [] };
}

export function remoteIsNewer(remote, local) {
  return !!remote && typeof remote.updatedAt === 'number' && remote.updatedAt > (local.updatedAt || 0);
}

// GET: the saved progress, or null if nothing is saved under that code.
export async function pull(code) {
  const res = await fetch(`${API}?family=${encodeURIComponent(code)}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Could not load (${res.status})`);
  return res.json();
}

// PUT: save online. Returns { ok } or, when the online copy is newer,
// { newer: <that copy> } so the caller can switch to it.
export async function push(code, state) {
  const res = await fetch(`${API}?family=${encodeURIComponent(code)}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ updatedAt: state.updatedAt || Date.now(), state: forUpload(state) }),
    cache: 'no-store',
  });
  if (res.status === 409) return { newer: await res.json() };
  if (!res.ok) throw new Error(`Could not save (${res.status})`);
  return { ok: true };
}
