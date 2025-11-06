'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchProjects } from '@/store/projectsSlice';
import ProjectCard from '@/components/ProjectCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import Loading from '@/components/Loading';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { list, status, tags } = useAppSelector(s => s.projects);

  useEffect(() => { 
    dispatch(fetchProjects()); 
  },[dispatch]);

  return (
    <main>
      <section className="hero hero--home">
        <div className="hero__header">
          <h1 className="hero__title">Hi, I&apos;m Andrei</h1>
          <p className="hero__subtitle">Front-end Developer</p>
        </div>
      </section>

      <section className="container">
        <h2>Projects</h2>
        <div className="pill-list">
          {tags.map(t => <span key={t} className="pill">{t}</span>)}
        </div>
        {status === 'loading' && <Loading />}
        <div className="flex-container" style={{ marginTop: '1rem' }}>
          {list.map(p => <ProjectCard key={p.slug} project={p} />)}
        </div>



      </section>
    </main>
  );
}


