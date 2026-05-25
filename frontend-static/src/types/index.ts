export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  gitHubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  isFeatured: boolean;
  createdAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
