"use client";

import { useState } from "react";
import { Mail, CalendarDays, Globe, ArrowRight, LoaderCircle, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { contactSchema } from "@/lib/validators";
import { getSupabase } from "@/lib/supabase";
import { useContent } from "@/components/providers/ContentProvider";

const inputCls =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-[14.5px] text-txt outline-none transition focus:border-accent focus:ring-[3px] focus:ring-accent/15";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

export function Contact() {
  const { site } = useContent();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("sending");
    const d = parsed.data;
    try {
      // Write the lead straight to Supabase (works on static hosting like
      // GitHub Pages, unlike the old /api route which is stripped on export).
      const sb = getSupabase();
      if (!sb) throw new Error("Supabase not configured");
      const { error } = await sb.from("leads").insert({
        name: d.name,
        email: d.email,
        project_type: d.projectType,
        budget: d.budget,
        deadline: d.deadline || null,
        details: d.details,
      });
      if (error) throw error;
      setStatus("sent");
      form.reset();
    } catch {
      // No backend reachable — fall back to the visitor's email app with the
      // message pre-filled so the lead is never lost.
      const subject = encodeURIComponent(`Project Inquiry — ${d.projectType}`);
      const body = encodeURIComponent(
        `Name: ${d.name}\nEmail: ${d.email}\nProject Type: ${d.projectType}\nBudget: ${d.budget}\nDeadline: ${d.deadline || "-"}\n\n${d.details}`
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
    }
  }

  return (
    <section id="contact" className="scroll-mt-16 bg-bg2 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 px-5 md:px-6 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <span className="mb-3 inline-block text-[13px] font-semibold uppercase tracking-[0.12em] text-accent">
            Contact
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-txt md:text-[42px] md:leading-[1.1]">
            Let&apos;s Create Something <span className="text-grad">Amazing</span>
          </h2>
          <p className="mb-8 text-muted">
            Tell me about your project and I&apos;ll get back within 24 hours with a plan and quote.
          </p>
          <div className="space-y-4 text-[14.5px] text-muted">
            <div className="flex items-center gap-3.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Mail size={17} />
              </span>
              {site.email}
            </div>
            <div className="flex items-center gap-3.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <CalendarDays size={17} />
              </span>
              Or book a free discovery call
            </div>
            <div className="flex items-center gap-3.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Globe size={17} />
              </span>
              Working with clients worldwide
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="card-shadow rounded-[20px] border border-line bg-card p-6 md:p-9"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-[13px] font-semibold text-txt">
                  Name
                </label>
                <input id="name" name="name" type="text" placeholder="Your name" className={inputCls} />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-txt">
                  Email
                </label>
                <input id="email" name="email" type="email" placeholder="you@company.com" className={inputCls} />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="projectType" className="mb-1.5 block text-[13px] font-semibold text-txt">
                  Project Type
                </label>
                <select id="projectType" name="projectType" className={inputCls} defaultValue="Long Form Editing">
                  <option>Long Form Editing</option>
                  <option>Short Form Editing</option>
                  <option>Commercial / Ads</option>
                  <option>Real Estate</option>
                  <option>Corporate</option>
                  <option>Motion Graphics</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="mb-1.5 block text-[13px] font-semibold text-txt">
                  Budget
                </label>
                <select id="budget" name="budget" className={inputCls} defaultValue="$200 – $500">
                  <option>$200 – $500</option>
                  <option>$500 – $1,000</option>
                  <option>$1,000 – $3,000</option>
                  <option>$3,000+</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="deadline" className="mb-1.5 block text-[13px] font-semibold text-txt">
                Deadline
              </label>
              <input id="deadline" name="deadline" type="date" className={inputCls} />
            </div>

            <div className="mt-4">
              <label htmlFor="details" className="mb-1.5 block text-[13px] font-semibold text-txt">
                Project Details
              </label>
              <textarea
                id="details"
                name="details"
                rows={4}
                placeholder="Tell me about your project, goals and references..."
                className={`${inputCls} resize-y`}
              />
              {errors.details && <p className="mt-1 text-xs text-red-500">{errors.details}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-7 py-4 text-[15px] font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Let&apos;s Create Something Amazing <ArrowRight size={17} />
                </>
              )}
            </button>

            {status === "sent" && (
              <p className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-green-600">
                <CheckCircle2 size={16} /> Message sent! I&apos;ll reply within 24 hours.
              </p>
            )}
            {status === "mailto" && (
              <p className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-accent">
                <Mail size={16} /> Your email app opened with the message ready — hit send to complete.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-center text-sm font-medium text-red-500">
                Something went wrong — please try again or email directly.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
