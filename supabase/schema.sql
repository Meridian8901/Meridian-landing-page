-- Meridian Procurement Co. — Supabase schema
-- Run this in the Supabase SQL editor (Project → SQL Editor → New query).

-- ============================================================
-- SECURITY NOTE
-- ============================================================
-- The /admin panel in this app uses a client-side password check
-- (VITE_ADMIN_PASSWORD compared in the browser, gated behind a
-- localStorage token) rather than real Supabase Auth. That means
-- the admin panel talks to Supabase using the same public "anon"
-- key as the rest of the site — there is no way for Postgres RLS
-- to tell an authenticated admin apart from an anonymous visitor.
--
-- As a result, the policies below grant the "anon" role enough
-- access for the admin panel to function (read drafts, write/
-- publish/delete posts, read leads and resource downloads). This
-- means anyone who inspects the anon key in the deployed bundle
-- could technically read/write the same data via the Supabase API
-- directly, bypassing the /admin password screen entirely.
--
-- This is an accepted tradeoff of the "no auth library" admin
-- design. If real access control is needed later, switch the
-- admin panel to Supabase Auth (email/password or magic link) and
-- scope these policies to the `authenticated` role instead.
-- ============================================================

-- Blog posts
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text, -- Markdown content
  cover_image_url text,
  category text,
  author_name text default 'Alex Ranjan',
  author_avatar_url text,
  published_at timestamptz,
  is_published boolean default false,
  read_time_minutes int,
  tags text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Resource downloads (email gate for premium)
create table if not exists resource_downloads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  resource_slug text not null,
  downloaded_at timestamptz default now()
);

-- Audit/demo form submissions
create table if not exists lead_submissions (
  id uuid primary key default gen_random_uuid(),
  type text not null, -- 'audit' or 'demo'
  company_name text,
  contact_name text,
  email text not null,
  phone text,
  country text,
  industry text,
  annual_spend_range text,
  message text,
  submitted_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table blog_posts enable row level security;
alter table resource_downloads enable row level security;
alter table lead_submissions enable row level security;

-- blog_posts: anon needs full read/write for both the public blog
-- (which filters is_published = true client-side) and the admin CMS.
create policy "anon select blog_posts" on blog_posts
  for select to anon using (true);

create policy "anon insert blog_posts" on blog_posts
  for insert to anon with check (true);

create policy "anon update blog_posts" on blog_posts
  for update to anon using (true) with check (true);

create policy "anon delete blog_posts" on blog_posts
  for delete to anon using (true);

-- resource_downloads: anon can submit the email gate and the admin
-- dashboard can read the count.
create policy "anon insert resource_downloads" on resource_downloads
  for insert to anon with check (true);

create policy "anon select resource_downloads" on resource_downloads
  for select to anon using (true);

-- lead_submissions: anon can submit audit/demo forms and the admin
-- leads table can read them.
create policy "anon insert lead_submissions" on lead_submissions
  for insert to anon with check (true);

create policy "anon select lead_submissions" on lead_submissions
  for select to anon using (true);
