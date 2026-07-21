import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client (lazy singleton).
 *
 * The URL + anon key are PUBLIC by design — they are inlined into the bundle
 * at build time via NEXT_PUBLIC_* env vars. Row Level Security (see
 * supabase/schema.sql) is what actually protects the data: anonymous visitors
 * can only READ site content and INSERT leads; editing requires an
 * authenticated admin session.
 *
 * If the env vars are missing (e.g. before Supabase is wired up) this returns
 * null and the site silently falls back to the baked defaults in data/*.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  cached = url && anonKey ? createClient(url, anonKey) : null;
  return cached;
}

/** True when the two NEXT_PUBLIC_ Supabase env vars are present at build time. */
export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * This Supabase project is shared across several of the owner's frontends, so
 * every table + bucket is namespaced with the project slug to keep them
 * distinguishable. Change the prefix if you fork this site for another client.
 */
const PREFIX = "lailahassan";
export const TABLE = {
  content: `${PREFIX}_site_content`,
  leads: `${PREFIX}_leads`,
} as const;
export const MEDIA_BUCKET = `${PREFIX}_media`;
