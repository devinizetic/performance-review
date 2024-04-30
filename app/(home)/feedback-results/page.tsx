import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import UserReviewRepository from '@/lib/repository/user-review-repository';
import FeedbackResultTable from './components/FeedbackResultTable';

export default async function FeedbackResults() {
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const feedbackResults = await UserReviewRepository.getFeedbackResults();

  return feedbackResults && feedbackResults.length ? (
    <div>
      <FeedbackResultTable
        feedbackScores={feedbackResults}
      ></FeedbackResultTable>
    </div>
  ) : (
    <div className="flex-1 w-full flex flex-col items-center">
      Aun no hay feedbacks completos.
    </div>
  );
}
