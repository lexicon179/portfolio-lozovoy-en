/**
 * Рендер превью-картинки для ссылок: scripts/og-card.html -> public/og.jpg (1200x630).
 *
 * Запускается вручную, только когда меняется текст на карточке.
 * Готовый og.jpg лежит в public и попадает в сборку как есть, так что
 * для обычного деплоя этот скрипт не нужен.
 *
 * Нужен puppeteer-core и установленный Chrome:
 *   npm i -D puppeteer-core
 *   node scripts/og-image.mjs
 * Путь к браузеру можно задать через CHROME=/path/to/chrome.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CARD = path.join(root, 'scripts', 'og-card.html');
const OUT = path.join(root, 'public', 'og.jpg');

const CHROME =
  process.env.CHROME ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const { default: puppeteer } = await import('puppeteer-core');

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'shell',
  args: ['--allow-file-access-from-files', '--force-device-scale-factor=1'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(CARD).href, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);

await page.screenshot({
  path: OUT,
  type: 'jpeg',
  quality: 88,
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});

await browser.close();

const kb = Math.round(fs.statSync(OUT).size / 1024);
console.log(`og.jpg готов: ${kb} КБ`);
