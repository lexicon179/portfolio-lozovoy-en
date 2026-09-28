import { Link, Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Reveal from '../components/Reveal';
import MediaFigure from '../components/MediaFigure';
import Contact from '../sections/Contact';
import { getCaseBySlug, getNextCase } from '../data/cases';
import './CasePage.css';

const HOME_TITLE = 'Mike Lozovoy · AI-native growth';

/** «**слово**» в тексте буллета → <strong>, как выделено на Framer */
const withBold = (text: string): ReactNode[] =>
  text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith('**') ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        part
      )
    );

/**
 * Шаблон кейса. Раскладка как на Framer: одна колонка 720px —
 * название, роль, период, описание, Key outcome, обложка, Challenge,
 * What I did, Highlights, View project.
 */
export default function CasePage() {
  const { slug = '' } = useParams();
  const study = getCaseBySlug(slug);
  const next = getNextCase(slug);

  useEffect(() => {
    // Формат заголовка как на Framer («{{Title}} — Case Study»), тире заменено на точку-разделитель
    if (study) document.title = `${study.title} · Case Study`;
    return () => {
      document.title = HOME_TITLE;
    };
  }, [study]);

  if (!study) return <Navigate to="/projects" replace />;

  return (
    <>
      <article className="case">
        <div className="case__col">
          <Reveal>
            <Link to="/projects" className="case__back">
              <span aria-hidden="true">←</span> All work
            </Link>
          </Reveal>

          <header className="case__head">
            <Reveal>
              <h1 className="case__title">{study.title}</h1>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="eyebrow case__role">{study.role}</p>
              <p className="case__period">{study.period}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="case__summary">{study.summary}</p>
            </Reveal>
          </header>

          {study.metrics.length > 0 && (
            <section className="case__block">
              <Reveal>
                <p className="eyebrow case__kicker">Key outcome</p>
                <ul className="case-metrics">
                  {study.metrics.map((m) => (
                    <li className="case-metrics__item" key={m.label}>
                      <span className="case-metrics__value">{m.value}</span>
                      <span className="case-metrics__label">{m.label}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>
          )}

          <section className="case__block case__cover">
            <Reveal>
              <MediaFigure item={study.cover} eager />
            </Reveal>
          </section>

          <section className="case__block">
            <Reveal>
              <h2 className="case__h2">Challenge</h2>
              <p className="case__body">{study.challenge}</p>
            </Reveal>
          </section>

          {study.whatIDid.length > 0 && (
            <section className="case__block">
              <Reveal>
                <h2 className="case__h2">What I did</h2>
                <ul className="case__list">
                  {study.whatIDid.map((item, i) => (
                    <li key={i}>{withBold(item)}</li>
                  ))}
                </ul>
              </Reveal>
            </section>
          )}

          {study.gallery && study.gallery.length > 0 && (
            <section className="case__block">
              <Reveal>
                <h2 className="case__h2">Highlights</h2>
                {study.gallery.some((item) => item.href) && (
                  <p className="case__hint">
                    Click ‘View post’ to see the original.
                  </p>
                )}
              </Reveal>
              <div className="gallery-ribbon">
                {study.gallery.map((item) => (
                  <Reveal key={item.src}>
                    <MediaFigure item={item} card />
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {study.link && (
            <section className="case__block">
              <Reveal>
                <a
                  className="btn btn--dark case__project"
                  href={study.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View project
                  <span className="btn__arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </Reveal>
            </section>
          )}
          {/* Следующий кейс — по кругу; в той же колонке, что и кейс */}
          {next && next.slug !== study.slug && (
            <section className="case__next">
              <Link to={`/case/${next.slug}`} className="case__next-link">
                <span className="eyebrow">Next case</span>
                <span className="case__next-title">
                  {next.title}
                  <span className="btn__arrow" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </Link>
            </section>
          )}
        </div>
      </article>

      <Contact narrow />
    </>
  );
}
