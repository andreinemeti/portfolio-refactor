// views/projects/ProjectsListView.tsx
'use client';

import { useMemo, useState, useCallback } from 'react';
import Link from 'next/link';

import type { Project } from '@/lib/data/projects.query';

import ProjectCard from '@/components/ProjectCard';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import FloatingTargetCursor from '@/components/fx/FloatingTargetCursor';
import MagneticItem from '@/components/fx/MagneticItem';
import ShatterTitle from '@/components/fx/ShatterTitle';
import NextIcon from '@/components/icons/NextIcon';
import HeroFX from '@/components/fx/HeroFX';
import ProjectsSkeleton from '@/components/ProjectsSkeleton';

const DEFAULT_PAGE_SIZE = 46;

type Props = {
  projects: Project[];
  tags: string[];
  pageSize?: number;
};

export default function ProjectsListView({ projects, tags, pageSize }: Props) {
  // Filters UI
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleTag = useCallback((tag: string) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const clearFilters = useCallback(() => setSelected([]), []);

  // For now we always have data on first render (SSR),
  // but you might still want the skeleton pattern:
  const isLoading = false;
  const skeletonCount = isLoading
    ? pageSize ?? (projects.length || DEFAULT_PAGE_SIZE)
    : 0;

  // Filtering
  const allTags = tags ?? [];

  const filtered = useMemo(() => {
    if (selected.length === 0) return projects;
    return projects.filter((p) => selected.every((tag) => p.tags.includes(tag)));
  }, [projects, selected]);

  const visible = useMemo(
    () => (pageSize ? filtered.slice(0, pageSize) : filtered),
    [filtered, pageSize],
  );

  // Tag helpers (sorted list + counts)
  const sortedTags = useMemo(
    () =>
      [...allTags].sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
      ),
    [allTags],
  );

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of projects) {
      for (const t of p.tags ?? []) {
        counts[t] = (counts[t] ?? 0) + 1;
      }
    }
    return counts;
  }, [projects]);

  const visibleTagCounts = useMemo(() => {
    if (selected.length === 0) return tagCounts;

    const counts: Record<string, number> = {};
    for (const t of allTags) {
      if (selected.includes(t)) {
        counts[t] = filtered.length;
      } else {
        counts[t] = projects.filter((p) =>
          [...selected, t].every((tag) => p.tags.includes(tag)),
        ).length;
      }
    }
    return counts;
  }, [allTags, filtered.length, projects, selected, tagCounts]);

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
                onClick={() => setShowFilters((v) => !v)}
                aria-expanded={showFilters}
                aria-controls="project-filters"
              >
                Filters
                {selected.length > 0 ? ` (${selected.length} selected)` : ''}
              </button>

              {selected.length > 0 && (
                <button className="btn btn--ghost" onClick={clearFilters}>
                  Clear filters ({selected.length})
                </button>
              )}
            </div>

            <div
              id="project-filters"
              hidden={!showFilters}
              aria-hidden={!showFilters}
            >
              <div className="section-subtitle">
                Select one or more technologies:
              </div>

              <div
                className="pill-list filter-pill-list"
                role="listbox"
                aria-label="Filter by tags"
                style={{ marginBottom: '.5rem' }}
              >
                {sortedTags.map((tag) => {
                  const active = selected.includes(tag);
                  const count =
                    visibleTagCounts[tag] ??
                    (selected.length === 0 ? tagCounts[tag] ?? 0 : 0);
                  const isDisabled =
                    !active && selected.length > 0 && count === 0;
                  const onClick = () => {
                    if (!isDisabled) toggleTag(tag);
                  };

                  return (
                    <MagneticItem
                      key={tag}
                      radius={90}
                      strength={0.22}
                      tilt={3}
                    >
                      <button
                        type="button"
                        onClick={onClick}
                        className={`pill pill--button ${
                          active ? 'pill--active' : ''
                        } ${isDisabled ? 'pill--disabled' : ''}`}
                        aria-pressed={active}
                        aria-disabled={isDisabled}
                        disabled={isDisabled}
                        title={`${tag} (${count} projects)`}
                      >
                        {tag}&nbsp;
                        <span className="pill__count">({count})</span>
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
            visible.map((p) => (
              <MagneticItem
                className="card-container"
                key={p.slug}
                radius={90}
                strength={0.22}
                tilt={3}
              >
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
        {!isLoading && filtered.length === 0 && (
          <p className="muted" style={{ marginTop: '1rem' }}>
            No projects match your filters.
          </p>
        )}

        {/* Footer link */}
        <div className="flex-container" style={{ marginTop: '1.25rem' }}>
          <Link href="/" className="btn btn--primary see-all">
            <span className="btn__text">Back home</span>
            <span className="count">({projects.length})</span>
            <NextIcon className="icon" size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
