'use client';
import Link from 'next/link';
import { Bell, Heart, Menu, Search, UserRound } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';

const links=[['/','Home'],['/movies','Movies'],['/tv','TV Shows'],['/watchlist','Watchlist']];
export function SiteHeader(){
 const path=usePathname();
 return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.06] bg-[#040b16]/70 backdrop-blur-2xl">
  <div className="mx-auto flex h-18 max-w-[1500px] items-center justify-between px-5 py-4 lg:px-10">
   <div className="flex items-center gap-10"><Logo/><nav className="hidden gap-7 md:flex">{links.map(([href,label])=><Link key={href} href={href} className={`text-sm transition ${path===href?'text-white':'text-white/55 hover:text-white'}`}>{label}</Link>)}</nav></div>
   <div className="flex items-center gap-2">
    <Link href="/search" aria-label="Search" className="icon-btn"><Search size={18}/></Link>
    <Link href="/favorites" aria-label="Favorites" className="icon-btn hidden sm:grid"><Heart size={18}/></Link>
    <button className="icon-btn relative hidden sm:grid"><Bell size={18}/><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500"/></button>
    <Link href="/profile" className="icon-btn"><UserRound size={18}/></Link>
    <button className="icon-btn md:hidden"><Menu size={20}/></button>
   </div>
  </div>
 </header>
}
