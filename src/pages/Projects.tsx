import Reveal from '../components/Reveal';
import CaseCard from '../components/CaseCard';
import Contact from '../sections/Contact';
import { cases } from '../data/cases';
import './Projects.css';

export default function Projects() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          {/* Ярлык и абзац под заголовком (есть в RU): на Framer их нет */}
          <Reveal delay={0.06}>
            <h1 className="page-head__title">All work</h1>
          </Reveal>
        </div>
      </section>

      <section className="section projects">
        <div className="shell">
          <div className="case-grid">
            {cases.map((study, i) => (
              <Reveal key={study.slug} delay={(i % 2) * 0.07}>
                <CaseCard study={study} headingLevel={2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
