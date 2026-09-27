import { NextResponse } from 'next/server';
import { authFetch, getCurrentUser, isAdminEmail } from '@/lib/supabase-rest';
export async function POST(req: Request) {
  const admin = await getCurrentUser();
  if (!isAdminEmail(admin?.email)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { email } = await req.json().catch(() => ({ email: '' }));
  if (!email) return NextResponse.json({ error: 'Email required.' }, { status: 400 });
  const redirectTo = process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/login` : undefined;
  const r = await authFetch('/recover', { method: 'POST', body: JSON.stringify({ email, redirect_to: redirectTo }) });
  return r.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Could not send reset email.' }, { status: 400 });
}
