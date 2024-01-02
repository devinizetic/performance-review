import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex-1 w-full flex flex-col items-center">
      Hello {user.email}!!!
    </div>
  ) : (
    <div className="flex-1 w-full flex flex-col items-center">
      You are logged in but this is wrong
    </div>
  );
}
