// Drawings: Comet the space unicorn (with moods and outfits), planet and
// sticker icons, and small interface icons. All inline SVG.

const NAVY = '#141B3C';
const WHITE = '#F4F1FF';

// Violet, a purple butterfly who loves music. Moods: happy, sleepy,
// excited. One accessory at a time from the wardrobe.
export function mascot({ mood = 'happy', wearing = null, size = 120, label = 'Violet the butterfly' } = {}) {
  const INK = '#2A1240';
  const FACE = '#FBF4FF';
  const wing = (d, fill) => `<path d="${d}" fill="${fill}"/>`;
  const wings =
    wing('M56 58 C 30 20, 2 26, 8 52 C 12 70, 36 72, 56 64 Z', '#B98CFF') +
    wing('M64 58 C 90 20, 118 26, 112 52 C 108 70, 84 72, 64 64 Z', '#B98CFF') +
    wing('M56 66 C 34 70, 16 88, 28 102 C 40 112, 54 96, 58 74 Z', '#FF7AB8') +
    wing('M64 66 C 86 70, 104 88, 92 102 C 80 112, 66 96, 62 74 Z', '#FF7AB8') +
    '<circle cx="28" cy="46" r="7" fill="#E4D2FF"/><circle cx="92" cy="46" r="7" fill="#E4D2FF"/><circle cx="36" cy="92" r="4.5" fill="#FFD1E8"/><circle cx="84" cy="92" r="4.5" fill="#FFD1E8"/>';
  const sparkle = (x, y, r) => `<path d="M${x} ${y - r} L${x + r * 0.3} ${y - r * 0.3} L${x + r} ${y} L${x + r * 0.3} ${y + r * 0.3} L${x} ${y + r} L${x - r * 0.3} ${y + r * 0.3} L${x - r} ${y} L${x - r * 0.3} ${y - r * 0.3} Z" fill="#FFD166"/>`;
  const glitter = wearing === 'sparkle' ? sparkle(16, 30, 6) + sparkle(106, 34, 5) + sparkle(18, 100, 4) + sparkle(104, 104, 6) + sparkle(60, 112, 4) : '';
  const guitar = wearing === 'guitar'
    ? `<path d="M88 70 L110 40" stroke="#6B4A2E" stroke-width="4" stroke-linecap="round"/><ellipse cx="84" cy="80" rx="12" ry="10" fill="#FFD166" transform="rotate(-40 84 80)"/><ellipse cx="92" cy="71" rx="8" ry="7" fill="#FFD166" transform="rotate(-40 92 71)"/><circle cx="86" cy="77" r="3" fill="${INK}"/><rect x="106" y="34" width="8" height="8" rx="2" fill="#6B4A2E" transform="rotate(-40 110 38)"/>`
    : '';
  const mic = wearing === 'mic'
    ? `<path d="M30 98 L40 80" stroke="#C9C2D9" stroke-width="5" stroke-linecap="round"/><circle cx="42" cy="76" r="8" fill="#FF7AB8"/><path d="M36 72 L48 80 M38 69 L49 76" stroke="#FFD166" stroke-width="1.6"/>`
    : '';
  const body = `<rect x="52" y="52" width="16" height="50" rx="8" fill="${FACE}"/><path d="M53 70 H67 M53 80 H67 M54 90 H66" stroke="#E4D2FF" stroke-width="2"/>`;
  const antennae = `<path d="M54 26 C 50 14, 42 10, 38 12" stroke="#D9C4FF" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M66 26 C 70 14, 78 10, 82 12" stroke="#D9C4FF" stroke-width="2.5" fill="none" stroke-linecap="round"/>${sparkle(37, 12, 5)}${sparkle(83, 12, 5)}`;
  const head = `<circle cx="60" cy="40" r="17" fill="${FACE}"/>`;
  let eyes;
  if (mood === 'sleepy') eyes = `<path d="M50 40 Q54 44 58 40 M62 40 Q66 44 70 40" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  else if (mood === 'excited') eyes = `<circle cx="54" cy="39" r="4.6" fill="${INK}"/><circle cx="66" cy="39" r="4.6" fill="${INK}"/>${sparkle(55.5, 37.5, 2.2)}${sparkle(67.5, 37.5, 2.2)}`;
  else eyes = `<circle cx="54" cy="40" r="4" fill="${INK}"/><circle cx="66" cy="40" r="4" fill="${INK}"/><circle cx="55.5" cy="38.5" r="1.4" fill="#fff"/><circle cx="67.5" cy="38.5" r="1.4" fill="#fff"/>`;
  const glasses = wearing === 'glasses'
    ? `<path d="M54 45 C 46 40, 46 33, 51 33 C 53 33, 54 35, 54 35 C 54 35, 55 33, 57 33 C 62 33, 62 40, 54 45 Z" fill="#FF7AB8"/><path d="M66 45 C 58 40, 58 33, 63 33 C 65 33, 66 35, 66 35 C 66 35, 67 33, 69 33 C 74 33, 74 40, 66 45 Z" fill="#FF7AB8"/><path d="M57.5 37 H62.5" stroke="#FF7AB8" stroke-width="2"/>`
    : '';
  let mouth;
  if (mood === 'sleepy') mouth = `<ellipse cx="60" cy="49" rx="2.5" ry="2" fill="${INK}"/>`;
  else if (mood === 'excited') mouth = `<path d="M54 47 Q60 56 66 47 Z" fill="${INK}"/>`;
  else mouth = `<path d="M55 48 Q60 52 65 48" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
  const cheeks = `<circle cx="49" cy="46" r="3.2" fill="#FF7AB8" opacity="0.5"/><circle cx="71" cy="46" r="3.2" fill="#FF7AB8" opacity="0.5"/>`;
  const phones = wearing === 'headphones'
    ? `<path d="M42 42 C 42 16, 78 16, 78 42" stroke="#FF7AB8" stroke-width="5" fill="none"/><rect x="37" y="36" width="9" height="14" rx="4" fill="#FF7AB8"/><rect x="74" y="36" width="9" height="14" rx="4" fill="#FF7AB8"/>`
    : '';
  const crown = wearing === 'crown'
    ? `<path d="M47 26 L48 12 L55 20 L60 9 L65 20 L72 12 L73 26 Z" fill="#FFD166" stroke="#E0A92E" stroke-width="1.5" stroke-linejoin="round"/><circle cx="60" cy="21" r="2.2" fill="#FF7AB8"/>`
    : '';
  return `<svg class="mascot" width="${size}" height="${size}" viewBox="0 0 120 120" role="img" aria-label="${label}">${glitter}${wings}${body}${antennae}${head}${eyes}${glasses}${cheeks}${mouth}${phones}${crown}${guitar}${mic}</svg>`;
}

export function star(size = 20, color = '#FFC857') {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z" fill="${color}"/></svg>`;
}

export function moon(size = 30, style = 'full') {
  const p = 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z';
  if (style === 'full') return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="${p}" fill="#FFC857"/></svg>`;
  if (style === 'today') return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="${p}" fill="none" stroke="#FFC857" stroke-width="2"/></svg>`;
  if (style === 'rest') return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="${p}" fill="none" stroke="#B69CFF" stroke-width="1.6" stroke-dasharray="2 2"/></svg>`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="${p}" fill="#2A3468"/></svg>`;
}

export function planetIcon(icon, color, size = 40) {
  const s = `width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true"`;
  const D = '#1A1033';
  switch (icon) {
    case 'mic': return `<svg ${s}><rect x="14" y="4" width="12" height="20" rx="6" fill="${color}"/><path d="M9 18 a11 11 0 0 0 22 0" stroke="${color}" stroke-width="3" fill="none"/><path d="M20 29 V36 M13 36 H27" stroke="${color}" stroke-width="3" stroke-linecap="round"/></svg>`;
    case 'book': return `<svg ${s}><path d="M4 9 H16 a4 4 0 0 1 4 4 V34 a4 4 0 0 0 -4 -3 H4 Z" fill="${color}"/><path d="M36 9 H24 a4 4 0 0 0 -4 4 V34 a4 4 0 0 1 4 -3 H36 Z" fill="${color}" opacity="0.7"/><path d="M27 15 V24 a2.5 2.5 0 1 1 -2 -2.4 M27 15 L32 14" stroke="${D}" stroke-width="2" fill="none"/></svg>`;
    case 'abc': return `<svg ${s}><rect x="2" y="12" width="12" height="16" rx="3" fill="${color}"/><rect x="14" y="8" width="12" height="16" rx="3" fill="${color}" opacity="0.8"/><rect x="26" y="14" width="12" height="16" rx="3" fill="${color}" opacity="0.6"/><text x="8" y="25" font-family="Fredoka, sans-serif" font-size="10" font-weight="700" text-anchor="middle" fill="${D}">A</text><text x="20" y="21" font-family="Fredoka, sans-serif" font-size="10" font-weight="700" text-anchor="middle" fill="${D}">B</text><text x="32" y="27" font-family="Fredoka, sans-serif" font-size="10" font-weight="700" text-anchor="middle" fill="${D}">C</text></svg>`;
    case 'guitar': return `<svg ${s}><path d="M22 18 L35 5" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="15" cy="27" rx="10" ry="8.5" fill="${color}" transform="rotate(-45 15 27)"/><ellipse cx="22" cy="20" rx="6.5" ry="5.5" fill="${color}" transform="rotate(-45 22 20)"/><circle cx="16" cy="26" r="2.6" fill="${D}"/></svg>`;
    case 'tent': return `<svg ${s}><path d="M4 34 L20 6 L36 34 Z" fill="${color}"/><path d="M20 6 L14 34 M20 6 L26 34" stroke="${D}" stroke-width="1.5" opacity="0.5"/><path d="M16 34 L20 24 L24 34 Z" fill="${D}"/><path d="M20 6 V2 L27 4 L20 6" fill="${color}"/></svg>`;
    case 'metronome': return `<svg ${s}><path d="M12 36 L16 4 H24 L28 36 Z" fill="${color}"/><path d="M20 30 L29 9" stroke="${D}" stroke-width="2.5" stroke-linecap="round"/><circle cx="26" cy="16" r="3" fill="${D}"/></svg>`;
    case 'spotlight': return `<svg ${s}><path d="M20 4 L6 36 H34 Z" fill="${color}" opacity="0.45"/><circle cx="20" cy="6" r="4" fill="${color}"/><path d="M12 36 L18 26 L24 36 Z" fill="${color}"/><rect x="24" y="26" width="8" height="8" fill="${color}" opacity="0.8"/></svg>`;
    default: return '';
  }
}

export function badgeIcon(icon, size = 40) {
  const s = `width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"`;
  switch (icon) {
    case 'star': return `<svg ${s}><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z" fill="${NAVY}"/></svg>`;
    case 'moon': return `<svg ${s}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="${NAVY}"/></svg>`;
    case 'sparkle': return `<svg ${s}><path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="${NAVY}"/></svg>`;
    case 'rocket': return `<svg ${s} fill="none" stroke="${NAVY}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c2-6 6-12 14-14-1 8-7 12-13 14z"/><path d="M9 15l-3 3"/><circle cx="14" cy="10" r="1.5"/></svg>`;
    case 'heart': return `<svg ${s}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" fill="${NAVY}"/></svg>`;
    case 'book': return `<svg ${s} fill="none" stroke="${NAVY}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h6a3 3 0 0 1 2 1 3 3 0 0 1 2-1h6v14h-6a2 2 0 0 0-2 1 2 2 0 0 0-2-1H4z"/><path d="M12 6v14"/></svg>`;
    case 'ball': return `<svg ${s}><circle cx="12" cy="12" r="9" fill="none" stroke="${NAVY}" stroke-width="1.8"/><path d="M12 7.5l4 3-1.5 4.5h-5L8 10.5z" fill="${NAVY}"/></svg>`;
    case 'times': return `<svg ${s}><path d="M6 6l12 12M18 6L6 18" stroke="${NAVY}" stroke-width="3.2" stroke-linecap="round"/></svg>`;
    case 'paw': return `<svg ${s} fill="${NAVY}"><ellipse cx="7" cy="9" rx="2" ry="2.6"/><ellipse cx="12" cy="6.5" rx="2" ry="2.6"/><ellipse cx="17" cy="9" rx="2" ry="2.6"/><path d="M12 12c3 0 5.5 3 5.5 5.2 0 1.8-1.6 2.3-3 1.8-1-.4-1.6-.6-2.5-.6s-1.5.2-2.5.6c-1.4.5-3-.1-3-1.8C6.5 15 9 12 12 12z"/></svg>`;
    case 'planet': return `<svg ${s}><circle cx="12" cy="12" r="6" fill="${NAVY}"/><ellipse cx="12" cy="12" rx="10" ry="3.5" fill="none" stroke="${NAVY}" stroke-width="1.6" transform="rotate(-18 12 12)"/></svg>`;
    default: return '';
  }
}

export function lockIcon(size = 24, color = '#7F86B8') {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`;
}

export const ICON = {
  close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  back: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
  next: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  rocket: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19c2-6 6-12 14-14-1 8-7 12-13 14z"/><path d="M9 15l-3 3"/></svg>',
  book: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M12 8l1.5 3 3 .4-2.2 2 .6 3-2.9-1.5-2.9 1.5.6-3-2.2-2 3-.4z"/></svg>',
  lock: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  bulb: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFC857" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
  soundOn: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
  soundOff: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 10l4 4M21 10l-4 4"/></svg>',
  flag: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>',
};
