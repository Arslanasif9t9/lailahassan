"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoModal } from "@/components/ui/VideoModal";
import { categories, type Project } from "@/data/projects";
import { useContent } from "@/components/providers/ContentProvider";

/**
 * Filterable portfolio grid.
 * FACADE PATTERN: cards only ever load a lightweight thumbnail image
 * (or a pure-CSS gradient). The actual video player loads ONLY when
 * the user clicks a card — exactly how YouTube keeps pages fast.
 */
export function Portfolio() {
  const { projects } = useContent();
  const [filter, setFilter] = useState<string>("all");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const visible = projects.filter(
    (p) => filter === "all" || (p.categories as readonly string[]).includes(filter)
  );

  return (
    <section id="portfolio" className="scroll-mt-16 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Work"
          sub="Filter by category. Tap any project for full preview, client goal & software used."
        />

        {/* Filters — horizontally swipeable on mobile (app feel) */}
        <div className="scrollbar-none -mx-5 mb-10 flex gap-2.5 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`shrink-0 rounded-full border px-5 py-2 text-[13.5px] font-medium transition-all ${
                filter === c.key
                  ? "border-accent bg-accent text-white shadow-lg shadow-blue-600/30"
                  : "border-line bg-transparent text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.button
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onClick={() => setOpenProject(p)}
                className="card-shadow card-shadow-hover group overflow-hidden rounded-[20px] border border-line bg-card text-left transition-all duration-300 hover:-translate-y-1.5"
              >
                <div
                  className="relative flex aspect-[16/10] items-center justify-center overflow-hidden"
                  style={{ background: p.gradient }}
                >
                  {(p.thumbnail || p.youtubeId) && (
                    <Image
                      src={p.thumbnail || `https://i.ytimg.com/vi/${p.youtubeId}/hqdefault.jpg`}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {!p.thumbnail && !p.youtubeId && (
                    <span className="font-heading text-[15px] font-semibold tracking-wider text-white/90">
                      {p.label}
                    </span>
                  )}
                  <span className="absolute flex h-14 w-14 scale-75 items-center justify-center rounded-full border border-white/35 bg-white/15 pl-1 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <Play size={20} fill="currentColor" />
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 px-5 py-5">
                  <div className="min-w-0">
                    <h4 className="truncate text-[16.5px] font-semibold text-txt">{p.title}</h4>
                    <small className="text-[13px] text-muted">{p.meta}</small>
                  </div>
                  <span className="shrink-0 rounded-full bg-accent/10 px-3 py-1.5 text-[11.5px] font-semibold text-accent">
                    {p.tag}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <VideoModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
