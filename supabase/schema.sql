-- =============================================================================
-- Portfolio backend schema — run this once in the Supabase SQL Editor.
-- Safe to re-run (idempotent).
--
-- This Supabase project is shared across multiple frontends, so every object is
-- namespaced with the `lailahassan_` prefix. Keep that prefix in sync with
-- `PREFIX` in lib/supabase.ts if you rename anything.
-- =============================================================================

-- ── 1. Site content (single JSON document, id = 1) ───────────────────────────
create table if not exists public.lailahassan_site_content (
  id         int primary key default 1,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint lailahassan_site_content_single_row check (id = 1)
);

insert into public.lailahassan_site_content (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

alter table public.lailahassan_site_content enable row level security;

drop policy if exists "lailahassan_content public read"  on public.lailahassan_site_content;
drop policy if exists "lailahassan_content admin insert" on public.lailahassan_site_content;
drop policy if exists "lailahassan_content admin update" on public.lailahassan_site_content;

-- Anyone (site visitors) may READ the published content.
create policy "lailahassan_content public read"
  on public.lailahassan_site_content for select
  using (true);

-- Only signed-in admins may write.
create policy "lailahassan_content admin insert"
  on public.lailahassan_site_content for insert to authenticated
  with check (true);

create policy "lailahassan_content admin update"
  on public.lailahassan_site_content for update to authenticated
  using (true) with check (true);


-- ── 2. Leads (contact-form submissions) ──────────────────────────────────────
create table if not exists public.lailahassan_leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  project_type text,
  budget       text,
  deadline     text,
  details      text
);

alter table public.lailahassan_leads enable row level security;

drop policy if exists "lailahassan_leads public insert" on public.lailahassan_leads;
drop policy if exists "lailahassan_leads admin read"    on public.lailahassan_leads;

-- Anyone may submit the contact form.
create policy "lailahassan_leads public insert"
  on public.lailahassan_leads for insert to anon, authenticated
  with check (true);

-- Only signed-in admins may read submissions.
create policy "lailahassan_leads admin read"
  on public.lailahassan_leads for select to authenticated
  using (true);


-- ── 3. Media storage bucket (thumbnails, hero video, posters) ────────────────
insert into storage.buckets (id, name, public)
values ('lailahassan_media', 'lailahassan_media', true)
on conflict (id) do nothing;

drop policy if exists "lailahassan_media public read"  on storage.objects;
drop policy if exists "lailahassan_media admin insert" on storage.objects;
drop policy if exists "lailahassan_media admin update" on storage.objects;
drop policy if exists "lailahassan_media admin delete" on storage.objects;

create policy "lailahassan_media public read"
  on storage.objects for select
  using (bucket_id = 'lailahassan_media');

create policy "lailahassan_media admin insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'lailahassan_media');

create policy "lailahassan_media admin update"
  on storage.objects for update to authenticated
  using (bucket_id = 'lailahassan_media');

create policy "lailahassan_media admin delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'lailahassan_media');
