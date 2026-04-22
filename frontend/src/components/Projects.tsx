import { useEffect, useState } from 'react';
import { getProjects } from '../services/api';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-24 scroll-mt-14" style={{ borderTop: '2px solid var(--border)' }}>
      <div className="section-container">

        <div className="text-center mb-12">
          <p className="pixel-font text-[8px] mb-4" style={{ color: 'var(--gold)' }}>
            ─── QUEST LOG ───
          </p>
          <h2 className="glow-text" style={{ fontSize: 'clamp(14px, 3vw, 24px)' }}>
            PROJECTS
          </h2>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <p className="pixel-font text-[8px] blink" style={{ color: 'var(--green-dim)' }}>
              LOADING QUESTS...
            </p>
          </div>
        )}

        {error && (
          <div className="rpg-box p-6 text-center max-w-sm mx-auto">
            <p className="pixel-font text-[8px]" style={{ color: 'var(--red)' }}>
              ✕ CONNECTION ERROR
            </p>
            <p className="mt-2 text-[17px]" style={{ color: 'var(--green-dim)' }}>
              Could not load projects.
            </p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="rpg-box p-8 text-center max-w-sm mx-auto">
            <p className="pixel-font text-[8px] mb-2" style={{ color: 'var(--green-dim)' }}>
              [ EMPTY BOARD ]
            </p>
            <p className="text-[17px]" style={{ color: 'var(--green-dim)' }}>
              Quests coming soon.
            </p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} onClick={setSelected} />
          ))}
        </div>

      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
