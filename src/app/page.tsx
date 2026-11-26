import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import { connection } from "next/server";
import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  BriefcaseBusiness,
  Code2,
  Layers3,
  Mail,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveals } from "@/components/ScrollReveals";
import { readContent } from "@/lib/content-store";
import type { IconName } from "@/lib/content-types";

const iconMap: Record<IconName, LucideIcon> = {
  Layers3,
  Braces,
  Sparkles,
  Code2,
  BriefcaseBusiness,
  Mail,
  ArrowUpRight,
};

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const { site } = await readContent();
  return {
    alternates: { canonical: site.canonical },
    title: site.title,
    description: site.description,
  };
}

function entranceDelay(milliseconds: number): CSSProperties {
  return { "--entry-delay": `${milliseconds}ms` } as CSSProperties;
}

export default async function Portfolio() {
  await connection();
  const { site, navigation, hero, about, services, projects, experience, contact } = await readContent();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#home" aria-label={`${site.name} — back to top`}>
            <span className="brand-mark" aria-hidden="true">
              <Image src={site.brandMark} alt="" width={40} height={24} preload />
            </span>
            <span className="wordmark-text">{site.name}</span>
          </a>
          <nav aria-label="Main navigation">
            {navigation.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
          </nav>
        </div>
      </header>

      <main id="main">
        <ScrollReveals />
        <section id="home" className="hero" aria-labelledby="hero-title">
          <div className="shell hero-inner">
            <div>
              <p className="eyebrow" data-entrance="" style={entranceDelay(200)}>{hero.eyebrow}</p>
              <h1 id="hero-title" data-entrance="" style={entranceDelay(300)}>
                {hero.titleLines.map((line, index) => (
                  <Fragment key={`${line}-${index}`}>{index > 0 && <br />}{line}</Fragment>
                ))}
                <span>{hero.titleAccent}</span>
              </h1>
              <p className="hero-description" data-entrance="" style={entranceDelay(400)}>{hero.description}</p>
              <div className="hero-actions" data-entrance="" style={entranceDelay(500)}>
                <a className="button" href={hero.primaryHref}>{hero.primaryLabel} <ArrowDown size={18} aria-hidden="true" /></a>
                <a className="text-link" href={hero.secondaryHref}>{hero.secondaryLabel} <ArrowUpRight size={17} aria-hidden="true" /></a>
                <a id="cv" className="text-link" href={site.cvHref} target="_blank" rel="noopener">
                  {hero.cvLabel} <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="portrait" data-entrance="portrait">
              <Image
                src={site.portrait}
                alt={site.portraitAlt}
                width={1254}
                height={1254}
                sizes="(max-width: 700px) 90vw, (max-width: 1160px) 40vw, 450px"
                preload
              />
            </div>
          </div>
        </section>

        <section id="about" className="shell section about" aria-labelledby="about-title">
          <h2 id="about-title" data-reveal="fade-up">About me</h2>
          <div data-reveal="zoom-in" style={entranceDelay(500)}>
            {about.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <ul className="tech-list" aria-label="Technologies">
              {about.techList.map((tech) => <li key={tech}>{tech}</li>)}
            </ul>
          </div>
        </section>

        <section id="services" className="shell section" aria-labelledby="services-title">
          <h2 id="services-title" data-reveal="fade-up">{services.heading}</h2>
          <div className="services-grid">
            {services.items.map(({ icon, title, description }, index) => {
              const Icon = iconMap[icon];
              return (
                <article className="service" key={`${title}-${index}`} data-reveal="zoom-out-up" style={entranceDelay(200 + index * 100)}>
                  <Icon size={26} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="projects" className="shell section" aria-labelledby="projects-title">
          <h2 id="projects-title" data-reveal="fade-up">{projects.heading}</h2>
          <div className="project-grid">
            {projects.items.map(({ title, category, stack, description, href, theme }, index) => (
              <article
                className="project"
                data-theme={theme}
                key={`${title}-${index}`}
                data-reveal="fade-up"
                style={entranceDelay(200 + index * 100)}
              >
                <div className="project-heading">
                  <div>
                    <p className="project-category">{category}</p>
                    <h3>{title}</h3>
                  </div>
                  {href && (
                    <a className="project-link" href={href} aria-label={`Open ${title}`}>
                      <ArrowUpRight size={21} aria-hidden="true" />
                    </a>
                  )}
                </div>
                <p>{description}</p>
                {stack && <p className="stack">{stack}</p>}
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="shell section" aria-labelledby="experience-title">
          <h2 id="experience-title" data-reveal="fade-up">{experience.heading}</h2>
          <ul className="experience-list">
            {experience.items.map(({ role, organization, period, duration, summary, contribution }, index) => (
              <li className="experience-entry" key={`${role}-${index}`} data-reveal="fade-up" style={entranceDelay(200 + index * 100)}>
                <span className="experience-period">
                  {period}
                  {duration && <span className="experience-duration">{duration}</span>}
                </span>
                <div>
                  <p className="experience-organization">{organization}</p>
                  <h3>{role}</h3>
                  <p className="experience-detail">{summary}</p>
                  <p className="experience-detail">{contribution}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="shell contact-inner">
            <div className="contact-copy" data-reveal="fade-up">
              <p className="eyebrow">{contact.eyebrow}</p>
              <h2 id="contact-title">{contact.heading}<span>{contact.headingAccent}</span></h2>
              <p className="contact-note">{contact.note}</p>
            </div>
            <div className="contact-actions" data-reveal="fade-up" style={entranceDelay(300)}>
              <a className="contact-primary" href={`mailto:${contact.email}`}>
                <span className="contact-primary-icon"><Mail size={21} aria-hidden="true" /></span>
                <span className="contact-primary-text">
                  <small>{contact.emailLabel}</small>
                  <strong>{contact.email}</strong>
                </span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
              <div className="contact-socials">
                {contact.socials.map(({ icon, label, href }, index) => {
                  const Icon = iconMap[icon];
                  return (
                    <a className="social-link" href={href} key={`${label}-${index}`} target="_blank" rel="noopener">
                      <Icon size={19} aria-hidden="true" />
                      <span>{label}</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="shell site-footer">© {new Date().getFullYear()} {site.name}</footer>
    </>
  );
}
