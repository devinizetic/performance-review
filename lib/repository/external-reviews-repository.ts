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

// Define a type for external review list items
export type ExternalReviewListItem = ExternalReview & {
    reviewee: Pick<AppUser, 'id' | 'full_name' | 'username' | 'avatar_url'>;
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

/**
 * Gets all external reviews for a specific review
 * @param reviewId The ID of the review to fetch external reviews for
 * @returns List of external reviews with reviewee information
 */
export async function getExternalReviewsByReviewId(reviewId: string): Promise<ExternalReviewListItem[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
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
export async function getExternalReviewsForActiveReview(): Promise<ExternalReviewListItem[]> {
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
 * @returns The created external review or null if failed
 */
export async function createExternalReview(
    revieweeId: string, 
    reviewId?: string,
    reviewerName?: string
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
 * @returns Boolean indicating success or failure
 */
export async function createDefaultExternalReviewQuestions(
    externalReviewId: string
): Promise<boolean> {
    const supabase = await createClient();
    
    // Create some default questions
    const defaultQuestions = [
        {
            external_review_id: externalReviewId,
            text: '¿Cómo evaluarías el rendimiento general de esta persona?',
            type: 'rating',
            options: JSON.stringify({ min: 1, max: 5, labels: ['Malo', 'Regular', 'Bueno', 'Muy Bueno', 'Excelente'] }),
            order: 1
        },
        {
            external_review_id: externalReviewId,
            text: '¿Cuáles crees que son las fortalezas principales de esta persona?',
            type: 'text',
            options: null,
            order: 2
        },
        {
            external_review_id: externalReviewId,
            text: '¿En qué áreas crees que esta persona podría mejorar?',
            type: 'text',
            options: null,
            order: 3
        },
        {
            external_review_id: externalReviewId,
            text: '¿Recomendarías trabajar con esta persona nuevamente?',
            type: 'multiple_choice',
            options: JSON.stringify(['Definitivamente sí', 'Probablemente sí', 'No estoy seguro', 'Probablemente no', 'Definitivamente no']),
            order: 4
        }
    ];
    
    const { error } = await supabase
        .from('external_review_questions')
        .insert(defaultQuestions);
    
    if (error) {
        console.error('Error creating default questions:', error);
        return false;
    }
    
    return true;
}