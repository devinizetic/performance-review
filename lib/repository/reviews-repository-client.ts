import { Review } from '@/types/supabase.types';
import { createClient } from '@/utils/supabase/client';

const getActiveReviewQuery = async () => {
  const supabase = createClient();
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
  const supabase = createClient();
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

const createReview = async (
  name: string,
  startDate: string,
  endDate: string
): Promise<Review> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      name,
      start_date: startDate,
      end_date: endDate,
      is_active: false
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Review;
};

const getById = async ({ id }: { id: string }): Promise<Review> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('id, name, created_at, start_date, end_date, is_active')
    .eq('id', id)
    .single();
  if (error) throw new Error(error.message);
  if (!data) throw new Error('Review not found');
  return data as Review;
};

const ReviewsRepositoryClient = {
  getActive,
  getAll,
  createReview,
  getById
};

export default ReviewsRepositoryClient;
