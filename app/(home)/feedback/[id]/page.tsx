import UserReviewRepository from '@/lib/repository/user-review-repository';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';

interface FeedbackProps {
  params: { id: string };
}

const Feedback: React.FC<FeedbackProps> = async ({ params: { id } }) => {
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  // const feedbackReview = await UserReviewRepository.getById({
  //   id
  // });

  // if (!activeReview) redirect('my-review');

  // return <UserReview activeReview={activeReview} />;
  return <div></div>;
};

export default Feedback;
