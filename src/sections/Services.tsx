import type { ReactNode } from 'react';
import Reveal from '../components/Reveal';
import { services } from '../data/site';
import './Services.css';

/**
 * Иконки услуг: простые штриховые формы, нарисованные под этот блок.
 * Монохром, наследуют цвет текста через currentColor.
 * Порядок совпадает с порядком услуг в src/data/site.ts.
 */
const icons: ReactNode[] = [
  // Growth: ломаная вверх
  <>
    <path d="M3 17L9 11L13 15L21 7" />
    <path d="M15 7H21V13" />
  </>,
  // Performance: мишень
  <>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
  </>,
  // AI content: кадр с play
  <>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M10 9.5L15 12L10 14.5V9.5Z" />
  </>,
  // Launches: стрелка вверх над опорной линией
  <>
    <path d="M12 20V6" />
    <path d="M7 11L12 6L17 11" />
    <path d="M4 21H20" />
  </>,
  // Sales: два узла и связь между ними
  <>
    <circle cx="6" cy="8" r="2.5" />
    <circle cx="18" cy="16" r="2.5" />
    <path d="M8 9.5L16 14.5" />
  </>,
  // PR: точка и расходящиеся от неё волны
  <>
    <circle cx="6" cy="18" r="1.6" />
    <path d="M6 11a7 7 0 0 1 7 7" />
    <path d="M6 5a13 13 0 0 1 13 13" />
  </>,
];

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="shell">
        <div className="section-head">
          <Reveal>
            <h2 className="h2">What I can do</h2>
          </Reveal>
        </div>

        <ul className="services__grid">
          {services.map((service, i) => (
            <li key={service.title}>
              <Reveal delay={(i % 3) * 0.07} className="service">
                <div className="service__head">
                  <span className="service__index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="service__icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {icons[i]}
                    </svg>
                  </span>
                </div>

                <h3 className="service__title">{service.title}</h3>
                <p className="service__text">{service.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
