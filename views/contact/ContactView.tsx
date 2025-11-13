// views/contact/ContactView.tsx
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import HeroFX from '@/components/fx/HeroFX';
import ShatterTitle from '@/components/fx/ShatterTitle';

export default function ContactView() {
  return (
    <main>
      <section className="hero hero--contact">
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
            Contact
          </ShatterTitle>

          <ShatterTitle
            as="div"
            className="hero__subtitle"
            radius={150}
            maxOffset={20}
            maxRotate={12}
            popScale={1.07}
          >
            Let’s talk about your project
          </ShatterTitle>
        </div>
      </section>

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      <section className="container contact">
        <div className="contact__card">
          <h2 className="h2 contact__title">
            <ShatterTitle
              as="span"
              className=""
              radius={150}
              maxOffset={20}
              maxRotate={12}
              popScale={1.07}
            >
              Get in touch
            </ShatterTitle>
          </h2>

          <p className="contact__text">
            <ShatterTitle
              as="span"
              className=""
              radius={150}
              maxOffset={20}
              maxRotate={12}
              popScale={1.07}
            >
              I’m always happy to hear about new projects, ideas, and collaborations.
            </ShatterTitle>
          </p>

          <div className="contact__methods">
            <a
              className="link contact__link"
              href="mailto:andrein.webdesign@gmail.com"
              aria-label="Email Andrei"
            >
              andrein.webdesign@gmail.com
            </a>

            <a
              className="link contact__link"
              href="https://www.linkedin.com/in/andrei-marian-nemeti/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
