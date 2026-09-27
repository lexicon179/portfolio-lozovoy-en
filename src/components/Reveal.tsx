import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Задержка в секундах — для каскада внутри секции */
  delay?: number;
  className?: string;
};

/**
 * Появление при скролле: fade + подъём.
 *
 * Наблюдатель — IntersectionObserver, сама анимация живёт в CSS
 * (.reveal / .reveal.is-visible в global.css). Библиотек не используем:
 * правило проекта — анимации на CSS.
 *
 * Класс ставится прямо на DOM-узел, без setState. Блоков с появлением
 * на странице два десятка, и при прокрутке они срабатывают один за
 * другим: перерисовка React на каждый добавляла работу главному потоку
 * ровно в момент скролла.
 *
 * Срабатывает один раз. prefers-reduced-motion обрабатывается в CSS.
 */
export default function Reveal({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // без поддержки наблюдателя показываем сразу, а не прячем контент
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className ? `reveal ${className}` : 'reveal'}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
