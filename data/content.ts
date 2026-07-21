/**
 * The single aggregated content document for the whole site.
 *
 * The objects in the other data/*.ts files are the TYPED DEFAULTS — they keep
 * the site looking perfect even before Supabase is wired up, and they are what
 * gets baked into the static HTML at build time (great for SEO + instant paint).
 *
 * At runtime the ContentProvider fetches a matching JSON document from Supabase
 * (table `site_content`, id = 1) and overrides these defaults, so the admin
 * panel can update the live site without a rebuild.
 *
 * Shape here === the JSONB `data` column in Supabase === the admin panel forms.
 */
import { site } from "@/data/site";
import { services, type Service } from "@/data/services";
import {
  projects,
  featuredProjects,
  type Project,
  type FeaturedProject,
} from "@/data/projects";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { faqs, type Faq } from "@/data/faqs";
import { stats, whyMe, software, processSteps, type Stat } from "@/data/stats";

export type Social = { label: string; href: string; icon: string };
export type WhyMeItem = { icon: string; title: string; text: string };
export type SoftwareItem = { short: string; name: string; bg: string };
export type ProcessStep = { title: string; text: string };

export type SiteInfo = {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  bookCallUrl: string;
  heroVideo: string;
  heroPoster: string;
  socials: Social[];
  trustedBy: string[];
};

export type SiteContent = {
  site: SiteInfo;
  services: Service[];
  projects: Project[];
  featuredProjects: FeaturedProject[];
  testimonials: Testimonial[];
  faqs: Faq[];
  stats: Stat[];
  whyMe: WhyMeItem[];
  software: SoftwareItem[];
  processSteps: ProcessStep[];
};

/** Deep, mutable copy of every default so the admin can edit without mutating imports. */
export const defaultContent: SiteContent = {
  site: {
    name: site.name,
    tagline: site.tagline,
    email: site.email,
    phone: "",
    bookCallUrl: site.bookCallUrl,
    heroVideo: site.heroVideo,
    heroPoster: site.heroPoster,
    socials: site.socials.map((s) => ({ label: s.label, href: s.href, icon: s.icon })),
    trustedBy: [...site.trustedBy],
  },
  services: services.map((s) => ({ ...s, items: [...s.items] })),
  projects: projects.map((p) => ({ ...p, categories: [...p.categories], software: [...p.software] })),
  featuredProjects: featuredProjects.map((f) => ({ ...f, tags: [...f.tags] })),
  testimonials: testimonials.map((t) => ({ ...t })),
  faqs: faqs.map((f) => ({ ...f })),
  stats: stats.map((s) => ({ ...s })),
  whyMe: whyMe.map((w) => ({ icon: w.icon as string, title: w.title, text: w.text })),
  software: software.map((s) => ({ short: s.short, name: s.name, bg: s.bg })),
  processSteps: processSteps.map((p) => ({ title: p.title, text: p.text })),
};

/**
 * Merge a partial document fetched from Supabase over the defaults. Any missing
 * top-level key falls back to the default; `site` is merged one level deep so a
 * partial site object still keeps default fields.
 */
export function mergeContent(remote: Partial<SiteContent> | null | undefined): SiteContent {
  if (!remote) return defaultContent;
  return {
    ...defaultContent,
    ...remote,
    site: { ...defaultContent.site, ...(remote.site ?? {}) },
  };
}
