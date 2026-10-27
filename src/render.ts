/**
 * Pure HTML renderers — run at BUILD TIME (vite.config.ts) so the invite is
 * pre-rendered into index.html. main.ts only adds motion & interactivity.
 * Theme: "Sindoor & Marigold" — sindoor red and maroon, marigold torans, a stone
 * shikhara temple with purna kalash and diyas, rich gold lines (Cormorant Garamond).
 * Opens on Shri Ganesha with the same shlokas as the wedding invite.
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

/* ---------- sindoor cartouche label (replaces the wax seal) ---------- */
const LABEL = 'M22 8C35 8 40 2 50 2 60 2 65 8 78 8Q80 20 92 22L92 44C98 52 98 68 92 76L92 98Q80 100 78 112C65 112 60 118 50 118 40 118 35 112 22 112Q20 100 8 98L8 76C2 68 2 52 8 44L8 22Q20 20 22 8Z';
let sealId = 0;
/** Scalloped sindoor-red label with a gold scroll border and the couple's initials, like the reel's monogram tag. */
function waxSeal(cls: string, attrs = ''): string {
  const id = `lbl${++sealId}`;
  const scroll = (t: string) => `<g transform="${t}"><path d="M0 0c0-6 7-8 10-4 2 3-1 6-4 5" fill="none" stroke="#f0c45a" stroke-width="1.3" stroke-linecap="round"/><circle cx="12" cy="-6" r="1.3" fill="#f0c45a"/></g>`;
  return `<span class="${cls} wax label-seal" ${attrs}><svg viewBox="0 0 100 120" aria-hidden="true" focusable="false"><defs>
<radialGradient id="${id}a" cx="38%" cy="28%" r="85%"><stop offset="0" stop-color="#e2384c"/><stop offset=".55" stop-color="#b3122a"/><stop offset="1" stop-color="#7a0a1c"/></radialGradient>
<linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe7a3"/><stop offset=".5" stop-color="#e0b04a"/><stop offset="1" stop-color="#b08226"/></linearGradient>
<linearGradient id="${id}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0b8"/><stop offset="1" stop-color="#e0b04a"/></linearGradient></defs>
<path d="${LABEL}" fill="url(#${id}a)" stroke="#5c0614" stroke-width="1"/>
<path d="${LABEL}" fill="none" stroke="#ffb3a0" stroke-opacity=".5" stroke-width="1" transform="translate(-.6 -.8)"/>
<path d="${LABEL}" fill="none" stroke="url(#${id}g)" stroke-width="1.6" transform="translate(50 60) scale(.84) translate(-50 -60)"/>
<path d="${LABEL}" fill="none" stroke="#f0c45a" stroke-opacity=".55" stroke-width=".7" transform="translate(50 60) scale(.76) translate(-50 -60)"/>
${scroll('translate(22 24)')}${scroll('translate(78 24) scale(-1 1)')}${scroll('translate(22 96) scale(1 -1)')}${scroll('translate(78 96) scale(-1 -1)')}
<path d="M42 12q8 -5 16 0" fill="none" stroke="#f0c45a" stroke-width="1.2" stroke-linecap="round"/><circle cx="50" cy="9" r="1.6" fill="#f0c45a"/>
<path d="M42 108q8 5 16 0" fill="none" stroke="#f0c45a" stroke-width="1.2" stroke-linecap="round"/><circle cx="50" cy="111" r="1.6" fill="#f0c45a"/>
<g font-family="'Cormorant Garamond', Georgia, serif" font-weight="500" text-anchor="middle" font-size="27">
<text x="50" y="71.2" fill="#4a0510" fill-opacity=".7">${esc(A[0])}<tspan font-style="italic" font-size="20" dx="1">&amp;</tspan><tspan dx="1">${esc(B[0])}</tspan></text>
<text x="50" y="70" fill="url(#${id}t)">${esc(A[0])}<tspan font-style="italic" font-size="20" dx="1">&amp;</tspan><tspan dx="1">${esc(B[0])}</tspan></text></g></svg></span>`;
}

/* ---------- cover scene: sindoor-red night, marigold torans, a stone shikhara temple, purna kalash & diyas ---------- */
type Pt = [number, number];
/** n+1 points along a quadratic curve a → b, pulled towards c */
const along = (a: Pt, c: Pt, b: Pt, n: number): Pt[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const u = 1 - t;
    return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]] as Pt;
  });
/** marigold garland: orange, orange, yellow flower beads */
const garland = (pts: Pt[], s = 1): string =>
  pts.map(([x, y], i) => `<use href="#${i % 3 === 2 ? 'mgY' : 'mgO'}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s})"/>`).join('');
/** a hanging marigold string (ladi) ending in a temple bell; swings gently */
const ladi = (x: number, y0: number, y1: number, s = 1): string =>
  `<g class="chand">${garland(along([x, y0], [x, (y0 + y1) / 2], [x, y1], Math.round((y1 - y0) / (11 * s))), s)}<use href="#bell" transform="translate(${x} ${y1 + 9 * s}) scale(${s})"/></g>`;
const mango = (x: number, y: number, a: number, s = 1, alt = false): string =>
  `<use href="#${alt ? 'mango2' : 'mango'}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a.toFixed(0)}) scale(${s})"/>`;

/** Nagara-style curvilinear spire (shikhara) with banded courses, a raised central rib and an amalaka on top */
function shikhara(cx: number, base: number, w: number, h: number, main = false): string {
  const l = cx - w / 2;
  const r = cx + w / 2;
  const top = base - h;
  const d = `M${l} ${base}C${l - w * 0.01} ${base - h * 0.42} ${l + w * 0.14} ${base - h * 0.8} ${cx - w * 0.2} ${top}L${cx + w * 0.2} ${top}C${r - w * 0.14} ${base - h * 0.8} ${r + w * 0.01} ${base - h * 0.42} ${r} ${base}Z`;
  const squeeze = (k: number) => `transform="translate(${cx} 0) scale(${k} 1) translate(${-cx} 0)"`;
  const courses = Array.from({ length: Math.floor(h / 12) }, (_, k) => `M${l - 4} ${(top + 8 + k * 12).toFixed(1)}H${r + 4}`).join('');
  const clip = `sk${cx}`;
  const ribs = Array.from({ length: 9 }, (_, k) => `<path d="M${(cx - w * 0.2 + (k * w * 0.4) / 8).toFixed(1)} ${top}v-${(w * 0.05).toFixed(1)}" stroke="#8a4a14" stroke-width="1"/>`).join('');
  return `<g filter="url(#raise)"><clipPath id="${clip}"><path d="${d}"/></clipPath>
<path d="${d}" fill="url(#stoneG)" stroke="#7a3a0c" stroke-width="1.2"/>
<path d="${d}" fill="#fff2c4" fill-opacity=".28" ${squeeze(0.34)}/>
<path d="${d}" fill="none" stroke="#8a4a14" stroke-opacity=".55" stroke-width="1" ${squeeze(0.68)}/>
<path d="${d}" fill="none" stroke="#8a4a14" stroke-opacity=".55" stroke-width="1" ${squeeze(0.34)}/>
<path d="${courses}" clip-path="url(#${clip})" stroke="#8a4a14" stroke-opacity=".42" stroke-width="1.3"/>
<ellipse cx="${cx}" cy="${top - w * 0.05}" rx="${w * 0.25}" ry="${w * 0.07}" fill="url(#goldG)" stroke="#7a3a0c" stroke-width="1"/>${ribs}
<circle cx="${cx}" cy="${top - w * 0.15}" r="${w * 0.05}" fill="url(#goldG)" stroke="#7a3a0c" stroke-width=".8"/>
<path d="M${cx} ${top - w * 0.2}v-${w * 0.08}" stroke="#b68427" stroke-width="${main ? 2 : 1.4}"/>
${main ? `<path d="M${cx} ${top - 12}V${top - 66}" stroke="#8a5a12" stroke-width="1.6"/><path class="flag" d="M${cx} ${top - 66}Q${cx + 22} ${top - 62} ${cx + 44} ${top - 54}Q${cx + 22} ${top - 49} ${cx} ${top - 42}Z" fill="#ff8a1f" stroke="#c4560c" stroke-width=".8"/>` : ''}</g>`;
}

/** purna kalash: brass pot with mango leaves, a coconut and red mauli thread */
function kalash(x: number, base: number, s: number): string {
  const leaves = [-64, -32, 64, 32, 0].map((a, i) => mango(0, -62, 180 + a, 1.05, i % 2 === 1)).join('');
  return `<g filter="url(#raise)" transform="translate(${x} ${base}) scale(${s})">
<ellipse cy="-2" rx="22" ry="5" fill="#6b2a0c"/>${leaves}
<path d="M-13-5C-36-12-38-48-13-58H13C38-48 36-12 13-5Z" fill="url(#potG)" stroke="#6b2a0c" stroke-width="1"/>
<rect x="-14" y="-66" width="28" height="9" rx="3" fill="url(#goldG)" stroke="#6b2a0c" stroke-width=".8"/>
<path d="M-31-35Q0-28 31-35" fill="none" stroke="#c8102e" stroke-width="3.4"/><path d="M-31-31Q0-24 31-31" fill="none" stroke="#f6c445" stroke-width="1.3"/>
<circle cy="-46" r="5" fill="#c8102e"/><circle cy="-46" r="2" fill="#f6c445"/>
<ellipse cy="-80" rx="13" ry="16" fill="url(#cocoG)" stroke="#3d220c" stroke-width=".8"/>
<path d="M-8-90q8 6 16 0M-10-83q10 6 20 0" fill="none" stroke="#3d220c" stroke-opacity=".5" stroke-width=".8"/>
<path d="M-13-73q13 6 26 0" fill="none" stroke="#c8102e" stroke-width="2.6"/></g>`;
}

/** a few loose flowers heaped at the foot of the temple */
const heap = (x: number, y: number, flip = 1): string =>
  [[0, 0, 1.3, 'mgO'], [16, 4, 1.1, 'mgR'], [-15, 5, 1.05, 'mgY'], [6, 10, 1.15, 'mgY'], [-4, 13, 1, 'mgR'], [26, 12, 1, 'mgO']]
    .map(([dx, dy, s, k]) => `<use href="#${k}" transform="translate(${x + (dx as number) * flip} ${y + (dy as number)}) scale(${s})"/>`)
    .join('');

function coverScene(): string {
  // top toran: gold bar, mango leaves, marigold swags & three short ladis with bells
  const leaves = Array.from({ length: 30 }, (_, k) => mango(10 + k * 20, 16, (k % 2 ? 6 : -6), 1, k % 2 === 1)).join('');
  const swags = [[0, 150], [150, 300], [300, 450], [450, 600]].map(([a, b]) => garland(along([a, 22], [(a + b) / 2, 122], [b, 22], 22), 0.95)).join('');
  const sparkles = [[150, 210], [462, 236], [112, 420], [496, 470], [178, 560], [430, 580], [300, 170]]
    .map(([x, y], i) => `<path class="spk" style="animation-delay:-${i * 0.6}s" d="M${x} ${y - 6}L${x + 1.4} ${y - 1.4} ${x + 6} ${y} ${x + 1.4} ${y + 1.4} ${x} ${y + 6} ${x - 1.4} ${y + 1.4} ${x - 6} ${y} ${x - 1.4} ${y - 1.4}Z" fill="#ffe39a"/>`)
    .join('');
  // faint gold mandala behind the names
  const petals = (n: number, r0: number, r1: number, wd: number) =>
    Array.from({ length: n }, (_, k) => `<path transform="rotate(${((360 / n) * k).toFixed(1)})" d="M0 ${-r0}Q${wd} ${-(r0 + r1) / 2} 0 ${-r1}Q${-wd} ${-(r0 + r1) / 2} 0 ${-r0}Z"/>`).join('');
  const dots = Array.from({ length: 36 }, (_, k) => `<circle transform="rotate(${k * 10})" cy="-196" r="2.2"/>`).join('');
  // diyas along the front, leaving room for the rangoli
  const diyas = [86, 120, 154, 188, 222, 378, 412, 446, 480, 514]
    .map((x, i) => `<use href="#diya" transform="translate(${x} 974)"/><g transform="translate(${x} 970)"><use class="flame" style="animation-delay:-${(i * 0.37).toFixed(2)}s" href="#flame"/></g>`)
    .join('');
  const rangoli = `<g transform="translate(300 958) scale(1 .42)">${[['#c8102e', 40], ['#f59a1b', 32], ['#f6c445', 24], ['#2f7d32', 16], ['#fff4dc', 8]]
    .map(([c, r]) => `<g fill="${c}">${petals(12, (r as number) * 0.4, r as number, (r as number) * 0.32)}</g>`)
    .join('')}<circle r="4" fill="#c8102e"/></g>`;
  const pillars = [240, 262, 326, 348]
    .map((x) => `<rect x="${x}" y="812" width="12" height="80" fill="url(#stoneG)" stroke="#7a3a0c" stroke-width=".8"/><rect x="${x - 2}" y="810" width="16" height="6" fill="url(#goldG)"/><rect x="${x - 2}" y="890" width="16" height="6" fill="url(#goldG)"/>`)
    .join('');
  const doorToran = garland(along([282, 828], [300, 842], [318, 828], 6), 0.5) + [284, 291, 298, 305, 312].map((x, i) => mango(x + 2, 826, 0, 0.32, i % 2 === 1)).join('');
  return `<svg class="cover__svg" viewBox="0 0 600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs>
<radialGradient id="bgG" cx="50%" cy="42%" r="75%"><stop offset="0" stop-color="#a3202f"/><stop offset=".5" stop-color="#7a1322"/><stop offset="1" stop-color="#4a0812"/></radialGradient>
<radialGradient id="glowG"><stop offset="0" stop-color="#ffb648" stop-opacity=".6"/><stop offset=".55" stop-color="#ff8a2a" stop-opacity=".14"/><stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/></radialGradient>
<pattern id="buti" width="44" height="44" patternUnits="userSpaceOnUse"><g fill="#f0c45a" fill-opacity=".16"><path d="M22 16c1.6 3 3 4.4 6 6-3 1.6-4.4 3-6 6-1.6-3-3-4.4-6-6 3-1.6 4.4-3 6-6Z"/><circle r="1.6"/><circle cx="44" r="1.6"/><circle cy="44" r="1.6"/><circle cx="44" cy="44" r="1.6"/></g></pattern>
<linearGradient id="goldG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe7a3"/><stop offset=".5" stop-color="#d9a53c"/><stop offset="1" stop-color="#9a6a1c"/></linearGradient>
<linearGradient id="stoneG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d4873a"/><stop offset=".45" stop-color="#f7cf86"/><stop offset="1" stop-color="#bf7329"/></linearGradient>
<radialGradient id="doorG" cx="50%" cy="78%" r="80%"><stop offset="0" stop-color="#fff2b0"/><stop offset=".35" stop-color="#ffb23e"/><stop offset="1" stop-color="#9c2a12"/></radialGradient>
<radialGradient id="mgOg" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#ffd27a"/><stop offset=".55" stop-color="#f59a1b"/><stop offset="1" stop-color="#d0620c"/></radialGradient>
<radialGradient id="mgYg" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fff0a0"/><stop offset=".55" stop-color="#f8c62e"/><stop offset="1" stop-color="#d79a10"/></radialGradient>
<radialGradient id="mgRg" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#ff7a68"/><stop offset=".55" stop-color="#d0182e"/><stop offset="1" stop-color="#8e0a1c"/></radialGradient>
<linearGradient id="leafG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2c6e2a"/><stop offset=".5" stop-color="#4f9a3c"/><stop offset="1" stop-color="#24602a"/></linearGradient>
<linearGradient id="leafG2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3b7f2c"/><stop offset=".5" stop-color="#76b54c"/><stop offset="1" stop-color="#2f6e27"/></linearGradient>
<radialGradient id="potG" cx="35%" cy="35%" r="75%"><stop offset="0" stop-color="#ffe09a"/><stop offset=".45" stop-color="#e0952e"/><stop offset="1" stop-color="#8f4710"/></radialGradient>
<radialGradient id="cocoG" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#b77a45"/><stop offset=".6" stop-color="#7a4a22"/><stop offset="1" stop-color="#4f2d12"/></radialGradient>
<linearGradient id="flameG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff7b1a"/><stop offset=".45" stop-color="#ffc93c"/><stop offset="1" stop-color="#fff6c8"/></linearGradient>
<radialGradient id="haloG"><stop offset="0" stop-color="#ffd76a" stop-opacity=".75"/><stop offset="1" stop-color="#ffb02e" stop-opacity="0"/></radialGradient>
<filter id="raise" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="2.4" stdDeviation="2" flood-color="#2a0308" flood-opacity=".5"/></filter>
<g id="mgO"><circle r="6" fill="url(#mgOg)"/><circle r="6" fill="none" stroke="#c4560c" stroke-width="1.4" stroke-dasharray="1.6 1.3"/><circle r="3.4" fill="none" stroke="#e07a12" stroke-width="1" stroke-dasharray="1.2 1"/><circle r="1.4" fill="#a8420a"/></g>
<g id="mgY"><circle r="6" fill="url(#mgYg)"/><circle r="6" fill="none" stroke="#c98a0c" stroke-width="1.4" stroke-dasharray="1.6 1.3"/><circle r="3.4" fill="none" stroke="#e2a516" stroke-width="1" stroke-dasharray="1.2 1"/><circle r="1.4" fill="#b07a08"/></g>
<g id="mgR"><circle r="6" fill="url(#mgRg)"/><circle r="6" fill="none" stroke="#7a0616" stroke-width="1.4" stroke-dasharray="1.6 1.3"/><circle r="3.4" fill="none" stroke="#b01226" stroke-width="1" stroke-dasharray="1.2 1"/><circle r="1.5" fill="#f6c445"/></g>
<g id="mango"><path d="M0 0C6 8 6.5 22 0 32-6.5 22-6 8 0 0Z" fill="url(#leafG)" stroke="#1b4a1d" stroke-width=".7"/><path d="M0 3V29" stroke="#b8e09a" stroke-opacity=".55" stroke-width=".8"/></g>
<g id="mango2"><path d="M0 0C6 8 6.5 22 0 32-6.5 22-6 8 0 0Z" fill="url(#leafG2)" stroke="#1b4a1d" stroke-width=".7"/><path d="M0 3V29" stroke="#d6f0b4" stroke-opacity=".55" stroke-width=".8"/></g>
<g id="bell"><path d="M0-7v5" stroke="#b68427" stroke-width="1.4"/><path d="M-7 10C-7 3-4-2 0-2S7 3 7 10Z" fill="url(#goldG)" stroke="#8a5a12" stroke-width=".8"/><path d="M-8.5 10h17" stroke="#8a5a12" stroke-width="1.6" stroke-linecap="round"/><circle cy="12.6" r="2" fill="#b68427"/></g>
<g id="diya"><ellipse cy="-10" rx="18" ry="16" fill="url(#haloG)"/><path d="M-13-1C-10 7 10 7 13-1L9-3C4-1-4-1-9-3Z" fill="#b5541c" stroke="#6b2a0c" stroke-width=".8"/><path d="M-12 0C-9 6 9 6 12 0" fill="none" stroke="#f6c445" stroke-width="1.3" stroke-dasharray="1.6 2"/><ellipse cy="-2.4" rx="9" ry="1.6" fill="#5a2208"/></g>
<path id="flame" d="M0 0C-4.5-5-3.5-12 0-20 3.5-12 4.5-5 0 0Z" fill="url(#flameG)"/>
</defs>
<rect width="600" height="1000" fill="url(#bgG)"/><rect width="600" height="1000" fill="url(#buti)"/>
<g transform="translate(300 390)" fill="none" stroke="#f0c45a" stroke-opacity=".2" stroke-width="1"><circle r="120"/><circle r="152"/><circle r="182"/><g fill="#f0c45a" fill-opacity=".05">${petals(16, 62, 120, 15)}${petals(24, 122, 180, 12)}</g><g fill="#f0c45a" fill-opacity=".35" stroke="none">${dots}</g></g>
<path d="M40 190V978M560 190V978M48 190V978M552 190V978" stroke="#e0b04a" stroke-opacity=".35" stroke-width="1"/>
<circle cx="300" cy="760" r="270" fill="url(#glowG)"/>
${sparkles}
${shikhara(232, 802, 64, 86)}${shikhara(368, 802, 64, 86)}${shikhara(300, 790, 150, 168, true)}
<g filter="url(#raise)"><circle cx="300" cy="716" r="17" fill="#b3122a" stroke="url(#goldG)" stroke-width="2.4"/><text x="300" y="724.5" text-anchor="middle" font-family="'Tiro Devanagari Hindi', 'Kohinoor Devanagari', 'Noto Serif Devanagari', serif" font-size="22" fill="#ffd77a">ॐ</text></g>
<g filter="url(#raise)">
<path d="M252 778H348L338 766H262Z" fill="url(#stoneG)" stroke="#7a3a0c" stroke-width=".8"/><ellipse cx="300" cy="765" rx="18" ry="4.5" fill="url(#goldG)"/><circle cx="300" cy="757" r="5" fill="url(#goldG)" stroke="#7a3a0c" stroke-width=".6"/>
<path d="M238 790H362L350 778H250Z" fill="url(#stoneG)" stroke="#7a3a0c" stroke-width=".8"/>
<path d="M222 804H378L364 790H236Z" fill="url(#stoneG)" stroke="#7a3a0c" stroke-width=".8"/>
<path d="M222 805H378" stroke="#b3122a" stroke-width="3.4"/><path d="M222 808.5H378" stroke="#f6c445" stroke-width="1.2" stroke-dasharray="3 2"/>
<rect x="232" y="810" width="136" height="90" fill="url(#stoneG)" stroke="#7a3a0c" stroke-width="1"/>
${pillars}
<rect x="279" y="824" width="42" height="76" fill="#b3122a" stroke="url(#goldG)" stroke-width="2"/>
<rect x="285" y="832" width="30" height="68" fill="url(#doorG)"/>
<use href="#diya" transform="translate(300 896) scale(.6)"/><g transform="translate(300 893) scale(.6)"><use class="flame" href="#flame"/></g>
${doorToran}
<rect x="206" y="900" width="188" height="14" fill="url(#stoneG)" stroke="#7a3a0c" stroke-width=".8"/><path d="M206 906H394" stroke="#b3122a" stroke-width="3"/>
<rect x="190" y="914" width="220" height="12" fill="url(#stoneG)" stroke="#7a3a0c" stroke-width=".8"/>
<rect x="174" y="926" width="252" height="12" fill="url(#stoneG)" stroke="#7a3a0c" stroke-width=".8"/>
</g>
<g filter="url(#raise)">${heap(196, 924)}${heap(404, 924, -1)}</g>
${kalash(128, 944, 1.15)}${kalash(472, 944, 1.15)}
${rangoli}
${diyas}
<path d="M0 986H600" stroke="url(#goldG)" stroke-width="2"/><rect y="988" width="600" height="12" fill="#4a0812"/>
<g filter="url(#raise)"><rect width="600" height="18" fill="url(#goldG)"/><path d="M0 18H600" stroke="#8a5a12" stroke-width="1.2"/><path d="M0 9H600" stroke="#b3122a" stroke-width="3" stroke-dasharray="10 6"/>${leaves}${swags}</g>
${ladi(150, 26, 150)}${ladi(300, 26, 104)}${ladi(450, 26, 150)}
${ladi(84, 26, 560, 0.9)}${ladi(516, 26, 560, 0.9)}
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

/* ---------- page 1: Shri Ganesha with the shlokas (same artwork & shlokas as the wedding invite) ---------- */
function opening(): string {
  return `<header class="opening" id="top">
  <figure class="opening__art">
    <img class="opening__img" src="images/ganesh-640.webp" srcset="images/ganesh-640.webp 640w, images/ganesh.webp 1024w" sizes="(min-width: 700px) 480px, 92vw" width="640" height="960" alt="Shri Ganesha seated on a golden throne amid flowers and lamps" fetchpriority="high">
    <p class="opening__invocation" lang="sa">॥ श्री गणेशाय नमः ॥</p>
    <figcaption class="opening__shloka" lang="sa">
      <span>वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः ।<br>निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥</span>
      <span>गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः ।<br>गुरुः साक्षात् परब्रह्म तस्मै श्रीगुरवे नमः ॥</span>
    </figcaption>
  </figure>
  <a class="opening__cue" href="#cover"><span>Scroll</span><i aria-hidden="true"></i></a>
</header>`;
}

/* ---------- page 2: cover ---------- */
function cover(): string {
  return `<section class="cover" id="cover">
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
</section>`;
}

/* ---------- page 3: details ---------- */
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

/* ---------- page 4: RSVP + closing ---------- */
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
    opening(),
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
