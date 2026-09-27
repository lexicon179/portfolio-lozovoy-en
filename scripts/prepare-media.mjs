/**
 * Раскладывает скачанные с Framer оригиналы по public/media/<slug>/
 * и делает по две ширины на слот: 1x = 880px, 2x = 1760px.
 *
 * Слот в вёрстке — колонка контента кейса, максимум ~856px.
 *
 * Имена в источнике — хеши CDN, поэтому маппинг задан явно ниже
 * (в разметке Framer часть файлов помечена .png, а CDN отдаёт jpeg,
 * поэтому ищем по имени без расширения).
 *
 * Запуск: npm run media
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// Источники: выгрузка с Framer плюс файлы, которые кладём руками
const SRC_DIRS = ['assets/framer', 'assets/custom'];
const OUT = 'public/media';

const W1X = 880;
const W2X = 1760;

/** slug → список исходных файлов в порядке показа */
const MAP = {
  main: [
    'QdA73aKMD5IibjXOaexWTLT5cM',
    'InWmZ5SoA9Fau5qvDuXCCJsA1oE',
    'KbNZ0HbGSA0IRY0Mefptz99fF8',
    'r7BWzPSSubtgUQEf5vQscsDOFUg',
    'zMBmIqSoK409QtU5sEfIV8gtk',
    'vlV6YxhuvbZOzZLlBSNjQejrkg8',
    'LzWZ41jkeZkqdnfgspEBE3ZXSro',
    'RmIWTc4TNb9PtNaUtv7Uj8rLRU',
  ],
  pill: [
    '96KutHWfvfEJamqdv37koOUyoE',
    'LhdgyjoSMeIe9ZdQrIjuA3WCeI',
    'RrtKie2EPpWCYihZZJixs1gP0',
    'LvwaOpdNZTH7UmtRLBbOrr3hgWQ',
    'C0bw6fgtYAojIc003WUJuKg4Mek',
    'JKTqQf54gmvo204AcvxfKpJCzII',
    'M2wl74JrIpQNaMwE63nH15pEc',
    '3FneU2MoQ3eBmfe0fE0U1gQZaVs',
    'fs2nHqqZJVpNUE7hiolvMxybwDE',
    'LOJEdX4mx5uz15Ki1VlJtItZc',
    '9uZrsAlptewhrDocFEIjDJ0qzs',
  ],
  'algebra-finance': [
    't4Hy9aQ2VAKWhCKM7IOBmuetCcI',
    'mKudSX2sQtt4y3lSQUl6SEhXGpU',
    'knGvrVRceAXcwklAI5N6G0s4Qs',
    'ihwdp3A0sV8SHxcuzsE7cDkNN38',
    'AVm7n5mvkqbDRNHLNxi1rCBZE',
    'AmP0Amh90GaLYjw1OJoF30ZbzA',
    'gXLn5hgMjq87SC9Aa1Z5RCwonpM',
    'wi6GoKYDUqaVw3ZDdC1v6rsSpbQ',
  ],
  dich: [
    'ITnLmqrwQTs2FxRXjGhX1ZY6TK0',
    'RtNuAgf71LtPqCEZvRjD5Sfd58',
    'g9NBjXwuwD5xt7IMbOU9azvTo',
    'kCH0DUu1GQkULesRftUDR9oRVEY',
    'ttdSNgqM82jlN8aHXW4VR5Ejnk',
    '799C7V0QO9sfP9YpNP6VXPIcis',
    'WvEbAWUVtd5gk9XN7N40q0mVn0',
  ],

  // короткие кейсы: обложка, у двух — хайлайты, как на Framer
  'talent-protocol': ['wRkbGThnziFrvNtjpZFTs3bAQw'],
  'yandex-practicum': ['PU9kVwxqd2qufy3nDa1qRw52A'],
  cleverbots: ['NP81ejb2TDtJHSd4k6E8Vw5Rzw'],
  cyberconnect: ['UhcVgqwratBrUe8BDHJb7ungB3w'],
  'performance-marketing': ['VKW4bBdd58y3zyZ13k3kpOUSA'],
  'earlier-crypto-roles': [
    'VrxnnrxwgKYk4AUuhrTI3vUBAOs',
    't65oHR4pFHKF1Fcp5bgdexgnMnQ',
    '7psmxNoLcjQIZhITcNggAbfMNOQ',
  ],
  'personal-brand-tiktok': [
    'cJV8QzCHnO7QIj6Fi5XQAqKq20w',
    'drMCWYi2l549oGry1GEOT9UBrRE',
  ],
};

// плоский список «имя без расширения → полный путь» по всем источникам
const index = new Map();
for (const dir of SRC_DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    const stem = f.replace(/\.[a-z0-9]+$/i, '');
    if (!index.has(stem)) index.set(stem, path.join(dir, f));
  }
}

const findByStem = (stem) => index.get(stem);

const dims = (p) => {
  const o = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', p], {
    encoding: 'utf8',
  });
  return {
    w: +/pixelWidth: (\d+)/.exec(o)[1],
    h: +/pixelHeight: (\d+)/.exec(o)[1],
  };
};

// Чистим выход целиком: иначе при смене формата исходника рядом
// остаётся файл со старым расширением, и сайт продолжает показывать его.
fs.rmSync(OUT, { recursive: true, force: true });

const missing = [];
const report = [];

for (const [slug, stems] of Object.entries(MAP)) {
  const dir = path.join(OUT, slug);
  fs.mkdirSync(dir, { recursive: true });

  stems.forEach((stem, i) => {
    const src = findByStem(stem);
    if (!src) {
      missing.push(`${slug}: ${stem}`);
      return;
    }

    const srcExt = path.extname(src).slice(1).toLowerCase();
    const n = String(i + 1).padStart(2, '0');
    const base = `${slug}-${n}`;
    const srcPath = src; // findByStem уже вернул полный путь
    const { w, h } = dims(srcPath);

    // PNG-скриншоты весят в разы больше нужного, а webp sips умеет читать,
    // но не умеет записывать (падает с кодом 13). И то и другое отдаём
    // производными в JPEG. Оригиналы в assets/framer не трогаем.
    const hasAlpha = /hasAlpha: yes/.test(
      execFileSync('sips', ['-g', 'hasAlpha', srcPath], { encoding: 'utf8' })
    );
    const toJpeg = (srcExt === 'png' || srcExt === 'webp') && !hasAlpha;
    const ext = toJpeg ? 'jpg' : srcExt;

    for (const [width, name] of [
      [W1X, `${base}.${ext}`],
      [W2X, `${base}@2x.${ext}`],
    ]) {
      const dst = path.join(dir, name);
      const args = [];
      if (w > width) args.push('-Z', String(width));
      if (toJpeg) args.push('-s', 'format', 'jpeg', '-s', 'formatOptions', '80');

      if (args.length === 0) fs.copyFileSync(srcPath, dst);
      else
        execFileSync('sips', [...args, srcPath, '--out', dst], {
          stdio: 'ignore',
        });
    }

    const out1 = path.join(dir, `${base}.${ext}`);
    report.push({
      slot: `${slug}-${n}`,
      src: path.basename(src),
      orig: `${w}x${h}`,
      ratio: (w / h).toFixed(2),
      kb1x: (fs.statSync(out1).size / 1024).toFixed(0),
    });
  });
}

console.log('\n  слот           исходник (px)   соотношение   1x, КБ');
console.log('  ' + '-'.repeat(56));
for (const r of report)
  console.log(
    `  ${r.slot.padEnd(15)}${r.orig.padEnd(16)}${r.ratio.padEnd(14)}${r.kb1x}`
  );

const total = report.reduce((s, r) => s + +r.kb1x, 0);
console.log(`\n  слотов: ${report.length}, суммарно 1x: ${(total / 1024).toFixed(1)} МБ`);
if (missing.length) {
  console.log('\n  НЕ НАЙДЕНЫ:');
  missing.forEach((m) => console.log('   ', m));
}
