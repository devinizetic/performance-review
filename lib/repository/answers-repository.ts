import { Answer, FeedbackQuestionAnswer } from '@/types/supabase.types';
import { createServerClient } from '@/utils/supabase/server';

const questionAnswersQuery = (
  userReviewId: string,
  reviewerId: string,
  revieweeId: string
) => {
  const supabase = createServerClient();

  return supabase.rpc('get_feedback_question_answers', {
    reviewee_id: revieweeId,
    reviewer_id: reviewerId,
    user_review_id: userReviewId
  });
};

const answersByUserReviewIdQuery = (userReviewId: string) => {
  const supabase = createServerClient();
  return supabase
    .from('answers')
    .select(
      `
      id,
      user_id,
      question_id,
      answer_choice_id,
      answer_text,
      feedback_text,
      feedback_choice_id,
      user_review_id
      `
    )
    .eq('user_review_id', userReviewId);
};

const getByUserReviewId = async ({
  userReviewId
}: {
  userReviewId: string;
}): Promise<Answer[]> => {
  const { data, error } = await answersByUserReviewIdQuery(userReviewId);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) throw new Error('Answers not found');

  return data as Answer[];
};

const getFeedbackQuestionAnswers = async ({
  userReviewId,
  reviewerId,
  revieweeId
}: {
  userReviewId: string;
  reviewerId: string;
  revieweeId: string;
}): Promise<FeedbackQuestionAnswer> => {
  const { data, error } = await questionAnswersQuery(
    userReviewId,
    reviewerId,
    revieweeId
  );

  if (error) {
    throw new Error(error.message);
  }

  if (!data) throw new Error('Answers not found');

  return data;
};

const AnswersRepository = {
  getByUserReviewId,
  getFeedbackQuestionAnswers
};

export default AnswersRepository;
