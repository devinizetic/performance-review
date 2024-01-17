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

export type ActiveReview = QueryData<
  ReturnType<typeof getActiveUserReviewByRevieweeIdQuery>
> | null;

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

  return data;
};

const fullReviewQuery = (reviewId: string) => {
  const supabase = createServerClient();
  return supabase
    .from('user_review')
    .select(
      `
*,
review:reviews!inner(questions!inner(*, choices(*), question_hints(*))),
reviewer:reviewer_id(*),
reviewee:reviewee_id(*),
answers(*)
`
    )
    .eq('id', reviewId)
    .eq('review.is_active', true)
    .maybeSingle();
};

export type FullReview = QueryData<ReturnType<typeof fullReviewQuery>> | null;

const getById = async ({ id }: { id: string }): Promise<FullReview> => {
  const { data, error } = await fullReviewQuery(id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const UserReviewRepository = {
  getById,
  getActiveUserReviewByRevieweeId
};

export default UserReviewRepository;
