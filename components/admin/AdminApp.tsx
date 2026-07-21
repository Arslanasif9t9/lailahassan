"use client";

import { useEffect, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { LoginForm } from "./LoginForm";
import { Dashboard } from "./Dashboard";

/**
 * Client-side admin shell. Works on static hosting (GitHub Pages) because all
 * auth + data access goes straight to Supabase from the browser.
 */
export function AdminApp() {
  const [ready, setReady] = useState(() => getSupabase() === null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    sb.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null);
      setReady(true);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="grid min-h-svh place-items-center px-5">
        <div className="max-w-md rounded-2xl border border-line bg-card p-7 text-center">
          <h1 className="mb-2 font-heading text-lg font-bold text-txt">Admin not configured</h1>
          <p className="text-[14px] leading-relaxed text-muted">
            Add <code className="rounded bg-bg2 px-1.5 py-0.5 text-[12.5px]">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="rounded bg-bg2 px-1.5 py-0.5 text-[12.5px]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
            <code className="rounded bg-bg2 px-1.5 py-0.5 text-[12.5px]">.env.local</code>, then rebuild. See{" "}
            <code className="rounded bg-bg2 px-1.5 py-0.5 text-[12.5px]">supabase/README.md</code>.
          </p>
        </div>
      </div>
    );
  }

  if (!ready) return <div className="grid min-h-svh place-items-center text-muted">Loading…</div>;
  if (!email) return <LoginForm />;
  return <Dashboard email={email} onSignedOut={() => setEmail(null)} />;
}
