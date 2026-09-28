import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Tiles from '../components/Tiles';
import { getCaseBySlug } from '../data/cases';
import { testimonials } from '../data/site';
import './Testimonials.css';

/** Инициалы для аватара-заглушки: «First Last» → «FL» */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

export default function Testimonials() {
  return (
    <section className="section testimonials" id="testimonials">
      <div className="shell">
        <div className="testimonials__panel">
        <div className="section-head">
          <Reveal>
            <h2 className="h2">Testimonials</h2>
          </Reveal>
        </div>

        <ul className="quotes">
          {testimonials.map((t, i) => {
            const study = t.caseSlug ? getCaseBySlug(t.caseSlug) : undefined;
            return (
            <li key={t.name + i}>
              <Reveal delay={i * 0.08} className="quote">
                <div className="quote__person">
                  {t.avatar ? (
                    <img className="quote__avatar" src={t.avatar} alt="" />
                  ) : (
                    <span
                      className="quote__avatar quote__avatar--initials"
                      aria-hidden="true"
                    >
                      {initials(t.name)}
                    </span>
                  )}
                </div>

                <p className="quote__text">“{t.quote}”</p>

                <span className="quote__who">
                  {t.href ? (
                    <a
                      className="quote__name quote__name--link"
                      href={t.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.name}
                    </a>
                  ) : (
                    <span className="quote__name">{t.name}</span>
                  )}
                  <span className="quote__role">{t.role}</span>
                </span>

                {/* Отзыв ведёт в кейс: его цифры и ссылка */}
                {study && (
                  <div className="quote__case">
                    <Tiles items={study.metrics.slice(0, 2)} dark />
                    <Link className="quote__case-link" to={`/case/${study.slug}`}>
                      {study.title} case →
                    </Link>
                  </div>
                )}
              </Reveal>
            </li>
            );
          })}
        </ul>
        </div>
      </div>
    </section>
  );
}
