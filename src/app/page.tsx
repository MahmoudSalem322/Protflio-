import Image from "next/image";
import type { CSSProperties } from "react";
import { ScrollReveals } from "@/components/ScrollReveals";
import { ArrowDown, ArrowUpRight, Braces, Layers3, Sparkles } from "lucide-react";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "CV", href: "#cv" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { icon: Layers3, title: "Full-stack development", description: "Responsive web applications with Next.js and Node.js, from the interface to authentication and database integration." },
  { icon: Braces, title: "APIs & integrations", description: "Node.js APIs that connect web applications to databases, backend services, and third-party tools." },
  { icon: Sparkles, title: "AI-assisted development", description: "Planning, debugging, and reviewing code with Codex and Claude, with hands-on validation of the final result." },
];

const projects = [
  { title: "Masar Platform", category: "Institution management", stack: "React · TypeScript · Vite", description: "A showcase for a modular platform covering operations, employees, tasks, and reporting.", href: "https://masartesting.vercel.app/", theme: "blue" },
  { title: "Workflow Nets", category: "Team collaboration", stack: "Next.js · TypeScript · Tailwind CSS", description: "Frontend development for a workspace with projects, tasks, clients, invoices, chat, and video meetings.", href: "https://www.workflownets.com/", theme: "violet" },
  { title: "Shifa", category: "Healthcare", stack: "Next.js · React · JavaScript", description: "A platform connecting patients with healthcare providers for appointments, medicine requests, donations, and prescriptions.", href: "https://github.com/MahmoudSalem322/Shifa-v1", theme: "teal" },
  { title: "Qabas", category: "Education", stack: "Flutter · Dart · Riverpod", description: "An offline-first learning workspace for web and Android with courses, Markdown notes, reminders, and progress tracking in Arabic and English.", href: "https://github.com/MahmoudSalem322/personal_learning_os", theme: "blue" },
  { title: "Islamic Companion App", category: "Mobile app", stack: "Flutter · Dart · Drift", description: "An Arabic offline-first app for Quran reading, tafsir, adhkar, prayer times, qibla, and reminders.", href: "https://github.com/MahmoudSalem322/hadeel-app", theme: "teal" },
  { title: "Humanitarian Logistical Hubs", category: "Data analytics", description: "A data analytics interface for monitoring parcels across multiple sites.", theme: "sand" },
];

const experience = [
  {
    organization: "Workflow",
    role: "Frontend Developer",
    period: "Jul 2026 – Present",
    summary: "Build and maintain responsive features for a SaaS workspace where agile teams plan, manage, and collaborate on their work.",
    contribution: "Integrate interfaces built with Next.js, TypeScript, and Tailwind CSS with backend services and collaborate through GitHub and Vercel.",
  },
  {
    organization: "TAQAT Academy",
    role: "Co-Mentor, CodeMap Program",
    period: "Jul 2026 – Present",
    summary: "Support the lead mentor and coach trainees on clean, maintainable code and applying the software development lifecycle to real projects.",
    contribution: "Help trainees use AI development tools responsibly to improve productivity and code quality.",
  },
  {
    organization: "TAQAT Academy · CodeMap Program",
    role: "Frontend Developer (Trainee)",
    period: "May – Aug 2026",
    summary: "Took ownership of the Next.js frontend for Masar, a management platform for institutions and NGOs, as part of a mentored development team.",
    contribution: "Collaborated with teammates using Git, GitHub, and Vercel.",
  },
];

const profiles = [
  { label: "GitHub", href: "https://github.com/MahmoudSalem322" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mahmoud-salem-052495419" },
];

function entranceDelay(milliseconds: number): CSSProperties {
  return { "--entry-delay": `${milliseconds}ms` } as CSSProperties;
}

export default function Portfolio() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#home"><span aria-hidden="true">MS</span> Mahmoud Salem</a>
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
              <p className="eyebrow" data-entrance="" style={entranceDelay(200)}>Full-stack developer</p>
              <h1 id="hero-title" data-entrance="" style={entranceDelay(300)}>Mahmoud<br />Salem<span>.</span></h1>
              <p className="hero-description" data-entrance="" style={entranceDelay(400)}>I build web applications with Next.js and Node.js, connecting responsive interfaces to APIs and databases.</p>
              <div className="hero-actions" data-entrance="" style={entranceDelay(500)}>
                <a className="button" href="#projects">View my work <ArrowDown size={18} aria-hidden="true" /></a>
                <a className="text-link" href="#contact">Get in touch <ArrowUpRight size={17} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="portrait" data-entrance="portrait">
              <Image src="/mahmoud-salem.png" alt="Mahmoud Salem" width={1254} height={1254}
                sizes="(max-width: 700px) 90vw, (max-width: 1160px) 40vw, 450px" preload />
            </div>
          </div>
        </section>

        <section id="about" className="shell section about" aria-labelledby="about-title">
          <h2 id="about-title" data-reveal="fade-up">About me</h2>
          <div data-reveal="zoom-in" style={entranceDelay(500)}>
            <p>I build the frontend and backend of web applications, from responsive pages to the services and databases behind them.</p>
            <p>I use Codex and Claude to support planning, implementation, debugging, and code review.</p>
            <ul className="tech-list" aria-label="Technologies">
              {["Next.js", "Node.js", "React", "TypeScript", "Flutter"].map((tech) => <li key={tech}>{tech}</li>)}
            </ul>
          </div>
        </section>

        <section id="services" className="shell section" aria-labelledby="services-title">
          <h2 id="services-title" data-reveal="fade-up">Services</h2>
          <div className="services-grid">
            {services.map(({ icon: Icon, title, description }, index) => (
              <article className="service" key={title} data-reveal="zoom-out-up" style={entranceDelay(200 + index * 100)}>
                <Icon size={26} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="shell section" aria-labelledby="projects-title">
          <h2 id="projects-title" data-reveal="fade-up">Selected work</h2>
          <div className="project-grid">
            {projects.map(({ title, category, stack, description, href, theme }, index) => (
              <article className="project" data-theme={theme} key={title} data-reveal="fade-up" style={entranceDelay(200 + index * 100)}>
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
          <h2 id="experience-title" data-reveal="fade-up">Experience</h2>
          <ul className="experience-list">
            {experience.map(({ role, organization, period, summary, contribution }, index) => (
              <li className="experience-entry" key={role} data-reveal="fade-up" style={entranceDelay(200 + index * 100)}>
                <span className="experience-period">
                  {period}
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

        <section id="cv" className="shell section" aria-labelledby="cv-title">
          <h2 id="cv-title" data-reveal="fade-up">CV</h2>
          <div data-reveal="fade-up" style={entranceDelay(200)}>
            <a className="button" href="/Mahmoud_Salem_CV.pdf" target="_blank" rel="noopener">
              View my CV (PDF) <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="shell contact-inner">
            <div data-reveal="fade-up">
              <p className="eyebrow">Contact</p>
              <h2 id="contact-title">Have a project in mind?</h2>
            </div>
            <div className="contact-links" data-reveal="fade-up" style={entranceDelay(500)}>
              <a className="button" href="mailto:mahmoudsalem3321@gmail.com">Email me <ArrowUpRight size={18} aria-hidden="true" /></a>
              <div className="profiles">
                {profiles.map(({ label, href }) => (
                  <a className="text-link" href={href} key={label}>{label} <ArrowUpRight size={15} aria-hidden="true" /></a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="shell site-footer">© {new Date().getFullYear()} Mahmoud Salem</footer>
    </>
  );
}
