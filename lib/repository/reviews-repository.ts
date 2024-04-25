import { Review } from '@/types/supabase.types';
import { createServerClient } from '@/utils/supabase/server';

const getActiveReviewQuery = () => {
  const supabase = createServerClient();
  return supabase
    .from('reviews')
    .select(
      `id,
             created_at,
             start_date,
             end_date,
             is_active`
    )
    .eq('is_active', true)
    .maybeSingle();
};

const getActive = async (): Promise<Review> => {
  const { data, error } = await getActiveReviewQuery();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) throw new Error('There are no active reviews');
  //How to explain this? This is a type assertion.
  //It's like telling TypeScript that you know what you're doing (do you?) and that you're sure that the data is of type FullUserReview.
  //The library is working weirdly and I don't know how to fix it, typesccript infers an array from this reviewer:reviewer_id(*),
  //But at runtime, it is not, it is a single object like it is supposed to be.
  return data as Review;
};

const ReviewsRepository = {
  getActive
};

export default ReviewsRepository;
