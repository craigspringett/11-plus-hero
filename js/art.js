// Drawings: Comet the space unicorn (with moods and outfits), planet and
// sticker icons, and small interface icons. All inline SVG.

const NAVY = '#141B3C';
const WHITE = '#F4F1FF';

export function comet({ mood = 'happy', wearing = null, size = 120, label = 'Comet the space unicorn' } = {}) {
  const jersey = wearing === 'football'
    ? `<path d="M22 120 C22 104 36 96 60 96 C84 96 98 104 98 120 Z" fill="#7CC7FF"/><path d="M50 97 L60 108 L70 97" fill="none" stroke="#FFC857" stroke-width="4" stroke-linejoin="round"/><text x="78" y="116" font-family="Fredoka, sans-serif" font-size="12" font-weight="700" fill="${NAVY}">7</text>`
    : '';
  const crown = wearing === 'crown'
    ? `<path d="M36 40 L38 16 L48 28 L60 12 L72 28 L82 16 L84 40 Z" fill="#FFC857" stroke="#E0A92E" stroke-width="2" stroke-linejoin="round"/><circle cx="48" cy="33" r="3" fill="#FF8C6B"/><circle cx="72" cy="33" r="3" fill="#6EE7B7"/>`
    : '';
  const mane = wearing === 'rainbow'
    ? `<path d="M24 64 C 14 44, 34 28, 50 34" stroke="#FF8C6B" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M29 66 C 21 48, 38 36, 52 40" stroke="#FFC857" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M33 70 C 27 54, 41 43, 54 46" stroke="#6EE7B7" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M19 60 C 10 40, 30 22, 48 28" stroke="#7CC7FF" stroke-width="5" fill="none" stroke-linecap="round"/>`
    : `<path d="M26 62 C 18 44, 36 30, 50 36" stroke="#B69CFF" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  let eyes;
  if (mood === 'sleepy') {
    eyes = `<path d="M41 68 Q47 73 53 68" stroke="${NAVY}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M67 68 Q73 73 79 68" stroke="${NAVY}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  } else if (mood === 'excited') {
    eyes = `<circle cx="47" cy="67" r="7.5" fill="${NAVY}"/><circle cx="73" cy="67" r="7.5" fill="${NAVY}"/><path d="M50 61.5l1 2.2 2.4.3-1.8 1.6.5 2.4-2.1-1.2-2.1 1.2.5-2.4-1.8-1.6 2.4-.3z" fill="#FFC857"/><path d="M76 61.5l1 2.2 2.4.3-1.8 1.6.5 2.4-2.1-1.2-2.1 1.2.5-2.4-1.8-1.6 2.4-.3z" fill="#FFC857"/>`;
  } else {
    eyes = `<circle cx="47" cy="68" r="6.5" fill="${NAVY}"/><circle cx="73" cy="68" r="6.5" fill="${NAVY}"/><circle cx="49.5" cy="65.5" r="2.2" fill="#fff"/><circle cx="75.5" cy="65.5" r="2.2" fill="#fff"/>`;
  }
  const glasses = wearing === 'glasses'
    ? `<rect x="36" y="60" width="22" height="15" rx="6" fill="${NAVY}"/><rect x="62" y="60" width="22" height="15" rx="6" fill="${NAVY}"/><path d="M58 66 H62" stroke="${NAVY}" stroke-width="3"/><path d="M40 63 L46 63" stroke="#7CC7FF" stroke-width="2" stroke-linecap="round"/><path d="M66 63 L72 63" stroke="#7CC7FF" stroke-width="2" stroke-linecap="round"/>`
    : '';
  let mouth;
  if (mood === 'sleepy') mouth = `<ellipse cx="60" cy="86" rx="4" ry="3" fill="${NAVY}"/>`;
  else if (mood === 'excited') mouth = `<path d="M50 82 Q60 96 70 82 Z" fill="${NAVY}"/><path d="M55 88 Q60 92 65 88" fill="#FF8C6B"/>`;
  else mouth = `<path d="M52 84 Q60 92 68 84" stroke="${NAVY}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const scarf = wearing === 'scarf'
    ? `<path d="M30 98 Q60 112 90 98 L92 106 Q60 122 28 106 Z" fill="#FF8C6B"/><path d="M40 103 L42 110 M52 106 L53 114 M66 106 L65 114 M78 103 L76 110" stroke="#FFC857" stroke-width="3"/><path d="M78 104 L86 120 L96 116 L88 100 Z" fill="#FF8C6B"/>`
    : '';
  const helmet = wearing === 'helmet'
    ? `<circle cx="60" cy="64" r="55" fill="#7CC7FF" fill-opacity="0.16" stroke="#7CC7FF" stroke-width="3"/><path d="M28 30 Q 40 16 58 12" stroke="#fff" stroke-opacity="0.7" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : '';
  const vb = wearing === 'helmet' ? '-6 -6 132 132' : '0 0 120 120';
  return `<svg class="comet" width="${size}" height="${size}" viewBox="${vb}" role="img" aria-label="${label}">${jersey}${crown}<path d="M60 6 L69 38 L51 38 Z" fill="#FFC857"/><path d="M33 44 L38 18 L54 38 Z" fill="${WHITE}"/><path d="M87 44 L82 18 L66 38 Z" fill="${WHITE}"/><circle cx="60" cy="70" r="38" fill="${WHITE}"/>${mane}${eyes}${glasses}<circle cx="37" cy="81" r="6" fill="#FF8C6B" opacity="0.5"/><circle cx="83" cy="81" r="6" fill="#FF8C6B" opacity="0.5"/>${mouth}${scarf}${helmet}</svg>`;
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
  switch (icon) {
    case 'ringed': return `<svg ${s}><circle cx="20" cy="20" r="12" fill="${color}"/><ellipse cx="20" cy="20" rx="19" ry="6" fill="none" stroke="${WHITE}" stroke-width="2.5" transform="rotate(-18 20 20)"/></svg>`;
    case 'moon': return `<svg ${s}><path d="M33 24A13 13 0 0 1 16 7a13 13 0 1 0 17 17z" fill="${color}"/></svg>`;
    case 'station': return `<svg ${s}><rect x="15" y="15" width="10" height="10" rx="2" fill="${color}"/><rect x="2" y="17" width="11" height="6" fill="${color}" opacity="0.7"/><rect x="27" y="17" width="11" height="6" fill="${color}" opacity="0.7"/><path d="M20 15V8" stroke="${color}" stroke-width="2"/><circle cx="20" cy="7" r="2" fill="${color}"/></svg>`;
    case 'galaxy': return `<svg ${s}><path d="M20 20c0-6 8-8 11-3M20 20c0 6-8 8-11 3M20 20c6 0 8 8 3 11M20 20c-6 0-8-8-3-11" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="20" r="3" fill="${WHITE}"/></svg>`;
    case 'halves': return `<svg ${s}><circle cx="20" cy="20" r="14" fill="${color}"/><path d="M20 6v28M6 20h28" stroke="${NAVY}" stroke-width="2.5"/></svg>`;
    case 'mountain': return `<svg ${s}><path d="M3 34 L15 12 L22 24 L27 17 L37 34 Z" fill="${color}"/><path d="M15 12 L11 19 L15 17 L18 19 Z" fill="${WHITE}"/></svg>`;
    case 'shapes': return `<svg ${s}><path d="M8 32 L16 16 L24 32 Z" fill="${color}"/><rect x="22" y="8" width="12" height="12" rx="2" fill="${color}" opacity="0.8"/><circle cx="30" cy="30" r="6" fill="${color}" opacity="0.6"/></svg>`;
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
