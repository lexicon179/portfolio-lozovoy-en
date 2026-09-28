import { useEffect, useState } from 'react';
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

/**
 * Шапка. На десктопе меню в строку. На телефоне и планшете, как на Framer:
 * логотип, «Get in touch» и кнопка меню в одну строку, пункты — в панели
 * под шапкой по нажатию.
 */
export default function Header() {
  const { pathname, hash } = useLocation();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);

  // Закрыть меню при переходе и по Esc
  useEffect(() => setOpen(false), [pathname, hash]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`header${open ? ' header--open' : ''}`}>
      <div className="header__inner shell">
        <Link to="/" className="header__logo" aria-label="Home">
          {site.name}
        </Link>

        <nav
          id="site-nav"
          className="header__nav"
          aria-label="Main navigation"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={isHome ? item.href : `/${item.href}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="btn btn--dark btn--sm header__cta"
          href={links.telegram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get in touch
        </a>

        <button
          type="button"
          className="header__menu"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="header__menu-icon" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
