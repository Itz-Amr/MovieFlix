import { NextResponse } from 'next/server';
import { getCurrentUser, isAdminEmail } from '@/lib/supabase-rest';
export async function GET() { const user = await getCurrentUser(); return NextResponse.json({ user, isAdmin: isAdminEmail(user?.email) }); }
