import AnswersRepository from '@/lib/repository/answers-repository';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';
import Feedback from './components/Feedback';

interface FeedbackPageProps {
  params: { id: string };
  searchParams: { reviewerId: string; revieweeId: string };
}

const FeedbackPage: React.FC<FeedbackPageProps> = async ({
  params: { id },
  searchParams: { reviewerId, revieweeId }
}) => {
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const feedbackQuestionAnswers =
    await AnswersRepository.getFeedbackQuestionAnswers({
      userReviewId: id,
      reviewerId: reviewerId,
      revieweeId: revieweeId
    });

  if (!feedbackQuestionAnswers || !feedbackQuestionAnswers.length)
    return <div>El Feedback de esta evaluación todavia no esta listo</div>;

  return (
    <div>
      <Feedback questionAnswers={feedbackQuestionAnswers} />
    </div>
  );
};

export default FeedbackPage;
