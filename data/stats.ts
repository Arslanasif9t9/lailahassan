export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 100, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Countries Served" },
  { value: 3, suffix: "+", label: "Years Experience" },
];

export const whyMe = [
  { icon: "zap", title: "Fast Delivery", text: "Reliable turnarounds that respect your launch dates." },
  { icon: "palette", title: "Unlimited Creativity", text: "Fresh ideas tailored to your brand voice." },
  { icon: "chart", title: "High Retention Editing", text: "Pacing engineered to keep viewers watching." },
  { icon: "search", title: "Attention to Detail", text: "Frame-perfect cuts, clean audio, zero sloppiness." },
  { icon: "film", title: "Premium Color Grading", text: "Cinematic looks that elevate perception." },
  { icon: "volume", title: "Sound Design", text: "SFX, mixing and music that add real impact." },
  { icon: "sparkles", title: "Motion Graphics", text: "Titles, captions and animations that pop." },
  { icon: "infinity", title: "Unlimited Revisions", text: "We iterate until you are 100% happy." },
] as const;

export const software = [
  { short: "Pr", name: "Premiere Pro", bg: "#00005B" },
  { short: "Ae", name: "After Effects", bg: "#00005B" },
  { short: "Ps", name: "Photoshop", bg: "#001E36" },
  { short: "Ai", name: "Illustrator", bg: "#330000" },
  { short: "Au", name: "Audition", bg: "#00005B" },
  { short: "DR", name: "DaVinci Resolve", bg: "linear-gradient(135deg,#233042,#0284c7)" },
] as const;

export const processSteps = [
  { title: "Receive Footage", text: "Secure upload via Drive, Dropbox or Frame.io" },
  { title: "Creative Planning", text: "Story structure, pacing & style direction" },
  { title: "Professional Editing", text: "Cut, grade, sound design & motion graphics" },
  { title: "Revisions", text: "Fast feedback rounds until it is perfect" },
  { title: "Final Delivery", text: "Every format & resolution you need" },
] as const;
