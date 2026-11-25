import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ['Home', '#home'],
    ['Menu', '#menu'],
    ['About', '#about'],
    ['Reservations', '#reservations'],
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" aria-label="Little Lemon home">
          <span className="brand-mark" aria-hidden="true">🍋</span>
          <span>Little Lemon</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span><span></span><span></span>
        </button>
        <nav id="primary-navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="nav-cta" href="#reservations" onClick={() => setMenuOpen(false)}>Book a table</a>
        </nav>
      </div>
    </header>
  );
}
