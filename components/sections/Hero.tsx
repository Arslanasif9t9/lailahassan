"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/data/site";

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <header
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden bg-primary pb-24 pt-32 md:pt-36"
    >
      {/* Background: real video if configured, else premium animated gradient */}
      <div className="absolute inset-0 overflow-hidden">
        {site.heroVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            src={site.heroVideo}
            poster={site.heroPoster || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <div
            className="animate-hero-float absolute -inset-[20%]"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 70% 20%, rgba(37,99,235,.28), transparent 60%)," +
                "radial-gradient(ellipse 50% 40% at 20% 80%, rgba(124,58,237,.18), transparent 60%)," +
                "radial-gradient(ellipse 40% 30% at 90% 90%, rgba(37,99,235,.12), transparent 60%)",
            }}
          />
        )}
        <div className="hero-grid-bg absolute inset-0" />
        <div className="animate-orb absolute right-[8%] top-[8%] h-64 w-64 rounded-full bg-blue-600/35 blur-[70px] md:h-96 md:w-96" />
        <div
          className="animate-orb absolute bottom-[5%] left-[5%] h-52 w-52 rounded-full bg-violet-600/25 blur-[70px] md:h-72 md:w-72"
          style={{ animationDelay: "-4s" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 md:px-6">
        <div className="max-w-[820px]">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13.5px] font-medium text-slate-300 backdrop-blur-md"
          >
            <span className="animate-pulse-dot h-2 w-2 rounded-full bg-green-500" />
            Available for new projects
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-[38px] font-bold leading-[1.06] tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            Turning Raw Footage Into <span className="text-grad">High-Converting</span> Content
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 max-w-[560px] text-base text-slate-400 md:text-[19px]"
          >
            Professional Video Editing for Brands, Businesses, Creators &amp; Agencies. Cinematic
            quality, high-retention edits, delivered fast.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-xl shadow-blue-600/35 transition hover:bg-accent-hover"
              >
                View Portfolio <ArrowRight size={17} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href={site.bookCallUrl}
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <CalendarDays size={17} /> Book a Call
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
