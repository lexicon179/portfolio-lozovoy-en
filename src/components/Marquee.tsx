import './Marquee.css';

type Props = {
  label: string;
  items: string[];
  /** Длительность одного полного цикла, сек. Больше = медленнее. */
  duration?: number;
};

/**
 * Сколько раз набор брендов повторяется внутри одной половины ленты.
 *
 * Ограничение с двух сторон:
 *  - снизу: половина должна быть шире экрана, иначе на 4K справа видна
 *    пустота. Один набор на 4K ~3160px при ширине экрана 3840.
 *  - сверху: вся лента — один постоянно анимируемый слой. Если он шире
 *    лимита текстуры видеокарты (~16384 физ. px), браузер перерисовывает
 *    его кусками каждый кадр, и страница лагает при скролле.
 *
 * При 3 повторах на 4K слой был 19–21 тыс. px — выше лимита.
 * 2 повтора: ~12.6–14 тыс. px и экран всё ещё перекрыт с запасом.
 */
const COPIES = 2;

/**
 * Бесконечная бегущая строка с названиями брендов.
 *
 * Лента из двух одинаковых половин едет на -50%, поэтому шов не виден.
 * Время цикла умножается на число повторов: путь стал длиннее,
 * а скорость движения должна остаться прежней.
 * Анимация на CSS, не на JS.
 */
export default function Marquee({ label, items, duration = 34 }: Props) {
  const half = Array.from({ length: COPIES }, () => items).flat();
  const lane = [...half, ...half];

  return (
    <section className="marquee" aria-label={label}>
      <div className="marquee__label">{label}</div>

      <div className="marquee__viewport">
        <div
          className="marquee__track"
          style={{ animationDuration: `${duration * COPIES}s` }}
        >
          {lane.map((item, i) => (
            <span
              className="marquee__item"
              key={`${item}-${i}`}
              aria-hidden={i >= items.length}
            >
              {item}
              <span className="marquee__dot" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
