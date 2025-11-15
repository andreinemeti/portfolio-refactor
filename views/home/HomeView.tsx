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
import DevIcon from '@/components/icons/DevIcon';
import ToolsIcon from '@/components/icons/ToolsIcon';



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
            icon: <RocketIcon className="icon" size={45} />,
            value: '50+',
            label: 'Projects Completed',
          },
          {
            icon: <UsersIcon className="icon" size={45} />,
            value: '30+',
            label: 'Happy Clients',
          },
          {
            icon: <CoffeeCupIcon className="icon" size={45} />,
            value: '1000+',
            label: 'Cups of Coffee',
          },
          {
            icon: <BadgeIcon className="icon" size={45} />,
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


      <section className="container skills">
        <div className="section-header">
          <h2 className="h2 section-title">

            <ShatterTitle
              as="div"

              radius={150}
              maxOffset={20}
              maxRotate={12}
              popScale={1.07}
            >
              Skills &amp; Technologies
            </ShatterTitle>

          </h2>
        </div>
        <p className="gradient-text">
          What I use to design, build, and ship reliable web applications.
        </p>

        <div className="skills__grid">
          <ServiceCard
            icon={<WebDevelopmentIcon className="icon" size={32} />}
            title="Web development"
            desc="Modern, component-driven interfaces with a focus on UX and accessibility."
            className="service-card--skills"
          >
            <div className="pill-list">
              <span className="pill">React.js</span>
              <span className="pill">Next.js</span>
              <span className="pill">TypeScript</span>
              <span className="pill">PHP</span>
              <span className="pill">HTML5</span>
              <span className="pill">Sass</span>
              <span className="pill">Less</span>
            </div>
          </ServiceCard>



          <ServiceCard
            icon={<ToolsIcon className="icon" size={32} />}
            title="Tools"
            desc="Productivity and design tools I use day to day."
            className="service-card--skills"
          >

            <div className="pill-list">
              <span className="pill">Git</span>
              <span className="pill">Figma</span>
              <span className="pill">Photoshop</span>
              <span className="pill">Webpack</span>
              <span className="pill">Vite</span>
              <span className="pill">Gulp</span>
            </div>
          </ServiceCard>

          <ServiceCard
            icon={<BadgeIcon className="icon" size={32} />}
            title="Practices"
            desc="How I approach building, shipping, and improving products."
            className="service-card--skills"
          >
            <div className="pill-list">
              <span className="pill">Responsive Design</span>
              <span className="pill">Accesibility (a11y)</span>
              <span className="pill">SEO</span>
              <span className="pill">Testing (Jest, Cypress)</span>
              <span className="pill">Agile</span>

            </div>
          </ServiceCard>
        </div>
      </section>




      <FloatingTargetCursor within=".flex-container" activeSize={140} />

      <section className="container projects">
        <div className="section-header">
          <h2 className="h2 section-title">
            <ShatterTitle
              as="div"

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
          <Link href={ROUTES.PROJECTS} className="btn btn--accent see-all">
            <span className="btn__text">See all projects</span>
            <span className="count">({count})</span>

          </Link>
        </div>
      </section>


      <section className="container testimonials">
        <div className="section-header">
          <h2 className="h2 section-title">
            <ShatterTitle
              as="div"

              radius={150}
              maxOffset={20}
              maxRotate={12}
              popScale={1.07}
            >
              What People Say
            </ShatterTitle>

          </h2>
        </div>

         <p className="gradient-text">
      Reviews from clients on Upwork, Fiverr and other long term collaborations.
    </p>

        <div className="testimonials__grid">

          <MagneticItem className=""  radius={90} strength={0.22} tilt={3}>
          <article className="testimonials__card">
            <div className="testimonials__stars" aria-label="5 out of 5 stars">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>

            <p className="testimonials__quote">
              &quot;I&apos;m very satisfied! He proved to be very professional,
              efficient, prompt etc. Communication turned to be very effective.
              Even though I contact him with kind of difficult tasks he managed
              to do them very quickly, answering all my questions in a couple of
              minutes. I would like to recommend him and, once more, I&apos;m
              hoping we will collaborate for further projects. Thanks, again!
              Great job!&quot;
            </p>

            <div className="testimonials__meta">
                <img height="25" src="/images/upwork.png"></img>
              <div className="testimonials__name">Upwork Client</div>
              <div className="testimonials__role">Web App Owner</div>
              <div className="testimonials__company">Remote Collaboration</div>
            </div>
          </article>
</MagneticItem>

<MagneticItem className=""  radius={90} strength={0.22} tilt={3}>
          <article className="testimonials__card">
            <div className="testimonials__stars" aria-label="5 out of 5 stars">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>

            <p className="testimonials__quote">
              &quot;Andrei is a hidden gem on Upwork. He&apos;s one of the most
              professional, skilled and helpful freelancers I&apos;ve ever worked
              with. He created several custom pages for us in a matter of days
              and they are perfect. He went above and beyond to ensure they were
              set up properly. Highly recommended!&quot;
            </p>

            <div className="testimonials__meta">
              <img height="25" src="/images/upwork.png"></img>
              <div className="testimonials__name">Upwork Client</div>
              <div className="testimonials__role">Marketing Manager</div>
              <div className="testimonials__company">SaaS Company</div>
            </div>
          </article>

          </MagneticItem>


<MagneticItem className=""  radius={90} strength={0.22} tilt={3}>
          <article className="testimonials__card">
            <div className="testimonials__stars" aria-label="5 out of 5 stars">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>

            <p className="testimonials__quote">
              &quot;Andrei quickly understood our product and shipped a polished,
              responsive interface in no time. His suggestions improved both UX
              and performance, and communication throughout the project was
              clear and proactive.&quot;
            </p>

            <div className="testimonials__meta">
              <img height="25" src="/images/fiverr.png"></img>
              <div className="testimonials__name">Fiverr client</div>
              <div className="testimonials__role">Founder</div>
              <div className="testimonials__company">Startup Founder</div>
            </div>
          </article>
          </MagneticItem>
        </div>
      </section>

      <CtaStrip
        title="Let’s build something great"
        subtitle="Tell me about your project and timeline."
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
