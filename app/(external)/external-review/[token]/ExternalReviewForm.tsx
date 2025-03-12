'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalReviewWithQuestionsAndAnswers } from "@/lib/repository/external-reviews-repository";
import AutoSizeTextarea from "@/app/components/auto-size-textarea";
import { submitExternalReview } from "../actions";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

interface ExternalReviewFormProps {
  externalReview: ExternalReviewWithQuestionsAndAnswers;
}

// Simple form using useState instead of react-hook-form
export default function ExternalReviewForm({ externalReview }: ExternalReviewFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  // Initialize form data from the external review
  const [answers, setAnswers] = useState(
    externalReview.questions.map(question => ({
      questionId: question.id,
      answer: question.answers && question.answers.length > 0 ? String(question.answers[0].answer || "") : ""
    }))
  );

  // Handle text input changes
  const handleTextChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const result = await submitExternalReview({
        externalReviewId: externalReview.id,
        answers: answers
      });
      
      if (result.success) {
        // Refresh the page to show completion message
        router.refresh();
      } else {
        setSubmissionError(result.error || "An error occurred while submitting your feedback.");
      }
    } catch (error) {
      console.error("Error submitting external review:", error);
      setSubmissionError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {submissionError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {submissionError}
        </div>
      )}

      {externalReview.questions.map((question, index) => (
        <Card key={question.id} className="overflow-hidden">
          <div className="p-6 space-y-4">
            <h3 className="font-medium text-lg">
              {index + 1}. {question.text}
            </h3>
            
            <div className="space-y-2">
              <label htmlFor={`answer-${index}`} className="block font-medium text-sm">
                Your Answer
              </label>
              
              <AutoSizeTextarea
                value={answers[index].answer}
                onChange={(e) => handleTextChange(index, e.target.value)}
                required
                className="p-3 bg-gray-50"
              />
              
              <p className="text-sm text-gray-500">
                Please provide your honest feedback.
              </p>
            </div>
          </div>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="px-8"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </form>
  );
}