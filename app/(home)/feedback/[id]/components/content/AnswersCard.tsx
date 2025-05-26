'use client';
import React from 'react';
import { FullQuestion } from '@/types/supabase.types';
import ChoiceCard from './ChoiceCard';
import AnswerText from '../AnswerTextForm';

interface AnswersCardProps {
  question: FullQuestion;
  hasChoices: boolean;
  answerChoiceId: string;
  answerText: string;
  title: string;
  readonly: boolean;
  isReviewee: boolean;
}

const AnswersCard: React.FC<AnswersCardProps> = ({
  question,
  hasChoices,
  answerChoiceId,
  answerText,
  title,
  readonly,
  isReviewee
}) => {
  return (
    <div className="flex flex-col w-3/5 bg-gray-50/80 rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-center py-2 w-full mb-3">
        <div className="text-lg font-semibold text-gray-800">{`${title}:`}</div>
      </div>
      {hasChoices && (
        <ChoiceCard
          question={question}
          answerChoiceId={answerChoiceId}
          readonly={readonly}
          isReviewee={isReviewee}
        />
      )}{' '}
      {hasChoices ? (
        <div className="text-base font-medium text-gray-700 mt-3 mb-2">
          Justificá tu respuesta
        </div>
      ) : null}
      <input type="hidden" name="questionId" value={question.id || ''} />
      {/* <input type="hidden" name="answerId" value={answerId || ''} /> */}
      <input type="hidden" name="initialAnswerText" value={answerText || ''} />
      <div className="py-2">
        <AnswerText answerText={answerText} isReadOnly={true} />
      </div>
    </div>
  );
};

export default AnswersCard;
