"use client";

import { useEffect, useState } from "react";
import { Mail, LoaderCircle } from "lucide-react";
import { getSupabase } from "@/lib/supabase";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  project_type: string | null;
  budget: string | null;
  deadline: string | null;
  details: string | null;
};

export function LeadsViewer() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    sb.from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setErr(error.message);
        else setLeads((data ?? []) as Lead[]);
      });
  }, []);

  if (err) return <p className="text-[13.5px] text-red-500">Could not load leads: {err}</p>;
  if (!leads) return <p className="flex items-center gap-2 text-muted"><LoaderCircle size={15} className="animate-spin" /> Loading leads…</p>;
  if (leads.length === 0) return <p className="text-[14px] text-muted">No leads yet. Contact-form submissions will appear here.</p>;

  return (
    <div className="space-y-3">
      {leads.map((l) => (
        <div key={l.id} className="rounded-xl border border-line bg-card p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="min-w-0">
              <h4 className="text-[15px] font-semibold text-txt">{l.name}</h4>
              <a href={`mailto:${l.email}`} className="flex items-center gap-1.5 text-[13px] text-accent">
                <Mail size={13} /> {l.email}
              </a>
            </div>
            <span className="text-[12px] text-muted">{new Date(l.created_at).toLocaleString()}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-[12px]">
            {l.project_type && <span className="rounded-full bg-accent/10 px-2.5 py-1 font-medium text-accent">{l.project_type}</span>}
            {l.budget && <span className="rounded-full bg-bg2 px-2.5 py-1 text-muted">{l.budget}</span>}
            {l.deadline && <span className="rounded-full bg-bg2 px-2.5 py-1 text-muted">by {l.deadline}</span>}
          </div>
          {l.details && <p className="mt-2.5 whitespace-pre-wrap text-[13.5px] leading-relaxed text-muted">{l.details}</p>}
        </div>
      ))}
    </div>
  );
}
