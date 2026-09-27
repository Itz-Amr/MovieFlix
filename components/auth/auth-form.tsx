'use client';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(''); setMessage(''); setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const r = await fetch(`/api/auth/${mode}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Something went wrong.');
      if (mode === 'register' && data.requiresEmailConfirmation) {
        setMessage('Account created. Check your email to confirm it, then sign in.');
      } else {
        router.push('/profile'); router.refresh();
      }
    } catch (err) { setError(err instanceof Error ? err.message : 'Something went wrong.'); }
    finally { setLoading(false); }
  }

  const register = mode === 'register';
  return <form onSubmit={submit} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[.04] p-7 backdrop-blur-xl">
    <p className="eyebrow">{register ? 'Join MovieFlix' : 'Welcome back'}</p>
    <h1 className="mt-2 text-4xl font-black">{register ? 'Create account' : 'Sign in'}</h1>
    <p className="mt-2 text-sm text-white/45">{register ? 'Save titles, build your watchlist and sync your profile.' : 'Continue your MovieFlix journey.'}</p>
    {register && <><label className="field"><span>Name</span><input required name="name" minLength={2} autoComplete="name" placeholder="Your name"/></label><label className="field"><span>Username</span><input required name="username" minLength={3} maxLength={24} pattern="[A-Za-z0-9_]+" autoComplete="username" placeholder="moviefan"/></label></>}
    <label className="field"><span>Email</span><input required name="email" type="email" autoComplete="email" placeholder="you@example.com"/></label>
    <label className="field"><span>Password</span><input required name="password" minLength={8} type="password" autoComplete={register ? 'new-password' : 'current-password'} placeholder="8+ characters"/></label>
    {error && <p className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
    {message && <p className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">{message}</p>}
    <button disabled={loading} className="primary-btn mt-6 w-full justify-center disabled:opacity-60">{loading && <LoaderCircle size={18} className="animate-spin"/>}{register ? 'Create account' : 'Sign in'}</button>
    <p className="mt-6 text-center text-sm text-white/45">{register ? <>Already have an account? <Link href="/login" className="text-sky-400">Sign in</Link></> : <>New here? <Link href="/register" className="text-sky-400">Create account</Link></>}</p>
  </form>;
}
