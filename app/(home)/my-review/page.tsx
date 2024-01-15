import { createServerClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function MyReview() {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const currentReview = undefined;

  return currentReview ? (
    <div className="flex justify-center items-center flex-grow">
      <button type="button" className="rounded border-gray-950">
        Comenzar
      </button>
    </div>
  ) : (
    <div className="text-xl font-bold flex justify-center items-center flex-grow">
      {' '}
      Actualmente no hay evaluaciones en curso{' '}
    </div>
  );
}
