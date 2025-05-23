import { Answer, AnswersSortedView } from '@/types/supabase.types';
import { createClient } from '@/utils/supabase/server';

const questionAnswersQuery = async (userReviewId: string) => {
  const supabase = await createClient();

  return supabase
    .from('answers_sorted')
    .select(
      `
      *
      `
    )
    .eq('user_review_id', userReviewId);
};

const answersByUserReviewIdQuery = async (userReviewId: string) => {
  const supabase = await createClient();
  return supabase
    .from('answers')
    .select(
      `
      id,
      question_id,
      reviewer_answer_choice_id,
      reviewer_answer_text,
      reviewee_answer_choice_id,
      reviewee_answer_text,
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
  userReviewId
}: {
  userReviewId: string;
}): Promise<AnswersSortedView[]> => {
  const { data, error } = await questionAnswersQuery(userReviewId);

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
