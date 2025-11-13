// components/home/HomeView.tsx



import Link from 'next/link';
import type { Project } from '@/lib/data/projects.query';
import ProjectCard from '@/components/project/ProjectCard';
import NextIcon from '@/components/icons/NextIcon';
import FloatingTargetCursor from '@/components/fx/FloatingTargetCursor';
import MagneticItem from '@/components/fx/MagneticItem';
import ShatterTitle from '@/components/fx/ShatterTitle';
import HeroFX from '@/components/fx/HeroFX';
import CtaStrip from '@/components/layout/CtaStrip';

type Props = {
  projects: Project[];
  featured: Project[];
  tags: string[];
};

export default function HomeView({ projects, featured }: Props) {
  const count = projects.length;

  return (
    <main>
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
        </div>
      </section>

      <FloatingTargetCursor within=".flex-container" activeSize={140} />

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
          {featured.map((p) => (
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
          ))}
        </div>

        <div className="flex-container">
          <Link href="/projects" className="btn btn--primary see-all">
            <span className="btn__text">See all projects</span>
            <span className="count">({count})</span>
            <NextIcon className="icon" size={20} />
          </Link>
        </div>
      </section>

      <CtaStrip
        title="Let’s build something great"
        href="/contact"
        rightSlot={
          <Link className="btn btn--primary" href="/contact">
            <span className="btn__text">Contact me</span>
            <NextIcon className="icon" size={20} />
          </Link>
        }
      />
    </main>
  );
}
