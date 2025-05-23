import { z } from 'zod';

// Define a base schema for external review answers
const answerSchema = z.object({
  questionId: z.string(),
  answer: z.string(),
});

// Define the schema for the form submission
export const externalReviewFormSchema = z.object({
  externalReviewId: z.string(),
  answers: z.array(answerSchema),
});

export type ExternalReviewFormValues = z.infer<typeof externalReviewFormSchema>;