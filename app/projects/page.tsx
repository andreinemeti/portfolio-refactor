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

  // Using store tags:
  const allTags = tags ?? [];

  // 1) Base counts per tag (from the full list)
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of list) {
      for (const t of p.tags ?? []) counts[t] = (counts[t] ?? 0) + 1;
    }
    return counts;
  }, [list]);

  // 2) Visible counts per tag given current selection (simulate adding that tag)
   const visibleTagCounts = useMemo(() => {
    if (selected.length === 0) return tagCounts;
    const counts: Record<string, number> = {};
    for (const t of allTags) {
      if (selected.includes(t)) {
        counts[t] = filtered.length;
      } else {
        const hypothetical = list.filter(p =>
          [...selected, t].every(tag => p.tags.includes(tag))
        );
        counts[t] = hypothetical.length;
      }
    }
    return counts;
  }, [allTags, filtered.length, list, selected, tagCounts]);

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

          {selected.length > 0 && (
            <button className="btn btn--ghost" onClick={clearFilters}>
              Clear filters ({selected.length})
            </button>
          )}
        </div>

        <div className="section-subtitle">Click to filter by tags:{' '}</div>
        {/* Filter pills (clickable, multi-select) */}
        {allTags.length > 0 && (
          <div
            className="pill-list filter-pill-list"
            role="listbox"
            aria-label="Filter by tags"
            style={{ marginBottom: '.5rem' }}
          >
            
     {allTags.map(tag => {
              const active = selected.includes(tag);
              const count =
                visibleTagCounts[tag] ??
                (selected.length === 0 ? tagCounts[tag] ?? 0 : 0);

              // Gray-out when this tag (if added) would yield zero results.
              // Only gray out for NON-selected tags.
              const isDisabled = !active && selected.length > 0 && count === 0;

              const onClick = () => {
                if (isDisabled) return;            // prevent toggling dead-ends
                toggleTag(tag);
              };

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={onClick}
                  className={`pill pill--button ${active ? 'pill--active' : ''} ${isDisabled ? 'pill--disabled' : ''}`}
                  aria-pressed={active}
                  aria-disabled={isDisabled}
                  disabled={isDisabled}
                  title={`${tag} (${count} projects)`}
                >
                  {tag}&nbsp;<span className="pill__count">({count})</span>
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
