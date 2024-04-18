import UserReviewRepository from '@/lib/repository/user-review-repository';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import UserReview from './components/UserReview';
import { ActiveReviewProvider } from './context/ActiveReviewContext';
import { FullUserReview } from '@/types/supabase.types';
import { REVIEWEE_ROLE_ID, REVIEWER_ROLE_ID } from '@/constants';

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
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const activeReview = await UserReviewRepository.getById({
    id
  });

  if (!activeReview) redirect('my-review');
  const isReviewee = session.user.id === activeReview.reviewee_id;
  processQuestions(activeReview, isReviewee);
  return (
    <div className="flex flex-col h-full w-full">
      <UserReview activeReview={activeReview} isReviewee={isReviewee} />
    </div>
  );
};

export default MyReview;
