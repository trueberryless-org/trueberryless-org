import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const W = 1200;
const H = 630;

const blue600 = "#2563eb";
const blue400 = "#60a5fa";
const blue200 = "#bfdbfe";
const blue50 = "#eff6ff";
const yellow400 = "#fbbf24";
const yellow200 = "#fde68a";
const gray900 = "#111827";
const gray700 = "#374151";
const gray500 = "#6b7280";
const gray400 = "#9ca3af";
const trackRail = "#8b919e";
const trackRailShine = "#b0b5c0";
const trackWood = "#c4956a";
const trackWoodDark = "#a07850";

const segments = [
  [
    [420, -260],
    [520, -80],
    [660, 40],
    [820, 200],
  ],
  [
    [820, 200],
    [1030, 240],
    [1260, 210],
    [1520, 200],
  ],
];

function getPoint(t) {
  const segIdx = Math.min(Math.floor(t * segments.length), segments.length - 1);
  const localT = t * segments.length - segIdx;
  const [p0, p1, p2, p3] = segments[segIdx];
  const u = 1 - localT;
  const x =
    u ** 3 * p0[0] +
    3 * u * u * localT * p1[0] +
    3 * u * localT * localT * p2[0] +
    localT ** 3 * p3[0];
  const y =
    u ** 3 * p0[1] +
    3 * u * u * localT * p1[1] +
    3 * u * localT * localT * p2[1] +
    localT ** 3 * p3[1];

  return [x, y];
}

function getTangent(t) {
  const dt = 0.0005;
  const [x1, y1] = getPoint(Math.max(0, t - dt));
  const [x2, y2] = getPoint(Math.min(1, t + dt));
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;

  return [dx / len, dy / len];
}

function getAngle(t) {
  const [dx, dy] = getTangent(t);

  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

const samples = 360;
const trackPoints = Array.from({ length: samples }, (_, i) => {
  const t = i / (samples - 1);
  const [x, y] = getPoint(t);

  return `${x.toFixed(2)},${y.toFixed(2)}`;
}).join(" ");

const railOffset = 12;

function offsetPath(offset) {
  return Array.from({ length: samples }, (_, i) => {
    const t = i / (samples - 1);
    const [x, y] = getPoint(t);
    const [dx, dy] = getTangent(t);
    const ox = -dy * offset;
    const oy = dx * offset;

    return `${(x + ox).toFixed(2)},${(y + oy).toFixed(2)}`;
  }).join(" ");
}

const leftRailPath = `M ${offsetPath(-railOffset)}`;
const rightRailPath = `M ${offsetPath(railOffset)}`;

const sleeperCount = 140;
const sleepers = Array.from({ length: sleeperCount }, (_, i) => {
  const t = sleeperCount === 1 ? 0 : i / (sleeperCount - 1);
  const [x, y] = getPoint(t);
  const angle = getAngle(t) + 90;

  return `<rect x="${x - 4}" y="${y - 28}" width="8" height="56" rx="3" fill="${trackWood}" stroke="${trackWoodDark}" stroke-width="1" transform="rotate(${angle}, ${x}, ${y})" opacity="0.75" />`;
}).join("");

function engineSVG(x, y, angle) {
  return `<g transform="translate(${x}, ${y}) rotate(${angle})">
    <g transform="scale(-1,1)" filter="url(#shadowStrong)">
      <rect x="-46" y="-28" width="92" height="54" rx="12" fill="${blue600}" />
      <rect x="12" y="-42" width="46" height="34" rx="8" fill="${blue400}" />
      <rect x="21" y="-36" width="29" height="20" rx="6" fill="rgba(255,255,255,0.9)" />
      <rect x="24" y="-34" width="9" height="14" rx="3" fill="rgba(255,255,255,0.4)" />
      <rect x="-34" y="-44" width="16" height="20" rx="6" fill="${gray900}" />
      <circle cx="-26" cy="-50" r="7" fill="${gray400}" opacity="0.5" />
      <circle cx="-34" cy="-60" r="5" fill="${gray400}" opacity="0.3" />
      <circle cx="-42" cy="-70" r="4" fill="${gray400}" opacity="0.15" />
      <circle cx="-54" cy="-2" r="8" fill="${yellow400}" />
      <circle cx="-54" cy="-2" r="4" fill="${yellow200}" />
      <circle cx="-28" cy="4" r="5" fill="${blue400}" opacity="0.6" />
      <circle cx="-10" cy="4" r="5" fill="${blue400}" opacity="0.6" />
      <circle cx="-28" cy="26" r="14" fill="${gray900}" />
      <circle cx="-28" cy="26" r="7" fill="${gray700}" />
      <circle cx="-28" cy="26" r="3" fill="${gray400}" />
      <circle cx="18" cy="26" r="14" fill="${gray900}" />
      <circle cx="18" cy="26" r="7" fill="${gray700}" />
      <circle cx="18" cy="26" r="3" fill="${gray400}" />
      <rect x="48" y="-8" width="14" height="18" rx="4" fill="${gray500}" />
    </g>
  </g>`;
}

function wagonSVG(x, y, angle) {
  return `<g transform="translate(${x}, ${y}) rotate(${angle})">
    <g transform="scale(-1,1)" filter="url(#shadowSoft)">
      <rect x="-40" y="-22" width="80" height="40" rx="12" fill="#f97316" />
      <rect x="-20" y="-10" width="20" height="20" rx="6" fill="#ffd89c" />
      <rect x="6" y="-10" width="20" height="20" rx="6" fill="#ffd89c" opacity="0.75" />
      <circle cx="-22" cy="20" r="11" fill="${gray900}" />
      <circle cx="-22" cy="20" r="6" fill="${gray700}" />
      <circle cx="-22" cy="20" r="2" fill="${gray400}" />
      <circle cx="22" cy="20" r="11" fill="${gray900}" />
      <circle cx="22" cy="20" r="6" fill="${gray700}" />
      <circle cx="22" cy="20" r="2" fill="${gray400}" />
      <rect x="-50" y="-4" width="10" height="16" rx="4" fill="${gray500}" />
    </g>
  </g>`;
}

const engineT = 0.62;
const wagonT = 0.7;
const [engineX, engineY] = getPoint(engineT);
const [wagonX, wagonY] = getPoint(wagonT);
const engineAngle = getAngle(engineT);
const wagonAngle = getAngle(wagonT);

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="65%" stop-color="${blue50}" />
      <stop offset="100%" stop-color="${blue200}" />
    </linearGradient>
    <filter id="shadowStrong" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.15" />
    </filter>
    <filter id="shadowSoft" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#0f172a" flood-opacity="0.12" />
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)" />

  <path d="M ${trackPoints}"
        fill="none"
        stroke="rgba(15,23,42,0.15)"
        stroke-width="70"
        stroke-linecap="round" />

  ${sleepers}

  <path d="${leftRailPath}" fill="none" stroke="${trackRail}" stroke-width="6" stroke-linecap="round" />
  <path d="${rightRailPath}" fill="none" stroke="${trackRail}" stroke-width="6" stroke-linecap="round" />
  <path d="${leftRailPath}" fill="none" stroke="${trackRailShine}" stroke-width="2" stroke-linecap="round" opacity="0.45" />
  <path d="${rightRailPath}" fill="none" stroke="${trackRailShine}" stroke-width="2" stroke-linecap="round" opacity="0.45" />

  ${wagonSVG(wagonX, wagonY, wagonAngle)}
  ${engineSVG(engineX, engineY, engineAngle)}

  <g transform="translate(110, ${H - 190})">
    <text font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="60" font-weight="800" letter-spacing="-1" fill="${gray900}">
      trueberryless<tspan fill="${blue600}">-org</tspan>
    </text>
    <text y="68" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="34" font-weight="600" fill="${gray700}">
      Powering the Developer Journey
    </text>
    <text y="112" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="22" font-weight="400" fill="${gray500}">
      Open source tools for the modern developer ecosystem
    </text>
  </g>

  <rect width="${W}" height="${H}" fill="none" stroke="rgba(17, 24, 39, 0.08)" stroke-width="2" />
</svg>`;

const outputPath = join(__dirname, "..", "public", "images", "og-image.png");

await sharp(Buffer.from(svg)).png().toFile(outputPath);

console.log(`OG image generated at: ${outputPath}`);
console.log(`Dimensions: ${W}x${H}`);
