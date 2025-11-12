// app/services/page.tsx
'use client';

import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import NextIcon from '@/components/icons/NextIcon';
import ServiceCard from '@/components/ServiceCard';


import CtaStrip from '@/components/CtaStrip';
import UiIcon from '@/components/icons/UiIcon';
import DevIcon from '@/components/icons/DevIcon';
import PerfIcon from '@/components/icons/PerfIcon';
import MagneticItem from '@/components/MagneticItem';
import HeroFX from '@/components/HeroFX';
import ShatterTitle from '@/components/ShatterTitle';


export default function ServicesPage() {

    const Icons = {
        dev: DevIcon,
        ui: UiIcon,
        perf: PerfIcon
    };

    return (
        <main className="services">
            {/* Hero */}
            <section className="hero hero--project hero--services services__hero">
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
                        Services
                    </ShatterTitle>

                    <ShatterTitle
                        as="div"
                        className="hero__subtitle"
                        radius={150}
                        maxOffset={20}
                        maxRotate={12}
                        popScale={1.07}
                    >
                        Fast, elegant, accessible
                    </ShatterTitle>



                </div>
            </section>

            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />

            <section className="services__section container">
                <header className="services__section-header">
                    <h2 className="services__section-title h2">

                        <ShatterTitle
                            as="div"
                            className="hero__subtitle"
                            radius={150}
                            maxOffset={20}
                            maxRotate={12}
                            popScale={1.07}
                        >
                            What I do
                        </ShatterTitle>

                    </h2>
                </header>

                <div className="services__grid">
                    <ServiceCard
                        icon={<DevIcon />}
                        title="Frontend Development"
                        desc="Modern UI with Next.js/React, TypeScript, and scalable architectures."
                        features={['Next.js (App Router)', 'TypeScript + clean patterns', 'Responsive & a11y-first']}
                        ctaHref="/contact"
                        ctaLabel="Discuss your build"
                        className="service-card--accent"
                    />

                    <ServiceCard
                        icon={<UiIcon />}
                        title="UI/UX Implementation"
                        desc="High-fidelity, component-driven builds from Figma/Sketch with thoughtful motion."
                        features={['Design-to-code fidelity', 'Micro-interactions & motion', 'Design systems & tokens']}
                        ctaHref="/projects"
                        ctaLabel="See examples"
                    />

                    <ServiceCard
                        icon={<PerfIcon />}
                        title="Performance & SEO"
                        desc="Lighthouse-focused setups with strong CWV, semantic HTML & metadata."
                        features={['Image & code optimization', 'Core Web Vitals tuning', 'Structured metadata']}
                        ctaHref="/contact"
                        ctaLabel="Improve your scores"
                    />
                </div>
            </section>

            {/* Process */}
            {/* Process */}
            <section className="services__section container">
                <header className="services__section-header">
                    <h2 className="services__section-title h2">

                        <ShatterTitle
                            as="div"
                            className="hero__subtitle"
                            radius={150}
                            maxOffset={20}
                            maxRotate={12}
                            popScale={1.07}
                        >
                            Process
                        </ShatterTitle>


                    </h2>
                </header>

                <ol className="process" role="list">

                    <MagneticItem className="card-container" radius={90} strength={0.22} tilt={3}>
                        <li className="process__item">
                            <div className="process__content">
                                <h3 className="process__title">Discovery</h3>
                                <p className="process__desc">
                                    Goals, constraints, audience, success metrics.
                                </p>
                            </div>
                        </li>
                    </MagneticItem>

                    <MagneticItem className="card-container" radius={90} strength={0.22} tilt={3}>
                        <li className="process__item">
                            <div className="process__content">
                                <h3 className="process__title">Design handoff</h3>
                                <p className="process__desc">
                                    Systems, components, and motion specs.
                                </p>
                            </div>
                        </li>
                    </MagneticItem>


                    <MagneticItem className="card-container" radius={90} strength={0.22} tilt={3}>
                        <li className="process__item">
                            <div className="process__content">
                                <h3 className="process__title">Implementation</h3>
                                <p className="process__desc">
                                    Iterative, accessible, tested UI.
                                </p>
                            </div>
                        </li>
                    </MagneticItem>
                </ol>
            </section>

            <CtaStrip
                title="Let’s build something great"
                subtitle="Tell me about your project and timeline."
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
