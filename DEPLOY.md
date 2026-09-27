# Деплой на Vercel

Сайт — статика (Vite + React). Всё, что нужно Vercel, лежит в `vercel.json`:

| Настройка | Значение |
|---|---|
| Framework | Vite |
| Install | `npm ci` |
| Build | `npm run build` (сборка + `sitemap.xml`) |
| Output | `dist` |
| Роутинг | `/projects` и `/case/:slug` отдают `index.html`, прямые ссылки на кейсы открываются. Остальные адреса — `404.html` с настоящим статусом 404 |
| Слеш в конце | `/projects/` → редирект на `/projects` |
| Кэш | `/assets/*` и `/fonts/*` на год (имена файлов с хэшем) |

`.htaccess` здесь не нужен: Vercel не Apache.

## Адрес сайта для превью и sitemap

og:url, og:image и sitemap.xml должны быть абсолютными, иначе превью в Telegram
не развернётся. Адрес берётся в `scripts/site-url.mjs` по порядку:

1. `SITE_URL` — переменная окружения в Vercel (Settings → Environment Variables), когда появится свой домен;
2. `VERCEL_PROJECT_PRODUCTION_URL` — Vercel подставляет сам: боевой адрес проекта;
3. запасной `https://mikelozovoy.vercel.app` — для локальной сборки.

## Вариант 1. Через GitHub (автодеплой на каждый push)

```bash
# один раз: создать пустой репозиторий на github.com, затем
git remote add origin git@github.com:<логин>/portfolio-lozovoy-en.git
git push -u origin main
```

Дальше: vercel.com → Add New → Project → Import этот репозиторий → Deploy.
Настройки подтянутся из `vercel.json`, ничего менять не нужно.
Имя проекта `mikelozovoy` даст адрес `mikelozovoy.vercel.app` (если имя свободно).

## Вариант 2. Через Vercel CLI, без GitHub

```bash
npm i -g vercel
vercel login
vercel --prod
```

## После деплоя проверить

- `https://<адрес>/case/main` открывается напрямую, `https://<адрес>/nope` — 404.
- Превью ссылки: отправить адрес в Telegram (или @WebpageBot, чтобы сбросить кэш превью).
- `https://<адрес>/sitemap.xml` и `/robots.txt` отвечают.
