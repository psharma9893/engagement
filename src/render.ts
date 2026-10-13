/**
 * Pure HTML renderers — run at BUILD TIME (vite.config.ts) so the invite is
 * pre-rendered into index.html. main.ts only adds motion & interactivity.
 * Theme: "Blush & Pearl" — embroidered blush linen, ivory drapes with pearl trim,
 * dusty-rose roses, lavender wisteria, soft gold lines, charcoal type (Cormorant Garamond).
 */
import { config as C } from './data/config';

export const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const A = C.couple.first;
const B = C.couple.second;
const names = `${A} &amp; ${B}`;
const digits = (p: string) => p.replace(/[^\d]/g, '');
const nb = (s: string) => `<span class="nb">${esc(s)}</span>`;
const pairs = (s: string) => s.split(' & ').map((p, i, all) => `<span class="nb">${esc(p)}${i < all.length - 1 ? ' &amp;' : ''}</span>`).join(' ');

/* ---------- seeded random so the build is deterministic ---------- */
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

/* ---------- small ornaments ---------- */
const orn = (cls = ''): string =>
  `<svg class="orn ${cls}" viewBox="0 0 220 20" aria-hidden="true" focusable="false"><path d="M4 10h82M134 10h82" stroke="currentColor" stroke-width=".8" fill="none"/><circle cx="92" cy="10" r="1.3" fill="currentColor"/><circle cx="128" cy="10" r="1.3" fill="currentColor"/><g transform="translate(110 10)" fill="currentColor"><path d="M0-8C1.6-3.4 3.4-1.6 8 0 3.4 1.6 1.6 3.4 0 8-1.6 3.4-3.4 1.6-8 0-3.4-1.6-1.6-3.4 0-8Z"/></g></svg>`;

let lotusId = 0;
const lotus = (cls = ''): string => {
  const id = `lg${++lotusId}`;
  return `<svg class="lotus ${cls}" viewBox="0 0 40 106" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8e3a0"/><stop offset=".55" stop-color="#dcae4f"/><stop offset="1" stop-color="#a87a2a"/></linearGradient></defs><path d="M20 0v60" stroke="#c9a24f" stroke-width="1"/><g fill="url(#${id})"><circle cx="20" cy="10" r="2.4"/><circle cx="20" cy="22" r="2.6"/><circle cx="20" cy="34" r="2.4"/><circle cx="20" cy="46" r="2.8"/><path d="M15 58h10l-2 4h-6z"/><path d="M20 92C11 93 3 88 0 82c8-1 15 3 20 10zM20 92c9 1 17-4 20-10-8-1-15 3-20 10z" opacity=".85"/><path d="M20 92c-8-4-13-12-14-22 7 3 12 10 14 22zM20 92c8-4 13-12 14-22-7 3-12 10-14 22z"/><path d="M20 64c5 8 5 20 0 28-5-8-5-20 0-28z"/><ellipse cx="20" cy="94" rx="9" ry="2.6"/><circle cx="20" cy="101" r="2.2"/></g></svg>`;
};

const icon = {
  chat: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.5 19.5l1.2-3.6A7.8 7.8 0 1 1 8.6 18.6Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7.2 3.8 9.5 4.4l1.1 3.9-2 1.4a10.6 10.6 0 0 0 5.7 5.7l1.4-2 3.9 1.1.6 2.3c-.2 1.6-1.6 2.9-3.2 2.8C9.9 19.3 4.7 14.1 4.4 7c-.1-1.6 1.2-3 2.8-3.2Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="9.8" r="2.3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  cal: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.5" y="5" width="17" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7.5V12l3 2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>',
  ring: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="14.5" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9.5 4.5h5l1.5 2.5-4 3.5-4-3.5z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
};

/* ---------- blush cartouche label (replaces the wax seal) ---------- */
const LABEL = 'M22 8C35 8 40 2 50 2 60 2 65 8 78 8Q80 20 92 22L92 44C98 52 98 68 92 76L92 98Q80 100 78 112C65 112 60 118 50 118 40 118 35 112 22 112Q20 100 8 98L8 76C2 68 2 52 8 44L8 22Q20 20 22 8Z';
let sealId = 0;
/** Scalloped blush label with a gold scroll border and the couple's initials, like the reel's monogram tag. */
function waxSeal(cls: string, attrs = ''): string {
  const id = `lbl${++sealId}`;
  const scroll = (t: string) => `<g transform="${t}"><path d="M0 0c0-6 7-8 10-4 2 3-1 6-4 5" fill="none" stroke="#a97f3c" stroke-width="1.3" stroke-linecap="round"/><circle cx="12" cy="-6" r="1.3" fill="#a97f3c"/></g>`;
  return `<span class="${cls} wax label-seal" ${attrs}><svg viewBox="0 0 100 120" aria-hidden="true" focusable="false"><defs>
<radialGradient id="${id}a" cx="38%" cy="28%" r="85%"><stop offset="0" stop-color="#f4d8d8"/><stop offset=".55" stop-color="#e5b8ba"/><stop offset="1" stop-color="#cd959b"/></radialGradient>
<linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e0bf7a"/><stop offset=".5" stop-color="#a97f3c"/><stop offset="1" stop-color="#7d5c26"/></linearGradient>
<linearGradient id="${id}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#957035"/><stop offset="1" stop-color="#523a18"/></linearGradient></defs>
<path d="${LABEL}" fill="url(#${id}a)" stroke="#bd8c91" stroke-width="1"/>
<path d="${LABEL}" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1" transform="translate(-.6 -.8)"/>
<path d="${LABEL}" fill="none" stroke="url(#${id}g)" stroke-width="1.6" transform="translate(50 60) scale(.84) translate(-50 -60)"/>
<path d="${LABEL}" fill="none" stroke="#a97f3c" stroke-opacity=".55" stroke-width=".7" transform="translate(50 60) scale(.76) translate(-50 -60)"/>
${scroll('translate(22 24)')}${scroll('translate(78 24) scale(-1 1)')}${scroll('translate(22 96) scale(1 -1)')}${scroll('translate(78 96) scale(-1 -1)')}
<path d="M42 12q8 -5 16 0" fill="none" stroke="#a97f3c" stroke-width="1.2" stroke-linecap="round"/><circle cx="50" cy="9" r="1.6" fill="#a97f3c"/>
<path d="M42 108q8 5 16 0" fill="none" stroke="#a97f3c" stroke-width="1.2" stroke-linecap="round"/><circle cx="50" cy="111" r="1.6" fill="#a97f3c"/>
<g font-family="'Cormorant Garamond', Georgia, serif" font-weight="500" text-anchor="middle" font-size="27">
<text x="50" y="70.6" fill="#fff" fill-opacity=".85">${esc(A[0])}<tspan font-style="italic" font-size="20" dx="1">&amp;</tspan><tspan dx="1">${esc(B[0])}</tspan></text>
<text x="50" y="70" fill="url(#${id}t)">${esc(A[0])}<tspan font-style="italic" font-size="20" dx="1">&amp;</tspan><tspan dx="1">${esc(B[0])}</tspan></text></g></svg></span>`;
}

/* ---------- cover scene: embroidered blush linen, pearl-trimmed drapes, ivory palace, wisteria & roses ---------- */
const STITCH = 'stroke="#c7b3a2" stroke-width="1" stroke-dasharray="3 2"';
/** a string of pearls along any path: soft shadow, pearl body, highlight */
const pearls = (d: string, w = 5.2, gap = 8): string =>
  `<path d="${d}" fill="none" stroke="#a8978a" stroke-opacity=".45" stroke-width="${w}" stroke-dasharray="0 ${gap}" stroke-linecap="round" transform="translate(.7 1.3)"/><path d="${d}" fill="none" stroke="#efe6dc" stroke-width="${w}" stroke-dasharray="0 ${gap}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fff" stroke-width="${(w * 0.4).toFixed(1)}" stroke-dasharray="0 ${gap}" stroke-linecap="round" transform="translate(-.8 -.9)"/>`;
function leaf(x: number, y: number, a: number, s = 1): string {
  return `<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a.toFixed(0)}) scale(${s})" d="M0 0C6-6 16-6 22 0 16 6 6 6 0 0Z" fill="#6c7c52" stroke="#4f5843" stroke-width=".7"/>`;
}
const ROSE_TONES = ['roseD', 'roseI', 'roseB'];
function rose(cx: number, cy: number, r: number, tone: string): string {
  const k = tone === 'roseI' ? '#c9b7a8' : tone === 'roseB' ? '#ab7077' : '#6c3245';
  return `<g><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${tone})"/><path d="M${cx + r * 0.1} ${cy}a${r * 0.22} ${r * 0.22} 0 1 1 ${-r * 0.3} 0a${r * 0.42} ${r * 0.42} 0 1 1 ${r * 0.62} ${r * 0.1}a${r * 0.66} ${r * 0.66} 0 1 1 ${-r * 1.0} ${-r * 0.18}" fill="none" stroke="${k}" stroke-width="${(r * 0.1).toFixed(1)}" stroke-linecap="round"/><path d="M${cx - r * 0.9} ${cy + r * 0.25}a${r} ${r} 0 0 0 ${r * 1.8} 0" fill="none" stroke="${k}" stroke-opacity=".6" stroke-width="${(r * 0.08).toFixed(1)}"/></g>`;
}
function wisteria(x: number, y: number, len: number): string {
  const rows = Math.round(len / 7);
  let out = `<path d="M${x} ${y}q4 ${len * 0.4} ${(rnd() - 0.5) * 8} ${len}" fill="none" stroke="#5b6848" stroke-width="1"/>`;
  for (let i = 0; i < rows; i++) {
    const t = i / rows;
    const r = 4.4 * (1 - t * 0.62);
    const cy = y + 4 + i * 7;
    const shades = ['#9677b8', '#7a5a9e', '#634583', '#a88ec8'];
    for (let j = -1; j <= 1; j++) {
      if (t > 0.75 && j !== 0) continue;
      out += `<circle cx="${(x + j * r * 1.2 + (rnd() - 0.5) * 2).toFixed(1)}" cy="${(cy + Math.abs(j) * 2).toFixed(1)}" r="${r.toFixed(1)}" fill="${shades[Math.floor(rnd() * shades.length)]}" stroke="#50386b" stroke-opacity=".35" stroke-width=".6"/>`;
    }
  }
  return out + leaf(x, y + 2, 160, 0.8) + leaf(x, y + 2, 20, 0.8);
}
function chhatri(cx: number, base: number, w: number): string {
  const h = w * 1.55;
  const top = base - h;
  const domeY = top + w * 0.55;
  const cols = [0.12, 0.38, 0.62, 0.88]
    .map((f) => `<rect x="${(cx - w / 2 + f * w - 3).toFixed(1)}" y="${(domeY + 14).toFixed(1)}" width="6" height="${(base - domeY - 26).toFixed(1)}" fill="url(#stoneG)" stroke="#c7b3a2" stroke-width=".8"/>`)
    .join('');
  return `<g filter="url(#raise)"><path d="M${cx} ${top - 14}v14" stroke="#a97f3c" stroke-width="2"/><circle cx="${cx}" cy="${top - 16}" r="3" fill="#a97f3c"/>
<path d="M${cx - w * 0.42} ${domeY}C${cx - w * 0.42} ${top + 6} ${cx + w * 0.42} ${top + 6} ${cx + w * 0.42} ${domeY}Z" fill="url(#stoneG)" stroke="#c7b3a2" stroke-width="1.2"/>
${Array.from({ length: 5 }, (_, k) => `<path d="M${cx - w * 0.42 + (k + 1) * (w * 0.84) / 6} ${domeY}Q${cx} ${top + 4} ${cx} ${top + 4}" fill="none" stroke="#c7b3a2" stroke-opacity=".6" stroke-width=".7"/>`).join('')}
<rect x="${cx - w / 2}" y="${domeY}" width="${w}" height="12" fill="url(#stoneG)" stroke="#c7b3a2" stroke-width="1"/>
<rect x="${cx - w / 2 + 6}" y="${domeY + 12}" width="${w - 12}" height="${base - domeY - 24}" fill="#b47f85" fill-opacity=".55"/>
${cols}<rect x="${cx - w / 2 - 4}" y="${base - 12}" width="${w + 8}" height="12" fill="url(#stoneG)" stroke="#c7b3a2" stroke-width="1"/></g>`;
}
function drape(): string {
  // left drape; the right one is its mirror image
  const edge = 'M205 34C196 150 160 300 116 420C106 455 122 520 150 590';
  const folds = [20, 58, 96, 134, 170]
    .map((x, i) => `<path d="M${x} 34C${x - 4} 160 ${92 + i * 4} 300 ${96 + i * 4} 422C${92 + i * 6} 470 ${40 + i * 22} 540 ${20 + i * 26} 592" fill="none" stroke="#d6c6b8" stroke-width="2.2"/><path d="M${x + 7} 34C${x + 3} 160 ${98 + i * 4} 300 ${100 + i * 4} 422C${98 + i * 6} 470 ${48 + i * 22} 540 ${28 + i * 26} 594" fill="none" stroke="#fffaf4" stroke-width="1.4"/>`)
    .join('');
  return `<g filter="url(#raise)"><path d="M0 28L205 28C196 150 160 300 116 420C106 455 122 520 150 590C110 600 50 600 0 594Z" fill="url(#drapeG)"/>${folds}
${pearls(edge)}<ellipse cx="108" cy="428" rx="26" ry="9" fill="none" stroke="#efe6dc" stroke-width="5" stroke-dasharray="0 7" stroke-linecap="round"/>
<path d="M90 432q-4 22 -2 40M98 434q-2 20 0 34" fill="none" stroke="#efe6dc" stroke-width="4" stroke-dasharray="0 6.5" stroke-linecap="round"/></g>`;
}
function swags(): string {
  let out = '<g filter="url(#raise)"><rect x="0" y="16" width="600" height="20" fill="url(#drapeG)"/><path d="M0 36H600" stroke="#c7b3a2" stroke-width="1"/>';
  for (const [a, b] of [[0, 200], [200, 400], [400, 600]]) {
    out += `<path d="M${a} 34C${a + 40} 122 ${b - 40} 122 ${b} 34Z" fill="url(#swagG)"/>`;
    for (const dep of [58, 78, 96]) out += `<path d="M${a + 10} 36C${a + 50} ${dep + 12} ${b - 50} ${dep + 12} ${b - 10} 36" fill="none" stroke="#d6c6b8" stroke-width="1.6"/>`;
    out += pearls(`M${a + 4} 38C${a + 42} 120 ${b - 42} 120 ${b - 4} 38`, 4.6, 7.4);
    out += pearls(`M${a + 2} 40C${a + 40} 150 ${b - 40} 150 ${b - 2} 40`, 3.6, 6.4);
  }
  return out + '</g>';
}
function coverScene(): string {
  seed = 11;
  const lace = (y: number, flip: boolean) =>
    `<g transform="${flip ? `translate(0 ${2 * y}) scale(1 -1)` : ''}"><path d="M0 ${y}${Array.from({ length: 30 }, () => `a10 10 0 0 0 20 0`).join('')}V${y - 30}H0Z" fill="#f6efe9" stroke="#d9c7ba" stroke-width="1"/>${Array.from({ length: 30 }, (_, k) => `<circle cx="${10 + k * 20}" cy="${y + 2}" r="2.2" fill="#e3d0c9"/>`).join('')}<path d="M0 ${y - 8}H600" ${STITCH}/></g>`;
  // palace (bottom half) — Indian arch & chhatris in ivory stone, blush alcoves
  const arch = 'M232 930V800A34 34 0 0 1 252 760A34 34 0 0 1 300 736A34 34 0 0 1 348 760A34 34 0 0 1 368 800V930Z';
  const win = (x: number) => `<path d="M${x - 22} 900V842A22 22 0 0 1 ${x + 22} 842V900Z" fill="url(#alcoveG)" stroke="#c7b3a2" stroke-width="1.2"/><path d="M${x - 22} 900V842A22 22 0 0 1 ${x + 22} 842V900" fill="url(#jaali)"/><path d="M${x - 26} 902h52" stroke="#c7b3a2" stroke-width="3"/>`;
  const merlons = Array.from({ length: 13 }, (_, k) => `<path d="M${168 + k * 22} 706v-8a6 6 0 0 1 12 0v8Z" fill="url(#stoneG)" stroke="#c7b3a2" stroke-width=".8"/>`).join('');
  const roses = [
    [62, 952, 22], [104, 972, 18], [146, 950, 20], [190, 975, 16], [232, 958, 19], [270, 980, 15], [330, 980, 15], [368, 958, 19], [410, 975, 16], [454, 950, 20], [496, 972, 18], [538, 952, 22], [20, 975, 18], [580, 975, 18],
  ].map(([x, y, r], i) => leaf(x - r * 0.6, y - r * 0.5, 200 + i * 7, 1.1) + leaf(x + r * 0.6, y - r * 0.4, -20 - i * 5, 1.1) + rose(x, y, r, ROSE_TONES[i % 3])).join('');
  return `<svg class="cover__svg" viewBox="0 0 600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs>
<linearGradient id="cardG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eed3cb"/><stop offset=".55" stop-color="#e4c3bb"/><stop offset="1" stop-color="#d4ada3"/></linearGradient>
<pattern id="linen" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 .5H5M0 3H5" stroke="#fff" stroke-opacity=".35" stroke-width=".6"/><path d="M.5 0V5M3 0V5" stroke="#8a6a64" stroke-opacity=".08" stroke-width=".6"/></pattern>
<linearGradient id="drapeG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#efe5db"/><stop offset=".5" stop-color="#faf5ef"/><stop offset="1" stop-color="#e9ddd1"/></linearGradient>
<linearGradient id="swagG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f9f3ed"/><stop offset="1" stop-color="#e8dccf"/></linearGradient>
<radialGradient id="alcoveG" cx="50%" cy="35%" r="80%"><stop offset="0" stop-color="#d6a19f"/><stop offset="1" stop-color="#a66d73"/></radialGradient>
<linearGradient id="stoneG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf6f0"/><stop offset="1" stop-color="#ebe0d4"/></linearGradient>
<radialGradient id="roseD" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#c97f90"/><stop offset=".6" stop-color="#9b5268"/><stop offset="1" stop-color="#7a3a4d"/></radialGradient>
<radialGradient id="roseB" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#f3d6d6"/><stop offset=".6" stop-color="#d9a1a5"/><stop offset="1" stop-color="#bd7d84"/></radialGradient>
<radialGradient id="roseI" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fffdf9"/><stop offset=".6" stop-color="#f4ece2"/><stop offset="1" stop-color="#dfd1c3"/></radialGradient>
<pattern id="jaali" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M6 0L12 6 6 12 0 6Z" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width=".8"/></pattern>
<filter id="raise" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="2.2" stdDeviation="1.8" flood-color="#6b4f4a" flood-opacity=".32"/></filter>
</defs>
<rect width="600" height="1000" fill="url(#cardG)"/><rect width="600" height="1000" fill="url(#linen)"/>
<path d="M44 140V990M556 140V990" ${STITCH}/>
<g filter="url(#raise)"><path d="M150 930V860M450 930V860" stroke="none"/>
<path d="M138 930C126 860 128 800 140 760 152 800 154 860 142 930Z" fill="#5b6848"/><path d="M462 930C450 860 452 800 464 760 476 800 474 860 458 930Z" fill="#5b6848"/></g>
<g filter="url(#raise)">
<path d="M300 612v-20" stroke="#a97f3c" stroke-width="2.4"/><circle cx="300" cy="588" r="4" fill="#a97f3c"/>
<path d="M248 690C244 650 270 628 300 612 330 628 356 650 352 690Z" fill="url(#stoneG)" stroke="#c7b3a2" stroke-width="1.2"/>
${[262, 281, 300, 319, 338].map((x) => `<path d="M${x} 690Q${x + (300 - x) * 0.4} 640 300 614" fill="none" stroke="#c7b3a2" stroke-opacity=".6" stroke-width=".8"/>`).join('')}
<rect x="240" y="688" width="120" height="10" fill="url(#stoneG)" stroke="#c7b3a2" stroke-width="1"/>
${merlons}
<rect x="160" y="704" width="280" height="226" fill="url(#stoneG)" stroke="#c7b3a2" stroke-width="1.2"/>
<path d="M160 716H440M160 920H440" ${STITCH}/>
<path d="${arch}" fill="url(#alcoveG)"/><path d="${arch}" fill="url(#jaali)"/>
<path d="${arch}" fill="none" stroke="#a97f3c" stroke-width="5"/><path d="${arch}" fill="none" stroke="#fbf6f0" stroke-width="2.2"/>
<path d="M286 930V860A14 14 0 0 1 314 860V930Z" fill="#93626a"/>
${win(196)}${win(404)}
</g>
${chhatri(172, 706, 46)}${chhatri(428, 706, 46)}
${chhatri(96, 936, 78)}${chhatri(504, 936, 78)}
<g>${wisteria(168, 714, 70)}${wisteria(182, 716, 52)}${wisteria(196, 712, 62)}${wisteria(432, 712, 58)}${wisteria(418, 716, 44)}</g>
<g filter="url(#raise)"><path d="M118 936C112 904 150 896 170 904 186 894 222 900 226 936Z" fill="#6b7757"/><path d="M374 936C378 900 414 894 430 904 450 896 488 904 482 936Z" fill="#6b7757"/>
<ellipse cx="300" cy="944" rx="62" ry="13" fill="url(#stoneG)" stroke="#c7b3a2" stroke-width="1.2"/><ellipse cx="300" cy="941" rx="50" ry="8" fill="#cfdadb"/>
<path d="M300 938V902M300 904q-14 4 -20 30M300 904q14 4 20 30" fill="none" stroke="#b9c9cc" stroke-width="1.6"/><circle cx="300" cy="900" r="3" fill="#a97f3c"/></g>
${drape()}<g transform="translate(600 0) scale(-1 1)">${drape()}</g>
${swags()}
<g>${wisteria(200, 40, 96)}${wisteria(188, 44, 70)}${wisteria(212, 44, 76)}${wisteria(400, 40, 96)}${wisteria(388, 44, 74)}${wisteria(412, 44, 70)}${wisteria(84, 40, 56)}${wisteria(516, 40, 56)}</g>
<g filter="url(#raise)">${roses}</g>
${lace(992, true)}${lace(8, false)}
</svg>`;
}

/* ---------- envelope + curtains ---------- */
function envelope(): string {
  return `<div class="envelope" id="envelope" role="dialog" aria-modal="true" aria-labelledby="env-names">
  <div class="envelope__bg" aria-hidden="true">${lotus('lotus--env lotus--l')}${lotus('lotus--env lotus--r')}<div class="gold-dust"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
  <div class="envelope__stage">
    <p class="envelope__eyebrow">${esc(C.envelope.eyebrow)}</p>
    <p class="envelope__names script" id="env-names">${esc(A)} <span class="amp">&amp;</span> ${esc(B)}</p>
    <p class="envelope__line">${esc(C.envelope.line)}</p>
    <button type="button" class="env" id="open-invite" aria-label="Open your invitation">
      <span class="env__back"></span>
      <span class="env__letter">${orn('orn--sm')}<span class="env__letter-names script">${names}</span><span class="env__letter-date">${esc(C.event.dateShort)}</span></span>
      <span class="env__pocket"></span><span class="env__flap"></span>
      ${waxSeal('env__seal')}
      <span class="env__burst"></span>
    </button>
    <p class="envelope__hint" aria-hidden="true">${esc(C.envelope.hint)}</p>
  </div>
</div>
<div class="curtains" aria-hidden="true">
  <div class="curtain curtain--l"><i class="curtain__tie"></i></div>
  <div class="curtain curtain--r"><i class="curtain__tie"></i></div>
  <div class="curtains__valance"></div>
  <div class="curtains__light"></div>
</div>`;
}

/* ---------- page 1: cover ---------- */
function cover(): string {
  return `<header class="cover" id="top">
  <div class="cover__scene">
    ${coverScene()}
    <div class="cover__panel">
      <p class="cover__eyebrow">The engagement of</p>
      <h1 class="cover__names script"><span>${esc(A)}</span><span class="amp">&amp;</span><span>${esc(B)}</span></h1>
      ${orn('orn--plaque')}
      <p class="cover__date">${esc(C.event.dateShort)}</p>
      <p class="cover__venue">${esc(C.event.venue)}</p>
    </div>
  </div>
  <a class="cover__cue" href="#details"><span>Scroll</span><i aria-hidden="true"></i></a>
</header>`;
}

/* ---------- page 2: details ---------- */
function details(): string {
  const e = C.event;
  const h = C.host;
  return `<section class="page page--details" id="details">
  <div class="page__inner details">
    <div class="tile tile--host reveal">
      <p class="host__blessing">${esc(h.blessing)}</p>
      <p class="host__parents">${pairs(h.parents)}</p>
      <p class="host__invite">${esc(h.invite)}</p>
      <p class="host__name script">${esc(A)}</p>
      <p class="host__to">${esc(h.joiner)}</p>
      <p class="host__name script">${esc(B)}</p>
    </div>
    <div class="details__side">
      <div class="tile tile--event reveal">
        <p class="eyebrow">${esc(e.name)}</p>
        <ul class="facts">
          <li>${icon.cal}<span>${nb(e.dateLabel)}</span></li>
          <li>${icon.clock}<span>${nb(e.timeLabel)}</span></li>
          <li>${icon.pin}<span>${nb(e.venue)}${e.hall ? `<small class="facts__hall">${esc(e.hall)}</small>` : ''}</span></li>
        </ul>
        ${e.timeline.length ? `<ol class="timeline" aria-label="Order of the day">${e.timeline.map((t) => `<li><span class="timeline__time">${esc(t.time)}</span><span class="timeline__label">${esc(t.label)}</span></li>`).join('')}</ol>` : ''}
        ${e.dressCode ? `<div class="dress"><span class="dress__label">Dress code</span><span class="dress__value">${esc(e.dressCode)}</span></div>` : ''}
        <div class="btns btns--links">
          ${e.mapsUrl ? `<a class="btn" href="${esc(e.mapsUrl)}" target="_blank" rel="noopener">${icon.pin}<span>Directions</span></a>` : ''}
          <a class="btn" href="engagement.ics" download>${icon.cal}<span>Add to calendar</span></a>
        </div>
      </div>
      <div class="tile tile--count reveal">
        <p class="eyebrow">The countdown has begun</p>
        <div class="countdown" data-countdown="${e.startISO}" role="timer" aria-live="off">
          <div><span data-unit="d">--</span><small>Days</small></div>
          <div><span data-unit="h">--</span><small>Hours</small></div>
          <div><span data-unit="m">--</span><small>Minutes</small></div>
          <div><span data-unit="s">--</span><small>Seconds</small></div>
        </div>
        <p class="countdown__done" hidden>Today is the day. Welcome!</p>
      </div>
    </div>
  </div>
</section>`;
}

/* ---------- page 3: RSVP + closing ---------- */
function rsvp(): string {
  const r = C.rsvp;
  const msg = r.whatsappMessage ? `?text=${encodeURIComponent(r.whatsappMessage)}` : '';
  const contacts = r.contacts
    .map(
      (c) => `<li class="contact"><p class="contact__name script">${esc(c.name)}</p><p class="contact__phone"><a href="tel:+${digits(c.phone)}">${esc(c.phone)}</a></p>
      <div class="btns"><a class="btn" href="https://wa.me/${digits(c.phone)}${msg}" target="_blank" rel="noopener" aria-label="WhatsApp ${esc(c.name)}">${icon.chat}<span>WhatsApp</span></a><a class="btn" href="tel:+${digits(c.phone)}" aria-label="Call ${esc(c.name)}">${icon.phone}<span>Call</span></a></div></li>`,
    )
    .join('');
  return `<section class="page page--rsvp" id="rsvp">
  <div class="page__inner">
    <div class="tile tile--rsvp reveal">
      <p class="rsvp__welcome">${esc(r.welcome)}</p>
      <p class="rsvp__msg">${esc(r.message)}</p>
      ${orn()}
      <h2 class="rsvp__label">RSVP</h2>
      <ul class="contacts">${contacts}</ul>
    </div>
    <footer class="closing reveal">
      ${waxSeal('closing__seal')}
      <p class="closing__names script">${names}</p>
      <p class="closing__date">${esc(C.event.dateShort)}<br>${esc(C.event.venue)}</p>
      <p class="closing__signoff">${esc(C.closing.signoff)}</p>
      <a class="closing__top" href="#top">Back to the beginning ↑</a>
    </footer>
  </div>
</section>`;
}

function musicControl(): string {
  if (!C.music.src) return '';
  const on = '<svg class="music__on" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  const off = '<svg class="music__off" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor"/><path d="M16 9.5l5 5M21 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  return `<button type="button" class="music" id="music" aria-pressed="false" aria-label="Mute music" data-src="${esc(C.music.src)}" data-volume="${C.music.volume}" hidden>${on}${off}</button>`;
}

export function renderBody(): string {
  return [
    '<div class="page-border page-border--l" aria-hidden="true"></div><div class="page-border page-border--r" aria-hidden="true"></div>',
    envelope(),
    '<main id="invitation">',
    cover(),
    details(),
    rsvp(),
    '</main>',
    musicControl(),
  ].join('\n');
}

const icsDate = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
export function renderICS(): string {
  const e = C.event;
  const fold = (s: string) => s.replace(/[,;\\]/g, (m) => '\\' + m);
  return (
    [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Pranshu & Nishtha//Engagement//EN', 'METHOD:PUBLISH',
      'BEGIN:VEVENT', 'UID:engagement-2026@pranshu-nishtha', 'DTSTAMP:20261001T000000Z',
      `DTSTART:${icsDate(e.startISO)}`, `DTEND:${icsDate(e.endISO)}`,
      `SUMMARY:${fold(`Engagement · ${A} & ${B}`)}`, `LOCATION:${fold(e.hall ? `${e.hall}, ${e.venue}` : e.venue)}`,
      `DESCRIPTION:${fold(`${e.timeLabel} — Dress code: ${e.dressCode} — ${e.mapsUrl}`)}`, `URL:${e.mapsUrl}`,
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n') + '\r\n'
  );
}
