-- =============================================================================
-- Portfolio backend schema — run this once in the Supabase SQL Editor.
-- Safe to re-run (idempotent).
-- =============================================================================

-- ── 1. Site content (single JSON document, id = 1) ───────────────────────────
create table if not exists public.site_content (
  id         int primary key default 1,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_content_single_row check (id = 1)
);

insert into public.site_content (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

alter table public.site_content enable row level security;

drop policy if exists "site_content public read"  on public.site_content;
drop policy if exists "site_content admin insert"  on public.site_content;
drop policy if exists "site_content admin update"  on public.site_content;

-- Anyone (site visitors) may READ the published content.
create policy "site_content public read"
  on public.site_content for select
  using (true);

-- Only signed-in admins may write.
create policy "site_content admin insert"
  on public.site_content for insert to authenticated
  with check (true);

create policy "site_content admin update"
  on public.site_content for update to authenticated
  using (true) with check (true);


-- ── 2. Leads (contact-form submissions) ──────────────────────────────────────
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  project_type text,
  budget       text,
  deadline     text,
  details      text
);

alter table public.leads enable row level security;

drop policy if exists "leads public insert" on public.leads;
drop policy if exists "leads admin read"    on public.leads;

-- Anyone may submit the contact form.
create policy "leads public insert"
  on public.leads for insert to anon, authenticated
  with check (true);

-- Only signed-in admins may read submissions.
create policy "leads admin read"
  on public.leads for select to authenticated
  using (true);


-- ── 3. Media storage bucket (thumbnails, hero video, posters) ────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media public read"  on storage.objects;
drop policy if exists "media admin insert" on storage.objects;
drop policy if exists "media admin update" on storage.objects;
drop policy if exists "media admin delete" on storage.objects;

create policy "media public read"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "media admin insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'media');

create policy "media admin update"
  on storage.objects for update to authenticated
  using (bucket_id = 'media');

create policy "media admin delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media');
