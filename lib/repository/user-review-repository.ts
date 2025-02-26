import {
  ActiveReview,
  FeedbackScore,
  FullUserReview,
  SimpleUserReview
} from '@/types/supabase.types';
import { createClient } from '@/utils/supabase/server';

const getActiveUserReviewByRevieweeIdQuery = async (revieweeId: string) => {
  const supabase = await createClient();
  return supabase
    .from('user_review')
    .select('id, review:reviews!inner(is_active)')
    .eq('reviewee_id', revieweeId)
    .eq('review.is_active', true)
    .maybeSingle();
};

const getActiveUserReviewByRevieweeId = async ({
  revieweeId
}: {
  revieweeId: string;
}): Promise<ActiveReview> => {
  const { data, error } = await getActiveUserReviewByRevieweeIdQuery(
    revieweeId
  );

  if (error) {
    throw new Error(error.message);
  }

  return { id: data?.id };
};

const fullReviewQuery = async (reviewId: string) => {
  const supabase = await createClient();
  return supabase
    .from('user_review')
    .select(
      `
      *,
      review:reviews!inner(questions:review_question(question_sequence, question:questions!inner(*, choices(*), questionHints:question_hints(*)))),
      reviewer:reviewer_id(*),
      reviewee:reviewee_id(*),
      answers(*)
      `
    )
    .eq('id', reviewId)
    .eq('review.is_active', true)
    .maybeSingle();
};

const getFullReviewQuery = async ({
  revieweeId
}: {
  revieweeId: string;
}): Promise<any> => {
  const { data, error } = await fullReviewQuery(revieweeId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getById = async ({ id }: { id: string }): Promise<FullUserReview> => {
  const { data, error } = await fullReviewQuery(id);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) throw new Error('Review not found');
  //How to explain this? This is a type assertion.
  //It's like telling TypeScript that you know what you're doing (do you?) and that you're sure that the data is of type FullUserReview.
  //The library is working weirdly and I don't know how to fix it, typesccript infers an array from this reviewer:reviewer_id(*),
  //But at runtime, it is not, it is a single object like it is supposed to be.
  return data as unknown as FullUserReview;
};

const getAllCurrentReviewsQuery = async () => {
  const supabase = await createClient();
  return supabase.from('user_review').select(
    `
    id,
    reviewer:reviewer_id(*),
    reviewee:reviewee_id(*),
    reviewee_completed_timestamp,
    reviewee_started_timestamp,
    reviewer_completed_timestamp,
    reviewer_started_timestamp,
    feedback_completed_timestamp
    `
  );
};

const getAllCurrentReviews = async (): Promise<SimpleUserReview[]> => {
  const { data, error } = await getAllCurrentReviewsQuery();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) throw new Error('There are no active reviews');
  //How to explain this? This is a type assertion.
  //It's like telling TypeScript that you know what you're doing (do you?) and that you're sure that the data is of type FullUserReview.
  //The library is working weirdly and I don't know how to fix it, typesccript infers an array from this reviewer:reviewer_id(*),
  //But at runtime, it is not, it is a single object like it is supposed to be.
  return data as unknown as SimpleUserReview[];
};

const getFeedbackResultsQuery = async () => {
  const supabase = await createClient();
  return supabase.from('feedback_scores').select(
    `
    id,
    reviewer_name,
    reviewee_name,
    score
    `
  );
};

const getFeedbackResults = async (): Promise<FeedbackScore[]> => {
  const { data, error } = await getFeedbackResultsQuery();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) throw new Error('There are no active reviews');

  return data as FeedbackScore[];
};

const UserReviewRepository = {
  getById,
  getFullReviewQuery,
  getActiveUserReviewByRevieweeId,
  getAllCurrentReviews,
  getFeedbackResults
};

export default UserReviewRepository;
