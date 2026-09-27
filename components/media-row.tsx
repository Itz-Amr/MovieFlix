import Link from 'next/link';
import type { MediaItem } from '@/types/media';
import { MediaCard } from './media-card';
export function MediaRow({title,items,href,ranked=false}:{title:string;items:MediaItem[];href?:string;ranked?:boolean}){return <section className="section-shell"><div className="mb-5 flex items-end justify-between"><div><p className="eyebrow">MovieFlix picks</p><h2 className="section-title">{title}</h2></div>{href&&<Link href={href} className="text-sm text-sky-400 hover:text-sky-300">View all →</Link>}</div><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">{items.slice(0,6).map((x,i)=><MediaCard key={`${x.kind}-${x.id}`} item={x} rank={ranked?i+1:undefined}/>)}</div></section>}
