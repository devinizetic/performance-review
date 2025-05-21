'use server';

import EmailService from '@/lib/services/email-service';
import { FormType } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const logout = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect('/login');
};

// TODO: we can also replace isReviewee here with formType like in updateAnswer
export const createAnswer = async (formData: FormData, isReviewee: boolean) => {
  'use server';

  const supabase = await createClient();
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
    .eq('user_review_id', userReviewId.toString())
    .eq('question_id', questionId.toString())
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

  const supabase = await createClient();
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

  const supabase = await createClient();
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

  const supabase = await createClient();
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

  const supabase = await createClient();
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
  await EmailService.sendInitialReviewEmail();

  revalidatePath('/');
};

export const createNewReview = async (formData: FormData) => {
  'use server';

  const supabase = await createClient();
  const currentUser = await supabase.auth.getUser();

  if (!currentUser.data.user?.id) throw new Error('User is not authenticated');

  const name = formData.get('name')?.toString();
  const startDate = formData.get('startDate')?.toString();
  const endDate = formData.get('endDate')?.toString();
  const questionsRaw = formData.get('questions');
  const usersRaw = formData.get('users');

  if (!name || !startDate || !endDate || !questionsRaw || !usersRaw) {
    throw new Error('Todos los campos son requeridos');
  }

  const questions = JSON.parse(questionsRaw.toString()); // [{id, sequence}]
  const users = JSON.parse(usersRaw.toString()); // [userId, ...]

  // 1. Create the review
  const { data: review, error } = await supabase
    .from('reviews')
    .insert({
      name,
      start_date: startDate,
      end_date: endDate,
      is_active: false
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  // 2. Insert review_question records
  for (const q of questions) {
    const { error: rqError } = await supabase.from('review_question').insert({
      review_id: review.id,
      question_id: q.id,
      question_sequence: q.sequence
    });
    if (rqError) throw new Error(rqError.message);
  }

  // 3. Insert user_review records (find reviewer for each reviewee)
  for (const userId of users) {
    // Find reviewer for this reviewee
    const { data: reviewerRow, error: reviewerError } = await supabase
      .from('reviewer_reviewee')
      .select('reviewer_id')
      .eq('reviewee_id', userId)
      .maybeSingle();
    if (reviewerError) throw new Error(reviewerError.message);
    const reviewerId = reviewerRow?.reviewer_id || '';
    const { error: urError } = await supabase.from('user_review').insert({
      review_id: review.id,
      reviewee_id: userId,
      reviewer_id: reviewerId
    });
    if (urError) throw new Error(urError.message);
  }

  revalidatePath('/admin/reviews');
  return review;
};

export const updateReview = async (formData: FormData) => {
  'use server';
  const supabase = await createClient();
  const currentUser = await supabase.auth.getUser();
  if (!currentUser.data.user?.id) throw new Error('User is not authenticated');

  const id = formData.get('id')?.toString();
  const name = formData.get('name')?.toString();
  const startDate = formData.get('startDate')?.toString();
  const endDate = formData.get('endDate')?.toString();
  const questionsRaw = formData.get('questions');
  const usersRaw = formData.get('users');

  if (!id || !name || !startDate || !endDate || !questionsRaw || !usersRaw) {
    throw new Error('Todos los campos son requeridos');
  }

  const questions = JSON.parse(questionsRaw.toString()); // [{id, sequence}]
  const users = JSON.parse(usersRaw.toString()); // [userId, ...]

  // 1. Update the review basic info
  const { error: reviewError } = await supabase
    .from('reviews')
    .update({ name, start_date: startDate, end_date: endDate })
    .eq('id', id);
  if (reviewError) throw new Error(reviewError.message);

  // 2. Review Questions: fetch current, diff, add new, update sequence, remove missing
  const { data: currentQuestions, error: cqError } = await supabase
    .from('review_question')
    .select('review_id, question_id, question_sequence')
    .eq('review_id', id);
  if (cqError) throw new Error(cqError.message);
  // Add or update
  console.log(questions);
  for (const q of questions) {
    const existing = currentQuestions.find((c) => c.question_id === q.id);
    if (existing) {
      // Update sequence if changed
      if (existing.question_sequence !== q.sequence) {
        const { error: upQError } = await supabase
          .from('review_question')
          .update({ question_sequence: q.sequence })
          .eq('review_id', id)
          .eq('question_id', q.id);
        if (upQError) throw new Error(upQError.message);
      }
    } else {
      // Insert new
      const { error: rqError } = await supabase.from('review_question').insert({
        review_id: id,
        question_id: q.id,
        question_sequence: q.sequence
      });
      if (rqError) throw new Error(rqError.message);
    }
  }
  // Remove questions not in new list
  for (const c of currentQuestions) {
    if (!(questions as { id: string }[]).some((q) => q.id === c.question_id)) {
      const { error: delQError } = await supabase
        .from('review_question')
        .delete()
        .eq('review_id', id)
        .eq('question_id', c.question_id);
      if (delQError) throw new Error(delQError.message);
    }
  }

  // 3. User Reviews: fetch current, diff, add new, remove missing
  const { data: currentUserReviews, error: curError } = await supabase
    .from('user_review')
    .select('id, reviewee_id, reviewer_id')
    .eq('review_id', id);
  if (curError) throw new Error(curError.message);
  console.log(currentUserReviews);
  console.log(users);
  for (const userId of users) {
    const existing = currentUserReviews.find((c) => c.reviewee_id === userId);
    if (!existing) {
      // Find reviewer for this reviewee
      const { data: reviewerRow, error: reviewerError } = await supabase
        .from('reviewer_reviewee')
        .select('reviewer_id')
        .eq('reviewee_id', userId)
        .maybeSingle();
      if (reviewerError) throw new Error(reviewerError.message);
      const reviewerId = reviewerRow?.reviewer_id || '';
      const { error: urError } = await supabase.from('user_review').insert({
        review_id: id,
        reviewee_id: userId,
        reviewer_id: reviewerId
      });
      if (urError) throw new Error(urError.message);
    }
  }
  // Remove user_reviews not in new list
  for (const c of currentUserReviews) {
    if (!users.includes(c.reviewee_id)) {
      const { error: delUError } = await supabase
        .from('user_review')
        .delete()
        .eq('id', c.id);
      if (delUError) throw new Error(delUError.message);
    }
  }

  revalidatePath('/admin/reviews');
};

export const setActiveReviewAction = async (reviewId: string) => {
  'use server';
  const supabase = await createClient();
  const currentUser = await supabase.auth.getUser();
  if (!currentUser.data.user?.id) throw new Error('User is not authenticated');

  if (!reviewId) throw new Error('Review ID is required');

  // First, set all other reviews to inactive
  const { error: updateError } = await supabase
    .from('reviews')
    .update({ is_active: false })
    .neq('id', reviewId);

  if (updateError) {
    throw new Error(`Error deactivating other reviews: ${updateError.message}`);
  }

  // Then, activate the selected review
  const { error: activeError } = await supabase
    .from('reviews')
    .update({ is_active: true })
    .eq('id', reviewId);

  if (activeError) {
    throw new Error(`Error activating review: ${activeError.message}`);
  }

  revalidatePath('/admin/reviews');
};
