import { createClient } from '@/utils/supabase/server';
import {
    ExternalReview,
    ExternalReviewQuestion,
    ExternalReviewAnswer,
    ExternalReviewAnswerInsert,
    AppUser
} from '@/types/supabase.types';

// Define a custom type for external review with questions and answers
export type ExternalReviewWithQuestionsAndAnswers = ExternalReview & {
    reviewee?: Pick<AppUser, 'id' | 'full_name' | 'username' | 'avatar_url'>;
    questions: (ExternalReviewQuestion & {
        answers?: ExternalReviewAnswer[];
    })[];
};

/**
 * Fetches an external review by token with its questions and answers
 * @param token The unique token for the external review
 * @returns The external review, including questions and answers, or null if not found
 */
export async function getExternalReviewByToken(token: string): Promise<ExternalReviewWithQuestionsAndAnswers | null> {
    const supabase = await createClient();

    // Get the external review
    const { data: externalReview, error: reviewError } = await supabase
        .from('external_reviews')
        .select(`
      *,
      reviewee:reviewee_id(
        id,
        full_name,
        username,
        avatar_url
      )
    `)
        .eq('token', token)
        .single();

    if (reviewError || !externalReview) {
        console.error('Error fetching external review:', reviewError);
        return null;
    }

    // Get the questions for this external review
    const { data: questions, error: questionsError } = await supabase
        .from('external_review_questions')
        .select('*')
        .eq('external_review_id', externalReview.id)
        .order('order', { ascending: true }) as { 
            data: ExternalReviewQuestion[], 
            error: any 
        };

    if (questionsError) {
        console.error('Error fetching external review questions:', questionsError);
        return null;
    }

    // Get any existing answers
    const { data: answers, error: answersError } = await supabase
        .from('external_review_answers')
        .select('*')
        .eq('external_review_id', externalReview.id) as {
            data: ExternalReviewAnswer[],
            error: any
        };

    if (answersError) {
        console.error('Error fetching external review answers:', answersError);
        return null;
    }

    // Associate answers with their questions
    const questionsWithAnswers = questions.map(question => {
        const questionAnswers = answers?.filter(answer => answer.external_review_question_id === question.id) || [];
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
    const answerUpserts: Omit<ExternalReviewAnswerInsert, 'id'>[] = answers.map(({ questionId, answer }) => ({
        external_review_id: externalReviewId,
        external_review_question_id: questionId,
        answer,
        submitted_at: new Date().toISOString(),
    }));

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