'use client';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchProjects } from '@/store/projectsSlice';
import ProjectCard from '@/components/ProjectCard';
import ProjectsSkeleton from '@/components/ProjectsSkeleton';
import MagneticItem from '@/components/MagneticItem';
import NextIcon from '@/components/icons/NextIcon';

const DEFAULT_PAGE_SIZE = 12; // fallback when we truly don't know

export default function ProjectsPage() {
  const dispatch = useAppDispatch();
  const { list, status } = useAppSelector(s => s.projects);

  // If you paginate: read ?limit from URL (e.g. /projects?limit=60)
  const params = useSearchParams();
  const limitParam = params.get('limit');
  const pageSize = limitParam ? Math.max(1, Number(limitParam)) : undefined;

  useEffect(() => {
    // fetch the projects for this page
    dispatch(fetchProjects());
  }, [dispatch]);

  const isLoading = status !== 'succeeded' && list.length === 0;

  // Number of cards we *expect* to render on first paint
  const skeletonCount =
    isLoading
      ? (pageSize ?? (list.length || DEFAULT_PAGE_SIZE))
      : 0;

  // If you paginate client-side, cap to pageSize for display
  const visible = useMemo(
    () => (pageSize ? list.slice(0, pageSize) : list),
    [list, pageSize]
  );

  return (
    <main className="container">
      <div className="section-header">
        <h1 className="h2 section-title">All projects</h1>
      </div>

      <div className="flex-container">
        {isLoading ? (
          <ProjectsSkeleton count={skeletonCount} />
        ) : (
          visible.map((p) => (
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

      <div className="flex-container">
        <Link href="/" className="btn btn--primary see-all">
          <span className="btn__text">Back home</span>
          <span className="count">({list.length})</span>
          <NextIcon className="icon" size={20} />
        </Link>
      </div>
    </main>
  );
}
