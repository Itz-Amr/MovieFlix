import { NextResponse } from 'next/server';
import { authFetch, setSessionCookies, supabaseConfigured } from '@/lib/supabase-rest';

export async function POST(req: Request) {
  if (!supabaseConfigured) return NextResponse.json({ error: 'Supabase is not configured yet.' }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');
  const r = await authFetch('/token?grant_type=password', { method: 'POST', body: JSON.stringify({ email, password }) });
  const data = await r.json();
  if (!r.ok) return NextResponse.json({ error: data.error_description || data.msg || data.message || 'Invalid email or password.' }, { status: 401 });
  await setSessionCookies(data.access_token, data.refresh_token, data.expires_in);
  return NextResponse.json({ ok: true, user: data.user });
}
