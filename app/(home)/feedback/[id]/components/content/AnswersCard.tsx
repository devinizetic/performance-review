'use client';
import React from 'react';
import { FullQuestion } from '@/types/supabase.types';
import { CustomText } from '@/app/components/common';
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
    <div className="flex flex-col w-3/5">
      <div className="flex items-center justify-center py-5 pr-5 w-full">
        <CustomText size="medium" bold>
          {`${title}:`}
        </CustomText>
      </div>
      {hasChoices && (
        <ChoiceCard
          question={question}
          answerChoiceId={answerChoiceId}
          readonly={readonly}
          isReviewee={isReviewee}
        />
      )}
      {hasChoices ? (
        <CustomText size="medium" bold>
          Justificá tu respuesta
        </CustomText>
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
