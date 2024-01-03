import { createServerClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  return session.user ? (
    <div className="flex-1 w-full flex flex-col items-center">
      Hello {session.user.email}!!!
    </div>
  ) : (
    <div className="flex-1 w-full flex flex-col items-center">
      You are logged in but this is wrong
    </div>
  );
}
