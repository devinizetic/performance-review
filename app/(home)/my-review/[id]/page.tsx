import UserReviewRepository from '@/lib/repository/user-review-repository';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import UserReview from './components/UserReview';

interface MyReviewProps {
  params: { id: string };
}

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

  return <UserReview activeReview={activeReview} />;
};

export default MyReview;
