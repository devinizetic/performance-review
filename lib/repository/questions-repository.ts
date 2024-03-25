import { FullQuestion } from '@/types/supabase.types';
import { createServerClient } from '@/utils/supabase/server';

const getQuestionByIdQuery = (id: string) => {
  const supabase = createServerClient();
  return supabase
    .from('questions')
    .select(
      `
      id,
      question_answer_type,
      question_text,
      role_id,
      question_title,
      question_description,
      choices(id, choice_text, choice_value),
      questionHints:question_hints(id, question_id, hint_text, hint_sequence)
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

const QuestionsRepository = {
  getById
};

export default QuestionsRepository;
