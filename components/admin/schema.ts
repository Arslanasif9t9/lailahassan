import type { SiteContent } from "@/data/content";
import type { FieldDef } from "./fields";

type Rec = Record<string, unknown>;

export type RecordTab = {
  id: string;
  label: string;
  kind: "record";
  fields: FieldDef[];
  get: (c: SiteContent) => Rec;
  set: (c: SiteContent, v: Rec) => SiteContent;
};
export type CollectionTab = {
  id: string;
  label: string;
  kind: "collection";
  fields: FieldDef[];
  titleKey: string;
  newItem: () => Rec;
  get: (c: SiteContent) => Rec[];
  set: (c: SiteContent, items: Rec[]) => SiteContent;
};
export type LeadsTab = { id: "leads"; label: string; kind: "leads" };
export type Tab = RecordTab | CollectionTab | LeadsTab;

const SERVICE_ICONS = ["film", "zap", "trending", "home", "briefcase", "sparkles"] as const;
const WHYME_ICONS = ["zap", "palette", "chart", "search", "film", "volume", "sparkles", "infinity"] as const;
const SOCIAL_ICONS = ["instagram", "linkedin", "youtube", "behance", "mail"] as const;
const CATEGORY_KEYS = [
  "ads", "vlogs", "youtube", "shorts", "podcasts", "realestate",
  "corporate", "travel", "luxury", "gaming", "education", "ecommerce",
] as const;

/** Build a tab bound to a top-level array key of SiteContent. */
function collection(
  id: string,
  label: string,
  key: keyof SiteContent,
  fields: FieldDef[],
  titleKey: string,
  newItem: () => Rec,
): CollectionTab {
  return {
    id, label, kind: "collection", fields, titleKey, newItem,
    get: (c) => c[key] as unknown as Rec[],
    set: (c, items) => ({ ...c, [key]: items }) as unknown as SiteContent,
  };
}

export const TABS: Tab[] = [
  {
    id: "brand",
    label: "Brand & Contact",
    kind: "record",
    fields: [
      { key: "name", label: "Studio / Name", type: "text" },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "email", label: "Contact email", type: "text" },
      { key: "phone", label: "Phone (optional)", type: "text" },
      { key: "bookCallUrl", label: "Book-a-call URL", type: "text", help: "Calendly / Cal.com link, or #contact" },
      { key: "heroVideo", label: "Hero background video", type: "image", accept: "video/*", full: true, help: "Optional — empty shows the animated gradient" },
      { key: "heroPoster", label: "Hero video poster image", type: "image", full: true },
      { key: "trustedBy", label: "Trusted-by chips", type: "tags", full: true, help: "Shown in the scrolling marquee" },
    ],
    get: (c) => c.site as unknown as Rec,
    set: (c, v) => ({ ...c, site: { ...c.site, ...(v as object) } }),
  },
  {
    id: "socials",
    label: "Social Links",
    kind: "collection",
    titleKey: "label",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "href", label: "URL", type: "text", placeholder: "https://instagram.com/..." },
      { key: "icon", label: "Icon", type: "select", options: SOCIAL_ICONS },
    ],
    newItem: () => ({ label: "", href: "", icon: "instagram" }),
    get: (c) => c.site.socials as unknown as Rec[],
    set: (c, items) => ({ ...c, site: { ...c.site, socials: items as unknown as SiteContent["site"]["socials"] } }),
  },
  collection("projects", "Portfolio Projects", "projects",
    [
      { key: "id", label: "ID / slug", type: "text", help: "unique, no spaces" },
      { key: "title", label: "Title", type: "text" },
      { key: "meta", label: "Meta line", type: "text", placeholder: "Meta Ads · 30s" },
      { key: "tag", label: "Tag badge", type: "text", placeholder: "Ads" },
      { key: "label", label: "Gradient label", type: "text", placeholder: "PRODUCT AD", help: "shown when there is no thumbnail/video" },
      { key: "categories", label: "Categories", type: "multiselect", options: CATEGORY_KEYS },
      { key: "youtubeId", label: "YouTube ID", type: "text", help: "unlisted video id — the player loads only on click" },
      { key: "thumbnail", label: "Thumbnail", type: "image" },
      { key: "gradient", label: "Gradient CSS", type: "text", placeholder: "linear-gradient(135deg,#1e3a8a,#2563eb)" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "clientGoal", label: "Client goal", type: "textarea" },
      { key: "software", label: "Software used", type: "tags" },
    ],
    "title",
    () => ({ id: "", title: "New Project", meta: "", tag: "", label: "PROJECT", categories: [], youtubeId: "", thumbnail: "", gradient: "linear-gradient(135deg,#1e3a8a,#2563eb)", description: "", clientGoal: "", software: [] }),
  ),
  collection("featured", "Featured Projects", "featuredProjects",
    [
      { key: "title", label: "Card title", type: "text" },
      { key: "duration", label: "Duration", type: "text", placeholder: "0:30" },
      { key: "tags", label: "Tags", type: "tags", full: true },
      { key: "heading", label: "Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "result", label: "Result line", type: "text", placeholder: "3.2x ROAS improvement" },
      { key: "gradient", label: "Gradient CSS", type: "text" },
    ],
    "title",
    () => ({ title: "New Feature", duration: "", tags: [], heading: "", description: "", result: "", gradient: "linear-gradient(135deg,#1e3a8a,#2563eb)" }),
  ),
  collection("services", "Services", "services",
    [
      { key: "icon", label: "Icon", type: "select", options: SERVICE_ICONS },
      { key: "title", label: "Title", type: "text" },
      { key: "items", label: "Items", type: "tags", full: true },
    ],
    "title",
    () => ({ icon: "film", title: "New Service", items: [] }),
  ),
  collection("whyMe", "Why Me", "whyMe",
    [
      { key: "icon", label: "Icon", type: "select", options: WHYME_ICONS },
      { key: "title", label: "Title", type: "text" },
      { key: "text", label: "Text", type: "textarea" },
    ],
    "title",
    () => ({ icon: "zap", title: "New Reason", text: "" }),
  ),
  collection("software", "Software", "software",
    [
      { key: "short", label: "Short code", type: "text", placeholder: "Pr" },
      { key: "name", label: "Name", type: "text" },
      { key: "bg", label: "Badge background CSS", type: "text", placeholder: "#00005B" },
    ],
    "name",
    () => ({ short: "Xx", name: "New Tool", bg: "#00005B" }),
  ),
  collection("process", "Process Steps", "processSteps",
    [
      { key: "title", label: "Step title", type: "text" },
      { key: "text", label: "Step text", type: "textarea" },
    ],
    "title",
    () => ({ title: "New Step", text: "" }),
  ),
  collection("stats", "Stats", "stats",
    [
      { key: "value", label: "Value", type: "number" },
      { key: "suffix", label: "Suffix", type: "text", placeholder: "+" },
      { key: "label", label: "Label", type: "text" },
    ],
    "label",
    () => ({ value: 0, suffix: "+", label: "New Stat" }),
  ),
  collection("testimonials", "Testimonials", "testimonials",
    [
      { key: "quote", label: "Quote", type: "textarea", full: true },
      { key: "name", label: "Name", type: "text" },
      { key: "role", label: "Role", type: "text" },
      { key: "initials", label: "Initials", type: "text" },
      { key: "youtubeId", label: "Video testimonial YouTube ID", type: "text" },
    ],
    "name",
    () => ({ quote: "", name: "New Client", role: "", initials: "", youtubeId: "" }),
  ),
  collection("faqs", "FAQs", "faqs",
    [
      { key: "q", label: "Question", type: "text", full: true },
      { key: "a", label: "Answer", type: "textarea", full: true },
    ],
    "q",
    () => ({ q: "New question?", a: "" }),
  ),
  { id: "leads", label: "Leads", kind: "leads" },
];
