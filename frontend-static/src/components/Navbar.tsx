import { useState } from 'react';
import { useChiptune } from '../hooks/useChiptune';

const links = [
  { href: '#about',    label: '[ HERO ]' },
  { href: '#projects', label: '[ QUESTS ]' },
  { href: '#contact',  label: '[ CONTACT ]' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { playing, toggle } = useChiptune();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(8,8,8,0.95)', borderBottom: '2px solid var(--green)' }}>
      <div className="section-container h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <a href="#" className="pixel-font text-[9px] glow-text shrink-0">
          JDC<span className="blink">_</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6 list-none">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href}
                className="pixel-font text-[7px] transition-colors"
                style={{ color: 'var(--green-dim)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--green-dim)')}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Music toggle */}
          <button
            onClick={toggle}
            title={playing ? 'Mute music' : 'Play music'}
            className="pixel-font text-[7px] px-3 py-2 transition-all shrink-0"
            style={{
              border: '2px solid var(--gold)',
              color: playing ? 'var(--bg)' : 'var(--gold)',
              background: playing ? 'var(--gold)' : 'transparent',
            }}>
            {playing ? '♪ ON' : '♪ OFF'}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            style={{ color: 'var(--green)' }}
            onClick={() => setOpen(o => !o)}
            aria-label="Open menu">
            <span className={`block w-5 h-0.5 bg-current transition-transform origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-transform origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden rpg-box mx-4 mb-2">
          <ul className="py-3 px-4 flex flex-col gap-3 list-none">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href}
                  className="pixel-font text-[8px] glow-text block py-1"
                  onClick={() => setOpen(false)}>
                  &gt; {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
