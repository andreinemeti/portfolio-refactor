'use client';
import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { fetchProjects } from '@/store/projectsSlice';
import ProjectCard from '@/components/ProjectCard';
import Loading from '@/components/Loading';
import NextIcon from '@/components/icons/NextIcon';
import FloatingTargetCursor from '@/components/FloatingTargetCursor';
import MagneticItem from '@/components/MagneticItem';
export default function HomePage() {
  const dispatch = useAppDispatch();
  const { list, status } = useAppSelector(s => s.projects);

  useEffect(() => { dispatch(fetchProjects()); }, [dispatch]);

  const featured = useMemo(() => list.filter(p => p.featured), [list]);

  // simple tech list you can extend/reorder anytime
  const techs = [
    'Next.js','React','TypeScript','JavaScript', 'HTML5', 'Nunjucks', 'MongoDB','MySQL','PHP',
    'CSS3','LESS','Sass','BEM','Figma','Photoshop','Jira','Confluence',
    'Git','npm','pnpm','Webpack','Vite','SEO','a11y'
  ];

  return (
    <main>
      {/* HERO */}
      <section className="hero hero--home">
        <div className="hero__header">
          <h1 className="hero__title">Hi, I&apos;m Andrei</h1>
          <p className="hero__subtitle">Front-end Developer</p>
        </div>
      </section>

<FloatingTargetCursor within=".flex-container"  activeSize={140} />
      {/* TECH STACK */}
      {/* <section className="container tech" aria-labelledby="tech-title">
        <div className="tech__header">
          <h2 id="tech-title" className="tech__title h2">Tech & tools</h2>
          
        </div>
        <ul className="tech__list" role="list">
          {techs.map(t => (
            <li key={t} className="tech__item">
              <span className="badge">{t}</span>
            </li>
          ))}
        </ul>
      </section> */}

      {/* FEATURED PROJECTS */}
      <section className="container">
        <div className="section-header">
          <h2 className="h2 section-title">
            Featured projects <span className="count">({featured.length})</span>
          </h2>
        </div>

        {status === 'loading' && <Loading />}

        <div className="flex-container" style={{ marginTop: '1rem' }}>
          {featured.map(p => 
          <MagneticItem className="card-container" key={p.slug } radius={90} strength={0.22} tilt={3}>
          <div
      key={p.slug}
      className="card-target"
      data-cursor="target"
      data-cursor-images={p.images?.slice(0,4).join(',') ?? ''}
    >
          <ProjectCard key={p.slug} project={p} />
          </div>
          </MagneticItem>
          )}
        </div>
       
        <Link href="/projects" className="btn btn--primary">
          <span className="btn__text">See all projects</span>
          <span className="count">({list.length})</span>
          <NextIcon className="icon" size={20} />
        </Link>
      
      </section>
    </main>
  );
}
