import { Review } from '@/types/supabase.types';
import { createClient } from '@/utils/supabase/server';

const getActiveReviewQuery = async () => {
  const supabase = await createClient();
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

const getAllReviewsQuery = async () => {
  const supabase = await createClient();
  return supabase
    .from('reviews')
    .select(
      `id,
             name,
             created_at,
             start_date,
             end_date,
             is_active`
    )
    .order('created_at', { ascending: false });
};

const getActive = async (): Promise<Review> => {
  const { data, error } = await getActiveReviewQuery();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) throw new Error('There are no active reviews');
  //The library is working weirdly and I don't know how to fix it, typesccript infers an array from this reviewer:reviewer_id(*),
  //But at runtime, it is not, it is a single object like it is supposed to be.
  return data as Review;
};

const getAll = async (): Promise<Review[]> => {
  const { data, error } = await getAllReviewsQuery();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return [] as Review[];
  return data as Review[];
};

const ReviewsRepository = {
  getActive,
  getAll
};

export default ReviewsRepository;
