// app/projects/page.tsx
'use client';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchProjects } from '@/store/projectsSlice';
import ProjectCard from '@/components/ProjectCard';
import Loading from '@/components/Loading';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import FloatingTargetCursor from '@/components/FloatingTargetCursor';
import MagneticItem from '@/components/MagneticItem';
import ShatterTitle from '@/components/ShatterTitle';
export default function ProjectsPage() {
  const dispatch = useAppDispatch();
  const { list, status, tags } = useAppSelector(s => s.projects);
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => { dispatch(fetchProjects()); }, [dispatch]);

  const toggleTag = useCallback((tag: string) => {
    setSelected(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  }, []);

  const clearFilters = useCallback(() => setSelected([]), []);

  const filtered = useMemo(() => {
    if (selected.length === 0) return list;
    return list.filter(p => selected.every(tag => p.tags.includes(tag)));
  }, [list, selected]);

  const allTags = tags ?? [];
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of list) for (const t of p.tags ?? []) counts[t] = (counts[t] ?? 0) + 1;
    return counts;
  }, [list]);

  const visibleTagCounts = useMemo(() => {
    if (selected.length === 0) return tagCounts;
    const counts: Record<string, number> = {};
    for (const t of allTags) {
      if (selected.includes(t)) counts[t] = filtered.length;
      else counts[t] = list.filter(p => [...selected, t].every(tag => p.tags.includes(tag))).length;
    }
    return counts;
  }, [allTags, filtered.length, list, selected, tagCounts]);


  return (
    <main>
      {/* mount cursor once (optionally limit to the grid with within=".flex-container") */}
      <FloatingTargetCursor within=".flex-container" activeSize={140} />

      <section className="hero hero--project hero--project_all">
        <div className="hero__header">
          <ShatterTitle
            as="h1"
            className="hero__title"
            radius={150}
            maxOffset={20}
            maxRotate={12}
            popScale={1.07}
          >
            All Projects
          </ShatterTitle>

          <ShatterTitle
            as="div"
            className="hero__subtitle"
            radius={150}
            maxOffset={20}
            maxRotate={12}
            popScale={1.07}
          >
            A collection of my work
          </ShatterTitle>


        </div>
      </section>

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />

      <section className="container">
        <div className="section-header">
          <h2 className="h2 section-title">
            <ShatterTitle
              as="div"
              className="hero__subtitle"
              radius={150}
              maxOffset={20}
              maxRotate={12}
              popScale={1.07}
            >
              All projects ({filtered.length})
            </ShatterTitle>

            {/* All projects <span className="count">({filtered.length})</span> */}
          </h2>

          {selected.length > 0 && (
            <button className="btn btn--ghost" onClick={clearFilters}>
              Clear filters ({selected.length})
            </button>
          )}
        </div>

        {allTags.length > 0 && (
          <div className="filters-toggle-row" style={{ marginBottom: '.5rem' }}>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setShowFilters(v => !v)}
              aria-expanded={showFilters}
              aria-controls="project-filters"
            >
              Filters{selected.length > 0 ? ` (${selected.length} selected)` : ''}
            </button>
          </div>
        )}

        {allTags.length > 0 && (
          <div id="project-filters" hidden={!showFilters} aria-hidden={!showFilters}>
            <div className="section-subtitle">Select one or more technologies:{' '}</div>
            <div className="pill-list filter-pill-list" role="listbox" aria-label="Filter by tags" style={{ marginBottom: '.5rem' }}>
              {allTags.map(tag => {
                const active = selected.includes(tag);
                const count =
                  visibleTagCounts[tag] ?? (selected.length === 0 ? tagCounts[tag] ?? 0 : 0);
                const isDisabled = !active && selected.length > 0 && count === 0;
                const onClick = () => { if (!isDisabled) toggleTag(tag); };

                return (
                  <MagneticItem key={tag} radius={90} strength={0.22} tilt={3}>
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
                  </MagneticItem>
                );
              })}
            </div>
          </div>
        )}

        {status === 'loading' && <Loading />}
        <div className="flex-container" style={{ marginTop: '1rem' }}>
          {filtered.map(p => (
            <MagneticItem className="card-container" key={p.slug} radius={90} strength={0.22} tilt={3}>
              <div
                key={p.slug}
                className="card-target"
                data-cursor="target"
                data-cursor-images={p.images?.slice(0, 4).join(',') ?? ''}
              >

                <ProjectCard

                  project={p} />

              </div>
            </MagneticItem>
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
