import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Clock3, Heart, ShieldCheck, Star, UserRound } from 'lucide-react';
import { LogoutButton } from '@/components/auth/logout-button';
import { getCurrentUser, isAdminEmail, supabaseConfigured } from '@/lib/supabase-rest';

export default async function Page(){
 const user=await getCurrentUser();
 if(supabaseConfigured&&!user) redirect('/login');
 const name=user?.user_metadata?.name||'MovieFlix member'; const username=user?.user_metadata?.username||'moviefan'; const initial=name.slice(0,2).toUpperCase(); const admin=!supabaseConfigured||isAdminEmail(user?.email);
 return <main className="page-shell"><section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[.06] to-transparent p-7 sm:p-10"><div className="flex flex-col gap-6 sm:flex-row sm:items-center"><div className="grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-blue-800 text-3xl font-black">{initial||'MF'}</div><div className="min-w-0"><p className="eyebrow">MovieFlix member</p><h1 className="mt-2 truncate text-4xl font-black">{name}</h1><p className="mt-2 text-white/45">@{username} · {user?.email||'Demo profile'}</p></div></div></section><section className="mt-8 grid gap-4 md:grid-cols-4">{[[Heart,'Favorites','Saved'],[Clock3,'Watchlist','Ready'],[Star,'Ratings','Coming soon'],[UserRound,'Account',user?'Synced':'Demo']].map(([Icon,label,value]:any)=><div key={label} className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><Icon className="text-sky-400"/><p className="mt-6 text-sm text-white/45">{label}</p><p className="mt-1 text-2xl font-black">{value}</p></div>)}</section><div className="mt-8 flex flex-wrap gap-3">{admin&&<Link href="/admin/dashboard" className="primary-btn"><ShieldCheck size={18}/>Admin dashboard</Link>}{user?<LogoutButton/>:<Link href="/login" className="primary-btn">Sign in</Link>}</div></main>}
