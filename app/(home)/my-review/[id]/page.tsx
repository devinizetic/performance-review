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

const removeRoleQuestions = (
  activeReview: FullUserReview,
  isReviewee: boolean
) => {
  const currentRole = isReviewee ? REVIEWEE_ROLE_ID : REVIEWER_ROLE_ID;
  activeReview.review.questions = activeReview.review.questions.filter(
    (question) =>
      !question.role_id ||
      question.role_id.toLowerCase() === currentRole.toLocaleLowerCase()
  );
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
  removeRoleQuestions(activeReview, isReviewee);
  return (
    <div className="flex flex-col h-full w-full">
      <UserReview activeReview={activeReview} isReviewee={isReviewee} />
    </div>
  );
};

export default MyReview;
