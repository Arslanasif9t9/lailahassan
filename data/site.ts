export const site = {
  name: "VisualCraft",
  tagline: "Premium Video Editing Studio",
  email: "hello@visualcraft.studio",
  // Calendly / Cal.com booking link — replace with your real link
  bookCallUrl: "#contact",
  // Drop a compressed hero video at /public/videos/hero.mp4 (max ~5MB, H.264)
  // and set this to "/videos/hero.mp4". Empty = premium animated gradient bg.
  heroVideo: "",
  heroPoster: "",
  socials: [
    { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
    { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
    { label: "YouTube", href: "https://youtube.com/", icon: "youtube" },
    { label: "Behance", href: "https://behance.net/", icon: "behance" },
    { label: "Email", href: "mailto:hello@visualcraft.studio", icon: "mail" },
  ],
  trustedBy: [
    "YouTube Creators",
    "Startups",
    "Agencies",
    "E-commerce Brands",
    "Podcasters",
    "Real Estate",
    "Corporate",
  ],
} as const;
