'use client';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import LinkIcon from '@/components/icons/LinkIcon';
import LinkedInIcon from '@/components/icons/LinkedInIcon';

export default function ContactPage() {
  return (
    <main>
      <section className="hero hero--contact">
        <div className="hero__header">
          <h1 className="hero__title">Contact</h1>
          <p className="hero__subtitle">Let’s talk about your project</p>
        </div>
      </section>

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      <section className="container contact">
        <div className="contact__card">
          <h2 className="h2 contact__title">Get in touch</h2>
          <p className="contact__text">
            I’m always happy to hear about new projects, ideas, and collaborations.
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
