# Meridian Procurement Co.

Marketing site, blog, resource hub, and admin CMS for **Meridian Procurement Co.** —
Africa's procurement, rebuilt from the ground up. Built with React (Vite), Tailwind CSS,
React Router, and Supabase. Deployed to Cloudflare Pages.

## Stack

- React + Vite
- Tailwind CSS
- React Router v6 (client-side routing)
- Supabase (blog, resource downloads, lead forms)
- react-markdown + remark-gfm (blog post rendering)
- react-helmet-async (per-page SEO)

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your Supabase project + admin password
npm run dev
```

## Environment variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase project's public anon key |
| `VITE_ADMIN_PASSWORD` | Password for the `/admin` panel |

Without these set, the site still runs — blog/resources/leads/admin pages render
empty/disconnected states rather than crashing.

## Supabase setup

Run the SQL files in your Supabase project's SQL editor, in order:

1. `supabase/schema.sql` — creates `blog_posts`, `resource_downloads`, and
   `lead_submissions` tables with RLS policies. **Read the security note at the
   top of that file** — the `/admin` panel uses a client-side password gate, not
   real Supabase Auth, so RLS grants the `anon` role read/write access needed for
   the admin CMS to function.
2. `supabase/seed_blog_posts.sql` — seeds the 4 launch blog posts.

## Admin panel

Visit `/admin/login` and enter the password set in `VITE_ADMIN_PASSWORD`. From there:

- `/admin` — dashboard stats
- `/admin/posts` — manage blog posts
- `/admin/posts/new` — write a new post (Markdown, with live preview)
- `/admin/leads` — view and export audit/demo form submissions

## Build & deploy

```bash
npm run build
```

Deploy the `dist/` folder to Cloudflare Pages. `public/_redirects` is included so
all client-side routes resolve correctly on Cloudflare Pages.

## Contact

mohit@meridianprocurements.com
