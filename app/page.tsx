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
import ShatterTitle from '@/components/ShatterTitle';
import HeroFX from '@/components/HeroFX';
import ProjectsSkeleton from "@/components/ProjectsSkeleton";
import CtaStrip from '@/components/CtaStrip';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { list, status } = useAppSelector(s => s.projects);
  const isLoading = status !== 'succeeded' && list.length === 0;



  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const featured = useMemo(() => list.filter(p => p.featured), [list]);



  return (
    <main>
      {/* <section className="hero hero--home" style={{ position: 'relative', minHeight: '60vh', overflow: 'hidden' }}>

  <HeroVideo
    webmSrc="/videos/hero.webm"
    mp4Src="/videos/hero.mp4"
    poster="/images/hero-poster.jpg"
    className="hero__video" 
  /> */}

      <section className="hero hero--home">
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
            Hi, I&apos;m Andrei
          </ShatterTitle>

          <ShatterTitle
            as="div"
            className="hero__subtitle"
            radius={150}
            maxOffset={20}
            maxRotate={12}
            popScale={1.07}
          >
            Frontend Developer
          </ShatterTitle>

          {/* <p className="hero__subtitle">Frontend Developer</p> */}
        </div>
      </section>

      <FloatingTargetCursor within=".flex-container" activeSize={140} />


      {/* FEATURED PROJECTS */}
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
              Featured projects
            </ShatterTitle>


          </h2>
        </div>



        <div className="flex-container">
          {isLoading ? (
            <ProjectsSkeleton count={6} />
          ) : (
            <>
              {featured.map((p) => (
                <MagneticItem className="card-container" key={p.slug} radius={90} strength={0.22} tilt={3}>
                  <div
                    className="card-target"
                    data-cursor="target"
                    data-cursor-images={p.images?.slice(0, 4).join(",") ?? ""}
                  >
                    <ProjectCard project={p} />
                  </div>
                </MagneticItem>
              ))}
            </>


          )}
        </div>


        <div className="flex-container">
          <Link href="/projects" className="btn btn--primary see-all">
            <span className="btn__text">See all projects</span>
            <span className="count">({list.length})</span>
            <NextIcon className="icon" size={20} />
          </Link>
        </div>

      </section>

      <CtaStrip
        title="Let’s build something great"

        href="/contact"
        rightSlot={
          <Link className="btn btn--primary" href={`/contact`}>
            <span className="btn__text">Contact me</span>
            <NextIcon className="icon" size={20} />
          </Link>
        }
      />

    </main>
  );
}
