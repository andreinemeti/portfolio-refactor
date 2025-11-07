// app/projects/page.tsx
'use client';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchProjects } from '@/store/projectsSlice';
import ProjectCard from '@/components/ProjectCard';
import Loading from '@/components/Loading';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function ProjectsPage() {
  const dispatch = useAppDispatch();
  const { list, status, tags } = useAppSelector(s => s.projects);

  // multi-select filter state
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const toggleTag = useCallback((tag: string) => {
    setSelected(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }, []);

  const clearFilters = useCallback(() => setSelected([]), []);

  // derived filtered list: projects must include *all* selected tags
  const filtered = useMemo(() => {
    if (selected.length === 0) return list;
    return list.filter(p => selected.every(tag => p.tags.includes(tag)));
  }, [list, selected]);

  // Optionally compute unique tags from projects (if store.tags isn’t strict)
  // const allTags = useMemo(() => Array.from(new Set(list.flatMap(p => p.tags))).sort(), [list]);
  // Using store tags:
  const allTags = tags ?? [];

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
            All projects <span className="count">({filtered.length})</span>
          </h2>

          {/* Clear filters (only when any selected) */}
          {selected.length > 0 && (
            <button className="btn btn--ghost" onClick={clearFilters}>
              Clear filters ({selected.length})
            </button>
          )}
        </div>

        {/* Filter pills (clickable, multi-select) */}
        {allTags.length > 0 && (
          <div className="pill-list" role="listbox" aria-label="Filter by tags" style={{ marginBottom: '.5rem' }}>
            {allTags.map(tag => {
              const active = selected.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`pill pill--button ${active ? 'pill--active' : ''}`}
                  aria-pressed={active}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}

        {status === 'loading' && <Loading />}

        <div className="flex-container" style={{ marginTop: '1rem' }}>
          {filtered.map(p => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        {status !== 'loading' && filtered.length === 0 && (
          <p className="muted" style={{ marginTop: '1rem' }}>
            No projects match your filters.
          </p>
        )}
      </section>
    </main>
  );
}
