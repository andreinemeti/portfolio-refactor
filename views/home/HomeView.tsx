// components/home/HomeView.tsx



import Link from 'next/link';
import type { Project } from '@/lib/data/projects.query';
import ProjectCard from '@/components/project/ProjectCard';
import NextIcon from '@/components/icons/NextIcon';
import RocketIcon from '@/components/icons/RocketIcon';
import UsersIcon from '@/components/icons/UsersIcon';
import CoffeeCupIcon from '@/components/icons/CoffeeCupIcon';
import BadgeIcon from '@/components/icons/BadgeIcon';

import ServiceCard from '@/components/service/ServiceCard';
import FloatingTargetCursor from '@/components/fx/FloatingTargetCursor';
import MagneticItem from '@/components/fx/MagneticItem';
import ShatterTitle from '@/components/fx/ShatterTitle';
import HeroFX from '@/components/fx/HeroFX';
import CtaStrip from '@/components/layout/CtaStrip';
import HighlightsStrip from '@/components/layout/HighlightsStrip';
import { ROUTES } from '@/utils/constants';
import WebDevelopmentIcon from '@/components/icons/WebDevelopmentIcon';
import PerformanceIcon from '@/components/icons/PerformanceIcon';



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


        <div className="hero__actions">
          <MagneticItem className="" radius={90} strength={0.22} tilt={3}>


            <Link href={ROUTES.PROJECTS} className="btn btn--accent">
              <span className="btn__text">View my work</span>
            </Link> </MagneticItem>

          <MagneticItem className="" radius={90} strength={0.22} tilt={3}>
            <Link href={ROUTES.CONTACT} className="btn btn--primary">
              <span className="btn__text">Get in touch</span>
              <NextIcon className="icon" size={20} />
            </Link>
          </MagneticItem>
        </div>
      </section>

       <HighlightsStrip
        items={[
          {
            icon: <RocketIcon className="icon" size={50} />,
            value: '50+',
            label: 'Projects Completed',
          },
          {
            icon: <UsersIcon className="icon" size={50} />,
            value: '30+',
            label: 'Happy Clients',
          },
          {
            icon: <CoffeeCupIcon className="icon" size={50} />,
            value: '1000+',
            label: 'Cups of Coffee',
          },
          {
            icon: <BadgeIcon className="icon" size={50} />,
            value: '8+',
            label: 'Years Experience',
          },
        ]}
      />

       <section className="container about">
        <div className="section-header">
          <h2 className="h2 section-title">

                  <ShatterTitle
                          as="div"
                         
                          radius={150}
                          maxOffset={20}
                          maxRotate={12}
                          popScale={1.07}
                        >
                          About Me
                        </ShatterTitle>

            
            </h2>
        </div>

        <p className="about__intro gradient-text">
          I&apos;m a passionate frontend developer with 7+ years of experience
          turning complex ideas into fast, delightful web applications. 
        </p>

        <div className="services__grid">
          <ServiceCard
            icon={<WebDevelopmentIcon className="icon" size={40} />}
            title="Clean Code"
            desc="Writing maintainable, scalable, and well-structured frontends using modern tooling and best practices."
            className="service-card--about"
          />

          <ServiceCard
            icon={<PerformanceIcon className="icon" size={40} />}
            title="Pixel Perfect"
            desc="Transforming Figma designs into responsive, accessible interfaces with meticulous attention to detail."
            className="service-card--about"
          />

          <ServiceCard
            icon={<BadgeIcon className="icon" size={40} />}
            title="Performance"
            desc="Optimizing applications for speed, efficiency, and a smooth user experience across all devices."
            className="service-card--about"
          />
        </div>
      </section>

      <FloatingTargetCursor within=".flex-container" activeSize={140} />

      <section className="container projects">
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

            <p className="gradient-text">
         A selection of real-world projects where I designed and built modern UI's.
        </p>

        <div className="flex-container">
          {featured.map((p) => (
            <MagneticItem
              className="card-container project-card-container"
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
          <Link href={ROUTES.PROJECTS} className="btn btn--primary see-all">
            <span className="btn__text">See all projects</span>
            <span className="count">({count})</span>
           
          </Link>
        </div>
      </section>

      <CtaStrip
        title="Let’s build something great"
        href={ROUTES.CONTACT}
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
