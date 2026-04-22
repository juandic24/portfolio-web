import type { Project } from '../types';

interface Props {
    project: Project;
    onClick: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: Props) {
    return (
        <div
            className="rpg-box p-5 cursor-pointer group transition-all"
            style={{ borderColor: 'var(--green-dim)' }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = 'var(--green)')
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = 'var(--green-dim)')
            }
            onClick={() => onClick(project)}
        >
            {project.isFeatured && (
                <span
                    className="pixel-font text-[6px] px-2 py-1 mb-3 inline-block glow-gold"
                    style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
                >
                    ★ DESTACADO
                </span>
            )}

            <h3
                className="pixel-font text-[9px] mb-3 leading-relaxed transition-colors"
                style={{ color: 'var(--green)' }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--cyan)')
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'var(--green)')
                }
            >
                {project.title}
            </h3>

            <p className="text-[18px] mb-4" style={{ color: 'var(--green-dim)' }}>
                {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.map((tech) => (
                    <span
                        key={tech}
                        className="text-[14px] px-2 py-0.5"
                        style={{
                            border: '1px solid var(--green-dim)',
                            color: 'var(--cyan)',
                        }}
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <div
                className="flex gap-4 text-[16px]"
                onClick={(e) => e.stopPropagation()}
            >
                <a
                    href={project.gitHubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                    style={{ color: 'var(--green-dim)' }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.color = 'var(--green)')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.color = 'var(--green-dim)')
                    }
                >
                    [GITHUB ↗]
                </a>

                {project.liveUrl && (
                    <>
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors"
                            style={{ color: 'var(--green-dim)' }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = 'var(--gold)')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = 'var(--green-dim)')
                            }
                        >
                            [DEMO ↗]
                        </a>

                    </>
                )}
            </div>
        </div>
    );
}