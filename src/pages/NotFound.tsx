import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell">
        <p className="eyebrow">404</p>
        <h1
          style={{
            marginTop: 'clamp(20px, 3vw, 32px)',
            fontSize: 'clamp(44px, 8vw, 96px)',
            letterSpacing: '-0.045em',
          }}
        >
          Page not found
        </h1>
        <p className="lead" style={{ marginTop: 20, maxWidth: '40ch' }}>
          This page doesn’t exist. The link may be outdated.
        </p>
        <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link className="btn btn--dark" to="/">
            Home
          </Link>
          <Link className="btn btn--ghost" to="/projects">
            All work
          </Link>
        </div>
      </div>
    </section>
  );
}
