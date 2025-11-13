// app/project/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/lib/data/projects.query';
import ProjectDetailView from '@/views/project/ProjectDetailView';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project not found',
      description: 'The requested project does not exist.',
    };
  }

  const baseTitle = `${project.name} – Frontend Project`;
  const description =
    project.description?.slice(0, 155) ??
    `Case study for ${project.name}, a frontend project by Andrei.`;

  return {
    title: baseTitle,
    description,
    alternates: { canonical: `/project/${project.slug}` },
    openGraph: {
      title: baseTitle,
      description,
      url: `/project/${project.slug}`,
      images:
        project.images && project.images.length
          ? [
              {
                url: project.images[0],
                width: 1200,
                height: 630,
                alt: project.name,
              },
            ]
          : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const { projects } = await getProjects();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next =
    idx === -1 || projects.length < 2 ? null : projects[(idx + 1) % projects.length];

  return <ProjectDetailView project={project} next={next} />;
}
