"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MonitorPlay } from "lucide-react";
import type { Project } from "@/data/projects";

/**
 * Video popup with FACADE pattern:
 * the YouTube player iframe is only mounted when the modal opens,
 * so zero video bytes are downloaded until the user actually clicks.
 * YouTube then streams the video in adaptive chunks (like the YouTube app).
 */
export function VideoModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <button
            onClick={onClose}
            aria-label="Close video"
            className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <X size={19} />
          </button>

          <motion.div
            className="max-h-full w-full max-w-3xl overflow-y-auto rounded-[20px] border border-line bg-card"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aspect-video w-full" style={{ background: project.gradient }}>
              {project.youtubeId ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-white/90">
                  <MonitorPlay size={40} strokeWidth={1.5} />
                  <p className="px-6 text-center text-sm">
                    Video preview — add your YouTube ID for this project in{" "}
                    <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs">data/projects.ts</code>
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 md:p-8">
              <h3 className="mb-3 text-xl font-bold text-txt md:text-2xl">{project.title}</h3>
              <p className="mb-2 text-sm text-muted">
                <strong className="text-txt">Client Goal:</strong> {project.clientGoal}
              </p>
              <p className="mb-2 text-sm text-muted">
                <strong className="text-txt">Software Used:</strong> {project.software.join(" · ")}
              </p>
              <p className="text-sm leading-relaxed text-muted">{project.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
