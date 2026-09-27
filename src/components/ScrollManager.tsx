import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * При переходе между страницами — наверх.
 * Если в адресе есть якорь (/#contact) — скроллим к нему.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // ждём кадр, чтобы разметка успела смонтироваться
        requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        );
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  return null;
}
