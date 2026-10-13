/**
 * Pure HTML renderers — run at BUILD TIME (vite.config.ts) so the invite is
 * pre-rendered into index.html. main.ts only adds motion & interactivity.
 * Design system shared with the wedding invite: Playfair Display / EB Garamond /
 * Prata / Great Vibes, gold filigree tiles, damask envelope, poured wax seal,
 * side borders, rose-petal shower. Day palette: ivory, champagne gold, deep rose.
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

/* ---------- poured wax seal (same as the wedding invite) ---------- */
const WAX_EDGE = 'M50.0 38.6C50.0 38.6 50.0 38.3 50.1 37.8C50.2 37.3 50.2 36.5 50.5 35.6C50.8 34.7 51.1 33.4 51.7 32.2C52.2 31.1 52.9 30.0 53.8 28.7C54.7 27.5 55.9 25.5 57.1 24.6C58.2 23.7 59.2 23.9 60.7 23.2C62.2 22.4 64.1 20.9 66.1 20.0C68.0 19.1 70.5 18.1 72.5 18.0C74.4 17.9 76.0 18.8 78.0 19.3C79.9 19.8 82.7 19.8 84.3 21.0C85.8 22.1 86.0 24.6 87.3 26.2C88.6 27.7 91.1 28.6 92.2 30.2C93.3 31.8 93.4 34.1 94.0 36.0C94.5 37.8 95.6 39.6 95.7 41.6C95.9 43.5 95.8 45.7 95.0 47.7C94.2 49.7 92.0 51.8 90.8 53.7C89.6 55.7 88.9 57.6 87.6 59.4C86.3 61.3 84.4 63.0 82.8 64.9C81.3 66.8 80.3 69.1 78.5 70.9C76.7 72.8 74.3 74.4 72.2 75.9C70.1 77.4 67.6 78.1 65.7 79.7C63.9 81.4 62.8 84.2 61.3 85.7C59.8 87.2 57.9 87.2 56.7 88.5C55.4 89.8 54.6 92.5 53.8 93.7C52.9 94.9 52.1 94.9 51.6 95.6C51.1 96.2 50.7 96.6 50.5 97.7C50.2 98.8 50.1 101.7 50.1 102.1C50.0 102.6 50.0 100.8 50.0 100.5C50.0 100.1 50.0 99.9 49.9 99.9C49.9 100.0 49.8 101.2 49.5 100.8C49.2 100.5 48.8 99.2 48.3 97.9C47.8 96.5 47.2 94.0 46.3 92.8C45.4 91.6 44.1 91.9 42.9 90.6C41.7 89.3 40.5 86.8 38.9 85.1C37.4 83.5 35.4 82.4 33.7 80.7C32.0 79.0 30.7 76.7 28.7 75.0C26.6 73.4 23.5 72.6 21.5 71.0C19.4 69.3 18.0 67.1 16.2 65.3C14.4 63.4 12.0 61.7 10.4 59.8C8.8 57.9 7.3 55.8 6.6 53.8C5.8 51.8 6.2 49.8 5.9 47.8C5.6 45.8 4.8 43.7 4.8 41.7C4.9 39.8 5.6 37.9 6.3 36.0C7.0 34.2 7.7 32.3 8.8 30.7C9.9 29.1 11.4 27.7 12.8 26.3C14.2 24.9 15.6 23.4 17.1 22.3C18.7 21.1 20.1 19.8 22.1 19.4C24.1 19.1 27.0 20.2 29.0 20.2C30.9 20.2 32.0 19.1 33.7 19.5C35.4 19.9 37.5 21.5 39.1 22.5C40.7 23.6 42.0 24.7 43.2 25.8C44.4 26.8 45.3 27.4 46.2 28.6C47.0 29.8 47.8 31.6 48.4 32.9C48.9 34.1 49.2 35.3 49.5 36.2C49.8 37.0 49.9 37.6 49.9 38.0C50.0 38.5 50.0 38.7 50.0 38.6Z';
const WAX_RIM = 'M50.0 41.8C50.0 41.8 50.0 41.5 50.1 41.2C50.1 40.8 50.2 40.2 50.4 39.5C50.6 38.9 50.9 38.0 51.3 37.1C51.7 36.2 52.3 35.1 52.9 34.2C53.6 33.2 54.5 32.1 55.4 31.2C56.4 30.3 57.5 29.4 58.7 28.7C59.9 27.9 61.3 27.3 62.7 26.9C64.1 26.5 65.7 26.2 67.2 26.2C68.7 26.1 70.3 26.3 71.9 26.7C73.4 27.1 74.9 27.6 76.3 28.4C77.7 29.2 79.1 30.1 80.3 31.2C81.4 32.3 82.5 33.6 83.4 35.0C84.2 36.3 84.9 37.8 85.3 39.3C85.8 40.8 86.0 42.4 86.0 44.0C86.0 45.6 85.8 47.2 85.3 48.8C84.9 50.4 84.2 52.0 83.4 53.6C82.5 55.1 81.4 56.7 80.3 58.2C79.1 59.7 77.7 61.1 76.3 62.6C74.9 64.0 73.4 65.4 71.9 66.7C70.3 68.1 68.7 69.5 67.2 70.8C65.7 72.1 64.1 73.4 62.7 74.6C61.3 75.9 59.9 77.1 58.7 78.3C57.5 79.5 56.4 80.7 55.4 81.7C54.5 82.8 53.6 83.9 52.9 84.9C52.3 85.8 51.7 86.7 51.3 87.5C50.9 88.3 50.6 89.0 50.4 89.5C50.2 90.1 50.1 90.5 50.1 90.8C50.0 91.1 50.0 91.2 50.0 91.2C50.0 91.2 50.0 91.1 49.9 90.8C49.9 90.5 49.8 90.1 49.6 89.5C49.4 89.0 49.1 88.3 48.7 87.5C48.3 86.7 47.7 85.8 47.1 84.9C46.4 83.9 45.5 82.8 44.6 81.7C43.6 80.7 42.5 79.5 41.3 78.3C40.1 77.1 38.7 75.9 37.3 74.6C35.9 73.4 34.3 72.1 32.8 70.8C31.3 69.5 29.7 68.1 28.1 66.7C26.6 65.4 25.1 64.0 23.7 62.6C22.3 61.1 20.9 59.7 19.7 58.2C18.6 56.7 17.5 55.1 16.6 53.6C15.8 52.0 15.1 50.4 14.7 48.8C14.2 47.2 14.0 45.6 14.0 44.0C14.0 42.4 14.2 40.8 14.7 39.3C15.1 37.8 15.8 36.3 16.6 35.0C17.5 33.6 18.6 32.3 19.7 31.2C20.9 30.1 22.3 29.2 23.7 28.4C25.1 27.6 26.6 27.1 28.1 26.7C29.7 26.3 31.3 26.1 32.8 26.2C34.3 26.2 35.9 26.5 37.3 26.9C38.7 27.3 40.1 27.9 41.3 28.7C42.5 29.4 43.6 30.3 44.6 31.2C45.5 32.1 46.4 33.2 47.1 34.2C47.7 35.1 48.3 36.2 48.7 37.1C49.1 38.0 49.4 38.9 49.6 39.5C49.8 40.2 49.9 40.8 49.9 41.2C50.0 41.5 50.0 41.8 50.0 41.8Z';
const WAX_IN = 'M50.0 42.6C50.0 42.6 50.0 42.4 50.0 42.1C50.1 41.7 50.2 41.2 50.4 40.6C50.6 39.9 50.8 39.1 51.2 38.3C51.6 37.5 52.1 36.5 52.7 35.6C53.4 34.7 54.1 33.7 55.0 32.9C55.9 32.0 56.9 31.2 58.1 30.5C59.2 29.8 60.5 29.2 61.8 28.9C63.1 28.5 64.5 28.2 65.9 28.2C67.3 28.2 68.8 28.3 70.2 28.7C71.6 29.0 73.0 29.6 74.3 30.3C75.6 31.0 76.9 31.9 78.0 32.9C79.1 33.9 80.1 35.1 80.8 36.3C81.6 37.6 82.2 38.9 82.7 40.3C83.1 41.7 83.3 43.2 83.3 44.7C83.3 46.1 83.1 47.7 82.7 49.1C82.2 50.6 81.6 52.1 80.8 53.5C80.1 55.0 79.1 56.4 78.0 57.8C76.9 59.2 75.6 60.5 74.3 61.8C73.0 63.2 71.6 64.4 70.2 65.7C68.8 67.0 67.3 68.2 65.9 69.4C64.5 70.6 63.1 71.8 61.8 73.0C60.5 74.1 59.2 75.3 58.1 76.4C56.9 77.5 55.9 78.6 55.0 79.6C54.1 80.6 53.4 81.6 52.7 82.5C52.1 83.3 51.6 84.2 51.2 84.9C50.8 85.6 50.6 86.3 50.4 86.8C50.2 87.3 50.1 87.7 50.0 88.0C50.0 88.2 50.0 88.4 50.0 88.4C50.0 88.4 50.0 88.2 50.0 88.0C49.9 87.7 49.8 87.3 49.6 86.8C49.4 86.3 49.2 85.6 48.8 84.9C48.4 84.2 47.9 83.3 47.3 82.5C46.6 81.6 45.9 80.6 45.0 79.6C44.1 78.6 43.1 77.5 41.9 76.4C40.8 75.3 39.5 74.1 38.2 73.0C36.9 71.8 35.5 70.6 34.1 69.4C32.7 68.2 31.2 67.0 29.8 65.7C28.4 64.4 27.0 63.2 25.7 61.8C24.4 60.5 23.1 59.2 22.0 57.8C20.9 56.4 19.9 55.0 19.2 53.5C18.4 52.1 17.8 50.6 17.3 49.1C16.9 47.7 16.7 46.1 16.7 44.7C16.7 43.2 16.9 41.7 17.3 40.3C17.8 38.9 18.4 37.6 19.2 36.3C19.9 35.1 20.9 33.9 22.0 32.9C23.1 31.9 24.4 31.0 25.7 30.3C27.0 29.6 28.4 29.0 29.8 28.7C31.2 28.3 32.7 28.2 34.1 28.2C35.5 28.2 36.9 28.5 38.2 28.9C39.5 29.2 40.8 29.8 41.9 30.5C43.1 31.2 44.1 32.0 45.0 32.9C45.9 33.7 46.6 34.7 47.3 35.6C47.9 36.5 48.4 37.5 48.8 38.3C49.2 39.1 49.4 39.9 49.6 40.6C49.8 41.2 49.9 41.7 50.0 42.1C50.0 42.4 50.0 42.6 50.0 42.6Z';
const WAX_DOTS = 'M50.0 44.0C50.0 44.0 50.0 43.8 50.0 43.5C50.1 43.2 50.2 42.8 50.3 42.2C50.5 41.7 50.7 41.0 51.0 40.3C51.4 39.5 51.8 38.7 52.4 37.9C52.9 37.1 53.6 36.3 54.3 35.6C55.1 34.8 56.0 34.1 57.0 33.5C58.0 32.9 59.1 32.4 60.2 32.1C61.3 31.8 62.5 31.6 63.8 31.5C65.0 31.5 66.3 31.6 67.5 31.9C68.7 32.2 69.9 32.7 71.1 33.3C72.2 33.9 73.3 34.7 74.2 35.6C75.2 36.5 76.0 37.5 76.7 38.6C77.4 39.6 77.9 40.8 78.3 42.0C78.6 43.2 78.8 44.5 78.8 45.8C78.8 47.1 78.6 48.4 78.3 49.7C77.9 50.9 77.4 52.2 76.7 53.5C76.0 54.7 75.2 55.9 74.2 57.1C73.3 58.3 72.2 59.5 71.1 60.7C69.9 61.8 68.7 62.9 67.5 64.0C66.3 65.1 65.0 66.2 63.8 67.2C62.5 68.3 61.3 69.3 60.2 70.3C59.1 71.3 58.0 72.3 57.0 73.2C56.0 74.2 55.1 75.1 54.3 76.0C53.6 76.9 52.9 77.7 52.4 78.5C51.8 79.3 51.4 80.0 51.0 80.6C50.7 81.2 50.5 81.8 50.3 82.2C50.2 82.7 50.1 83.0 50.0 83.3C50.0 83.5 50.0 83.6 50.0 83.6C50.0 83.6 50.0 83.5 50.0 83.3C49.9 83.0 49.8 82.7 49.7 82.2C49.5 81.8 49.3 81.2 49.0 80.6C48.6 80.0 48.2 79.3 47.6 78.5C47.1 77.7 46.4 76.9 45.7 76.0C44.9 75.1 44.0 74.2 43.0 73.2C42.0 72.3 40.9 71.3 39.8 70.3C38.7 69.3 37.5 68.3 36.2 67.2C35.0 66.2 33.7 65.1 32.5 64.0C31.3 62.9 30.1 61.8 28.9 60.7C27.8 59.5 26.7 58.3 25.8 57.1C24.8 55.9 24.0 54.7 23.3 53.5C22.6 52.2 22.1 50.9 21.7 49.7C21.4 48.4 21.2 47.1 21.2 45.8C21.2 44.5 21.4 43.2 21.7 42.0C22.1 40.8 22.6 39.6 23.3 38.6C24.0 37.5 24.8 36.5 25.8 35.6C26.7 34.7 27.8 33.9 28.9 33.3C30.1 32.7 31.3 32.2 32.5 31.9C33.7 31.6 35.0 31.5 36.2 31.5C37.5 31.6 38.7 31.8 39.8 32.1C40.9 32.4 42.0 32.9 43.0 33.5C44.0 34.1 44.9 34.8 45.7 35.6C46.4 36.3 47.1 37.1 47.6 37.9C48.2 38.7 48.6 39.5 49.0 40.3C49.3 41.0 49.5 41.7 49.7 42.2C49.8 42.8 49.9 43.2 50.0 43.5C50.0 43.8 50.0 44.0 50.0 44.0Z';
let sealId = 0;
/** Poured wax seal in a heart shape: melted edge, raised rim, pressed centre, embossed monogram. */
function waxSeal(cls: string, attrs = ''): string {
  const id = `wax${++sealId}`;
  const mono = `${esc(A[0])}<tspan font-size="12" font-style="italic" dx="1">&amp;</tspan><tspan dx="1">${esc(B[0])}</tspan>`;
  return `<span class="${cls} wax" ${attrs}><svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><defs>
<radialGradient id="${id}a" cx="36%" cy="30%" r="80%"><stop offset="0" stop-color="#b3303f"/><stop offset=".42" stop-color="#6f0e1f"/><stop offset="1" stop-color="#36040d"/></radialGradient>
<radialGradient id="${id}b" cx="60%" cy="66%" r="72%"><stop offset="0" stop-color="#8c1828"/><stop offset=".7" stop-color="#5e0b19"/><stop offset="1" stop-color="#3f0611"/></radialGradient>
<linearGradient id="${id}c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb0b6" stop-opacity=".75"/><stop offset=".5" stop-color="#ffb0b6" stop-opacity="0"/><stop offset="1" stop-color="#2a0008" stop-opacity=".5"/></linearGradient></defs>
<path d="${WAX_EDGE}" fill="url(#${id}a)"/><path d="${WAX_EDGE}" fill="none" stroke="url(#${id}c)" stroke-width="1.4"/>
<path d="${WAX_RIM}" fill="none" stroke="#5a0b19" stroke-opacity=".55" stroke-width="3"/><path d="${WAX_IN}" fill="url(#${id}b)"/>
<path d="${WAX_IN}" fill="none" stroke="url(#${id}c)" stroke-width="1.1" transform="rotate(180 50 50)" opacity=".0"/>
<path d="${WAX_DOTS}" fill="none" stroke="#3d0610" stroke-opacity=".35" stroke-width=".8" stroke-dasharray="1.2 2.2"/>
<path d="M24 28 C 28 20, 36 17, 42 21" fill="none" stroke="#ffe0e3" stroke-opacity=".5" stroke-width="2.6" stroke-linecap="round"/>
<g font-family="'Playfair Display', Georgia, serif" font-weight="600" text-anchor="middle">
<text x="50.6" y="55.2" font-size="19" fill="#ff9fab" fill-opacity=".6">${mono}</text><text x="49.4" y="54" font-size="19" fill="#2a0309" fill-opacity=".85">${mono}</text><text x="50" y="54.6" font-size="19" fill="#5c0a17">${mono}</text></g></svg></span>`;
}

/* ---------- original cover scene: carved ivory-gold arch, chandeliers, roses ---------- */
function vine(x: number, y0: number, len: number): string {
  let d = `M${x} ${y0}`;
  let flowers = '';
  for (let y = y0; y < y0 + len; y += 18) {
    const dx = (rnd() - 0.5) * 10;
    d += `Q${x + dx * 2} ${y + 9} ${x + dx} ${y + 18}`;
    if (rnd() > 0.45) flowers += `<circle cx="${(x + dx + (rnd() - 0.5) * 10).toFixed(1)}" cy="${y + 12}" r="${(2.4 + rnd() * 1.6).toFixed(1)}" fill="${rnd() > 0.5 ? '#e7a3ae' : '#f3d6c8'}"/>`;
    if (rnd() > 0.35) flowers += `<path transform="translate(${(x + dx).toFixed(1)} ${y + 6}) rotate(${Math.round(rnd() * 360)})" d="M0 0C4-4 10-4 13 0 10 4 4 4 0 0Z" fill="#4f6b3a"/>`;
  }
  return `<path d="${d}" fill="none" stroke="#5d6f3e" stroke-width="1.4"/>${flowers}`;
}
function chhatri(cx: number, base: number, w: number): string {
  const h = w * 1.55;
  const top = base - h;
  const domeY = top + w * 0.55;
  const cols = [0.12, 0.38, 0.62, 0.88]
    .map((f) => `<rect x="${(cx - w / 2 + f * w - 3).toFixed(1)}" y="${(domeY + 14).toFixed(1)}" width="6" height="${(base - domeY - 26).toFixed(1)}" fill="url(#stoneG)" stroke="#a88a4c" stroke-width=".8"/>`)
    .join('');
  return `<g><path d="M${cx} ${top - 14}v14" stroke="#a88a4c" stroke-width="2"/><circle cx="${cx}" cy="${top - 16}" r="3" fill="#c8ad72"/>
<path d="M${cx - w * 0.42} ${domeY}C${cx - w * 0.42} ${top + 6} ${cx + w * 0.42} ${top + 6} ${cx + w * 0.42} ${domeY}Z" fill="url(#stoneG)" stroke="#a88a4c" stroke-width="1.2"/>
${Array.from({ length: 7 }, (_, k) => `<path d="M${cx - w * 0.42 + (k + 1) * (w * 0.84) / 8} ${domeY}Q${cx} ${top + 4} ${cx} ${top + 4}" fill="none" stroke="#a88a4c" stroke-opacity=".45" stroke-width=".7"/>`).join('')}
<rect x="${cx - w / 2}" y="${domeY}" width="${w}" height="12" fill="url(#stoneG)" stroke="#a88a4c" stroke-width="1"/>
<path d="M${cx - w / 2} ${domeY + 6}h${w}" stroke="#a88a4c" stroke-dasharray="0 6" stroke-linecap="round" stroke-width="2.4"/>
<rect x="${cx - w / 2 + 6}" y="${domeY + 12}" width="${w - 12}" height="${base - domeY - 24}" fill="#5e1824" fill-opacity=".55"/>
${cols}<rect x="${cx - w / 2 - 4}" y="${base - 12}" width="${w + 8}" height="12" fill="url(#stoneG)" stroke="#a88a4c" stroke-width="1"/></g>`;
}
function plant(cx: number, base: number, s: number): string {
  return `<g transform="translate(${cx} ${base}) scale(${s})" fill="#4f6b3a" stroke="#34481f" stroke-width=".8">${[-62, -35, -12, 12, 38, 64]
    .map((a, k) => `<path transform="rotate(${a})" d="M0 0C${-8 - k} -30 ${-6} -62 0 ${-78 - (k % 2) * 12}C6 -62 ${8 + k} -30 0 0Z" fill="${k % 2 ? '#5f7d45' : '#4f6b3a'}"/>`)
    .join('')}</g>`;
}
function coverScene(): string {
  seed = 11;
  // big palace arch (multifoil), springing at y=540
  const pts = [[70, 540], [118, 440], [178, 352], [250, 286], [300, 250], [350, 286], [422, 352], [482, 440], [530, 540]];
  let archOpen = `M${pts[0][0]} ${pts[0][1]}`;
  for (let k = 1; k < pts.length; k++) archOpen += `A64 64 0 0 1 ${pts[k][0]} ${pts[k][1]}`;
  const arch = `M70 1000V540${archOpen.slice(archOpen.indexOf('A'))}V1000Z`;
  // inner round arch with carved stone frame
  const inner = 'M210 900V560A90 90 0 0 1 390 560V900';
  const balusters = Array.from({ length: 20 }, (_, k) => {
    const x = 12 + k * 30;
    return `<path d="M${x} 960C${x - 7} 950 ${x - 7} 935 ${x} 925C${x + 7} 935 ${x + 7} 950 ${x} 960Z" fill="url(#stoneG)" stroke="#a88a4c" stroke-width=".9"/>`;
  }).join('');
  const sparkles = Array.from({ length: 22 }, () => `<circle class="spk" style="animation-delay:-${(rnd() * 4).toFixed(2)}s" cx="${(100 + rnd() * 400).toFixed(0)}" cy="${(300 + rnd() * 560).toFixed(0)}" r="${(0.8 + rnd() * 1.4).toFixed(1)}"/>`).join('');
  return `<svg class="cover__svg" viewBox="0 0 600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs>
<linearGradient id="cardG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ebe1ca"/><stop offset="1" stop-color="#d6c7a6"/></linearGradient>
<radialGradient id="alcoveG" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="#8a2c3c"/><stop offset=".6" stop-color="#6b1d2c"/><stop offset="1" stop-color="#4d1220"/></radialGradient>
<linearGradient id="stoneG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3ead6"/><stop offset="1" stop-color="#d9c9a5"/></linearGradient>
<linearGradient id="goldG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9d49c"/><stop offset=".5" stop-color="#b39555"/><stop offset="1" stop-color="#8a6c34"/></linearGradient>
<pattern id="carve" width="44" height="44" patternUnits="userSpaceOnUse"><rect width="44" height="44" fill="#ece2cb"/><g fill="none" stroke="#a88a4c" stroke-opacity=".75" stroke-width="1.2" stroke-linecap="round"><path d="M22 4C31 4 36 12 31 18 27 22 22 19 23 15"/><path d="M22 40C13 40 8 32 13 26 17 22 22 25 21 29"/><path d="M4 22C4 13 12 8 18 13 22 17 19 22 15 21"/><path d="M40 22C40 31 32 36 26 31 22 27 25 22 29 23"/></g><circle cx="22" cy="22" r="2" fill="#a88a4c" fill-opacity=".7"/></pattern>
<pattern id="jaali" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M13 0L26 13 13 26 0 13Z" fill="none" stroke="#3f0c17" stroke-opacity=".35" stroke-width="1"/></pattern>
</defs>
<rect width="600" height="1000" fill="url(#cardG)"/>
<rect x="30" y="40" width="540" height="520" fill="url(#carve)"/>
<path d="M30 40H570V1000M30 40V1000" fill="none" stroke="url(#goldG)" stroke-width="3"/>
<path d="M40 50H560" stroke="#a88a4c" stroke-width="1"/>
<path d="${arch}" fill="url(#alcoveG)"/>
<g fill="#3f0c17" fill-opacity=".28"><path d="M110 700C110 600 170 560 200 520 230 560 290 600 290 700Z"/><path d="M320 690C320 610 360 580 390 548 420 580 470 610 470 690Z"/><rect x="100" y="690" width="400" height="200"/><path d="M90 520C120 470 140 460 160 470M500 500C470 460 450 455 430 470" stroke="#3f0c17" stroke-width="6" fill="none"/></g>
<rect x="70" y="600" width="460" height="300" fill="url(#jaali)"/>
<path d="${archOpen}" fill="none" stroke="#8a6c34" stroke-width="30" stroke-opacity=".3"/>
<path d="${archOpen}" fill="none" stroke="url(#goldG)" stroke-width="24"/>
<path d="${archOpen}" fill="none" stroke="#efe5cf" stroke-width="16"/>
<path d="${archOpen}" fill="none" stroke="#a88a4c" stroke-width="2.2" stroke-dasharray="0 8" stroke-linecap="round"/>
<path d="${archOpen}" fill="none" stroke="#7c2233" stroke-width="2" transform="translate(0 10)" stroke-opacity=".6"/>
<path d="M70 540V1000M530 540V1000" stroke="url(#goldG)" stroke-width="24"/><path d="M70 540V1000M530 540V1000" stroke="#efe5cf" stroke-width="16"/>
<path d="M300 250v-26" stroke="#a88a4c" stroke-width="3"/><circle cx="300" cy="218" r="8" fill="url(#goldG)"/>
${vine(128, 445, 150)}${vine(170, 360, 120)}${vine(430, 360, 130)}${vine(472, 445, 140)}${vine(240, 290, 80)}${vine(360, 290, 90)}
<path d="${inner}" fill="#5a1726" fill-opacity=".55"/>
<path d="${inner}" fill="none" stroke="url(#goldG)" stroke-width="26"/><path d="${inner}" fill="none" stroke="url(#stoneG)" stroke-width="20"/>
<path d="${inner}" fill="none" stroke="#a88a4c" stroke-width="2.4" stroke-dasharray="0 7" stroke-linecap="round"/>
<path d="M190 900V600M410 900V600" stroke="#4f6b3a" stroke-width="16" stroke-linecap="round" stroke-opacity=".9"/>
${chhatri(140, 880, 104)}${chhatri(460, 880, 104)}
${plant(255, 900, 0.9)}${plant(345, 900, 0.9)}${plant(60, 920, 0.7)}${plant(540, 920, 0.7)}
<rect x="0" y="900" width="600" height="20" fill="url(#stoneG)" stroke="#a88a4c" stroke-width="1"/>
${balusters}
<rect x="0" y="958" width="600" height="42" fill="url(#stoneG)" stroke="#a88a4c" stroke-width="1"/>
<path d="M0 972H600" stroke="#a88a4c" stroke-dasharray="0 8" stroke-linecap="round" stroke-width="2"/>
<g fill="#f6e3b4">${sparkles}</g>
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
      <span class="plaque__crest" aria-hidden="true"></span>
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
          <li>${icon.pin}<span>${nb(e.venue)}</span></li>
        </ul>
        ${e.dressCode ? `<div class="dress"><span class="dress__label">Dress code</span><span class="dress__value">${esc(e.dressCode)}</span></div>` : ''}
        <div class="btns">
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
      `SUMMARY:${fold(`Engagement · ${A} & ${B}`)}`, `LOCATION:${fold(e.venue)}`,
      `DESCRIPTION:${fold(`${e.timeLabel} — Dress code: ${e.dressCode} — ${e.mapsUrl}`)}`, `URL:${e.mapsUrl}`,
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n') + '\r\n'
  );
}
