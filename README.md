# MovieFlix

MovieFlix is a full Next.js movie-discovery portfolio project with an animated cinematic home page, movies/TV discovery, filters, pagination, global search, detail pages, trailers, cast, people pages, seasons, recommendations, reviews, watchlist/favorites, real email/password authentication and a private admin dashboard with registered-user and live-visitor analytics.

## 1. Run locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## 2. TMDB (real movies/TV data)
Create a TMDB account and put your API Read Access Token in `.env.local`:
```env
TMDB_ACCESS_TOKEN=...
```
Without it, MovieFlix uses built-in demo catalog data.

## 3. Supabase (free auth + dashboard data)
Create a free Supabase project. In **SQL Editor**, run `supabase/schema.sql` once. Then copy `.env.example` to `.env.local` and add:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_EMAILS=your-email@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
Important: `SUPABASE_SERVICE_ROLE_KEY` is server-only. Never expose it in client code or prefix it with `NEXT_PUBLIC_`.

The email in `ADMIN_EMAILS` can open:
- `/admin/dashboard` overview
- `/admin/users` registered users: name, username, email, registration date, last login, reset-password action
- `/admin/live` active/recent visitors and current page

Passwords are handled by Supabase Auth as secure hashes. MovieFlix never stores or displays users' plaintext passwords.

## Main routes
- `/` animated home
- `/movies` movies + filters + pagination
- `/tv` TV + filters + pagination
- `/search?q=...`
- `/movie/[id]`
- `/tv/[id]`
- `/person/[id]`
- `/watchlist`
- `/favorites`
- `/profile`
- `/login`
- `/register`
- `/admin/dashboard`
- `/admin/users`
- `/admin/live`

## Vercel
Push to GitHub -> Import in Vercel -> add the same environment variables in Project Settings. Set `NEXT_PUBLIC_SITE_URL` to your production Vercel URL.
