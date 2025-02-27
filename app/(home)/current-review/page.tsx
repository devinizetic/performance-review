import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import CurrentReviewTable from './components/CurrentReviewTable';
import UserReviewRepository from '@/lib/repository/user-review-repository';
import ReviewsRepository from '@/lib/repository/reviews-repository';
import ClientButton from './components/ClientButton';
import Link from 'next/link';

export default async function CurrentReview() {
  const supabase = await createClient();
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

  const currentReviews = await UserReviewRepository.getAllCurrentReviews(activeReview.id);

  return currentReviews && currentReviews.length ? (
    <div className="flex flex-col gap-4">
      <Link
        className="bg-green-700 p-3 text-white font-bold rounded-md text-center w-1/6"
        href={'/api/current-review/download'}
      >
        Exportar
      </Link>
      <CurrentReviewTable currentReviews={currentReviews}></CurrentReviewTable>
    </div>
  ) : (
    <div className="flex-1 w-full flex flex-col items-center">
      Por el momento no hay evaluaciones activas.
    </div>
  );
}
