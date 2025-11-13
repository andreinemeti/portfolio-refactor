// app/page.tsx
import type { Metadata } from 'next';
import { getProjects } from '@/lib/data/projects.query';
import HomeView from '@/views/home/HomeView'; // client component

export const metadata: Metadata = {
  title: 'Home - Andrei Nemeti',
  description:
    'Portfolio of Andrei, a freelance Front-end Developer building modern, performant React/Next.js interfaces.',
};

export default async function Page() {
  const { projects, tags } = await getProjects();
  const featured = projects.filter((p) => p.featured);

  return <HomeView projects={projects} featured={featured} tags={tags} />;
}
