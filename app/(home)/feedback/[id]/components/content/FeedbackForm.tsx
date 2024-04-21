'use client';
import React, { useState } from 'react';
import { FullQuestion } from '@/types/supabase.types';
import { CustomText } from '@/app/components/common';
import AutoSizeTextarea from '@/app/components/auto-size-textarea';
import ChoiceCard from './ChoiceCard';

interface FeedbackFormProps {
  hasChoices: boolean;
  question: FullQuestion;
  handleSubmitAnswer: (formData: FormData) => Promise<void>;
  feedbackAnswerId: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  question,
  hasChoices,
  handleSubmitAnswer,
  feedbackAnswerId
}) => {
  if (!question) return <div>La pregunta no existe</div>;

  const [formState, setFormState] = useState({
    answerText: '',
    answerChoiceId: ''
  });

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, answerChoiceId: e.target.value });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({ ...formState, answerText: e.target.value });
  };

  return (
    <>
      <CustomText size="medium" bold underline>
        Feedback:
      </CustomText>
      <form
        id="feedback-form"
        action={(formData: FormData) => {
          handleSubmitAnswer(formData);
        }}
      >
        <input type="hidden" name="answerId" value={feedbackAnswerId} />
        {hasChoices && (
          <ChoiceCard
            question={question}
            answerChoiceId={formState.answerChoiceId}
            onChange={handleChoiceChange}
            name="feedback-form"
          />
        )}
        <AutoSizeTextarea
          required={false}
          value={formState.answerText}
          onChange={handleTextChange}
        />
      </form>
    </>
  );
};

export default FeedbackForm;
