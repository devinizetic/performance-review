import { createClient } from '@/utils/supabase/server';
import {
  ExternalReview,
  ExternalReviewQuestion,
  ExternalReviewAnswer,
  ExternalReviewAnswerInsert,
  ExternalReviewUpdate,
  AppUser
} from '@/types/supabase.types';

// Define a custom type for external review with questions and answers
export type ExternalReviewWithQuestionsAndAnswers = ExternalReview & {
  reviewee?: Pick<AppUser, 'id' | 'full_name' | 'username' | 'avatar_url'>;
  questions: (ExternalReviewQuestion & {
    answers?: ExternalReviewAnswer[];
  })[];
};

// Define a type for external review list items
export type ExternalReviewListItem = ExternalReview & {
  reviewee: Pick<AppUser, 'id' | 'full_name' | 'username' | 'avatar_url'>;
};

/**
 * Gets user information by ID
 * @param userId The ID of the user to fetch
 * @returns User information or null if not found
 */
export async function getUserById(
  userId: string
): Promise<Pick<
  AppUser,
  'id' | 'full_name' | 'username' | 'avatar_url'
> | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('app_users')
    .select('id, full_name, username, avatar_url')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}

/**
 * Fetches an external review by token with its questions and answers
 * @param token The unique token for the external review
 * @returns The external review, including questions and answers, or null if not found
 */
export async function getExternalReviewByToken(
  token: string
): Promise<ExternalReviewWithQuestionsAndAnswers | null> {
  const supabase = await createClient();

  // Get the external review
  const { data: externalReview, error: reviewError } = await supabase
    .from('external_reviews')
    .select(
      `
      *,
      reviewee:reviewee_id(
        id,
        full_name,
        username,
        avatar_url
      )
    `
    )
    .eq('token', token)
    .single();

  if (reviewError || !externalReview) {
    console.error('Error fetching external review:', reviewError);
    return null;
  }

  // Get the questions for this external review
  const { data: questions, error: questionsError } = (await supabase
    .from('external_review_questions')
    .select('*')
    .eq('external_review_id', externalReview.id)
    .order('order', { ascending: true })) as {
    data: ExternalReviewQuestion[];
    error: any;
  };

  if (questionsError) {
    console.error('Error fetching external review questions:', questionsError);
    return null;
  }

  // Get any existing answers
  const { data: answers, error: answersError } = (await supabase
    .from('external_review_answers')
    .select('*')
    .eq('external_review_id', externalReview.id)) as {
    data: ExternalReviewAnswer[];
    error: any;
  };

  if (answersError) {
    console.error('Error fetching external review answers:', answersError);
    return null;
  }

  // Associate answers with their questions
  const questionsWithAnswers = questions.map((question) => {
    const questionAnswers =
      answers?.filter(
        (answer) => answer.external_review_question_id === question.id
      ) || [];
    return {
      ...question,
      answers: questionAnswers
    };
  });

  // Return the complete external review with questions and answers
  return {
    ...externalReview,
    questions: questionsWithAnswers
  } as ExternalReviewWithQuestionsAndAnswers;
}

/**
 * Fetches an external review by ID with its questions and answers
 * @param id The ID of the external review
 * @returns The external review, including questions and answers, or null if not found
 */
export async function getExternalReviewById(
  id: string
): Promise<ExternalReviewWithQuestionsAndAnswers | null> {
  const supabase = await createClient();

  // Get the external review
  const { data: externalReview, error: reviewError } = await supabase
    .from('external_reviews')
    .select(
      `
      *,
      reviewee:reviewee_id(
        id,
        full_name,
        username,
        avatar_url
      )
    `
    )
    .eq('id', id)
    .single();

  if (reviewError || !externalReview) {
    console.error('Error fetching external review:', reviewError);
    return null;
  }

  // Get the questions for this external review
  const { data: questions, error: questionsError } = (await supabase
    .from('external_review_questions')
    .select('*')
    .eq('external_review_id', externalReview.id)
    .order('order', { ascending: true })) as {
    data: ExternalReviewQuestion[];
    error: any;
  };

  if (questionsError) {
    console.error('Error fetching external review questions:', questionsError);
    return null;
  }

  // Get any existing answers
  const { data: answers, error: answersError } = (await supabase
    .from('external_review_answers')
    .select('*')
    .eq('external_review_id', externalReview.id)) as {
    data: ExternalReviewAnswer[];
    error: any;
  };

  if (answersError) {
    console.error('Error fetching external review answers:', answersError);
    return null;
  }

  // Associate answers with their questions
  const questionsWithAnswers = questions.map((question) => {
    const questionAnswers =
      answers?.filter(
        (answer) => answer.external_review_question_id === question.id
      ) || [];
    return {
      ...question,
      answers: questionAnswers
    };
  });

  // Return the complete external review with questions and answers
  return {
    ...externalReview,
    questions: questionsWithAnswers
  } as ExternalReviewWithQuestionsAndAnswers;
}

/**
 * Submits answers for an external review
 * @param externalReviewId The ID of the external review
 * @param answers Array of answers to submit
 * @returns Boolean indicating success or failure
 */
export async function submitExternalReviewAnswers(
  externalReviewId: string,
  answers: {
    questionId: string;
    answer: string;
  }[]
): Promise<boolean> {
  const supabase = await createClient();

  // Start a transaction by using upsert to handle both new answers and updates to existing ones
  const answerUpserts: Omit<ExternalReviewAnswerInsert, 'id'>[] = answers.map(
    ({ questionId, answer }) => ({
      external_review_id: externalReviewId,
      external_review_question_id: questionId,
      answer,
      submitted_at: new Date().toISOString()
    })
  );

  const { error: answersError } = await supabase
    .from('external_review_answers')
    .upsert(answerUpserts);

  if (answersError) {
    console.error('Error submitting external review answers:', answersError);
    return false;
  }

  // Update the external review status to completed
  const { error: updateError } = await supabase
    .from('external_reviews')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString()
    })
    .eq('id', externalReviewId);

  if (updateError) {
    console.error('Error updating external review status:', updateError);
    return false;
  }

  return true;
}

/**
 * Updates an external review
 * @param reviewId The ID of the external review to update
 * @param updates The updates to apply to the external review
 * @returns The updated external review or null if failed
 */
export async function updateExternalReview(
  reviewId: string,
  updates: Partial<ExternalReviewUpdate>
): Promise<ExternalReview | null> {
  const supabase = await createClient();

  const { data: updatedReview, error: updateError } = await supabase
    .from('external_reviews')
    .update(updates)
    .eq('id', reviewId)
    .select()
    .single();

  if (updateError) {
    console.error('Error updating external review:', updateError);
    return null;
  }

  return updatedReview;
}

/**
 * Gets all external reviews for a specific review
 * @param reviewId The ID of the review to fetch external reviews for
 * @returns List of external reviews with reviewee information
 */
export async function getExternalReviewsByReviewId(
  reviewId: string
): Promise<ExternalReviewListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('external_reviews')
    .select(
      `
            *,
            reviewee:reviewee_id(
                id,
                full_name,
                username,
                avatar_url
            )
        `
    )
    .eq('review_id', reviewId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching external reviews:', error);
    return [];
  }

  return data as ExternalReviewListItem[];
}

/**
 * Gets all external reviews for the active review
 * @returns List of external reviews with reviewee information
 */
export async function getExternalReviewsForActiveReview(): Promise<
  ExternalReviewListItem[]
> {
  const supabase = await createClient();

  // First, get the active review ID
  const { data: activeReview, error: reviewError } = await supabase
    .from('reviews')
    .select('id')
    .eq('is_active', true)
    .single();

  if (reviewError || !activeReview) {
    console.error('Error fetching active review:', reviewError);
    return [];
  }

  return getExternalReviewsByReviewId(activeReview.id);
}

/**
 * Creates a new external review
 * @param revieweeId The ID of the user being reviewed
 * @param reviewId The ID of the review (defaults to active review if not provided)
 * @param reviewerName The name of the external reviewer
 * @param companyName The name of the company
 * @param language The language for the review
 * @returns The created external review or null if failed
 */
export async function createExternalReview(
  revieweeId: string,
  reviewId?: string,
  reviewerName?: string,
  companyName?: string,
  language: 'english' | 'spanish' = 'english'
): Promise<ExternalReview | null> {
  const supabase = await createClient();

  // If no reviewId provided, get the active review
  if (!reviewId) {
    const { data: activeReview, error: reviewError } = await supabase
      .from('reviews')
      .select('id')
      .eq('is_active', true)
      .single();

    if (reviewError || !activeReview) {
      console.error('Error fetching active review:', reviewError);
      return null;
    }

    reviewId = activeReview.id;
  }

  // Create a new external review
  const { data: newExternalReview, error: createError } = await supabase
    .from('external_reviews')
    .insert({
      review_id: reviewId,
      reviewee_id: revieweeId,
      reviewer_name: reviewerName,
      company_name: companyName,
      language: language,
      status: 'pending'
    })
    .select()
    .single();

  if (createError) {
    console.error('Error creating external review:', createError);
    return null;
  }

  return newExternalReview;
}

/**
 * Creates default questions for a new external review
 * @param externalReviewId The ID of the external review to create questions for
 * @param language The language for the questions
 * @param revieweeName The name of the person being reviewed (optional, defaults to "esta persona"/"this person")
 * @returns Boolean indicating success or failure
 */
export async function createDefaultExternalReviewQuestions(
  externalReviewId: string,
  language: 'english' | 'spanish' = 'english',
  revieweeName?: string
): Promise<boolean> {
  const supabase = await createClient();
  // Create some default questions
  let defaultQuestions;

  // Use reviewee name if provided, otherwise use generic terms
  const personReference =
    revieweeName || (language === 'spanish' ? 'esta persona' : 'this person');
  const possessiveReference = revieweeName
    ? `${revieweeName}`
    : language === 'spanish'
    ? 'esta persona'
    : 'this person';

  if (language === 'spanish') {
    defaultQuestions = [
      {
        external_review_id: externalReviewId,
        text: `¿Qué habilidades, actitudes o fortalezas personales destacarías de ${personReference} durante este periodo?`,
        type: 'text',
        options: null,
        order: 1
      },
      {
        external_review_id: externalReviewId,

        text: `¿Qué logros destacados y éxitos tuvo ${personReference} durante este periodo?`,
        type: 'text',
        options: null,
        order: 2
      },
      {
        external_review_id: externalReviewId,
        text: `¿En qué áreas tuvo más dificultades ${personReference} durante este periodo? ¿Qué cosas podrían haberse manejado mejor y qué sugerirías hacer distinto en el futuro?`,
        type: 'text',
        options: null,
        order: 3
      },
      {
        external_review_id: externalReviewId,
        text: `¿Cómo evaluarías el desempeño general de ${personReference} durante este periodo?`,
        type: 'multiple_choice',
        options: JSON.stringify([
          'Excelente',
          'Muy bueno',
          'Aceptable',
          'Mejorable',
          'Insatisfactorio'
        ]),
        order: 4
      }
    ];
  } else {
    defaultQuestions = [
      {
        external_review_id: externalReviewId,
        text: `What personal strengths, skills, or attitudes would you highlight in ${personReference} during this period?`,
        type: 'text',
        options: null,
        order: 1
      },
      {
        external_review_id: externalReviewId,
        text: `What would you say were ${personReference} key achievements or highlights over this period?`,
        type: 'text',
        options: null,
        order: 2
      },
      {
        external_review_id: externalReviewId,
        text: `What were some of the areas where ${personReference} faced more challenges during this period? What could have gone better, and what would you suggest doing differently moving forward?`,
        type: 'text',
        options: null,
        order: 3
      },
      {
        external_review_id: externalReviewId,
        text: `How would you rate ${personReference}’s overall performance during this period?`,
        type: 'multiple_choice',
        options: JSON.stringify([
          'Excellent',
          'Very good',
          'Satisfactory',
          'Needs improvement',
          'Unsatisfactory'
        ]),
        order: 4
      }
    ];
  }
  const { error } = await supabase
    .from('external_review_questions')
    .insert(defaultQuestions);
  if (error) {
    console.error('Error creating default questions:', error);
    return false;
  }
  return true;
}
