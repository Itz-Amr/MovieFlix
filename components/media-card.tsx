'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, Star } from 'lucide-react';
import type { MediaItem } from '@/types/media';

export function MediaCard({item,rank}:{item:MediaItem;rank?:number}){
 return <article className="group min-w-0">
  <Link href={`/${item.kind}/${item.id}`} className="relative block aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
   <Image src={item.poster} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-110"/>
   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent opacity-70 transition group-hover:opacity-95"/>
   {rank&&<span className="absolute -bottom-3 left-2 text-7xl font-black text-white/15">{rank}</span>}
   <button className="absolute right-3 top-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-black/55 opacity-0 backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100"><Plus size={18}/></button>
   <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-white text-black opacity-0 transition group-hover:scale-100 group-hover:opacity-100"><Play size={18} className="fill-black"/></span>
  </Link>
  <div className="pt-3"><div className="flex items-start justify-between gap-2"><h3 className="truncate font-semibold">{item.title}</h3><span className="flex items-center gap-1 text-xs text-amber-400"><Star size={13} className="fill-current"/>{item.rating}</span></div><p className="mt-1 text-xs text-white/40">{item.year} • {item.genre}</p></div>
 </article>
}
