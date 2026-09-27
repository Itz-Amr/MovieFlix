import { NextResponse } from 'next/server';
import { authFetch, supabaseConfigured } from '@/lib/supabase-rest';
export async function POST(req: Request) {
  if (!supabaseConfigured) return NextResponse.json({ error: 'Supabase is not configured yet.' }, { status: 503 });
  const { email } = await req.json().catch(() => ({ email: '' }));
  const redirectTo = process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/login` : undefined;
  const r = await authFetch('/recover', { method: 'POST', body: JSON.stringify({ email, redirect_to: redirectTo }) });
  return r.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Could not send reset email.' }, { status: 400 });
}
