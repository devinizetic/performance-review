'use client';
import React from 'react';
import { FullQuestion } from '@/types/supabase.types';

interface ChoiceCardProps {
  question: FullQuestion;
  answerChoiceId: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  readonly: boolean;
  isReviewee: boolean;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({
  question,
  answerChoiceId,
  onChange,
  name,
  required = false,
  readonly,
  isReviewee
}) => {
  const isReadOnly = !onChange || readonly;
  return (
    <div className="flex flex-col gap-2 pb-4">
      {question.choices.map((choice) => {
        return (
          <label
            key={choice.id}
            className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 hover:border-primary/60 transition cursor-pointer bg-gray-50"
          >
            <input
              type="radio"
              id={`${choice.id}${isReadOnly ? 'r' : 'w'}`}
              value={choice.id}
              name={name && name}
              className="accent-primary focus:ring-2 focus:ring-primary/50 cursor-pointer"
              checked={answerChoiceId === choice.id}
              onChange={(e) => (isReadOnly ? () => {} : onChange(e))}
              readOnly={isReadOnly}
              required={required}
            />
            <input
              type="hidden"
              name="initialanswerChoiceId"
              value={answerChoiceId ?? ''}
            />
            <span className="w-5 text-end font-bold text-primary/90">{`${choice.choice_value}:`}</span>
            <span className="text-gray-700">{`${
              isReviewee
                ? choice.choice_text_reviewee
                : choice.choice_text_reviewer
            }`}</span>
          </label>
        );
      })}
    </div>
  );
};

export default ChoiceCard;
