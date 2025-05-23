import AnswersRepository from '@/lib/repository/answers-repository';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';
import Feedback from './components/Feedback';

interface FeedbackPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ readonly: boolean }>;
}

const FeedbackPage: React.FC<FeedbackPageProps> = async ({
  params,
  searchParams
}) => {
  const { readonly } = await searchParams;
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const feedbackQuestionAnswers =
    await AnswersRepository.getFeedbackQuestionAnswers({
      userReviewId: id
    });

  if (!feedbackQuestionAnswers || !feedbackQuestionAnswers.length)
    return <div>El Feedback de esta evaluación todavia no esta listo</div>;

  return (
    <div className="flex flex-col h-full w-full">
      <Feedback
        questionAnswers={feedbackQuestionAnswers}
        userReviewId={id}
        readonly={readonly}
      />
    </div>
  );
};

export default FeedbackPage;
