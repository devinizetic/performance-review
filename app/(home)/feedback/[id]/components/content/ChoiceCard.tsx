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
    <div className="shrink pb-5">
      {question.choices.map((choice) => {
        return (
          <div key={choice.id} className="flex gap-1">
            <input
              type="radio"
              id={`${choice.id}${isReadOnly ? 'r' : 'w'}`}
              value={choice.id}
              name={name && name}
              // name="answerChoiceId" WARN: when adding this, the radio buttons don't work
              className="accent-primary cursor-pointer"
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
            <label
              className="cursor-pointer flex gap-1"
              htmlFor={`${choice.id}${isReadOnly ? 'r' : 'w'}`}
            >
              <span className="w-4 text-end">{`${choice.choice_value}:`}</span>
              <span>{`${
                isReviewee
                  ? choice.choice_text_reviewee
                  : choice.choice_text_reviewer
              }`}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ChoiceCard;
