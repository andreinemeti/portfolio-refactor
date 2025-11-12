// app/projects/page.tsx
'use client';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchProjects } from '@/store/projectsSlice';

import ProjectCard from '@/components/ProjectCard';
import ProjectsSkeleton from '@/components/ProjectsSkeleton';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import FloatingTargetCursor from '@/components/FloatingTargetCursor';
import MagneticItem from '@/components/MagneticItem';
import ShatterTitle from '@/components/ShatterTitle';
import NextIcon from '@/components/icons/NextIcon';
import HeroFX from '@/components/HeroFX';

const DEFAULT_PAGE_SIZE = 46; // fallback when we don't know

export default function ProjectsPage() {
  const dispatch = useAppDispatch();
  const { list, status, tags } = useAppSelector(s => s.projects);

 
  const params = useSearchParams();
  const limitParam = params.get('limit');
  const pageSize = limitParam ? Math.max(1, Number(limitParam)) : undefined;

  // Filters UI
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const toggleTag = useCallback((tag: string) => {
    setSelected(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  }, []);
  const clearFilters = useCallback(() => setSelected([]), []);

  // Fetch
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Loading & skeleton sizing
  const isLoading = status !== 'succeeded' && list.length === 0;
  const skeletonCount = isLoading ? (pageSize ?? (list.length || DEFAULT_PAGE_SIZE)) : 0;

  // Filtering
  const allTags = tags ?? [];
  const filtered = useMemo(() => {
    if (selected.length === 0) return list;
    return list.filter(p => selected.every(tag => p.tags.includes(tag)));
  }, [list, selected]);

  // Apply page size after filters (so counts/visible align)
  const visible = useMemo(
    () => (pageSize ? filtered.slice(0, pageSize) : filtered),
    [filtered, pageSize]
  );

  // Tag helpers (sorted list + counts, incl. prospective counts when combining)
  const sortedTags = useMemo(
    () => [...allTags].sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })),
    [allTags]
  );
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
      <FloatingTargetCursor within=".flex-container" activeSize={140} />

      {/* Hero */}
      <section className="hero hero--project hero--project_all">
        <HeroFX />
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

      {/* CONTENT */}
      <section className="container">
        <div className="section-header">
          <h2 className="h2 section-title">
            {/* Use ShatterTitle but avoid a conflicting subtitle class here */}
            <ShatterTitle
              as="div"
              className="section-title__fx"
              radius={150}
              maxOffset={20}
              maxRotate={12}
              popScale={1.07}
            >
              All projects ({isLoading ? skeletonCount : filtered.length})
            </ShatterTitle>
          </h2>
        </div>

        {/* Filters */}
        {allTags.length > 0 && (
          <>
            <div className="filters-toggle-row">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setShowFilters(v => !v)}
                aria-expanded={showFilters}
                aria-controls="project-filters"
              >
                Filters{selected.length > 0 ? ` (${selected.length} selected)` : ''}
              </button>
              {selected.length > 0 && (
                <button className="btn btn--ghost" onClick={clearFilters}>
                  Clear filters ({selected.length})
                </button>
              )}
            </div>

            <div id="project-filters" hidden={!showFilters} aria-hidden={!showFilters}>
              <div className="section-subtitle">Select one or more technologies:</div>
              <div className="pill-list filter-pill-list" role="listbox" aria-label="Filter by tags" style={{ marginBottom: '.5rem' }}>
                {sortedTags.map(tag => {
                  const active = selected.includes(tag);
                  const count =
                    visibleTagCounts[tag] ?? (selected.length === 0 ? tagCounts[tag] ?? 0 : 0);
                  const isDisabled = !active && selected.length > 0 && count === 0;
                  const onClick = () => { if (!isDisabled) toggleTag(tag); };

                  return (
                    <MagneticItem key={tag} radius={90} strength={0.22} tilt={3}>
                      <button
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
          </>
        )}

        {/* Grid */}
        <div className="flex-container" style={{ marginTop: '1rem' }}>
          {isLoading ? (
            <ProjectsSkeleton count={skeletonCount} />
          ) : (
            visible.map(p => (
              <MagneticItem className="card-container" key={p.slug} radius={90} strength={0.22} tilt={3}>
                <div
                  className="card-target"
                  data-cursor="target"
                  data-cursor-images={p.images?.slice(0, 4).join(',') ?? ''}
                >
                  <ProjectCard project={p} />
                </div>
              </MagneticItem>
            ))
          )}
        </div>

        {/* Empty state */}
        {status !== 'loading' && filtered.length === 0 && (
          <p className="muted" style={{ marginTop: '1rem' }}>
            No projects match your filters.
          </p>
        )}

        {/* Footer link */}
        <div className="flex-container" style={{ marginTop: '1.25rem' }}>
          <Link href="/" className="btn btn--primary see-all">
            <span className="btn__text">Back home</span>
            <span className="count">({list.length})</span>
            <NextIcon className="icon" size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
