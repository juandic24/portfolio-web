const stack = [
  { name: 'C#',               lvl: 80 },
  { name: 'Java',             lvl: 80 },
  { name: 'Python',           lvl: 70 },
  { name: '.NET / ASP.NET',   lvl: 80 },
  { name: 'REST APIs',        lvl: 90 },
  { name: 'Entity Framework', lvl: 75 },
  { name: 'PostgreSQL',       lvl: 70 },
  { name: 'Docker',           lvl: 70 },
  { name: 'Git / GitHub',     lvl: 90 },
  { name: 'JWT / Auth',       lvl: 70 },
  { name: 'Microservices',    lvl: 70 },
  { name: 'SQL',              lvl: 70 },
  { name: 'React / TS',       lvl: 65 },
  { name: 'Linux / Bash',     lvl: 60 },
  { name: 'Next.js',          lvl: 55 },
  { name: 'Firebase',         lvl: 55 },
  { name: 'Spring Boot',      lvl: 55 },
];

const languages = [
  { name: 'Spanish', lvl: 100, label: 'Native' },
  { name: 'English', lvl: 70,  label: 'B2' },
];

function StatBar({ name, lvl }: { name: string; lvl: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-44 shrink-0 text-[17px]" style={{ color: 'var(--cyan)' }}>
        {name}
      </span>
      <div className="flex-1 hp-bar-track">
        <div className="hp-bar-fill" style={{ width: `${lvl}%` }} />
      </div>
      <span className="w-10 text-right text-[15px]" style={{ color: 'var(--green-dim)' }}>
        {lvl}
      </span>
    </div>
  );
}

function LangBar({ name, lvl, label }: { name: string; lvl: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-[17px]" style={{ color: 'var(--cyan)' }}>
        {name}
      </span>
      <div className="flex-1 hp-bar-track">
        <div className="hp-bar-fill" style={{ width: `${lvl}%` }} />
      </div>
      <span className="w-12 text-right text-[15px]" style={{ color: 'var(--green-dim)' }}>
        {label}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 scroll-mt-14" style={{ borderTop: '2px solid var(--border)' }}>
      <div className="section-container">

        {/* Section header */}
        <div className="text-center mb-12">
          <p className="pixel-font text-[8px] mb-4" style={{ color: 'var(--gold)' }}>
            ─── CHARACTER ───
          </p>
          <h2 className="glow-text" style={{ fontSize: 'clamp(14px, 3vw, 24px)' }}>
            JUAN DIEGO CORTES
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Bio card */}
          <div className="rpg-box p-6 flex flex-col">
            <p className="pixel-font text-[8px] mb-4" style={{ color: 'var(--gold)' }}>
              ◆ STORY
            </p>
            <p className="text-[19px] mb-4" style={{ color: 'var(--green)' }}>
              I build <span style={{ color: 'var(--cyan)' }}>REST APIs</span> and
              full-stack tools that ship to production &mdash; not just portfolios.
            </p>
            <p className="text-[19px] mb-4" style={{ color: 'var(--green)' }}>
              Specialized in backend development with{' '}
              <span style={{ color: 'var(--cyan)' }}>C# / .NET, Java and Python</span>,
              with hands-on experience in layered architectures, microservices,
              JWT authentication, and Docker. On the frontend I work with{' '}
              <span style={{ color: 'var(--cyan)' }}>React and TypeScript</span>.
            </p>
            <p className="text-[19px] mb-6" style={{ color: 'var(--green)' }}>
              Clean, structured, production-ready code from the first commit.
            </p>

            {/* Stat chips */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { label: 'CLASS',   value: 'Backend Dev' },
                { label: 'LEVEL',   value: 'Junior' },
                { label: 'FACTION', value: '.NET Guild' },
              ].map(s => (
                <div key={s.label} className="rpg-box p-2 text-center">
                  <p className="pixel-font text-[6px] mb-1" style={{ color: 'var(--green-dim)' }}>
                    {s.label}
                  </p>
                  <p className="text-[15px]" style={{ color: 'var(--gold)' }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="mb-6">
              <p className="pixel-font text-[8px] mb-3" style={{ color: 'var(--gold)' }}>
                ◆ LANGUAGES
              </p>
              <div className="flex flex-col gap-3">
                {languages.map(l => <LangBar key={l.name} {...l} />)}
              </div>
            </div>

            <a href={`${import.meta.env.BASE_URL}cv.pdf`}
              className="pixel-btn pixel-btn-gold text-[7px] self-start mt-auto">
              ↓ DOWNLOAD CV
            </a>
          </div>

          {/* Skills card */}
          <div className="rpg-box p-6">
            <p className="pixel-font text-[8px] mb-5" style={{ color: 'var(--gold)' }}>
              ◆ STATS
            </p>
            <div className="flex flex-col gap-3">
              {stack.map(s => <StatBar key={s.name} {...s} />)}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
