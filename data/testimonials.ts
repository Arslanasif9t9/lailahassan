export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  /** Optional YouTube ID for a video testimonial (loads on click, facade pattern). */
  youtubeId: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Our ad performance doubled after switching editors. The pacing, hooks and captions are on another level.",
    name: "Sarah M.",
    role: "E-commerce Brand Owner · USA",
    initials: "SM",
    youtubeId: "",
  },
  {
    quote:
      "Fast, reliable and incredibly creative. Feels like having an in-house editor who actually understands retention.",
    name: "James D.",
    role: "YouTube Creator · 850K subs · UK",
    initials: "JD",
    youtubeId: "",
  },
  {
    quote:
      "We hand over raw footage and get back agency-quality videos every single time. Effortless collaboration.",
    name: "Aisha K.",
    role: "Marketing Agency Director · UAE",
    initials: "AK",
    youtubeId: "",
  },
];
