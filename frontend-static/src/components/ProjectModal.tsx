import { useEffect } from 'react';
import type { Project } from '../types';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <div
        className="rpg-box w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-5"
          style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
          <div>
            <p className="pixel-font text-[7px] mb-2" style={{ color: 'var(--gold)' }}>
              ◆ QUEST DETAIL
            </p>
            <h2 className="pixel-font text-[10px] glow-text leading-relaxed">
              {project.title}
            </h2>
          </div>
          <button onClick={onClose}
            className="pixel-font text-[10px] px-3 py-2 transition-colors shrink-0"
            style={{ border: '2px solid var(--red)', color: 'var(--red)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = 'var(--bg)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--red)'; }}>
            ✕
          </button>
        </div>

        {/* Screenshot */}
        {project.imageUrl && (
          <img src={project.imageUrl} alt={project.title}
            className="w-full mb-5"
            style={{ border: '2px solid var(--border)' }} />
        )}

        {/* Description */}
        <p className="text-[19px] mb-6 leading-relaxed" style={{ color: 'var(--green)' }}>
          {project.fullDescription}
        </p>

        {/* Technologies */}
        <div className="mb-6">
          <p className="pixel-font text-[7px] mb-3" style={{ color: 'var(--gold)' }}>
            ◆ TECHNOLOGIES USED
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span key={tech}
                className="text-[16px] px-3 py-1"
                style={{ border: '1px solid var(--green-dim)', color: 'var(--cyan)' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 flex-wrap">
          <a href={project.gitHubUrl} target="_blank" rel="noopener noreferrer"
            className="pixel-btn text-[7px] px-5 py-2">
            [GITHUB ↗]
          </a>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="pixel-btn pixel-btn-gold text-[7px] px-5 py-2">
              [LIVE DEMO ↗]
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
