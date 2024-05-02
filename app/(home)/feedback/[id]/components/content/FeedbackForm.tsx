'use client';
import React, { useState } from 'react';
import { FullQuestion } from '@/types/supabase.types';
import { CustomText } from '@/app/components/common';
import AutoSizeTextarea from '@/app/components/auto-size-textarea';
import ChoiceCard from './ChoiceCard';

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
  if (!question) return <div>La pregunta no existe</div>;

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
    <div>
      <CustomText size="medium" bold>
        Feedback:
      </CustomText>
      <form
        id="feedback-form"
        action={(formData: FormData) => {
          handleSubmitAnswer(formData);
        }}
        className="pt-6"
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
            />
          </>
        )}
        <>
          <AutoSizeTextarea
            required={false}
            value={formState.answerText}
            onChange={handleTextChange}
            readonly={readonly}
          />
          <input
            type="hidden"
            name="initialAnswerText"
            value={formState.initialAnswerText}
          />
        </>
      </form>
    </div>
  );
};

export default FeedbackForm;
