import type { CaseMetric } from '../data/cases';
import './Tiles.css';

type Props = {
  items: CaseMetric[];
  /** Тёмный вариант — для карточек на тёмной плашке (отзывы) */
  dark?: boolean;
};

/** Цифры плитками: число сверху, подпись снизу. Не больше двух в ряд. */
export default function Tiles({ items, dark = false }: Props) {
  if (items.length === 0) return null;
  return (
    <ul className={`tiles${dark ? ' tiles--dark' : ''}`}>
      {items.map((m) => (
        <li className="tile" key={m.label}>
          <span className="tile__value">{m.value}</span>
          <span className="tile__label">{m.label}</span>
        </li>
      ))}
    </ul>
  );
}
