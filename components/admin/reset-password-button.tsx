'use client';
import { useState } from 'react';
export function ResetPasswordButton({email}:{email:string}){const[s,setS]=useState('');async function send(){setS('Sending…');const r=await fetch('/api/admin/reset-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})});setS(r.ok?'Sent':'Failed');setTimeout(()=>setS(''),2200)}return <button onClick={send} className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:bg-white/10 hover:text-white">{s||'Reset password'}</button>}
