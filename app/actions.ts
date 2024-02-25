'use server';

import { createServerClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const logout = async () => {
  const supabase = createServerClient();
  await supabase.auth.signOut();
  return redirect('/login');
};

export const createAnswer = async (formData: FormData) => {
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
    user_id: currentUser.data.user.id,
    answer_text: answerText.toString(),
    answer_choice_id: answerChoiceId?.toString()
  };

  const { error } = await supabase.from('answers').insert(answer);

  if (error) throw new Error(error.message);

  revalidatePath('/');
};

export const updateAnswer = async (formData: FormData) => {
  'use server';
  const answerId = formData.get('answerId');
  console.log('answerId:', answerId);
  const answerChoiceId = formData.get('answerChoiceId');
  console.log('answerChoiceId:', answerChoiceId);
  const answerText = formData.get('answerText');
  console.log('answerText:', answerText);
  const initialAnswerText = formData.get('initialAnswerText');
  console.log('initialAnswerText:', initialAnswerText);
  const initialAnswerChoiceId = formData.get('initialAnswerChoiceId');
  console.log('initialAnswerChoiceId:', initialAnswerChoiceId);

  if (
    initialAnswerText === answerText &&
    initialAnswerChoiceId === (answerChoiceId || '')
  )
    return;

  const supabase = createServerClient();
  const currentUser = await supabase.auth.getUser();

  if (!currentUser.data.user?.id) throw new Error('User is not authenticated');

  if (!answerId || !answerText) throw new Error('Missing Form Data');

  const answerUpdate = {
    answer_text: answerText.toString(),
    answer_choice_id: answerChoiceId?.toString()
  };

  const { error } = await supabase
    .from('answers')
    .update(answerUpdate)
    .eq('id', answerId.toString());

  if (error) throw new Error(error.message);

  revalidatePath('/');
};
