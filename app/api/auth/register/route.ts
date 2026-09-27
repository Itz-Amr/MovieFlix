import { NextResponse } from 'next/server';
import { authFetch, restFetch, setSessionCookies, supabaseConfigured } from '@/lib/supabase-rest';

export async function POST(req: Request) {
  if (!supabaseConfigured) return NextResponse.json({ error: 'Supabase is not configured yet.' }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  const name = String(body.name || '').trim();
  const username = String(body.username || '').trim().toLowerCase();
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');

  if (name.length < 2) return NextResponse.json({ error: 'Name must be at least 2 characters.' }, { status: 400 });
  if (!/^[a-z0-9_]{3,24}$/.test(username)) return NextResponse.json({ error: 'Username must be 3–24 letters, numbers or underscores.' }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });

  try {
    const existing = await restFetch(`/profiles?username=eq.${encodeURIComponent(username)}&select=id&limit=1`);
    if (existing.ok) {
      const rows = await existing.json();
      if (rows.length) return NextResponse.json({ error: 'That username is already taken.' }, { status: 409 });
    }

    const r = await authFetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, data: { name, username } }),
    });
    const data = await r.json();
    if (!r.ok) return NextResponse.json({ error: data.msg || data.message || data.error_description || 'Could not create account.' }, { status: r.status });

    if (data.user?.id) {
      await restFetch('/profiles?on_conflict=id', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify({ id: data.user.id, email, name, username }),
      });
    }

    if (data.access_token) await setSessionCookies(data.access_token, data.refresh_token, data.expires_in);
    return NextResponse.json({ ok: true, requiresEmailConfirmation: !data.access_token, user: data.user || null });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Registration failed.' }, { status: 500 });
  }
}
