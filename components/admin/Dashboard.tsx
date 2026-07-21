"use client";

import { useEffect, useState } from "react";
import { Check, ExternalLink, LoaderCircle, LogOut, Save } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { mergeContent, type SiteContent } from "@/data/content";
import { TABS } from "./schema";
import { CollectionEditor, RecordEditor } from "./fields";
import { LeadsViewer } from "./LeadsViewer";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function Dashboard({ email, onSignedOut }: { email: string; onSignedOut: () => void }) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [active, setActive] = useState(TABS[0].id);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    sb.from("site_content")
      .select("data")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => setContent(mergeContent((data?.data as Partial<SiteContent>) ?? null)));
  }, []);

  async function save() {
    const sb = getSupabase();
    if (!sb || !content) return;
    setSaving(true);
    setErr("");
    setSaved(false);
    const { error } = await sb
      .from("site_content")
      .upsert({ id: 1, data: content, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) setErr(error.message);
    else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  async function signOut() {
    await getSupabase()?.auth.signOut();
    onSignedOut();
  }

  const tab = TABS.find((t) => t.id === active)!;

  return (
    <div className="mx-auto min-h-svh max-w-[1200px] px-4 pb-28 pt-6 md:px-6">
      {/* Header */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-2.5 w-2.5 rounded-[3px] bg-gradient-to-br from-blue-600 to-violet-600" />
          <h1 className="font-heading text-lg font-bold text-txt">Portfolio Admin</h1>
        </div>
        <div className="flex items-center gap-2 text-[13px]">
          <a href={`${basePath}/`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 font-medium text-txt transition hover:border-accent">
            <ExternalLink size={14} /> View site
          </a>
          <span className="hidden text-muted sm:inline">{email}</span>
          <button onClick={signOut} className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 font-medium text-txt transition hover:border-red-400 hover:text-red-500">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </header>

      {!content ? (
        <p className="flex items-center gap-2 py-16 text-muted"><LoaderCircle size={16} className="animate-spin" /> Loading content…</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[210px_1fr]">
          {/* Tabs */}
          <nav className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-col md:overflow-visible md:px-0">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`shrink-0 rounded-lg px-3.5 py-2 text-left text-[13.5px] font-medium transition ${
                  active === t.id ? "bg-accent text-white" : "text-muted hover:bg-bg2 hover:text-txt"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {/* Editor */}
          <section>
            <h2 className="mb-4 text-[17px] font-semibold text-txt">{tab.label}</h2>
            {tab.kind === "leads" && <LeadsViewer />}
            {tab.kind === "record" && (
              <RecordEditor fields={tab.fields} value={tab.get(content)} prefix={tab.id} onChange={(v) => setContent(tab.set(content, v))} />
            )}
            {tab.kind === "collection" && (
              <CollectionEditor
                fields={tab.fields}
                items={tab.get(content)}
                titleKey={tab.titleKey}
                newItem={tab.newItem}
                prefix={tab.id}
                onChange={(items) => setContent(tab.set(content, items))}
              />
            )}
          </section>
        </div>
      )}

      {/* Sticky save bar */}
      {content && tab.kind !== "leads" && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1200px] items-center justify-end gap-3 px-4 py-3 md:px-6">
            {err && <span className="text-[13px] text-red-500">{err}</span>}
            {saved && <span className="flex items-center gap-1.5 text-[13px] font-medium text-green-600"><Check size={15} /> Saved &amp; live</span>}
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-accent px-6 py-2.5 text-[14px] font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-accent-hover disabled:opacity-70"
            >
              {saving ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
