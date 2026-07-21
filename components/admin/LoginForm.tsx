"use client";

import { useState } from "react";
import { LoaderCircle, LogIn } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { inputCls } from "./fields";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const sb = getSupabase();
    if (!sb) {
      setErr("Supabase is not configured yet.");
      return;
    }
    setBusy(true);
    setErr("");
    const { error } = await sb.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr(error.message);
    // On success, AdminApp's onAuthStateChange listener swaps in the dashboard.
  }

  return (
    <div className="grid min-h-svh place-items-center px-5">
      <form onSubmit={submit} className="card-shadow w-full max-w-sm rounded-2xl border border-line bg-card p-7">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="inline-block h-2.5 w-2.5 rounded-[3px] bg-gradient-to-br from-blue-600 to-violet-600" />
          <h1 className="font-heading text-lg font-bold text-txt">Admin Login</h1>
        </div>
        <label className="mb-1 block text-[12.5px] font-semibold text-txt">Email</label>
        <input className={inputCls} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label className="mb-1 mt-4 block text-[12.5px] font-semibold text-txt">Password</label>
        <input className={inputCls} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {err && <p className="mt-3 text-[13px] text-red-500">{err}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-[14.5px] font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-accent-hover disabled:opacity-70"
        >
          {busy ? <LoaderCircle size={16} className="animate-spin" /> : <LogIn size={16} />}
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
