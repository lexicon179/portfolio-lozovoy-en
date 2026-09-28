import Reveal from '../components/Reveal';
import { services } from '../data/site';
import './Services.css';

/**
 * «What I can do»: шесть карточек 3×2. Та же карточка, что у кейсов:
 * белая, без рамки, подъём на наведении. Номер — тихая подпись.
 */
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
                <span className="service__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
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
