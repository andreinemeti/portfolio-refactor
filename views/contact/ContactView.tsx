// views/contact/ContactView.tsx
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import HeroFX from '@/components/fx/HeroFX';
import ShatterTitle from '@/components/fx/ShatterTitle';
import MailIcon from '@/components/icons/MailIcon';
import LinkedinIcon from '@/components/icons/LinkedInIcon';
import GithubIcon from '@/components/icons/GitHubIcon';

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
              className="hero__subtitle"
              radius={150}
              maxOffset={20}
              maxRotate={12}
              popScale={1.07}
            >
              Feel free to reach out for collaborations, freelance work, or just
              a friendly hello.
            </ShatterTitle>
          </p>

          <ul className="contact__list">
            <li className="contact__item">
              <div className="contact__icon-box">
                <MailIcon className="icon" size={22} />
              </div>
              <div className="contact__details">
                <span className="contact__label">Email</span>
                <a
                  className="contact__value"
                  href="mailto:andrein.webdesign@gmail.com"
                >
                  andrein.webdesign@gmail.com
                </a>
              </div>
            </li>

            <li className="contact__item">
              <div className="contact__icon-box">
                <LinkedinIcon className="icon" size={22} />
              </div>
              <div className="contact__details">
                <span className="contact__label">LinkedIn</span>
                <a
                  className="contact__value"
                  href="https://www.linkedin.com/in/andrei-nemeti"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Andrei Nemeti
                </a>
              </div>
            </li>

            <li className="contact__item">
              <div className="contact__icon-box">
                <GithubIcon className="icon" size={22} />
              </div>
              <div className="contact__details">
                <span className="contact__label">GitHub</span>
                <a
                  className="contact__value"
                  href="https://github.com/andreinemeti"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  andreinemeti
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
