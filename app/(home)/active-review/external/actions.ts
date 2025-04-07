'use server';

import { 
  createExternalReview,
  createDefaultExternalReviewQuestions,
  getExternalReviewsForActiveReview
} from '@/lib/repository/external-reviews-repository';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Schema for validating new external review creation
const CreateExternalReviewSchema = z.object({
  revieweeId: z.string().uuid(),
  reviewerName: z.string().min(1, 'El nombre del evaluador es requerido'),
});

export type CreateExternalReviewInput = z.infer<typeof CreateExternalReviewSchema>;

/**
 * Server action to create a new external review
 * @param input Form values for external review creation
 * @returns Object indicating success/failure and any error message or the created review ID
 */
export async function createNewExternalReview(input: CreateExternalReviewInput) {
  try {
    // Validate input
    const validatedInput = CreateExternalReviewSchema.parse(input);
    
    // Create the external review
    const externalReview = await createExternalReview(validatedInput.revieweeId, undefined, validatedInput.reviewerName);
    
    if (!externalReview) {
      return { success: false, error: 'Failed to create external review' };
    }
    
    // Create default questions for the review
    const questionsCreated = await createDefaultExternalReviewQuestions(externalReview.id);
    
    if (!questionsCreated) {
      return { success: false, error: 'Failed to create questions for external review' };
    }
    
    // Revalidate the page to show the new review
    revalidatePath('/active-review/external');
    
    return { 
      success: true,
      reviewId: externalReview.id,
      reviewToken: externalReview.token
    };
  } catch (error) {
    console.error('Error creating external review:', error);
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: 'Invalid input data',
        validationErrors: error.flatten().fieldErrors
      };
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Server action to fetch all external reviews for active review
 * @returns Array of external reviews
 */
export async function fetchExternalReviews() {
  try {
    const reviews = await getExternalReviewsForActiveReview();
    return { success: true, reviews };
  } catch (error) {
    console.error('Error fetching external reviews:', error);
    return { success: false, error: 'Failed to fetch external reviews', reviews: [] };
  }
}