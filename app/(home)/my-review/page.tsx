import UserReviewRepository from '@/lib/repository/user-review-repository';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function MyReview() {
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const activeReview =
    await UserReviewRepository.getActiveUserReviewByRevieweeId({
      revieweeId: session.user.id
    });

  const fullActiveReview = await UserReviewRepository.getFullReviewQuery({
    revieweeId: session.user.id
  });

  console.log('HOLALAL');
  console.log(fullActiveReview);
  console.log('CHAUUUU');

  if (activeReview && activeReview.id)
    redirect(`/my-review/${activeReview.id}`);

  /* if (  isRevieweeCompleted && isReviewerCompleted && isFeedbackCompleted)
    redirect(`/my-review/${activeReview.id}/feedback`); */

  return (
    <div className="text-xl font-bold flex justify-center items-center flex-grow">
      Actualmente no hay evaluaciones en curso
    </div>
  );
}
