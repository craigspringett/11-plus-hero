// Little sounds made on the fly with the Web Audio API (no sound files).
// iPhones only allow sound after a tap, which is always the case here.

let ctx = null;
let enabled = true;

export function setSound(on) {
  enabled = on;
}

function audio() {
  if (!enabled) return null;
  try {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq, start, dur, type = 'sine', gain = 0.18) {
  const a = audio();
  if (!a) return;
  const t0 = a.currentTime + start;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(a.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}

export const sfx = {
  tap() { tone(660, 0, 0.08, 'triangle', 0.08); },
  right() { tone(784, 0, 0.14, 'triangle'); tone(1047, 0.1, 0.22, 'triangle'); },
  nearly() { tone(330, 0, 0.18, 'sine', 0.12); tone(294, 0.14, 0.22, 'sine', 0.1); },
  levelUp() { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.11, 0.3, 'triangle', 0.16)); tone(1568, 0.6, 0.6, 'sine', 0.12); },
  sticker() { [880, 1175, 1568].forEach((f, i) => tone(f, i * 0.08, 0.25, 'sine', 0.14)); },
  goal() { [392, 523, 659, 784].forEach((f, i) => tone(f, i * 0.07, 0.25, 'square', 0.07)); },
  saved() { tone(220, 0, 0.3, 'sawtooth', 0.06); },
  whistle() { tone(2200, 0, 0.12, 'sine', 0.08); tone(2200, 0.16, 0.3, 'sine', 0.08); },
  goodnight() { [784, 659, 523, 392].forEach((f, i) => tone(f, i * 0.18, 0.5, 'sine', 0.1)); },
};
