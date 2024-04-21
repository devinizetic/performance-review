'use server';

import { createServerClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const logout = async () => {
  const supabase = createServerClient();
  await supabase.auth.signOut();
  return redirect('/login');
};

export const createAnswer = async (formData: FormData, isReviewee: boolean) => {
  'use server';

  const supabase = createServerClient();
  const currentUser = await supabase.auth.getUser();

  if (!currentUser.data.user?.id) throw new Error('User is not authenticated');

  const questionId = formData.get('questionId');
  const userReviewId = formData.get('userReviewId');
  const answerText = formData.get('answerText');
  const answerChoiceId = formData.get('answerChoiceId');

  if (!questionId || !userReviewId || !answerText)
    throw new Error('Missing Form Data');

  const answer = {
    question_id: questionId.toString(),
    user_review_id: userReviewId.toString(),
    reviewer_answer_text: isReviewee ? null : answerText.toString(),
    reviewer_answer_choice_id: isReviewee ? null : answerChoiceId?.toString(),
    reviewee_answer_text: !isReviewee ? null : answerText.toString(),
    reviewee_answer_choice_id: !isReviewee ? null : answerChoiceId?.toString()
  };

  const { error } = await supabase.from('answers').insert(answer);

  if (error) throw new Error(error.message);

  revalidatePath('/');
};

export const updateAnswer = async (formData: FormData, isReviewee: boolean) => {
  'use server';
  const answerId = formData.get('answerId');
  const answerChoiceId = formData.get('answerChoiceId');
  const answerText = formData.get('answerText');
  const initialAnswerText = formData.get('initialAnswerText');
  const initialAnswerChoiceId = formData.get('initialAnswerChoiceId');
  if (
    initialAnswerText === answerText &&
    initialAnswerChoiceId === (answerChoiceId || '')
  )
    return;

  const supabase = createServerClient();
  const currentUser = await supabase.auth.getUser();

  if (!currentUser.data.user?.id) throw new Error('User is not authenticated');

  if (!answerId || !answerText) throw new Error('Missing Form Data');

  const answerUpdate = isReviewee
    ? {
        reviewee_answer_text: answerText.toString(),
        reviewee_answer_choice_id: answerChoiceId?.toString()
      }
    : {
        reviewer_answer_text: answerText.toString(),
        reviewer_answer_choice_id: answerChoiceId?.toString()
      };

  const { error } = await supabase
    .from('answers')
    .update(answerUpdate)
    .eq('id', answerId.toString());

  if (error) throw new Error(error.message);

  revalidatePath('/');
};

export const setPerformanceReviewStarted = async (
  userReviewId: string,
  isReviewee: boolean
) => {
  'use server';

  const supabase = createServerClient();
  const currentUser = await supabase.auth.getUser();

  if (!currentUser.data.user?.id) throw new Error('User is not authenticated');

  if (!userReviewId) throw new Error('Esta evaluación no existe');

  const timestamp = new Date().toISOString();
  const reviewUpdate = isReviewee
    ? {
        reviewee_started_timestamp: timestamp
      }
    : {
        reviewer_started_timestamp: timestamp
      };

  const { error } = await supabase
    .from('user_review')
    .update(reviewUpdate)
    .eq('id', userReviewId.toString());

  if (error) throw new Error(error.message);

  revalidatePath('/');
};

export const setPerformanceReviewCompleted = async (
  userReviewId: string,
  isReviewee: boolean
) => {
  'use server';

  const supabase = createServerClient();
  const currentUser = await supabase.auth.getUser();

  if (!currentUser.data.user?.id) throw new Error('User is not authenticated');

  if (!userReviewId) throw new Error('Esta evaluación no existe');

  const timestamp = new Date().toISOString();
  const reviewUpdate = isReviewee
    ? {
        reviewee_completed_timestamp: timestamp
      }
    : {
        reviewer_completed_timestamp: timestamp
      };

  const { error } = await supabase
    .from('user_review')
    .update(reviewUpdate)
    .eq('id', userReviewId.toString());

  if (error) throw new Error(error.message);

  revalidatePath('/');
};
