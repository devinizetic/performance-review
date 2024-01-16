import type { Tables } from '@/types/supabase';
import { createServerClient } from '@/utils/supabase/server';

export class UserReviewRepository {
  async getCurrentByRevieweeId(
    revieweeId: string
  ): Promise<typeof data | null> {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('user_review')
      .select(
        `
        *,
        review:reviews!inner(questions!inner(*, choices!inner(*), question_hints!inner(*))),
        reviewer:reviewer_id(*),
        reviewee:reviewee_id(*),
        answers(*)
        `
      )
      .eq('reviewee_id', revieweeId)
      .eq('review.is_active', true)
      .maybeSingle();
    if (error) {
      throw new Error(error.message);
    }
    console.log(data);
    return data || null;
  }
}
