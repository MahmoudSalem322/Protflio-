export const iconOptions = ["Layers3", "Braces", "Sparkles", "Code2", "BriefcaseBusiness", "Mail", "ArrowUpRight"] as const;
export type IconName = (typeof iconOptions)[number];

export const themeOptions = ["blue", "violet", "teal", "sand"] as const;
export type ThemeName = (typeof themeOptions)[number];

export type NavItem = { label: string; href: string };
export type ServiceItem = { icon: IconName; title: string; description: string };
export type ProjectItem = {
  title: string;
  category: string;
  stack: string;
  description: string;
  href: string;
  theme: ThemeName;
};
export type ExperienceItem = {
  organization: string;
  role: string;
  period: string;
  duration: string;
  summary: string;
  contribution: string;
};
export type SocialItem = { icon: IconName; label: string; href: string };

export type SiteContent = {
  site: {
    name: string;
    role: string;
    title: string;
    description: string;
    canonical: string;
    email: string;
    cvHref: string;
    brandMark: string;
    portrait: string;
    portraitAlt: string;
  };
  navigation: NavItem[];
  hero: {
    eyebrow: string;
    titleLines: string[];
    titleAccent: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    cvLabel: string;
  };
  about: {
    paragraphs: string[];
    techList: string[];
  };
  services: {
    heading: string;
    items: ServiceItem[];
  };
  projects: {
    heading: string;
    items: ProjectItem[];
  };
  experience: {
    heading: string;
    items: ExperienceItem[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    note: string;
    emailLabel: string;
    email: string;
    socials: SocialItem[];
  };
};

export const defaultContent: SiteContent = {
  site: {
    name: "Mahmoud Salem",
    role: "Full-stack developer",
    title: "Mahmoud Salem | Full-stack Developer",
    description:
      "Full-stack Developer working with Next.js and Node.js, using AI-assisted development workflows with Codex and Claude to build web applications.",
    canonical: "https://mahmoudsalem.dev/",
    email: "mahmoudsalem3321@gmail.com",
    cvHref: "/Mahmoud_Salem_CV.pdf",
    brandMark: "/brand/ms-mark.png",
    portrait: "/mahmoud-salem.png",
    portraitAlt: "Mahmoud Salem",
  },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Full-stack developer",
    titleLines: ["Mahmoud", "Salem"],
    titleAccent: ".",
    description:
      "I build web applications with Next.js and Node.js, connecting responsive interfaces to APIs and databases.",
    primaryLabel: "View my work",
    primaryHref: "#projects",
    secondaryLabel: "Get in touch",
    secondaryHref: "#contact",
    cvLabel: "View CV",
  },
  about: {
    paragraphs: [
      "I build the frontend and backend of web applications, from responsive pages to the services and databases behind them.",
      "I use Codex and Claude to support planning, implementation, debugging, and code review.",
    ],
    techList: ["Next.js", "Node.js", "React", "TypeScript", "Flutter"],
  },
  services: {
    heading: "Services",
    items: [
      {
        icon: "Layers3",
        title: "Full-stack development",
        description:
          "Responsive web applications with Next.js and Node.js, from the interface to authentication and database integration.",
      },
      {
        icon: "Braces",
        title: "APIs & integrations",
        description:
          "Node.js APIs that connect web applications to databases, backend services, and third-party tools.",
      },
      {
        icon: "Sparkles",
        title: "AI-assisted development",
        description:
          "Planning, debugging, and reviewing code with Codex and Claude, with hands-on validation of the final result.",
      },
    ],
  },
  projects: {
    heading: "Selected work",
    items: [
      {
        title: "Masaq",
        category: "Education platform",
        stack: "Next.js · TypeScript · Node.js · PostgreSQL",
        description:
          "An Arabic RTL platform for exploring courses and learning resources, with verified accounts, saved resources, and admin-managed content backed by a Node.js API.",
        href: "https://github.com/MahmoudSalem322/masaq",
        theme: "sand",
      },
      {
        title: "Masar Platform",
        category: "Institution management",
        stack: "React · TypeScript · Vite",
        description:
          "A showcase for a modular platform covering operations, employees, tasks, and reporting.",
        href: "https://masartesting.vercel.app/",
        theme: "blue",
      },
      {
        title: "Workflow Nets",
        category: "Team collaboration",
        stack: "Next.js · TypeScript · Tailwind CSS",
        description:
          "Frontend development for a workspace with projects, tasks, clients, invoices, chat, and video meetings.",
        href: "https://www.workflownets.com/",
        theme: "violet",
      },
      {
        title: "Shifa",
        category: "Healthcare",
        stack: "Next.js · React · JavaScript",
        description:
          "A platform connecting patients with healthcare providers for appointments, medicine requests, donations, and prescriptions.",
        href: "https://github.com/MahmoudSalem322/Shifa-v1",
        theme: "teal",
      },
      {
        title: "Qabas",
        category: "Education",
        stack: "Flutter · Dart · Riverpod",
        description:
          "An offline-first learning workspace for web and Android with courses, Markdown notes, reminders, and progress tracking in Arabic and English.",
        href: "https://github.com/MahmoudSalem322/personal_learning_os",
        theme: "blue",
      },
      {
        title: "Islamic Companion App",
        category: "Mobile app",
        stack: "Flutter · Dart · Drift",
        description:
          "An Arabic offline-first app for Quran reading, tafsir, adhkar, prayer times, qibla, and reminders.",
        href: "https://github.com/MahmoudSalem322/hadeel-app",
        theme: "teal",
      },
    ],
  },
  experience: {
    heading: "Experience",
    items: [
      {
        organization: "TAQAT Academy · CodeMap",
        role: "Codemap Accelerator Trainee",
        period: "Nov 2026 – Mar 2027",
        duration: "5 months",
        summary:
          "Currently enrolled in Codemap Accelerator, an advanced training program building on the CodeMap track through hands-on project work.",
        contribution:
          "Developing full-stack features and practicing maintainable code, Git workflows, and AI-assisted development with a mentored cohort.",
      },
      {
        organization: "Workflow",
        role: "Frontend Developer",
        period: "Jul 2026 – Present",
        duration: "",
        summary:
          "Build and maintain responsive features for a SaaS workspace where agile teams plan, manage, and collaborate on their work.",
        contribution:
          "Integrate interfaces built with Next.js, TypeScript, and Tailwind CSS with backend services and collaborate through GitHub and Vercel.",
      },
      {
        organization: "TAQAT Academy",
        role: "Co-Mentor, CodeMap Program",
        period: "Jul 2026 – Nov 2026",
        duration: "5 months",
        summary:
          "Supported the lead mentor and coached trainees on clean, maintainable code and applying the software development lifecycle to real projects.",
        contribution:
          "Helped trainees use AI development tools responsibly to improve productivity and code quality.",
      },
      {
        organization: "TAQAT Academy · CodeMap Program",
        role: "Frontend Developer (Trainee)",
        period: "May – Aug 2026",
        duration: "",
        summary:
          "Took ownership of the Next.js frontend for Masar, a management platform for institutions and NGOs, as part of a mentored development team.",
        contribution: "Collaborated with teammates using Git, GitHub, and Vercel.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    heading: "Have a project in mind",
    headingAccent: "?",
    note: "I’m open to freelance work and collaborations. Send a message and I’ll get back to you within a day.",
    emailLabel: "Email me at",
    email: "mahmoudsalem3321@gmail.com",
    socials: [
      { icon: "Code2", label: "GitHub", href: "https://github.com/MahmoudSalem322" },
      {
        icon: "BriefcaseBusiness",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/mahmoud-salem-052495419",
      },
    ],
  },
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function str(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function strings(value: unknown, fallback: string[]): string[] {
  const list = asArray(value).filter((item): item is string => typeof item === "string");
  return list.length > 0 ? list : fallback;
}

function icon(value: unknown, fallback: IconName): IconName {
  return iconOptions.includes(value as IconName) ? (value as IconName) : fallback;
}

function theme(value: unknown, fallback: ThemeName): ThemeName {
  return themeOptions.includes(value as ThemeName) ? (value as ThemeName) : fallback;
}

function navItems(value: unknown, fallback: NavItem[]): NavItem[] {
  const list = asArray(value).map(asRecord);
  return list.length > 0
    ? list.map((item, index) => ({
        label: str(item.label, fallback[index]?.label ?? `Link ${index + 1}`),
        href: str(item.href, fallback[index]?.href ?? "#"),
      }))
    : fallback;
}

function serviceItems(value: unknown, fallback: ServiceItem[]): ServiceItem[] {
  const list = asArray(value).map(asRecord);
  return list.length > 0
    ? list.map((item, index) => ({
        icon: icon(item.icon, fallback[index]?.icon ?? "Layers3"),
        title: str(item.title, fallback[index]?.title ?? "Service"),
        description: str(item.description, fallback[index]?.description ?? ""),
      }))
    : fallback;
}

function projectItems(value: unknown, fallback: ProjectItem[]): ProjectItem[] {
  const list = asArray(value).map(asRecord);
  return list.length > 0
    ? list.map((item, index) => ({
        title: str(item.title, fallback[index]?.title ?? "Project"),
        category: str(item.category, fallback[index]?.category ?? ""),
        stack: str(item.stack, fallback[index]?.stack ?? ""),
        description: str(item.description, fallback[index]?.description ?? ""),
        href: str(item.href, fallback[index]?.href ?? ""),
        theme: theme(item.theme, fallback[index]?.theme ?? "blue"),
      }))
    : fallback;
}

function experienceItems(value: unknown, fallback: ExperienceItem[]): ExperienceItem[] {
  const list = asArray(value).map(asRecord);
  return list.length > 0
    ? list.map((item, index) => ({
        organization: str(item.organization, fallback[index]?.organization ?? ""),
        role: str(item.role, fallback[index]?.role ?? "Role"),
        period: str(item.period, fallback[index]?.period ?? ""),
        duration: str(item.duration, fallback[index]?.duration ?? ""),
        summary: str(item.summary, fallback[index]?.summary ?? ""),
        contribution: str(item.contribution, fallback[index]?.contribution ?? ""),
      }))
    : fallback;
}

function socialItems(value: unknown, fallback: SocialItem[]): SocialItem[] {
  const list = asArray(value).map(asRecord);
  return list.length > 0
    ? list.map((item, index) => ({
        icon: icon(item.icon, fallback[index]?.icon ?? "Code2"),
        label: str(item.label, fallback[index]?.label ?? "Profile"),
        href: str(item.href, fallback[index]?.href ?? "#"),
      }))
    : fallback;
}

export function normalizeContent(value: unknown): SiteContent {
  const input = asRecord(value);
  const site = asRecord(input.site);
  const hero = asRecord(input.hero);
  const about = asRecord(input.about);
  const services = asRecord(input.services);
  const projects = asRecord(input.projects);
  const experience = asRecord(input.experience);
  const contact = asRecord(input.contact);
  const base = defaultContent;

  return {
    site: {
      name: str(site.name, base.site.name),
      role: str(site.role, base.site.role),
      title: str(site.title, base.site.title),
      description: str(site.description, base.site.description),
      canonical: str(site.canonical, base.site.canonical),
      email: str(site.email, base.site.email),
      cvHref: str(site.cvHref, base.site.cvHref),
      brandMark: str(site.brandMark, base.site.brandMark),
      portrait: str(site.portrait, base.site.portrait),
      portraitAlt: str(site.portraitAlt, base.site.portraitAlt),
    },
    navigation: navItems(input.navigation, base.navigation),
    hero: {
      eyebrow: str(hero.eyebrow, base.hero.eyebrow),
      titleLines: strings(hero.titleLines, base.hero.titleLines),
      titleAccent: str(hero.titleAccent, base.hero.titleAccent),
      description: str(hero.description, base.hero.description),
      primaryLabel: str(hero.primaryLabel, base.hero.primaryLabel),
      primaryHref: str(hero.primaryHref, base.hero.primaryHref),
      secondaryLabel: str(hero.secondaryLabel, base.hero.secondaryLabel),
      secondaryHref: str(hero.secondaryHref, base.hero.secondaryHref),
      cvLabel: str(hero.cvLabel, base.hero.cvLabel),
    },
    about: {
      paragraphs: strings(about.paragraphs, base.about.paragraphs),
      techList: strings(about.techList, base.about.techList),
    },
    services: {
      heading: str(services.heading, base.services.heading),
      items: serviceItems(services.items, base.services.items),
    },
    projects: {
      heading: str(projects.heading, base.projects.heading),
      items: projectItems(projects.items, base.projects.items),
    },
    experience: {
      heading: str(experience.heading, base.experience.heading),
      items: experienceItems(experience.items, base.experience.items),
    },
    contact: {
      eyebrow: str(contact.eyebrow, base.contact.eyebrow),
      heading: str(contact.heading, base.contact.heading),
      headingAccent: str(contact.headingAccent, base.contact.headingAccent),
      note: str(contact.note, base.contact.note),
      emailLabel: str(contact.emailLabel, base.contact.emailLabel),
      email: str(contact.email, base.contact.email),
      socials: socialItems(contact.socials, base.contact.socials),
    },
  };
}
