import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import CurrentReviewTable from './components/CurrentReviewTable';
import UserReviewRepository from '@/lib/repository/user-review-repository';
import ReviewsRepository from '@/lib/repository/reviews-repository';
import ClientButton from './components/ClientButton';

export default async function CurrentReview() {
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const activeReview = await ReviewsRepository.getActive();

  if (!activeReview) return <div>No hay evaluaciones activas</div>;

  if (!activeReview.start_date)
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <ClientButton reviewId={activeReview.id} />
      </div>
    );

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
