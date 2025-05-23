'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalReviewWithQuestionsAndAnswers } from '@/lib/repository/external-reviews-repository';
import AutoSizeTextarea from '@/app/components/auto-size-textarea';
import { submitExternalReview } from '../actions';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';

interface ExternalReviewFormProps {
  externalReview: ExternalReviewWithQuestionsAndAnswers;
}

// Simple form using useState instead of react-hook-form
export default function ExternalReviewForm({
  externalReview
}: ExternalReviewFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Initialize form data from the external review
  const [answers, setAnswers] = useState(
    externalReview.questions.map((question) => ({
      questionId: question.id,
      answer:
        question.answers && question.answers.length > 0
          ? String(question.answers[0].answer || '')
          : ''
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
        setSubmissionError(
          result.error || 'An error occurred while submitting your feedback.'
        );
      }
    } catch (error) {
      console.error('Error submitting external review:', error);
      setSubmissionError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine language for button text
  const lang = externalReview.language === 'spanish' ? 'es' : 'en';
  const submitLabel = isSubmitting
    ? lang === 'es'
      ? 'Enviando...'
      : 'Submitting...'
    : lang === 'es'
    ? 'Enviar evaluación'
    : 'Submit Review';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {submissionError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {submissionError}
        </div>
      )}

      {externalReview.questions.map((question, index) => {
        let inputField = null;
        if (question.type === 'text') {
          inputField = (
            <AutoSizeTextarea
              value={answers[index].answer}
              onChange={(e) => handleTextChange(index, e.target.value)}
              required
              className="p-3 bg-gray-50"
            />
          );
        } else if (question.type === 'rating') {
          let opts: any = { min: 1, max: 5, labels: [] };
          try {
            opts = question.options
              ? JSON.parse(question.options as string)
              : opts;
          } catch {}
          inputField = (
            <div className="flex items-center gap-4">
              {[...Array(opts.max - opts.min + 1)].map((_, i) => {
                const val = opts.min + i;
                return (
                  <label
                    key={val}
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`rating-${question.id}`}
                      value={val}
                      checked={answers[index].answer == String(val)}
                      onChange={() => handleTextChange(index, String(val))}
                      required
                      className="accent-primary"
                    />
                    <span className="text-xs mt-1">
                      {opts.labels?.[i] || val}
                    </span>
                  </label>
                );
              })}
            </div>
          );
        } else if (question.type === 'multiple_choice') {
          let opts: string[] = [];
          try {
            opts = question.options
              ? JSON.parse(question.options as string)
              : [];
          } catch {}
          inputField = (
            <div className="flex flex-col gap-2">
              {opts.map((opt, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`mc-${question.id}`}
                    value={opt}
                    checked={answers[index].answer === opt}
                    onChange={() => handleTextChange(index, opt)}
                    required
                    className="accent-primary"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          );
        }
        return (
          <Card key={question.id} className="overflow-hidden">
            <div className="p-6 space-y-4">
              <h3 className="font-medium text-lg">
                {index + 1}. {question.text}
              </h3>
              <div className="space-y-2">{inputField}</div>
            </div>
          </Card>
        );
      })}

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="px-8">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
