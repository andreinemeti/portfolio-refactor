// lib/data/projects.queries.ts
import { projects, type Project } from './projects.data';

export type { Project };

export type ProjectsResponse = { projects: Project[]; tags: string[] };

export async function getProjects(): Promise<ProjectsResponse> {
  const allTags = new Set<string>();
  for (const p of projects) {
    for (const tag of p.tags) allTags.add(tag);
  }
  return { projects, tags: Array.from(allTags) };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) ?? null;
}
