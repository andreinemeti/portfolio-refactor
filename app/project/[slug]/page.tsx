'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchProjectBySlug, fetchProjects } from '@/store/projectsSlice';
import Slider from '@/components/Slider';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { yearFromISO } from '@/utils/common';
import LinkIcon from '@/components/icons/LinkIcon';
import Loading from '@/components/Loading';
import GridPreviews from '@/components/GridPreviews';

export default function ProjectPage() {
  const params = useParams();
  const slug = String(params.slug);
  const dispatch = useAppDispatch();
  const { current, list } = useAppSelector(s => s.projects);

  useEffect(() => { dispatch(fetchProjectBySlug(slug)); }, [dispatch, slug]);
  useEffect(() => { if (list.length === 0) dispatch(fetchProjects()); }, [dispatch, list.length]);

  if (!current) return <Loading />;

  const hasList = list.length > 0;
  const idx = hasList ? list.findIndex(p => p.slug === slug) : -1;
  const next = hasList ? list[(idx + 1 + list.length) % list.length] : null;

  const meta = [
    { label: 'Project Type', value: (current as any).type },
    { label: 'Responsiveness', value: (current as any).responsiveness },
  ].filter(m => !!m.value) as {label:string; value:string}[];


  return (
    <main>
      {/* HERO with slider */}
      <section className="hero hero--project">
        <div className="hero__media">
          <Slider
            images={current.images}
            showArrows={true}
            showDots={true}
            className="hero__slider"
          />
        </div>
        <div className="hero__overlay">
          <div className="hero__header">
            <h1 className="hero__title">{current.name}</h1>
          
          </div>
        </div>
      </section>

      <Breadcrumbs items={[{label:'Home', href:'/'}, {label:'Project'}, {label: current.name}]} />

      {/* CONTENT GRID */}
      <section className="container project-content">
        <div className="project-content__main">
          <h2 className="h2">Project description</h2>
          <p className="lead">{current.description}</p>
          <p className="muted"><strong>Built in:</strong> {yearFromISO(current.createdAt)}</p>

          {/* Pills */}
          
          {current.tags?.length > 0 && (
            <div className="pill-list" aria-label="Technologies used">
              {current.tags.map(t => (
                <span key={t} className="pill">{t}</span>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar meta cards (render only if there is meta) */}
        {meta.length > 0 && (
          <aside className="project-content__sidebar">
            {meta.map(m => (
              <div key={m.label} className="meta-card">
                <div className="meta-card__label">{m.label}</div>
                <div className="meta-card__value">{m.value}</div>
              </div>
            ))}
          </aside>
        )}
      </section>

      {current.images?.length > 0 && (
      <div className="container previews-content">
        <h2 className="h2">Previews</h2>
       <GridPreviews images={current.images} />
      </div>
      )}

      {current.externalUrl && (
      <div className="container live-url-content">
        <h2 className="h2">Live URL</h2>
       <a className="link" href={current.externalUrl} target="_blank" rel="noopener noreferrer">
        <LinkIcon className="icon"size={20}/>
        {current.externalUrl}</a>
      </div>
      )}

      {/* CTA strip */}
      <section className="container cta-strip">
        <div className="cta-strip__text">
          <h3 className="h2">Ready to explore more?</h3>
          <p className="muted">Check out our next featured project and discover more amazing work.</p>
        </div>
        {next && (
          <Link className="btn btn--primary" href={`/project/${next.slug}`}>
            View next project →
          </Link>
        )}
      </section>
    </main>
  );
}
