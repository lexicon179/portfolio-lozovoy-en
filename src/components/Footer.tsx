import { site } from '../data/site';
import './Footer.css';

/** Футер как на Framer: только копирайт */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner shell">
        <p className="footer__copy">{site.copyright}</p>
      </div>
    </footer>
  );
}
