import {
  ActiveReview,
  FullReview,
  FullUserReview
} from '@/types/supabase.types';
import { createServerClient } from '@/utils/supabase/server';
import { QueryData, SupabaseClient } from '@supabase/supabase-js';

const getActiveUserReviewByRevieweeIdQuery = (revieweeId: string) => {
  const supabase = createServerClient();
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

const fullReviewQuery = (reviewId: string) => {
  const supabase = createServerClient();
  return supabase
    .from('user_review')
    .select(
      `
*,
review:reviews!inner(questions!inner(*, choices(*), questionHints:question_hints(*))),
reviewer:reviewer_id(*),
reviewee:reviewee_id(*),
answers(*)
`
    )
    .eq('id', reviewId)
    .eq('review.is_active', true)
    .maybeSingle();
};

const getById = async ({ id }: { id: string }): Promise<FullUserReview> => {
  const { data, error } = await fullReviewQuery(id);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) throw new Error('Review not found');

  return data as FullUserReview;
};

const UserReviewRepository = {
  getById,
  getActiveUserReviewByRevieweeId
};

export default UserReviewRepository;
