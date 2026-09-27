# portfolio-lozovoy-en — английская версия

Отдельный проект, независим от русского `portfolio-lozovoy`. Все тексты дословно с Framer
(incomplete-sphinx-085771.framer.app), источник — `assets/framer/_not-images/searchIndex-7oQTbrZPIMWP.json`.

Деплой: Vercel, настройки в `vercel.json`, инструкция в `DEPLOY.md`.

---

# Портфолио — Михаил Лозовой

React + Vite + TypeScript + Framer Motion. На выходе — статика (`dist/`), без бэкенда и БД.

## Запуск

```bash
npm install
npm run dev
```

Открыть http://localhost:5173

## Сборка

```bash
npm run build
```

Результат в `dist/` — это всё, что нужно залить на хостинг.

Проверить сборку локально перед заливкой:

```bash
npm run preview
```

---

## Как добавить кейс

Весь контент кейсов лежит в одном файле: [`src/data/cases.ts`](src/data/cases.ts).

1. Скопируй любой объект в массиве `cases`, поменяй поля.
2. `slug` — латиницей, без пробелов. Это адрес: `/case/<slug>`.
3. `featured: true` — кейс появится в «Избранном» на главной. На `/projects` попадают все кейсы независимо от этого флага.
4. Картинки клади в `public/media/<slug>/`, в данных указывай путь как `/media/<slug>/1.jpg`.
   Если оставить `src: ''` — вместо картинки будет аккуратная заглушка, ничего не сломается.
5. `npm run build` → залить `dist/`.

Порядок кейсов в массиве = порядок на сайте. Ничего больше править не нужно: карточка (`CaseCard`) и страница кейса (`CasePage`) рендерятся из данных единообразно.

## Что ещё правится руками

- [`src/data/site.ts`](src/data/site.ts) — ссылки (Telegram, X, почта), бренды в бегущей строке, метрики, услуги, отзывы.
- `index.html` — `<title>` и описание для поиска и превью ссылок.

## Структура

```
src/
  data/cases.ts        ← кейсы (единственный источник правды)
  data/site.ts         ← ссылки, бренды, метрики, отзывы
  components/          ← CaseCard, Marquee, Reveal, Header, Footer, MediaFigure
  sections/            ← Testimonials, Contact
  pages/               ← Home, Projects, CasePage, NotFound
  styles/global.css    ← палитра, типографика, кнопки
public/
  fonts/               ← шрифты локально (не с внешнего CDN)
```

## Дизайн-токены

Меняются в одном месте — `:root` в [`src/styles/global.css`](src/styles/global.css):

```css
--bg: #f4f4f2;      /* фон */
--ink: #141414;     /* текст */
--accent: #c3f53c;  /* акцент */
--max: 1120px;      /* ширина контента */
```

## Шрифты

Заголовки — **Involve** (веса 700/800), тело — **Manrope**. Всё лежит локально в `public/fonts/` — никаких запросов к Google Fonts, сайт самодостаточен.

**Involve нет на Google Fonts** — это коммерческий шрифт, файлы нужно принести свои. Пока их нет, заголовки рендерятся Manrope 800, вёрстка от этого не ломается.

Чтобы подключить Involve:

1. Положи `involve-700.woff2` и `involve-800.woff2` в `public/fonts/`
2. Раскомментируй блок `INVOLVE` в [`src/styles/fonts.css`](src/styles/fonts.css)

Стек в `global.css` уже ждёт Involve первым номером, больше ничего править не нужно.

## Деплой

См. [DEPLOY.md](DEPLOY.md).
