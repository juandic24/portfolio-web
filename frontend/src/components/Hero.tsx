import { useEffect, useState } from 'react';

const TITLE_LINES = ['JUAN DIEGO', 'CORTÉS'];
const SUBTITLE = 'Backend Developer · C# / .NET · REST APIs';

export default function Hero() {
  const [titleDone, setTitleDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);
  const [showCtas, setShowCtas] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setTitleDone(true), 600);
    const t2 = setTimeout(() => setSubtitleDone(true), 1400);
    const t3 = setTimeout(() => setShowCtas(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden stars-bg pt-14">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="section-container py-20 text-center relative z-10">

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 pixel-font text-[7px]"
          style={{ border: '2px solid var(--green-dim)', color: 'var(--green-dim)' }}>
          <span className="w-2 h-2 rounded-full blink" style={{ background: 'var(--green)' }} />
          AVAILABLE FOR NEW OPPORTUNITIES
        </div>

        {/* Main title */}
        <div className="mb-6">
          {TITLE_LINES.map((line, i) => (
            <h1 key={i}
              className="glow-text leading-tight"
              style={{
                fontSize: 'clamp(22px, 5vw, 48px)',
                opacity: titleDone ? 1 : 0,
                transform: titleDone ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`,
              }}>
              {line}
            </h1>
          ))}
        </div>

        {/* Subtitle */}
        <p className="mb-4 text-[22px]"
          style={{
            color: 'var(--cyan)',
            opacity: subtitleDone ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}>
          {SUBTITLE}
        </p>

        <p className="mb-12 text-[18px]"
          style={{
            color: 'var(--green-dim)',
            opacity: subtitleDone ? 1 : 0,
            transition: 'opacity 0.5s ease 0.2s',
          }}>
          Layered Architecture &nbsp;·&nbsp; Docker &nbsp;·&nbsp; JWT &nbsp;·&nbsp; Microservices
        </p>

        {/* CTAs */}
        {showCtas && (
          <div className="flex flex-wrap justify-center gap-4 mb-14 fade-in">
            <a href="#projects" className="pixel-btn text-[8px] px-6 py-3">
              ▶ VIEW PROJECTS
            </a>
            <a href="#contact" className="pixel-btn pixel-btn-gold text-[8px] px-6 py-3">
              ✉ CONTACT
            </a>
          </div>
        )}

        {/* Social links */}
        {showCtas && (
          <div className="flex justify-center gap-8 fade-in"
            style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
            <a href="https://github.com/juandic24" target="_blank" rel="noopener noreferrer"
              className="pixel-font text-[7px] transition-colors"
              style={{ color: 'var(--green-dim)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--green-dim)')}>
              GITHUB ↗
            </a>
            <span style={{ color: 'var(--green-dim)' }}>·</span>
            <a href="https://www.linkedin.com/in/juan-diego-cortestorres/" target="_blank" rel="noopener noreferrer"
              className="pixel-font text-[7px] transition-colors"
              style={{ color: 'var(--green-dim)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--green-dim)')}>
              LINKEDIN ↗
            </a>
          </div>
        )}

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pixel-font text-[6px] blink"
          style={{ color: 'var(--green-dim)' }}>
          ▼ SCROLL DOWN ▼
        </div>
      </div>
    </section>
  );
}
