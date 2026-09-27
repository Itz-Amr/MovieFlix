'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function sessionId(){
  const key='movieflix_session_id';
  let id=localStorage.getItem(key);
  if(!id){id=crypto.randomUUID();localStorage.setItem(key,id)}
  return id;
}
export function ActivityTracker(){
  const path=usePathname();
  useEffect(()=>{
    const id=sessionId();
    const beat=()=>fetch('/api/analytics/heartbeat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:id,path}),keepalive:true}).catch(()=>{});
    beat(); const timer=setInterval(beat,30000); return()=>clearInterval(timer);
  },[path]);
  return null;
}
