// views/project/ProjectDetailView.tsx
import Link from 'next/link';
import type { Project } from '@/lib/data/projects.query';
import { yearFromISO } from '@/utils/common';

import Slider from '@/components/layout/Slider';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import LinkIcon from '@/components/icons/LinkIcon';
import NextIcon from '@/components/icons/NextIcon';
import GridPreviews from '@/components/project/GridPreviews';
import CtaStrip from '@/components/layout/CtaStrip';
import FloatingTargetCursor from '@/components/fx/FloatingTargetCursor';
import MagneticItem from '@/components/fx/MagneticItem';

type Props = {
  project: Project;
  next: Project | null;
};

export default function ProjectDetailView({ project, next }: Props) {
  const meta = [
    { label: 'Project Type', value: (project as any).type },
    { label: 'Responsiveness', value: (project as any).responsiveness },
  ].filter((m) => !!m.value) as { label: string; value: string }[];

  return (
    <main>
      <FloatingTargetCursor
        within=".previews-grid"
        activeSize={180}
        minWidth={768}
        ringText="OPEN • "
      />

      <section className="hero hero--project">
        {project.featured && (
          <span className="hero__ribbon" aria-label="Featured">
            Featured
          </span>
        )}

        <div className="hero__media">
          <Slider
            images={project.images ?? []}
            showArrows={true}
            showDots={true}
            className="hero__slider"
          />
        </div>

        <div className="hero__overlay">
          <div className="hero__header">
            <h1 className="hero__title">{project.name}</h1>
          </div>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.name },
        ]}
      />

      <section className="container project-content">
        <div className="project-content__main">
          <h2 className="h2">Project description</h2>
          <p className="lead">{project.description}</p>

          {project.createdAt && (
            <p className="lead">Built in: {yearFromISO(project.createdAt)}</p>
          )}

          {project.tags?.length > 0 && (
            <div className="pill-list" aria-label="Technologies used">
              {project.tags.map((t) => (
                <MagneticItem key={t} radius={90} strength={0.22} tilt={3}>
                  <span className="pill">{t}</span>
                </MagneticItem>
              ))}
            </div>
          )}
        </div>

        {meta.length > 0 && (
          <aside className="project-content__sidebar">
            {meta.map((m) => (
              <div key={m.label} className="meta-card">
                <div className="meta-card__label">{m.label}</div>
                <div className="meta-card__value">{m.value}</div>
              </div>
            ))}
          </aside>
        )}
      </section>

      {project.images && project.images.length > 0 && (
        <div className="container previews-content">
          <h2 className="h2">Previews</h2>
          <GridPreviews images={project.images} />
        </div>
      )}

      {project.externalUrl && (
        <div className="container live-url-content">
          <h2 className="h2">Live URL</h2>
          <span className="pill">
            <a
              className="link"
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon className="icon" size={20} />
              {project.externalUrl}
            </a>
          </span>
        </div>
      )}

      <CtaStrip
        title="Ready to explore more?"
        subtitle="Check out my next featured project and discover more."
        rightSlot={
          next ? (
            <Link className="btn btn--primary" href={`/project/${next.slug}`}>
              <span className="btn__text">View next project</span>
              <NextIcon className="icon" size={20} />
            </Link>
          ) : null
        }
      />
    </main>
  );
}
