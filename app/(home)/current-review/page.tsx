import RevieweesRepository from '@/lib/repository/reviewees-repository';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import CurrentReviewTable from './components/CurrentReviewTable';
import UserReviewRepository from '@/lib/repository/user-review-repository';

export default async function CurrentReview() {
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const currentReviews = await UserReviewRepository.getAllCurrentReviews();

  return currentReviews && currentReviews.length ? (
    <div>
      <CurrentReviewTable currentReviews={currentReviews}></CurrentReviewTable>
    </div>
  ) : (
    <div className="flex-1 w-full flex flex-col items-center">
      Por el momento no hay evaluaciones activas.
    </div>
  );
}
