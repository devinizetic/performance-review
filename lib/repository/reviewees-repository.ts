import { ReviewerRevieweeView } from '@/types/supabase.types';
import { createClient } from '@/utils/supabase/server';

const revieweesQuery = async (reviewerId: string) => {
  const supabase = await createClient();
  return supabase
    .from('reviewerreviewee')
    .select(
      `
      *
      `
    )
    .eq('reviewer_id', reviewerId);
};

const getAllByReviewerId = async ({
  id
}: {
  id: string;
}): Promise<ReviewerRevieweeView[]> => {
  const { data, error } = await revieweesQuery(id);
  if (error) {
    throw new Error(error.message);
  }

  if (!data) return [] as ReviewerRevieweeView[];

  return data as ReviewerRevieweeView[];
};

const RevieweesRepository = {
  getAllByReviewerId
};

export default RevieweesRepository;
