'use client';
import React from 'react';
import { FullQuestion } from '@/types/supabase.types';

interface ChoiceCardProps {
  question: FullQuestion;
  answerChoiceId: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({
  question,
  answerChoiceId,
  onChange,
  name,
  required = false
}) => {
  const readOnly = !onChange;

  return (
    <div className="shrink pb-5">
      {question.choices.map((choice) => {
        return (
          <div key={choice.id} className="flex gap-1">
            <input
              type="radio"
              id={choice.id}
              value={choice.id}
              name={name && name}
              // name="answerChoiceId" WARN: when adding this, the radio buttons don't work
              className="accent-primary cursor-pointer"
              checked={answerChoiceId === choice.id}
              onChange={(e) => (readOnly ? () => {} : onChange(e))}
              readOnly={readOnly}
              required={required}
            />
            <input
              type="hidden"
              name="initialanswerChoiceId"
              value={answerChoiceId ?? ''}
            />
            <label className="cursor-pointer flex gap-1" htmlFor={choice.id}>
              <span className="w-4 text-end">{`${choice.choice_value}:`}</span>
              <span>{`${choice.choice_text}`}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ChoiceCard;
