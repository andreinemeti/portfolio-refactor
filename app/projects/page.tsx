// app/projects/page.tsx
'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchProjects } from '@/store/projectsSlice';
import ProjectCard from '@/components/ProjectCard';
import Loading from '@/components/Loading';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function ProjectsPage() {
  const dispatch = useAppDispatch();
  const { list, status, tags } = useAppSelector(s => s.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <main>
      <section className="hero hero--project hero--project_all">
        <div className="hero__header">
          <h1 className="hero__title">All Projects</h1>
          <p className="hero__subtitle">A collection of my work</p>
        </div>
      </section>

       <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />

      <section className="container">
        <div className="section-header">
          <h2 className="h2 section-title">
            All projects <span className="count">({list.length})</span>
          </h2>
        </div>

        {/* Optional tag pills (non-interactive display) */}
        {tags?.length > 0 && (
          <div className="pill-list" style={{ marginBottom: '.5rem' }}>
            {tags.map(t => (
              <span key={t} className="pill">{t}</span>
            ))}
          </div>
        )}

        {status === 'loading' && <Loading />}

        <div className="flex-container" style={{ marginTop: '1rem' }}>
          {list.map(p => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        {status !== 'loading' && list.length === 0 && (
          <p className="muted" style={{ marginTop: '1rem' }}>
            No projects found.
          </p>
        )}
      </section>
    </main>
  );
}
