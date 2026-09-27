import { cookies, headers } from 'next/headers';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ACCESS_COOKIE = 'movieflix_access_token';
const REFRESH_COOKIE = 'movieflix_refresh_token';

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
export const supabaseAdminConfigured = Boolean(SUPABASE_URL && SUPABASE_SERVICE_KEY);

function baseHeaders(key?: string) {
  const apiKey = key || SUPABASE_ANON_KEY;
  if (!apiKey) throw new Error('Supabase key is not configured.');
  return {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  } as Record<string, string>;
}

export async function authFetch(path: string, init: RequestInit = {}, useService = false) {
  if (!SUPABASE_URL) throw new Error('Supabase URL is not configured.');
  const key = useService ? SUPABASE_SERVICE_KEY : SUPABASE_ANON_KEY;
  if (!key) throw new Error(useService ? 'Supabase service role key is not configured.' : 'Supabase anon key is not configured.');
  return fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    ...init,
    headers: { ...baseHeaders(key), ...(init.headers || {}) },
    cache: 'no-store',
  });
}

export async function restFetch(path: string, init: RequestInit = {}, useService = true) {
  if (!SUPABASE_URL) throw new Error('Supabase URL is not configured.');
  const key = useService ? SUPABASE_SERVICE_KEY : SUPABASE_ANON_KEY;
  if (!key) throw new Error('Supabase key is not configured.');
  return fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...init,
    headers: { ...baseHeaders(key), Prefer: 'return=representation', ...(init.headers || {}) },
    cache: 'no-store',
  });
}

export async function setSessionCookies(accessToken: string, refreshToken?: string, expiresIn = 3600) {
  const store = await cookies();
  const secure = process.env.NODE_ENV === 'production';
  store.set(ACCESS_COOKIE, accessToken, { httpOnly: true, sameSite: 'lax', secure, path: '/', maxAge: Math.max(300, expiresIn) });
  if (refreshToken) store.set(REFRESH_COOKIE, refreshToken, { httpOnly: true, sameSite: 'lax', secure, path: '/', maxAge: 60 * 60 * 24 * 30 });
}

export async function clearSessionCookies() {
  const store = await cookies();
  store.set(ACCESS_COOKIE, '', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0 });
  store.set(REFRESH_COOKIE, '', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0 });
}

export type MovieFlixUser = {
  id: string;
  email?: string;
  created_at?: string;
  last_sign_in_at?: string;
  user_metadata?: { name?: string; username?: string; avatar_url?: string; [key: string]: unknown };
  app_metadata?: Record<string, unknown>;
};

export async function getCurrentUser(): Promise<MovieFlixUser | null> {
  if (!supabaseConfigured) return null;
  const store = await cookies();
  const access = store.get(ACCESS_COOKIE)?.value;
  if (!access) return null;
  const r = await authFetch('/user', { headers: { Authorization: `Bearer ${access}` } });
  if (r.status === 401) return null;
  if (!r.ok) return null;
  return r.json();
}

export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.toLowerCase());
}

export async function requestContext() {
  const h = await headers();
  return {
    country: h.get('x-vercel-ip-country') || h.get('cf-ipcountry') || null,
    city: h.get('x-vercel-ip-city') || null,
    userAgent: h.get('user-agent') || null,
  };
}
