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
}

const AnswersCard: React.FC<AnswersCardProps> = ({
  question,
  hasChoices,
  answerChoiceId,
  answerText,
  title
}) => {
  return (
    <div className="flex flex-col w-3/5">
      <div className="flex items-center justify-center p-5 w-full">
        <CustomText size="medium" bold underline>
          {`${title}:`}
        </CustomText>
      </div>
      {hasChoices && (
        <ChoiceCard question={question} answerChoiceId={answerChoiceId} />
      )}
      {hasChoices ? (
        <CustomText size="medium" bold>
          Justifique su respuesta
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
