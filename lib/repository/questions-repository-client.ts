import { FullQuestion } from '@/types/supabase.types';
import { createClient } from '@/utils/supabase/client';

const getQuestionByIdQuery = (id: string) => {
  const supabase = createClient();
  return supabase
    .from('questions')
    .select(
      `
      id,
      question_answer_type,
      question_text_reviewer,
      question_text_reviewee,
      role_id,
      question_title,
      question_description,
      choices(id, choice_text_reviewer, choice_text_reviewee, choice_value),
      questionHints:question_hints(id, question_id, hint_text_reviewer, hint_text_reviewee, hint_sequence)
      `
    )
    .eq('id', id)
    .single();
};

const getById = async ({ id }: { id: string }): Promise<FullQuestion> => {
  const { data, error } = await getQuestionByIdQuery(id);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) throw new Error('Question not found');

  return data as FullQuestion;
};

const QuestionsRepositoryClient = {
  getQuestionByIdQuery,
  getById
};

export default QuestionsRepositoryClient;
