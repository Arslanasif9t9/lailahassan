# Supabase backend setup

The `/admin` panel and live content are powered by Supabase. One-time setup:

## 1. Create a project
Go to <https://supabase.com> → **New project** (free tier is fine). Wait for it to provision.

## 2. Run the schema
Open **SQL Editor** → paste the contents of [`schema.sql`](./schema.sql) → **Run**.
This creates the `lailahassan_site_content` table, the `lailahassan_leads`
table, the `lailahassan_media` storage bucket, and all Row Level Security
policies. It is safe to re-run.

> Everything is namespaced with the `lailahassan_` prefix so this Supabase
> project can be shared across multiple frontends. The prefix lives in one
> place: `PREFIX` in `lib/supabase.ts`.

> If the storage-policy statements error (some projects lock down
> `storage.objects` in SQL), create the policies from the dashboard instead:
> **Storage → Policies → lailahassan_media** and allow `SELECT` for everyone,
> and `INSERT/UPDATE/DELETE` for `authenticated`.

## 3. Create the admin user (Laila's login)
**Authentication → Users → Add user** → enter an email + password →
enable **Auto Confirm User** (or confirm the invite email). This is the login
for `/admin`. Add more users the same way.

## 4. Get the API keys
**Project Settings → API**. Copy:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The anon key is safe to expose — RLS (step 2) is what protects the data.

## 5. Wire them into the build
Create `.env.local` in the project root (copy from `.env.example`):

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

These are baked into the bundle at build time, so re-run the build/deploy after
setting them: `npm run deploy:pages`.

## Done
- Public site → reads live content from Supabase (falls back to the baked
  defaults in `data/*.ts` if Supabase is unreachable).
- `/admin` → log in and edit everything; **Save changes** publishes instantly.
- Contact form → writes to the `leads` table (viewable under the **Leads** tab).
