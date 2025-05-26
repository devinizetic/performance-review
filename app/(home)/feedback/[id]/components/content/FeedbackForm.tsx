'use client';
import React, { useState } from 'react';
import { FullQuestion } from '@/types/supabase.types';
import AutoSizeTextarea from '@/app/components/auto-size-textarea';
import ChoiceCard from './ChoiceCard';
import Loading from '@/app/(home)/loading';

interface FeedbackFormProps {
  hasChoices: boolean;
  question: FullQuestion;
  feedbackText: string;
  feedbackChoiceId: string;
  handleSubmitAnswer: (formData: FormData) => Promise<void>;
  feedbackAnswerId: string;
  readonly: boolean;
  isReviewee: boolean;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  question,
  hasChoices,
  handleSubmitAnswer,
  feedbackAnswerId,
  feedbackText,
  feedbackChoiceId,
  readonly,
  isReviewee
}) => {
  if (!question)
    return (
      <div>
        <Loading />
      </div>
    );

  const [formState, setFormState] = useState({
    initialAnswerText: '',
    initialAnswerChoiceId: '',
    answerText: feedbackText || '',
    answerChoiceId: feedbackChoiceId || ''
  });

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, answerChoiceId: e.target.value });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({ ...formState, answerText: e.target.value });
  };
  return (
    <div className="bg-gray-50/80 rounded-lg border border-gray-200 p-4 mt-4">
      <div className="text-lg font-semibold text-gray-800 mb-4">Feedback:</div>
      <form
        id="feedback-form"
        action={(formData: FormData) => {
          handleSubmitAnswer(formData);
        }}
        className="space-y-4"
      >
        <input type="hidden" name="answerId" value={feedbackAnswerId} />
        {hasChoices && (
          <>
            <ChoiceCard
              question={question}
              answerChoiceId={formState.answerChoiceId}
              onChange={handleChoiceChange}
              name="answerChoiceId"
              required
              readonly={readonly}
              isReviewee={isReviewee}
            />
            <input
              type="hidden"
              name="initialAnswerChoiceId"
              value={formState.initialAnswerChoiceId}
            />{' '}
          </>
        )}
        <div>
          {hasChoices && (
            <div className="text-base font-medium text-gray-700 mb-2">
              Justificá tu respuesta
            </div>
          )}
          <AutoSizeTextarea
            required={false}
            value={formState.answerText}
            onChange={handleTextChange}
            readonly={readonly}
            className="w-full min-h-[70px] rounded-lg border border-gray-200 bg-white focus:border-primary/60 focus:ring-2 focus:ring-primary/20 px-3 py-2 text-gray-900 transition resize-none"
          />
          <input
            type="hidden"
            name="initialAnswerText"
            value={formState.initialAnswerText}
          />
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
