import UserReviewRepository from '@/lib/repository/user-review-repository';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';
import UserReview from './components/UserReview';
import { FullUserReview } from '@/types/supabase.types';
import { REVIEWEE_ROLE_ID, REVIEWER_ROLE_ID } from '@/constants';
import AnswersRepository from '@/lib/repository/answers-repository';
import { ProgressBar } from '@/app/components/common';

interface MyReviewProps {
  params: { id: string };
}

const processQuestions = (
  activeReview: FullUserReview,
  isReviewee: boolean
) => {
  const currentRole = isReviewee ? REVIEWEE_ROLE_ID : REVIEWER_ROLE_ID;
  activeReview.review.questions = activeReview.review.questions.filter(
    (question) =>
      !question.question.role_id ||
      question.question.role_id.toLowerCase() ===
        currentRole.toLocaleLowerCase()
  );
  activeReview.review.questions.sort(
    (a, b) => a.question_sequence - b.question_sequence
  );

  for (const rQuestion of activeReview.review.questions) {
    if (rQuestion.question.choices && rQuestion.question.choices.length)
      rQuestion.question.choices.sort(
        (a, b) => (a.choice_value || 0) - (b.choice_value || 0)
      );
  }
};

const MyReview: React.FC<MyReviewProps> = async ({ params: { id } }) => {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const feedbackQuestionAnswers =
    await AnswersRepository.getFeedbackQuestionAnswers({
      userReviewId: id
    });

  const activeReview = await UserReviewRepository.getById({
    id
  });

  if (!activeReview) redirect('my-review');

  const isReviewee = session.user.id === activeReview.reviewee_id;

  const isReviewCompleted = isReviewee
    ? activeReview.reviewee_completed_timestamp
    : activeReview.reviewer_completed_timestamp;

  if (isReviewCompleted && !activeReview.feedback_completed_timestamp)
    redirect(`/my-review/${activeReview.id}/complete`);

  processQuestions(activeReview, isReviewee);

  return (
    <div className="flex flex-col h-full w-full gap-4">
      <UserReview
        activeReview={activeReview}
        isReviewee={isReviewee}
        questionAnswers={feedbackQuestionAnswers}
      />
    </div>
  );
};

export default MyReview;
