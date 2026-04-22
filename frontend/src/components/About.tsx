const stack = [
  { name: 'C#',              lvl: 60 },
  { name: '.NET 8',          lvl: 60 },
  { name: 'ASP.NET Core',    lvl: 60 },
  { name: 'Entity Framework',lvl: 60 },
  { name: 'PostgreSQL',      lvl: 60 },
  { name: 'Docker',          lvl: 60 },
  { name: 'JWT / Auth',      lvl: 50 },
  { name: 'REST APIs',       lvl: 70 },
  { name: 'Git / GitHub',    lvl: 70 },
  { name: 'SQL',             lvl: 60 },
  { name: 'Microservices',   lvl: 70 },
  { name: 'Linux / Bash',    lvl: 60 },
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
            JUAN DIEGO CORTÉS
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Bio card */}
          <div className="rpg-box p-6">
            <p className="pixel-font text-[8px] mb-4" style={{ color: 'var(--gold)' }}>
              ◆ STORY
            </p>
            <p className="text-[19px] mb-4" style={{ color: 'var(--green)' }}>
              Backend Developer with a background in{' '}
              <span style={{ color: 'var(--cyan)' }}>Systems Engineering</span>,
              specializing in robust and scalable REST APIs with{' '}
              <span style={{ color: 'var(--cyan)' }}>C# and .NET</span>.
            </p>
            <p className="text-[19px] mb-6" style={{ color: 'var(--green)' }}>
              Hands-on experience with layered architectures, microservices,
              JWT authentication, and Docker containerization. Clean,
              well-structured, production-ready code.
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

            <a href="/cv.pdf"
              className="pixel-btn pixel-btn-gold text-[7px] inline-block">
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
