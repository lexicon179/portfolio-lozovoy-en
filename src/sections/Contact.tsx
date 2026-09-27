import Reveal from '../components/Reveal';
import { links } from '../data/site';
import './Contact.css';

/** Бумажный самолётик Telegram, штрихом — наследует цвет текста */
const PlaneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21.5 3.5L2.5 10.8l6.9 2.6 2.6 6.9 9.5-16.8z" />
    <path d="M9.4 13.4l5.1-5.1" />
  </svg>
);

/** «Let’s talk numbers!» — как на Framer: Telegram кнопкой, остальное ссылками */
export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="shell">
        <Reveal>
          <h2 className="contact__title">Let’s talk numbers!</h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="contact__actions">
            <a
              className="btn btn--dark contact__primary"
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlaneIcon />
              Telegram
            </a>

            <span className="contact__links">
            <a className="contact__link" href={`mailto:${links.email}`}>
              Email
            </a>
            <span className="contact__sep" aria-hidden="true">
              ·
            </span>
            <a
              className="contact__link"
              href={links.x}
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
            <span className="contact__sep" aria-hidden="true">
              ·
            </span>
            <a
              className="contact__link"
              href={links.cv}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
