import { UserReviewRepository } from '@/lib/repository/user-review-repository';
import { createServerClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function MyReview() {
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const currentReview = await new UserReviewRepository().getCurrentByRevieweeId(
    '3fc9eb12-c098-4985-a295-89bfbe145813'
  );
  // console.log(currentReview?.reviews[0].questions[0]);
  return currentReview ? (
    <pre>{JSON.stringify(currentReview, undefined, 2)}</pre>
  ) : (
    // <div className="flex justify-center items-center flex-grow"></div>
    <div className="text-xl font-bold flex justify-center items-center flex-grow">
      {' '}
      Actualmente no hay evaluaciones en curso{' '}
    </div>
  );
}
