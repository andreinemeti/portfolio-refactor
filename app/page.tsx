'use client';
import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchProjects } from '@/store/projectsSlice';
import ProjectCard from '@/components/ProjectCard';
import Loading from '@/components/Loading';
import NextIcon from '@/components/icons/NextIcon';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { list, status, tags } = useAppSelector(s => s.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Only featured projects
  const featured = useMemo(() => list.filter(p => p.featured), [list]);

  return (
    <main>
      <section className="hero hero--home">
        <div className="hero__header">
          <h1 className="hero__title">Hi, I&apos;m Andrei</h1>
          <p className="hero__subtitle">Front-end Developer</p>
        </div>
      </section>

      <section className="container">
        {/* header row */}
        <div className="section-header">
          <h2 className="h2 section-title">
            Projects <span className="count">({list.length})</span>
          </h2>
         
        </div>

        {/* <div className="pill-list">
          {tags.map(t => <span key={t} className="pill">{t}</span>)}
        </div> */}

        {status === 'loading' && <Loading />}

        <div className="flex-container" style={{ marginTop: '1rem' }}>
          {featured.map(p => <ProjectCard key={p.slug} project={p} />)}
        </div>
         <Link href="/projects" className="btn btn--ghost"><span className="btn__text">See all projects</span><NextIcon className="icon" size={20} /></Link>
      </section>
    </main>
  );
}
