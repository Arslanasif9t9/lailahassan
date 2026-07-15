export type Service = {
  icon: "film" | "zap" | "trending" | "home" | "briefcase" | "sparkles";
  title: string;
  items: string[];
};

export const services: Service[] = [
  {
    icon: "film",
    title: "Long Form Editing",
    items: ["YouTube videos", "Podcasts", "Educational videos", "Documentaries"],
  },
  {
    icon: "zap",
    title: "Short Form Editing",
    items: ["Instagram Reels", "TikTok", "YouTube Shorts", "Facebook Reels"],
  },
  {
    icon: "trending",
    title: "Commercial Editing",
    items: ["Facebook Ads", "Instagram Ads", "Product Ads", "Brand Commercials"],
  },
  {
    icon: "home",
    title: "Real Estate",
    items: ["Property Tours", "Luxury Homes", "Drone Videos", "Listing Videos"],
  },
  {
    icon: "briefcase",
    title: "Corporate",
    items: ["Company Profile Videos", "Event Videos", "Interviews", "Training Videos"],
  },
  {
    icon: "sparkles",
    title: "Motion Graphics",
    items: ["Logo Animation", "Text Animation", "Animated Titles", "Social Media Graphics"],
  },
];
