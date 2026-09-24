// Saving and loading progress. Everything lives on this phone only, in
// localStorage. Nothing is sent anywhere.

const KEY = 'starCaptain.v1';

export function defaultSettings() {
  return {
    missionLength: 10,
    startYear: 3,
    sleepTime: '', // '' = off, or 'HH:MM'
    extraMissions: false,
    sound: true,
    pin: null,
  };
}

export function freshProgress() {
  return {
    version: 1,
    name: '',
    createdAt: new Date().toISOString(),
    stars: 0,
    levelSeen: 1,
    skills: {},
    seenPassages: {},
    wordBank: [],
    badges: {},
    wearing: null,
    days: {},
    totals: { missions: 0, questions: 0, firstTry: 0, secondTry: 0, perfect: 0, goals: 0, shootouts: 0, bestShootout: 0 },
    lastMissionDate: null,
    mission: null,
  };
}

export function defaultState() {
  return { ...freshProgress(), settings: defaultSettings(), flags: [] };
}

// Fill in anything missing (for example after an update adds a new setting).
function merge(base, saved) {
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return saved === undefined ? base : saved;
  const out = { ...base };
  for (const k of Object.keys(saved)) {
    const b = base[k];
    out[k] = b && typeof b === 'object' && !Array.isArray(b) ? merge(b, saved[k]) : saved[k];
  }
  return out;
}

export function load(storage = safeStorage()) {
  try {
    const raw = storage && storage.getItem(KEY);
    if (!raw) return defaultState();
    return merge(defaultState(), JSON.parse(raw));
  } catch {
    return defaultState();
  }
}

export function save(state, storage = safeStorage()) {
  try {
    if (storage) storage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

// Start again from the beginning: keeps the grown-ups' settings, PIN and
// flagged questions, clears everything else (name, stars, levels, stickers,
// word bank, stats).
export function resetProgress(state) {
  return { ...freshProgress(), settings: state.settings, flags: state.flags };
}

export function exportCode(state) {
  const json = JSON.stringify(state);
  return btoa(unescape(encodeURIComponent(json)));
}

export function importCode(code) {
  const json = decodeURIComponent(escape(atob(code.trim())));
  const parsed = JSON.parse(json);
  if (!parsed || typeof parsed !== 'object' || !('stars' in parsed) || !('skills' in parsed)) {
    throw new Error('That does not look like a 11 Plus Hero backup code.');
  }
  return merge(defaultState(), parsed);
}

function safeStorage() {
  try {
    return typeof localStorage !== 'undefined' ? localStorage : null;
  } catch {
    return null;
  }
}
