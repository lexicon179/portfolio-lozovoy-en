/**
 * Скачивает Onest (заголовки) и Manrope (текст) в public/fonts и
 * генерирует src/styles/fonts.css.
 *
 * Правила проекта (CLAUDE.md):
 *   - ни одного обращения к внешнему CDN в проде: файлы лежат локально;
 *   - сабсет кириллицы и латиницы, greek и прочее не тянем;
 *   - два начертания на семейство, не больше;
 *   - font-display: swap.
 *
 * Оба семейства на Google Fonts вариативные: один файл покрывает весь
 * диапазон весов. Поэтому на подмножество пишем ОДИН файл и два правила
 * @font-face с нужными весами — так и вес зафиксирован, и вес файла минимален.
 *
 * Запуск: npm run fonts
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const OUT_DIR = 'public/fonts';
const CSS_OUT = 'src/styles/fonts.css';

// сабсеты: только кириллица и латиница
const KEEP = ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'];

const FAMILIES = [
  { name: 'Onest', weights: [700, 800] },   // заголовки
  { name: 'Manrope', weights: [400, 600] }, // текст
];

await fs.mkdir(OUT_DIR, { recursive: true });

const blocks = [];

for (const { name, weights } of FAMILIES) {
  const url =
    `https://fonts.googleapis.com/css2?family=${name}:wght@` +
    weights.join(';') +
    '&display=swap';

  const css = await (await fetch(url, { headers: { 'User-Agent': UA } })).text();

  // из ответа берём по одному источнику на подмножество
  const bySubset = new Map();
  for (const chunk of css.split('/*').slice(1)) {
    const subset = chunk.slice(0, chunk.indexOf('*/')).trim();
    if (!KEEP.includes(subset) || bySubset.has(subset)) continue;
    const body = chunk.slice(chunk.indexOf('*/') + 2);
    bySubset.set(subset, {
      src: /url\((https:[^)]+)\)/.exec(body)[1],
      range: /unicode-range: ([^;]+);/.exec(body)[1],
    });
  }

  for (const subset of KEEP) {
    const item = bySubset.get(subset);
    if (!item) {
      console.warn(`  ! ${name}: нет подмножества ${subset}`);
      continue;
    }

    const file = `${name.toLowerCase()}-${subset}.woff2`;
    const buf = Buffer.from(
      await (await fetch(item.src, { headers: { 'User-Agent': UA } })).arrayBuffer()
    );
    await fs.writeFile(path.join(OUT_DIR, file), buf);
    console.log(`  ${file.padEnd(28)} ${(buf.length / 1024).toFixed(0)} КБ`);

    for (const w of weights) {
      blocks.push(
        `/* ${name} ${w} — ${subset} */\n` +
          `@font-face {\n` +
          `  font-family: '${name}';\n` +
          `  font-style: normal;\n` +
          `  font-weight: ${w};\n` +
          `  font-display: swap;\n` +
          `  src: url(/fonts/${file}) format('woff2');\n` +
          `  unicode-range: ${item.range};\n` +
          `}`
      );
    }
  }
}

const header = `/* ---------------------------------------------------------------
   ШРИФТЫ. Заголовки — Onest, текст — Manrope.

   Всё локально в public/fonts. Ни одного обращения к внешним CDN:
   требование доступности из РФ. Проверка — грепом по имени домена,
   поэтому в этом файле имён доменов быть не должно.

   Два начертания на семейство: Onest 700/800, Manrope 400/600.
   Сабсеты — только кириллица и латиница.

   Файл сгенерирован: npm run fonts (scripts/fetch-fonts.mjs).
   Руками не править — перезапиши скриптом.
   --------------------------------------------------------------- */

`;

await fs.writeFile(CSS_OUT, header + blocks.join('\n\n') + '\n');
console.log(`\n  правил @font-face: ${blocks.length}`);
