export type Category =
  | "ads"
  | "vlogs"
  | "youtube"
  | "shorts"
  | "podcasts"
  | "realestate"
  | "corporate"
  | "travel"
  | "luxury"
  | "gaming"
  | "education"
  | "ecommerce";

export const categories: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ads", label: "Ads" },
  { key: "vlogs", label: "Vlogs" },
  { key: "youtube", label: "YouTube Videos" },
  { key: "shorts", label: "Shorts" },
  { key: "podcasts", label: "Podcasts" },
  { key: "realestate", label: "Real Estate" },
  { key: "corporate", label: "Corporate" },
  { key: "travel", label: "Travel" },
  { key: "luxury", label: "Luxury" },
  { key: "gaming", label: "Gaming" },
  { key: "education", label: "Education" },
  { key: "ecommerce", label: "E-commerce" },
];

export type Project = {
  id: string;
  title: string;
  meta: string;
  tag: string;
  categories: Category[];
  /**
   * YouTube video ID (e.g. "aBcD1234xYz" from youtube.com/watch?v=aBcD1234xYz).
   * Upload your video as UNLISTED on YouTube and paste the ID here.
   * The player only loads when the user clicks (facade pattern) —
   * YouTube handles adaptive chunk streaming automatically.
   */
  youtubeId: string;
  /** Optional custom thumbnail in /public/thumbs/. Empty = premium gradient. */
  thumbnail: string;
  gradient: string;
  label: string;
  description: string;
  clientGoal: string;
  software: string[];
};

export const projects: Project[] = [
  {
    id: "skincare-ad",
    title: "Skincare Brand Ad",
    meta: "Meta Ads · 30s",
    tag: "Ads",
    categories: ["ads", "ecommerce"],
    youtubeId: "",
    thumbnail: "",
    gradient: "linear-gradient(135deg,#1e3a8a,#2563eb)",
    label: "PRODUCT AD",
    description:
      "Hook-driven ad creative with kinetic captions, product motion graphics and a premium color grade.",
    clientGoal: "Increase conversions with scroll-stopping ad creative.",
    software: ["Premiere Pro", "After Effects"],
  },
  {
    id: "finance-explainer",
    title: "Finance Explainer",
    meta: "YouTube · 12 min",
    tag: "YouTube",
    categories: ["youtube", "education"],
    youtubeId: "",
    thumbnail: "",
    gradient: "linear-gradient(135deg,#0f172a,#334155)",
    label: "YOUTUBE",
    description:
      "High-retention storytelling structure with b-roll layering, sound design and animated data visuals.",
    clientGoal: "Grow average watch time and subscriber conversion.",
    software: ["Premiere Pro", "After Effects", "Photoshop"],
  },
  {
    id: "viral-reels",
    title: "Viral Reel Series",
    meta: "IG Reels · 45s",
    tag: "Shorts",
    categories: ["shorts"],
    youtubeId: "",
    thumbnail: "",
    gradient: "linear-gradient(135deg,#4c1d95,#7c3aed)",
    label: "SHORTS",
    description:
      "Fast-paced vertical edits with trending audio sync, punch-ins and animated captions.",
    clientGoal: "Maximize reach and shares on Instagram and TikTok.",
    software: ["Premiere Pro", "After Effects"],
  },
  {
    id: "luxury-villa",
    title: "Luxury Villa Tour",
    meta: "Drone + Interior · 3 min",
    tag: "Real Estate",
    categories: ["realestate", "luxury"],
    youtubeId: "",
    thumbnail: "",
    gradient: "linear-gradient(135deg,#134e4a,#0d9488)",
    label: "REAL ESTATE",
    description:
      "Cinematic property tour blending smooth drone shots, interior walkthroughs and elegant titles.",
    clientGoal: "Sell a premium listing by showcasing lifestyle, not just rooms.",
    software: ["DaVinci Resolve", "After Effects"],
  },
  {
    id: "business-podcast",
    title: "Business Podcast",
    meta: "Full episode + clips",
    tag: "Podcast",
    categories: ["podcasts"],
    youtubeId: "",
    thumbnail: "",
    gradient: "linear-gradient(135deg,#7f1d1d,#dc2626)",
    label: "PODCAST",
    description:
      "Multicam episode edit plus a clip package of viral-ready vertical highlights.",
    clientGoal: "Turn one recording into a full week of content.",
    software: ["Premiere Pro", "Audition"],
  },
  {
    id: "company-profile",
    title: "Company Profile Film",
    meta: "Corporate · 2 min",
    tag: "Corporate",
    categories: ["corporate"],
    youtubeId: "",
    thumbnail: "",
    gradient: "linear-gradient(135deg,#78350f,#d97706)",
    label: "CORPORATE",
    description:
      "Polished brand film with interview soundbites, office b-roll and clean corporate motion graphics.",
    clientGoal: "Build trust with enterprise clients and investors.",
    software: ["Premiere Pro", "After Effects", "Audition"],
  },
  {
    id: "bali-vlog",
    title: "Bali Travel Vlog",
    meta: "Cinematic vlog · 8 min",
    tag: "Travel",
    categories: ["travel", "vlogs"],
    youtubeId: "",
    thumbnail: "",
    gradient: "linear-gradient(135deg,#0c4a6e,#0284c7)",
    label: "TRAVEL",
    description:
      "Cinematic travel storytelling with speed ramps, sound design and warm film-style grade.",
    clientGoal: "Stand out in the crowded travel niche with film-level quality.",
    software: ["Premiere Pro", "DaVinci Resolve"],
  },
  {
    id: "gaming-montage",
    title: "Gaming Montage",
    meta: "High-energy edit · 60s",
    tag: "Gaming",
    categories: ["gaming"],
    youtubeId: "",
    thumbnail: "",
    gradient: "linear-gradient(135deg,#3b0764,#a21caf)",
    label: "GAMING",
    description:
      "Beat-synced montage with velocity edits, glitch transitions and reactive sound effects.",
    clientGoal: "Create shareable highlight content for a gaming channel.",
    software: ["Premiere Pro", "After Effects"],
  },
  {
    id: "watch-commercial",
    title: "Watch Brand Commercial",
    meta: "Luxury ad · 45s",
    tag: "Luxury",
    categories: ["ads", "luxury", "ecommerce"],
    youtubeId: "",
    thumbnail: "",
    gradient: "linear-gradient(135deg,#052e16,#16a34a)",
    label: "BRAND FILM",
    description:
      "High-end product commercial with macro shots, light sweeps and refined typography.",
    clientGoal: "Position the brand as premium for a holiday campaign.",
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
  },
];

export type FeaturedProject = {
  title: string;
  duration: string;
  tags: string[];
  heading: string;
  description: string;
  result: string;
  gradient: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    title: "E-commerce Ad Campaign",
    duration: "0:30",
    tags: ["E-commerce", "Ad Editing", "Motion Graphics"],
    heading: "Skincare Launch Campaign",
    description:
      "Full ad creative package — hook-driven cuts, kinetic captions, product motion graphics and premium color grade.",
    result: "3.2x ROAS improvement for the client",
    gradient: "linear-gradient(135deg,#1e3a8a,#2563eb)",
  },
  {
    title: "YouTube Growth Series",
    duration: "14:20",
    tags: ["Creator", "Long Form", "Retention Editing"],
    heading: "Finance Channel Overhaul",
    description:
      "High-retention storytelling structure, b-roll layering, sound design and animated data visuals across 12 episodes.",
    result: "Avg. watch time up 41%",
    gradient: "linear-gradient(135deg,#4c1d95,#7c3aed)",
  },
];
