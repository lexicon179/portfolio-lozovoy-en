import { Link, useLocation } from 'react-router-dom';
import { links, site } from '../data/site';
import './Header.css';

/** Якоря ведут на главную: с внутренних страниц — через "/#id". */
const nav = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <header className="header">
      <div className="header__inner shell">
        <Link to="/" className="header__logo" aria-label="Home">
          {site.name}
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          {nav.map((item) => (
            <a key={item.href} href={isHome ? item.href : `/${item.href}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="btn btn--dark header__cta"
          href={links.telegram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
