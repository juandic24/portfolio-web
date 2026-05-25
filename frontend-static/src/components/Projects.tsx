import { useState } from 'react';
import { projects } from '../data/projects';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

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

        {projects.length === 0 && (
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
