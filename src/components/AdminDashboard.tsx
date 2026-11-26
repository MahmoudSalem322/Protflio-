"use client";

import { useId, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  BriefcaseBusiness,
  Check,
  ExternalLink,
  Home,
  Layers3,
  LayoutDashboard,
  LogOut,
  Mail,
  Plus,
  Save,
  Shield,
  Trash2,
  User,
  type LucideIcon,
} from "lucide-react";
import {
  iconOptions,
  themeOptions,
  type ExperienceItem,
  type IconName,
  type NavItem,
  type ProjectItem,
  type ServiceItem,
  type SiteContent,
  type SocialItem,
} from "@/lib/content-types";

type SectionKey =
  | "site"
  | "navigation"
  | "hero"
  | "about"
  | "services"
  | "projects"
  | "experience"
  | "contact"
  | "security";

const sections: { key: SectionKey; label: string; icon: LucideIcon }[] = [
  { key: "site", label: "Site settings", icon: LayoutDashboard },
  { key: "navigation", label: "Navigation", icon: Layers3 },
  { key: "hero", label: "Hero", icon: Home },
  { key: "about", label: "About", icon: User },
  { key: "services", label: "Services", icon: BriefcaseBusiness },
  { key: "projects", label: "Projects", icon: LayoutDashboard },
  { key: "experience", label: "Experience", icon: BriefcaseBusiness },
  { key: "contact", label: "Contact", icon: Mail },
  { key: "security", label: "Security", icon: Shield },
];

type FieldDef<T> = {
  key: keyof T;
  label: string;
  multiline?: boolean;
  options?: readonly string[];
  placeholder?: string;
};

function TextField({
  label,
  value,
  onChange,
  multiline,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <label className="admin-field" htmlFor={id}>
      <span>{label}</span>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          rows={3}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <label className="admin-field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function ObjectEditor<T extends object>({
  value,
  fields,
  onChange,
}: {
  value: T;
  fields: FieldDef<T>[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="admin-fields">
      {fields.map((field) => {
        const current = typeof value[field.key] === "string" ? (value[field.key] as string) : "";
        const change = (next: string) => onChange({ ...value, [field.key]: next } as T);
        return field.options ? (
          <SelectField
            key={String(field.key)}
            label={field.label}
            value={current}
            options={field.options}
            onChange={change}
          />
        ) : (
          <TextField
            key={String(field.key)}
            label={field.label}
            value={current}
            multiline={field.multiline}
            placeholder={field.placeholder}
            onChange={change}
          />
        );
      })}
    </div>
  );
}

function StringListEditor({
  label,
  values,
  addLabel,
  onChange,
}: {
  label: string;
  values: string[];
  addLabel: string;
  onChange: (values: string[]) => void;
}) {
  return (
    <div className="admin-block">
      <p className="admin-block-title">{label}</p>
      {values.map((value, index) => (
        <div className="admin-inline-row" key={index}>
          <input
            aria-label={`${label} ${index + 1}`}
            value={value}
            onChange={(event) => onChange(values.map((item, i) => (i === index ? event.target.value : item)))}
          />
          <button
            type="button"
            className="admin-icon-button"
            aria-label={`Move ${label} item up`}
            disabled={index === 0}
            onClick={() => {
              const next = [...values];
              [next[index - 1], next[index]] = [next[index], next[index - 1]];
              onChange(next);
            }}
          ><ArrowUp size={15} aria-hidden="true" /></button>
          <button
            type="button"
            className="admin-icon-button"
            aria-label={`Move ${label} item down`}
            disabled={index === values.length - 1}
            onClick={() => {
              const next = [...values];
              [next[index + 1], next[index]] = [next[index], next[index + 1]];
              onChange(next);
            }}
          ><ArrowDown size={15} aria-hidden="true" /></button>
          <button
            type="button"
            className="admin-icon-button danger"
            aria-label={`Remove ${label} item`}
            onClick={() => onChange(values.filter((_, i) => i !== index))}
          ><Trash2 size={15} aria-hidden="true" /></button>
        </div>
      ))}
      <button type="button" className="admin-button secondary" onClick={() => onChange([...values, ""])}>
        <Plus size={16} aria-hidden="true" /> {addLabel}
      </button>
    </div>
  );
}

function ListEditor<T extends object>({
  title,
  items,
  fields,
  empty,
  labelFor,
  addLabel,
  onChange,
}: {
  title: string;
  items: T[];
  fields: FieldDef<T>[];
  empty: T;
  labelFor: (item: T, index: number) => string;
  addLabel: string;
  onChange: (items: T[]) => void;
}) {
  return (
    <div className="admin-block">
      <p className="admin-block-title">{title}</p>
      {items.map((item, index) => (
        <div className="admin-list-item" key={index}>
          <div className="admin-list-head">
            <strong>{labelFor(item, index) || `Item ${index + 1}`}</strong>
            <div className="admin-list-actions">
              <button
                type="button"
                className="admin-icon-button"
                aria-label="Move up"
                disabled={index === 0}
                onClick={() => {
                  const next = [...items];
                  [next[index - 1], next[index]] = [next[index], next[index - 1]];
                  onChange(next);
                }}
              ><ArrowUp size={15} aria-hidden="true" /></button>
              <button
                type="button"
                className="admin-icon-button"
                aria-label="Move down"
                disabled={index === items.length - 1}
                onClick={() => {
                  const next = [...items];
                  [next[index + 1], next[index]] = [next[index], next[index + 1]];
                  onChange(next);
                }}
              ><ArrowDown size={15} aria-hidden="true" /></button>
              <button
                type="button"
                className="admin-icon-button danger"
                aria-label="Remove item"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
              ><Trash2 size={15} aria-hidden="true" /></button>
            </div>
          </div>
          <ObjectEditor value={item} fields={fields} onChange={(next) => onChange(items.map((old, i) => (i === index ? next : old)))} />
        </div>
      ))}
      <button type="button" className="admin-button secondary" onClick={() => onChange([...items, empty])}>
        <Plus size={16} aria-hidden="true" /> {addLabel}
      </button>
    </div>
  );
}

export default function AdminDashboard({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [section, setSection] = useState<SectionKey>("projects");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  function update<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Could not save changes.");
        return;
      }
      const data = (await response.json()) as { content: SiteContent };
      setContent(data.content);
      setSaved(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  async function changePassword() {
    setPasswordMessage(null);
    const response = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) {
      setPasswordMessage(data.error ?? "Could not change password.");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setPasswordMessage("Password updated.");
  }

  function renderSection(): ReactNode {
    switch (section) {
      case "site":
        return (
          <>
            <div className="admin-panel">
              <h2>Site settings</h2>
              <p className="admin-muted">Metadata and shared assets used across the site.</p>
              <ObjectEditor
                value={content.site}
                fields={[
                  { key: "name", label: "Display name" },
                  { key: "role", label: "Role label" },
                  { key: "title", label: "Browser title" },
                  { key: "description", label: "Meta description", multiline: true },
                  { key: "canonical", label: "Canonical URL" },
                  { key: "email", label: "Contact email" },
                  { key: "cvHref", label: "CV file path" },
                  { key: "brandMark", label: "Logo path" },
                  { key: "portrait", label: "Portrait path" },
                  { key: "portraitAlt", label: "Portrait alt text" },
                ]}
                onChange={(site) => update("site", site)}
              />
            </div>
          </>
        );
      case "navigation":
        return (
          <div className="admin-panel">
            <h2>Navigation</h2>
            <p className="admin-muted">Links shown in the header. Use anchors like #projects.</p>
            <ListEditor<NavItem>
              title="Header links"
              items={content.navigation}
              fields={[
                { key: "label", label: "Label" },
                { key: "href", label: "Link" },
              ]}
              empty={{ label: "New link", href: "#" }}
              labelFor={(item) => item.label}
              addLabel="Add link"
              onChange={(items) => update("navigation", items)}
            />
          </div>
        );
      case "hero":
        return (
          <div className="admin-panel">
            <h2>Hero section</h2>
            <p className="admin-muted">The first thing visitors see.</p>
            <ObjectEditor
              value={content.hero}
              fields={[
                { key: "eyebrow", label: "Eyebrow" },
                { key: "titleAccent", label: "Title accent" },
                { key: "description", label: "Description", multiline: true },
                { key: "primaryLabel", label: "Primary button" },
                { key: "primaryHref", label: "Primary link" },
                { key: "secondaryLabel", label: "Secondary link label" },
                { key: "secondaryHref", label: "Secondary link" },
                { key: "cvLabel", label: "CV link label" },
              ]}
              onChange={(hero) => update("hero", hero)}
            />
            <StringListEditor
              label="Title lines"
              values={content.hero.titleLines}
              addLabel="Add title line"
              onChange={(titleLines) => update("hero", { ...content.hero, titleLines })}
            />
          </div>
        );
      case "about":
        return (
          <div className="admin-panel">
            <h2>About</h2>
            <p className="admin-muted">Your introduction and technology tags.</p>
            <StringListEditor
              label="Paragraphs"
              values={content.about.paragraphs}
              addLabel="Add paragraph"
              onChange={(paragraphs) => update("about", { ...content.about, paragraphs })}
            />
            <StringListEditor
              label="Technology list"
              values={content.about.techList}
              addLabel="Add technology"
              onChange={(techList) => update("about", { ...content.about, techList })}
            />
          </div>
        );
      case "services":
        return (
          <div className="admin-panel">
            <h2>Services</h2>
            <ObjectEditor
              value={content.services}
              fields={[{ key: "heading", label: "Section heading" }]}
              onChange={(services) => update("services", services)}
            />
            <ListEditor<ServiceItem>
              title="Service cards"
              items={content.services.items}
              fields={[
                { key: "icon", label: "Icon", options: iconOptions },
                { key: "title", label: "Title" },
                { key: "description", label: "Description", multiline: true },
              ]}
              empty={{ icon: "Layers3" as IconName, title: "New service", description: "" }}
              labelFor={(item) => item.title}
              addLabel="Add service"
              onChange={(items) => update("services", { ...content.services, items })}
            />
          </div>
        );
      case "projects":
        return (
          <div className="admin-panel">
            <h2>Projects</h2>
            <p className="admin-muted">Add, edit, reorder, or remove portfolio projects. Changes appear on the site after saving.</p>
            <ObjectEditor
              value={content.projects}
              fields={[{ key: "heading", label: "Section heading" }]}
              onChange={(projects) => update("projects", projects)}
            />
            <ListEditor<ProjectItem>
              title="Project cards"
              items={content.projects.items}
              fields={[
                { key: "title", label: "Title" },
                { key: "category", label: "Category" },
                { key: "stack", label: "Stack" },
                { key: "description", label: "Description", multiline: true },
                { key: "href", label: "Link" },
                { key: "theme", label: "Theme", options: themeOptions },
              ]}
              empty={{
                title: "New project",
                category: "",
                stack: "",
                description: "",
                href: "",
                theme: "blue",
              }}
              labelFor={(item) => item.title}
              addLabel="Add project"
              onChange={(items) => update("projects", { ...content.projects, items })}
            />
          </div>
        );
      case "experience":
        return (
          <div className="admin-panel">
            <h2>Experience</h2>
            <p className="admin-muted">Roles and training. Period and duration are plain text, so you control the wording.</p>
            <ObjectEditor
              value={content.experience}
              fields={[{ key: "heading", label: "Section heading" }]}
              onChange={(experience) => update("experience", experience)}
            />
            <ListEditor<ExperienceItem>
              title="Experience entries"
              items={content.experience.items}
              fields={[
                { key: "organization", label: "Organization" },
                { key: "role", label: "Role" },
                { key: "period", label: "Period" },
                { key: "duration", label: "Duration" },
                { key: "summary", label: "Summary", multiline: true },
                { key: "contribution", label: "Contribution", multiline: true },
              ]}
              empty={{
                organization: "",
                role: "New role",
                period: "",
                duration: "",
                summary: "",
                contribution: "",
              }}
              labelFor={(item) => `${item.role} — ${item.organization}`}
              addLabel="Add experience"
              onChange={(items) => update("experience", { ...content.experience, items })}
            />
          </div>
        );
      case "contact":
        return (
          <div className="admin-panel">
            <h2>Contact</h2>
            <p className="admin-muted">Email call-to-action and social links.</p>
            <ObjectEditor
              value={content.contact}
              fields={[
                { key: "eyebrow", label: "Eyebrow" },
                { key: "heading", label: "Heading" },
                { key: "headingAccent", label: "Heading accent" },
                { key: "note", label: "Note", multiline: true },
                { key: "emailLabel", label: "Email label" },
                { key: "email", label: "Email" },
              ]}
              onChange={(contact) => update("contact", contact)}
            />
            <ListEditor<SocialItem>
              title="Social links"
              items={content.contact.socials}
              fields={[
                { key: "icon", label: "Icon", options: iconOptions },
                { key: "label", label: "Label" },
                { key: "href", label: "URL" },
              ]}
              empty={{ icon: "Code2" as IconName, label: "New profile", href: "https://" }}
              labelFor={(item) => item.label}
              addLabel="Add social link"
              onChange={(socials) => update("contact", { ...content.contact, socials })}
            />
          </div>
        );
      case "security":
        return (
          <div className="admin-panel">
            <h2>Security</h2>
            <p className="admin-muted">Change the dashboard password. You must enter the current one.</p>
            <div className="admin-fields">
              <TextField label="Current password" value={currentPassword} onChange={setCurrentPassword} placeholder="Current password" />
              <TextField label="New password" value={newPassword} onChange={setNewPassword} placeholder="At least 8 characters" />
            </div>
            {passwordMessage && <p className="admin-note" role="status">{passwordMessage}</p>}
            <button type="button" className="admin-button" onClick={changePassword}>Update password</button>
          </div>
        );
    }
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-head">
          <span className="admin-logo">MS</span>
          <div>
            <strong>Dashboard</strong>
            <small>Portfolio CMS</small>
          </div>
        </div>
        <nav aria-label="Dashboard sections">
          {sections.map(({ key, label, icon: Icon }) => (
            <button
              type="button"
              key={key}
              className={section === key ? "admin-nav-item active" : "admin-nav-item"}
              onClick={() => { setSection(key); setSaved(false); setError(null); }}
            >
              <Icon size={17} aria-hidden="true" /> {label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-foot">
          <a href="/" target="_blank" rel="noopener"><ExternalLink size={16} aria-hidden="true" /> View site</a>
          <button type="button" onClick={logout}><LogOut size={16} aria-hidden="true" /> Sign out</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="eyebrow">Portfolio dashboard</p>
            <h1>{sections.find((item) => item.key === section)?.label}</h1>
          </div>
          <div className="admin-topbar-actions">
            {saved && <span className="admin-status ok"><Check size={15} aria-hidden="true" /> Saved</span>}
            {error && <span className="admin-status error" role="alert">{error}</span>}
            <button type="button" className="admin-button" onClick={save} disabled={saving}>
              <Save size={16} aria-hidden="true" /> {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </header>
        <div className="admin-content">{renderSection()}</div>
      </main>
    </div>
  );
}
