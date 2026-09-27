import type { CaseMedia } from '../data/cases';
import './MediaFigure.css';

type Props = {
  item: CaseMedia;
  /** Обложки грузим сразу, остальное лениво */
  eager?: boolean;
  /**
   * Ширина слота для браузера. По умолчанию колонка хайлайтов.
   * Обложка шире: она занимает весь контейнер, и ей нужно своё значение,
   * иначе браузер возьмёт файл поменьше и картинка будет мылить.
   */
  sizes?: string;
};

/**
 * Слот под изображение кейса.
 *
 * Единое соотношение сторон задаётся в CSS, картинка обрезается по слоту
 * через object-fit: cover. Заглушек нет: нет файла — нет слота, так что
 * рендерим только то, что реально существует.
 */
export default function MediaFigure({
  item,
  eager = false,
  sizes = '(max-width: 760px) 100vw, 720px',
}: Props) {
  return (
    <figure className="media">
      <div
        className="media__frame"
      >
        <img
          src={item.src}
          /* ширины, а не 1x/2x: по меткам плотности браузер выбирает файл
             только по экрану и на телефоне тянет версию 1760px в слот
             шириной 350px. По ширинам он учитывает размер слота. */
          srcSet={`${item.src} 880w, ${item.src2x} 1760w`}
          sizes={sizes}
          alt={item.alt}
          style={item.focus ? { objectPosition: item.focus } : undefined}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>

      {(item.caption || item.href) && (
        <figcaption className="media__caption">
          {item.caption && <span>{item.caption}</span>}
          {item.href && (
            <a
              className="media__link"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              View post →
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
}
