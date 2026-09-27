import { Link } from 'react-router-dom';
import Marquee from '../components/Marquee';
import Reveal from '../components/Reveal';
import CaseCard from '../components/CaseCard';
import Services from '../sections/Services';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';
import { featuredCases } from '../data/cases';
import { brands, links, stats } from '../data/site';
import './Home.css';

/**
 * Главная. Раскладка и тексты повторяют Framer:
 * тёмный hero с цифрами → «Worked with» → био крупно → услуги →
 * избранные кейсы → отзывы на тёмной плашке → контакты.
 */
export default function Home() {
  return (
    <>
      {/* ——— HERO: скруглённая тёмная карточка, как плашка отзывов ——— */}
      <section className="hero">
        <div className="shell">
          <div className="hero__panel">
            {/* Имя уже в шапке: вместо него статус, как в русской версии */}
            <div className="hero__top">
              <span className="status">
                <span className="status__dot" aria-hidden="true" />
                Available for work
              </span>
              <p className="eyebrow hero__kicker">
                <span className="hero__sep" aria-hidden="true">
                  ·{' '}
                </span>
                <span className="nowrap">AI-native</span> growth
              </p>
            </div>

            <h1 className="hero__title">Growth that doesn’t burn budget</h1>

            <p className="hero__sub">
              AI-native growth marketer. I own the result.
            </p>

            <div className="hero__actions">
              <a
                className="btn btn--light hero__cta"
                href={links.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Let’s talk
                <span className="btn__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>

            <ul className="hero__stats" aria-label="Results">
              {stats.map((m) => (
                <li className="hero__stat" key={m.label}>
                  <span className="hero__stat-value">{m.value}</span>
                  <span className="hero__stat-label">{m.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ——— WORKED WITH ——— */}
      <Marquee label="Worked with" items={brands} />

      <div className="shell">
        <hr className="rule" />
      </div>

      {/* ——— БИО ——— */}
      <section className="about" id="about">
        <div className="shell">
          <Reveal>
            <p className="about__text">
              5+ years growing communities and content in fintech. AI product
              sales to Philip Morris, Colgate, and Sanofi. As Head of Growth,
              took an app we built to 15K daily active users at peak. Big
              results on small budgets, mostly with AI.
            </p>
          </Reveal>
        </div>
      </section>

      <Services />

      <div className="shell">
        <hr className="rule" />
      </div>

      {/* ——— SELECTED WORK ——— */}
      <section className="section work" id="work">
        <div className="shell">
          <div className="section-head">
            <Reveal>
              <h2 className="h2">Selected work</h2>
            </Reveal>
          </div>

          <div className="case-grid">
            {featuredCases.map((study, i) => (
              <Reveal key={study.slug} delay={(i % 2) * 0.07}>
                <CaseCard study={study} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="work__more">
              <Link className="btn btn--dark btn--square" to="/projects">
                View all work →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Testimonials />
      <Contact />
    </>
  );
}
