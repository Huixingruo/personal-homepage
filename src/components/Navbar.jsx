import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const sections = [
  { id: 'hero', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const offsets = sections.map(s => {
        const el = document.getElementById(s.id);
        return { id: s.id, top: el ? el.getBoundingClientRect().top : Infinity };
      });

      const current = offsets.reduce((closest, s) =>
        Math.abs(s.top) < Math.abs(closest.top) ? s : closest
      );
      setActive(current.id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {sections.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`${styles.link} ${active === s.id ? styles.active : ''}`}
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
