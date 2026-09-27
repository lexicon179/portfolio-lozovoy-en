import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
// Порядок важен: общие стили ПЕРВЫМИ. Стили компонентов идут в бандл
// в порядке импорта, и при равной специфичности побеждает то, что ниже.
// Если импортировать App раньше, .btn и .reveal из global.css
// перебивают локальные правки компонентов.
import './styles/global.css';
import App from './App';

/**
 * Обычная сборка (для хостинга) — BrowserRouter, чистые адреса /projects.
 *
 * Сборка `npm run build:file` — MemoryRouter: файл открывается с диска,
 * а там origin = null, и любой вызов history.pushState/replaceState
 * падает с SecurityError. MemoryRouter историю браузера не трогает вообще,
 * поэтому переходы между страницами работают и на file://.
 */
const isFileBuild = Boolean(import.meta.env.VITE_FILE_BUILD);
const Router = isFileBuild ? MemoryRouter : BrowserRouter;

// маркер для проверки, какая сборка открыта: <html data-router="memory|browser">
document.documentElement.dataset.router = isFileBuild ? 'memory' : 'browser';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
