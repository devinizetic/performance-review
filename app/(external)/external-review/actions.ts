'use server';

import { submitExternalReviewAnswers } from '@/lib/repository/external-reviews-repository';
import { externalReviewFormSchema, ExternalReviewFormValues } from '@/types/schemas/schema.types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

/**
 * Server action to submit answers for an external review
 * @param values Form values for external review submission
 * @returns Object indicating success/failure and any error message
 */
export async function submitExternalReview(values: ExternalReviewFormValues) {
  try {
    // Validate form values
    const validatedValues = externalReviewFormSchema.parse(values);
    
    // Submit the answers to the database
    const success = await submitExternalReviewAnswers(
      validatedValues.externalReviewId,
      validatedValues.answers
    );

    if (!success) {
      return { success: false, error: 'Failed to submit review. Please try again.' };
    }

    // Revalidate the page to reflect the updated data
    revalidatePath(`/external-review/[token]`);

    return { success: true };
  } catch (error) {
    console.error('Error submitting external review:', error);
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: 'Invalid form data. Please check your answers and try again.',
        validationErrors: error.flatten().fieldErrors
      };
    }
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}