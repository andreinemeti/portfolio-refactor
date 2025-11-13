// app/projects/page.tsx
import type { Metadata } from 'next';
import { getProjects } from '@/lib/data/projects.query';
import ProjectsListView from '@/views/projects/ProjectsListView';

export const metadata: Metadata = {
  title: 'All Projects',
  description:
    'Browse all frontend projects by Andrei, including web apps, product sites, and UI experiments.',
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProjectsPage({ searchParams }: PageProps) {
  const { projects, tags } = await getProjects();

  // Next 15: searchParams is a Promise now
  const sp = await searchParams;
  const limitParam = sp?.limit;
  const limitValue = Array.isArray(limitParam) ? limitParam[0] : limitParam;
  const pageSize = limitValue ? Math.max(1, Number(limitValue)) : undefined;

  return (
    <ProjectsListView
      projects={projects}
      tags={tags}
      pageSize={pageSize}
    />
  );
}
