'use server';

import { sendEmail } from '@/lib/services/amazon-ses-service';
import EmailService from '@/lib/services/email-service';
import { FormType } from '@/types';
import { createServerClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const logout = async () => {
  const supabase = createServerClient();
  await supabase.auth.signOut();
  return redirect('/login');
};

// TODO: we can also replace isReviewee here with formType like in updateAnswer
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

  const { data: existingAnswer, error: existingAnswerError } = await supabase
    .from('answers')
    .select(
      `
    id
    `
    )
    .eq('user_review_id', userReviewId)
    .eq('question_id', questionId)
    .maybeSingle();

  if (existingAnswer != null) {
    const type = isReviewee ? FormType.REVIEWEE : FormType.REVIEWER;
    formData.set('answerId', existingAnswer.id);
    await updateAnswer(formData, type);
    return;
  }

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

export const updateAnswer = async (formData: FormData, formType: FormType) => {
  'use server';
  let answerId = formData.get('answerId');
  let answerChoiceId = formData.get('answerChoiceId');
  let answerText = formData.get('answerText');
  let initialAnswerText = formData.get('initialAnswerText');
  let initialAnswerChoiceId = formData.get('initialAnswerChoiceId');

  if (
    initialAnswerText === answerText &&
    initialAnswerChoiceId === (answerChoiceId || '')
  )
    return;

  const supabase = createServerClient();
  const currentUser = await supabase.auth.getUser();
  if (!currentUser.data.user?.id) throw new Error('User is not authenticated');

  const isReviewee = formType === 'reviewee';
  const isReviewer = formType === 'reviewer';
  const isFeedback = formType === 'feedback';

  if (isFeedback && !answerText) answerText = '';

  if (!answerId || answerText === undefined || answerText === null)
    throw new Error('Missing Form Data');

  const answerUpdate = isReviewee
    ? {
        reviewee_answer_text: answerText.toString(),
        reviewee_answer_choice_id: answerChoiceId?.toString()
      }
    : isReviewer
    ? {
        reviewer_answer_text: answerText.toString(),
        reviewer_answer_choice_id: answerChoiceId?.toString()
      }
    : {
        feedback_text: answerText.toString(),
        feedback_choice_id: answerChoiceId?.toString()
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
  reviewerId: string,
  revieweeId: string,
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
  if (isReviewee)
    await EmailService.sendCompleteReviewRevieweeEmail({ revieweeId });
  else
    await EmailService.sendCompleteReviewReviewerEmail({
      revieweeId,
      reviewerId
    });

  revalidatePath('/');
};

export const startActiveReview = async (reviewId: string) => {
  'use server';

  const supabase = createServerClient();
  const currentUser = await supabase.auth.getUser();

  if (!currentUser.data.user?.id) throw new Error('User is not authenticated');

  if (!reviewId) throw new Error('Esta evaluación no existe');

  const { data, error: reviewerError } = await supabase
    .from('reviewer_reviewee')
    .select('reviewer_id, reviewee_id');

  if (reviewerError) throw new Error(reviewerError.message);

  for (const reviewReviewee of data) {
    const { data, error: existError } = await supabase
      .from('user_review')
      .select('id')
      .eq('reviewee_id', reviewReviewee.reviewee_id)
      .eq('reviewer_id', reviewReviewee.reviewer_id)
      .eq('review_id', reviewId)
      .maybeSingle();

    if (existError) throw new Error(existError.message);

    if (data && data.id) continue; //user_review already exists for this reviewee and reviewer

    const userReview = {
      review_id: reviewId,
      reviewer_id: reviewReviewee.reviewer_id,
      reviewee_id: reviewReviewee.reviewee_id
    };

    const { error: insertError } = await supabase
      .from('user_review')
      .insert(userReview);

    if (insertError) throw new Error(insertError.message);
  }

  const timestamp = new Date().toISOString();
  const reviewUpdate = {
    start_date: timestamp
  };
  const { error } = await supabase
    .from('reviews')
    .update(reviewUpdate)
    .eq('id', reviewId);

  if (error) throw new Error(error.message);

  //send start email to all users
  EmailService.sendInitialReviewEmail();

  revalidatePath('/');
};

export const setFeedbackCompleted = async (userReviewId: string) => {
  'use server';

  const supabase = createServerClient();
  const currentUser = await supabase.auth.getUser();

  if (!currentUser.data.user?.id) throw new Error('User is not authenticated');

  if (!userReviewId) throw new Error('Esta evaluación no existe');

  const timestamp = new Date().toISOString();
  const feedbackUpdate = {
    feedback_completed_timestamp: timestamp
  };
  const { error } = await supabase
    .from('user_review')
    .update(feedbackUpdate)
    .eq('id', userReviewId.toString());

  if (error) throw new Error(error.message);

  revalidatePath('/');
};
