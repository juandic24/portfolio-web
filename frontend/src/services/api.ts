import axios from 'axios';
import type { ContactForm, Project } from '../types';

const api = axios.create({ baseURL: '/api' });

export const getProjects = (): Promise<Project[]> =>
  api.get<Project[]>('/projects').then(r => r.data);

export const getProject = (id: number): Promise<Project> =>
  api.get<Project>(`/projects/${id}`).then(r => r.data);

export const sendContact = (data: ContactForm): Promise<void> =>
  api.post('/contact', data).then(() => undefined);
