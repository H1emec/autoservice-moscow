/**
 * Собирает из dist/ автономные HTML-файлы, которые открываются двойным кликом (без сервера):
 * CSS, скрипты, шрифты, картинки и логотипы вшиваются в файл.
 *   npm run build && node scripts/make-standalone.mjs
 * Результат: index.html, privacy.html, credits.html в корне проекта.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const dist = 'dist';
const mime = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.js': 'text/javascript' };

const dataUri = (urlPath) => {
  const clean = urlPath.split('?')[0].replace(/^\//, '');
  const file = join(dist, clean);
  if (!existsSync(file)) throw new Error('Нет файла: ' + file);
  return `data:${mime[extname(file)] ?? 'application/octet-stream'};base64,${readFileSync(file).toString('base64')}`;
};

/** CSS: оставляем шрифты только latin и cyrillic, остальные подмножества отбрасываем */
const inlineCss = (href) => {
  let css = readFileSync(join(dist, href.replace(/^\//, '')), 'utf8');
  css = css.replace(/@font-face\{[^}]*\}/g, (block) => (/(cyrillic(?!-ext)|latin(?!-ext)|armenian)/.test(block) ? block : ''));
  css = css.replace(/url\((\/[^)]+?)\)/g, (_, p) => `url(${dataUri(p)})`);
  return `<style>${css}</style>`;
};

/** JS-модули: импорты общих кусков заменяем на data-URL (рекурсивно), чтобы работало с file:// */
const moduleCache = new Map();
const moduleSource = (file) => {
  if (moduleCache.has(file)) return moduleCache.get(file);
  let js = readFileSync(join(dist, file.replace(/^\//, '')), 'utf8');
  js = js.replace(/(from|import)\s*"\.\/([^"]+\.js)"/g, (_, kw, f) => `${kw}"${moduleUri('/_astro/' + f)}"`);
  moduleCache.set(file, js);
  return js;
};
const moduleUri = (file) => `data:text/javascript;base64,${Buffer.from(moduleSource(file)).toString('base64')}`;
const inlineScript = (src) => `<script type="module">${moduleSource(src)}</script>`;

/** srcset: оставляем один средний вариант, чтобы файл не разрастался */
const pickMid = (srcset) => {
  const parts = srcset.split(',').map((s) => s.trim()).filter(Boolean);
  return parts[Math.min(1, parts.length - 1)].split(/\s+/)[0];
};

const pages = [
  ['index.html', 'index.html'],
  ['privacy/index.html', 'privacy.html'],
  ['credits/index.html', 'credits.html'],
];

for (const [from, to] of pages) {
  let html = readFileSync(join(dist, from), 'utf8');

  html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, h) => inlineCss(h));
  html = html.replace(/<script type="module" src="([^"]+)"><\/script>/g, (_, s) => inlineScript(s));

  // AVIF-источники убираем, остальные srcset сводим к одному файлу
  html = html.replace(/<source[^>]*type="image\/avif"[^>]*>/g, '');
  html = html.replace(/srcset="([^"]+)"/g, (_, v) => `srcset="${pickMid(v)}"`);
  html = html.replace(/\ssizes="[^"]*"/g, '');

  // оставшиеся ссылки на ресурсы сборки и логотипы
  html = html.replace(/\/(_astro|brands)\/[\w.\-]+/g, (m) => dataUri(m));
  html = html.replace(/href="\/favicon\.svg"/g, `href="${dataUri('/favicon.svg')}"`);

  // переходы между страницами
  html = html
    .replace(/href="\/privacy\/?"/g, 'href="privacy.html"')
    .replace(/href="\/credits\/?"/g, 'href="credits.html"')
    .replace(/href="\/(#[\w-]*)"/g, 'href="index.html$1"')
    .replace(/href="\/"/g, 'href="index.html"');

  writeFileSync(to, html);
  console.log(to, (Buffer.byteLength(html) / 1048576).toFixed(1) + ' МБ');
}
