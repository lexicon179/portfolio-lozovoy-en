import { Link } from 'react-router-dom';
import type { CaseStudy } from '../data/cases';
import Tiles from './Tiles';
import './CaseCard.css';

type Props = {
  study: CaseStudy;
  /** Уровень заголовка: на /projects карточки идут сразу под h1 */
  headingLevel?: 2 | 3;
};

/** Карточка кейса: обложка, название, описание и две цифры плитками. */
export default function CaseCard({ study, headingLevel = 3 }: Props) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <Link to={`/case/${study.slug}`} className="case-card">
      <div className="case-card__cover">
        <img
          src={study.cover.src}
          /* ширины, а не 1x/2x: иначе на телефоне качается версия 1760px
             в слот шириной ~350px */
          srcSet={`${study.cover.src} 880w, ${study.cover.src2x} 1760w`}
          sizes="(max-width: 760px) 100vw, 524px"
          alt={study.cover.alt}
          style={
            study.cover.focus
              ? { objectPosition: study.cover.focus }
              : undefined
          }
          loading="lazy"
          decoding="async"
        />
      </div>

      <Heading className="case-card__title">{study.title}</Heading>
      <p className="case-card__summary">{study.summary}</p>
      <div className="case-card__tiles">
        <Tiles items={study.metrics.slice(0, 2)} />
      </div>
    </Link>
  );
}
