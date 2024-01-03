'use server';

import { createServerClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logout = async () => {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);
  await supabase.auth.signOut();
  return redirect('/login');
};
