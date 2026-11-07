// Генерирует из project.json превью ссылки (og.png 1200×630), favicon.svg и PNG-иконки.
// Запускается перед каждой сборкой: npm run build (или отдельно npm run og).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const project = JSON.parse(readFileSync(here('../../project.json'), 'utf8'));
const publicDir = here('../public/');
mkdirSync(publicDir, { recursive: true });

const BG = '#161614';
const FG = '#f2f2ee';
const MUTED = '#a3a39b';
const ACCENT = '#8b85ff';
const FONT = "system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif";

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Грубый перенос заголовка по словам: resvg не умеет переносить текст сам. */
function wrap(text, maxChars) {
    const lines = [];
    let line = '';
    for (const word of String(text).split(/\s+/)) {
        if ((line + ' ' + word).trim().length > maxChars && line) {
            lines.push(line);
            line = word;
        } else {
            line = (line + ' ' + word).trim();
        }
    }
    if (line) lines.push(line);
    return lines.slice(0, 3);
}

const host = (project.url ?? `https://${project.slug}.bezmagii.site`).replace(/^https?:\/\//, '').replace(/\/$/, '');
const badge = project.number > 0 ? `Сайт через день #${project.number}` : 'Сайт через день';
const titleLines = wrap(project.title, 22);
const titleSize = titleLines.length > 2 ? 76 : 92;

// Каталог — лицо блога: бумажный фон и кот за клавиатурой и монитором (public/mascot/cat.svg) вместо плашки.
const PAPER = '#fbf5ea';
const INK = '#1b1b1f';
const INK_MUTED = '#6f6453';
const MARKER = '#ffd25a';
const CAT_ORANGE = '#f2a65a';
const catSvg = readFileSync(here('../public/mascot/cat.svg'), 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace('<svg ', '<svg x="716" y="160" width="468" height="351" ');

const og =
    project.number === 0
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <text x="80" y="128" font-family="${FONT}" font-size="34" fill="${INK_MUTED}">Челлендж блога <tspan font-weight="800" fill="${INK}">Без маг</tspan><tspan font-weight="800" fill="${CAT_ORANGE}">ИИ</tspan></text>
  <text x="80" y="250" font-family="${FONT}" font-size="112" font-weight="800" letter-spacing="-4" fill="${INK}">Сайт</text>
  <rect x="70" y="318" width="590" height="46" rx="18" fill="${MARKER}" transform="rotate(-1.2 365 341)"/>
  <text x="80" y="356" font-family="${FONT}" font-size="112" font-weight="800" letter-spacing="-4" fill="${INK}">через день</text>
  ${wrap((project.description ?? '').split('. ')[0].replace(/\.?$/, '.'), 36)
      .slice(0, 2)
      .map((line, i) => `<text x="80" y="${440 + i * 46}" font-family="${FONT}" font-size="34" fill="${INK_MUTED}">${esc(line)}</text>`)
      .join('\n  ')}
  <text x="80" y="560" font-family="${FONT}" font-size="32" font-weight="700" fill="${INK}">${esc(host)}</text>
  ${catSvg}
  <rect x="740" y="500" width="440" height="10" rx="5" fill="${INK}"/>
</svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="80" y="80" width="${badge.length * 17 + 48}" height="56" rx="28" fill="${ACCENT}"/>
  <text x="104" y="118" font-family="${FONT}" font-size="30" font-weight="700" fill="#0f0e1c">${esc(badge)}</text>
  ${titleLines
      .map((line, i) => `<text x="80" y="${250 + i * (titleSize + 10)}" font-family="${FONT}" font-size="${titleSize}" font-weight="800" fill="${FG}">${esc(line)}</text>`)
      .join('\n  ')}
  ${wrap(project.description ?? '', 48)
      .slice(0, 2)
      .map((line, i) => `<text x="80" y="${250 + titleLines.length * (titleSize + 10) + 20 + i * 46}" font-family="${FONT}" font-size="36" fill="${MUTED}">${esc(line)}</text>`)
      .join('\n  ')}
  <text x="80" y="550" font-family="${FONT}" font-size="32" fill="${MUTED}">${esc(host)}</text>
  <text x="1120" y="550" text-anchor="end" font-family="${FONT}" font-size="32" font-weight="700" fill="${FG}">Без маг<tspan fill="${ACCENT}">ИИ</tspan></text>
</svg>`;

const iconLabel = project.number > 0 ? String(project.number) : 'Б';
const iconSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${BG}"/>
  <text x="32" y="43" text-anchor="middle" font-family="${FONT}" font-size="${iconLabel.length > 2 ? 24 : 30}" font-weight="800" fill="${ACCENT}">${esc(iconLabel)}</text>
</svg>`;

const render = (svg, width) =>
    new Resvg(svg, { fitTo: { mode: 'width', value: width }, font: { loadSystemFonts: true, defaultFontFamily: 'Helvetica' } }).render().asPng();

writeFileSync(`${publicDir}og.png`, render(og, 1200));
const avatar = readFileSync(here('../public/mascot/avatar.svg'), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const icon = project.number === 0 ? () => avatar : iconSvg;
writeFileSync(`${publicDir}favicon.svg`, project.number === 0 ? avatar : iconSvg(64));
writeFileSync(`${publicDir}apple-touch-icon.png`, render(icon(180), 180));
writeFileSync(`${publicDir}icon-192.png`, render(icon(192), 192));
writeFileSync(`${publicDir}icon-512.png`, render(icon(512), 512));
console.log(`og: ${badge} · ${project.title} → public/og.png + иконки`);
