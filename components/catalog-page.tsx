'use client';
import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { MediaItem } from '@/types/media';
import { genres } from '@/lib/mock-data';
import { MediaCard } from './media-card';
export function CatalogPage({title,subtitle,items}:{title:string;subtitle:string;items:MediaItem[]}){
 const [genre,setGenre]=useState('All'); const [q,setQ]=useState('');
 const filtered=useMemo(()=>items.filter(x=>(genre==='All'||x.genre===genre)&&x.title.toLowerCase().includes(q.toLowerCase())),[genre,q,items]);
 return <main className="page-shell"><section className="pt-14"><p className="eyebrow">Browse MovieFlix</p><h1 className="page-title">{title}</h1><p className="mt-3 text-white/50">{subtitle}</p><div className="mt-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"><label className="flex max-w-xl flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3"><Search size={18} className="text-white/35"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={`Search ${title.toLowerCase()}...`} className="w-full bg-transparent outline-none placeholder:text-white/25"/></label><button className="secondary-btn"><SlidersHorizontal size={17}/> Advanced filters</button></div><div className="mt-5 flex gap-2 overflow-x-auto pb-2">{genres.map(g=><button key={g} onClick={()=>setGenre(g)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${genre===g?'bg-sky-500 text-white':'bg-white/5 text-white/55 hover:bg-white/10'}`}>{g}</button>)}</div></section><section className="mt-10"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold">{filtered.length} titles</h2><select className="rounded-xl border border-white/10 bg-[#091322] px-3 py-2 text-sm text-white/60"><option>Most popular</option><option>Top rated</option><option>Newest</option></select></div><div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">{filtered.map(x=><MediaCard key={x.id} item={x}/>)}</div></section></main>
}
