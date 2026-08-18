import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 8,
    title: 'Counselor',
    shortDescription: 'PWA for a school counselor to track student guidance cases across three campuses, built with React + Firebase and running in production for a real user.',
    fullDescription:
      'Tool built so a school counselor working across three campuses never loses track of her cases: who is due for a session today and who has gone too long without contact. Developed for a real user and deployed to production for her. Layered architecture with the repository pattern: the UI never talks to Firebase directly, so the same codebase runs against Firestore or localStorage, which makes the public demo a build flag instead of a fork that drifts out of date. Optimized for the user\'s actual device (a low-end Android): uncontrolled forms, per-route code splitting, and cacheable chunks. Stripped 495 kB of never-executed Firebase SDK from the public bundle (precache 776 to 294 KiB). Firestore security rules use an allowlist, are versioned, and are validated with the emulator: since the data concerns minors, being signed in is not enough to read it.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Firebase', 'Firestore', 'Zustand', 'React Hook Form', 'PWA'],
    gitHubUrl: 'https://github.com/juandic24/Counselor',
    liveUrl: 'https://counselorapp.netlify.app/',
    isFeatured: true,
    createdAt: '2026-07-01T00:00:00Z',
  },
  {
    id: 9,
    title: 'JC Soluciones Energéticas',
    shortDescription: 'Corporate website and brand identity for a solar installation business, built with Next.js 16 and deployed on Vercel.',
    fullDescription:
      'Designed and implemented the website and brand identity for a solar installation business. Content is centralized in a single source of truth so the owner, who is non-technical, can manage the site without touching component code. Built with Next.js 16, React 19, TypeScript, and Tailwind v4, and running in production on Vercel.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    gitHubUrl: 'https://github.com/juandic24/jc-soluciones-energeticas',
    liveUrl: 'https://jc-soluciones-energeticas.vercel.app',
    isFeatured: true,
    createdAt: '2026-06-01T00:00:00Z',
  },
  {
    id: 1,
    title: 'Full Stack Portfolio Website',
    shortDescription: 'Personal portfolio with a C#/.NET backend and a React + TypeScript frontend, deployed as a single production unit.',
    fullDescription:
      'Designed and implemented a personal website integrating a C#/.NET Core API backend with a React + TypeScript frontend into a single production deployment. Applied Tailwind CSS to build a modern, responsive UI without relying on external component libraries. Features a contact form, JWT-protected admin panel, chiptune music via Web Audio API, and Docker-based deployment.',
    technologies: ['C#', '.NET', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'Entity Framework Core'],
    gitHubUrl: 'https://github.com/juandic24/portfolio-web',
    liveUrl: 'https://juandic24.github.io/portfolio-web/',
    isFeatured: true,
    createdAt: '2026-04-01T00:00:00Z',
  },
  {
    id: 2,
    title: 'AnimalLibrary',
    shortDescription: 'REST API built with ASP.NET Core using a clean 3-layer architecture (Controllers / Services / Repositories) backed by PostgreSQL.',
    fullDescription:
      'Separated concerns across three layers (Controllers / Services / Repositories) to ensure each component has a single reason to change, making the codebase easier to maintain and test. Used DTOs to decouple the domain model from the presentation layer, preventing internal data from being exposed to clients. Implemented fully asynchronous operations with async/await on all PostgreSQL calls via Entity Framework Core, avoiding thread blocking under concurrent load.',
    technologies: ['C#', 'ASP.NET Core', 'PostgreSQL', 'Entity Framework Core', 'REST API'],
    gitHubUrl: 'https://github.com/juandic24/animalLibrary',
    isFeatured: true,
    createdAt: '2026-02-01T00:00:00Z',
  },
  {
    id: 3,
    title: 'GameStore',
    shortDescription: 'Minimal REST API built with .NET featuring JWT authentication, role-based authorization, and full CRUD for a game catalog.',
    fullDescription:
      'Implemented JWT authentication with role-based authorization (admin/user), securing sensitive endpoints without coupling security logic to business logic. Applied Data Annotations validation to reject invalid input before it reaches the service layer, reducing the surface area for runtime errors. Covers the full resource lifecycle: create, read, update, and delete, with clearly differentiated public and protected endpoints.',
    technologies: ['C#', '.NET', 'JWT', 'REST API', 'Minimal API'],
    gitHubUrl: 'https://github.com/juandic24/gameStore',
    isFeatured: true,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 4,
    title: 'DevOps Demo Pipeline',
    shortDescription: 'CI/CD pipeline with Jenkins that automates build → test → deploy using Docker and simulated AWS infrastructure via LocalStack.',
    fullDescription:
      'Automated the full build → test → deploy cycle using a Jenkins pipeline, eliminating manual intervention on every push to the repository. Simulated AWS infrastructure (ECS, ECR, VPC) with LocalStack to validate the pipeline locally without incurring real cloud costs. Integrated Docker into the pipeline to build, tag, and deploy container images in a reproducible manner on every run.',
    technologies: ['Jenkins', 'Docker', 'LocalStack', 'AWS', 'CI/CD'],
    gitHubUrl: 'https://github.com/juandic24/devops-demo',
    isFeatured: true,
    createdAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 5,
    title: 'Modern Pong',
    shortDescription: 'Complete Unity game with singleplayer (AI opponent) and local multiplayer modes, with custom pixel art visuals and audio.',
    fullDescription:
      'Built a complete Unity game from concept to public deployment with singleplayer (AI opponent) and local multiplayer modes. Implemented gameplay logic, UI system (menus and controls), and AI behavior for singleplayer mode entirely in C#. Created custom pixel art visuals and audio assets.',
    technologies: ['Unity', 'C#', 'Pixel Art', 'Game Development'],
    gitHubUrl: 'https://github.com/juandic24/modern-pong',
    liveUrl: 'https://juandc25.itch.io/modern-pong',
    isFeatured: true,
    createdAt: '2025-06-01T00:00:00Z',
  },
  {
    id: 6,
    title: 'Microservices Application',
    shortDescription: 'Distributed backend with independently deployable services (auth, monitoring, logging, notifications) orchestrated with Docker Compose.',
    fullDescription:
      'Designed each service with a single responsibility (authentication, monitoring, logging, notifications), allowing each to be deployed, scaled, and fail independently. Containerized all services with Docker and orchestrated them with docker-compose, enabling the entire distributed environment to be reproduced with a single command. Selected different technologies based on each service\'s needs (Python, JavaScript, Java), demonstrating adaptability across heterogeneous stacks.',
    technologies: ['Python', 'JavaScript', 'Java', 'Docker', 'docker-compose', 'Microservices'],
    gitHubUrl: 'https://github.com/juandic24/proyecto-final-microservicios',
    isFeatured: false,
    createdAt: '2024-10-01T00:00:00Z',
  },
  {
    id: 7,
    title: 'PixelCNN vs. PixelCNN + VQ-VAE',
    shortDescription: 'Comparison of two autoregressive image generation models, evaluating visual quality, training stability, and computational efficiency.',
    fullDescription:
      'Trained and compared two autoregressive image generation models (PixelCNN and PixelCNN + VQ-VAE), evaluating visual quality, training stability, and computational efficiency. The VQ-VAE-enhanced model showed better perceptual quality and more stable convergence, at the cost of higher implementation complexity.',
    technologies: ['Python', 'PyTorch', 'Deep Learning', 'Generative Models', 'VQ-VAE'],
    gitHubUrl: 'https://github.com/juandic24/PixelCNN-PixelCNN-VQVAE-comparison',
    isFeatured: false,
    createdAt: '2024-06-01T00:00:00Z',
  },
];
