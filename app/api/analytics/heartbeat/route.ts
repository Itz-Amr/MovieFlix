import { NextResponse } from 'next/server';
import { getCurrentUser, requestContext, restFetch, supabaseAdminConfigured } from '@/lib/supabase-rest';

export async function POST(req: Request) {
  if (!supabaseAdminConfigured) return NextResponse.json({ ok: true, disabled: true });
  const body = await req.json().catch(() => ({}));
  const sessionId = String(body.sessionId || '').slice(0, 80);
  const path = String(body.path || '/').slice(0, 300);
  if (!sessionId) return NextResponse.json({ ok: false }, { status: 400 });
  const user = await getCurrentUser();
  const ctx = await requestContext();
  const now = new Date().toISOString();
  const payload = {
    session_id: sessionId,
    user_id: user?.id || null,
    email: user?.email || null,
    username: user?.user_metadata?.username || null,
    name: user?.user_metadata?.name || null,
    path,
    country: ctx.country,
    city: ctx.city,
    user_agent: ctx.userAgent,
    last_seen: now,
  };
  const r = await restFetch('/site_sessions?on_conflict=session_id', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) return NextResponse.json({ ok: true, analyticsReady: false });
  return NextResponse.json({ ok: true });
}
