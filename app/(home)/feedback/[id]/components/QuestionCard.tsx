'use client';
import QuestionsRepositoryClient from '@/lib/repository/questions-repository-client';
import React, { useCallback, useEffect, useState } from 'react';
import AnswerText from './AnswerTextForm';
import { FullQuestion } from '@/types/supabase.types';
import { CustomText } from '@/app/components/common';

interface QuestionCardProps {
  questionId: string;
  // answerId: string;
  reviewerAnswerText: string;
  reviewerAnswerChoiceId: string;
  revieweeAnswerText: string;
  revieweeAnswerChoiceId: string;
  isVisible: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionId,
  // answerId,
  reviewerAnswerText,
  reviewerAnswerChoiceId,
  revieweeAnswerText,
  revieweeAnswerChoiceId,
  isVisible
}) => {
  const [question, setQuestion] = useState<FullQuestion | null>(null);
  const getQuestion = useCallback(async () => {
    const questionData = await QuestionsRepositoryClient.getById({
      id: questionId
    });
    setQuestion(questionData);
  }, [questionId]);

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  if (!question) return <div>La pregunta no existe</div>;
  const hasChoices = question.choices && question.choices.length > 0;
  const visibleClass = isVisible ? '' : 'hidden';

  return (
    <div className={`flex w-full flex-col bg-white rounded-lg ${visibleClass}`}>
      <div className="flex flex-col gap-4">
        <h1 className="shrink text-xl font-bold p-6 text-white bg-primary rounded-t-lg">
          {question.question_title}
        </h1>
        <div className="shrink text-lg px-6 font-medium">
          {question.question_description}
        </div>
        {question.questionHints && question.questionHints.length > 0 ? (
          <div className="shrink px-6">
            <div className="bg-primary bg-opacity-10 font-medium p-2 rounded-lg">
              <ul>
                {question.questionHints.map((hint, index) => (
                  <li key={hint.id} className="p-1">
                    {hint.hint_text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        <div className=" ">
          <div className="flex flex-col w-full justify-center items-center">
            <div className="shrink text-lg font-bold px-6">
              {question.question_text}
            </div>
          </div>
          <div className="flex items-between justify-around pt-5">
            <CardAnswers
              title="Evaluado"
              question={question}
              hasChoices={hasChoices}
              answerChoiceId={revieweeAnswerChoiceId}
              answerText={revieweeAnswerText}
            />
            <CardAnswers
              title="Evaluador"
              question={question}
              hasChoices={hasChoices}
              answerChoiceId={reviewerAnswerChoiceId}
              answerText={reviewerAnswerText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

interface CardAnswersProps {
  question: FullQuestion;
  hasChoices: boolean;
  answerChoiceId: string;
  answerText: string;
  title: string;
}

const CardAnswers: React.FC<CardAnswersProps> = ({
  question,
  hasChoices,
  answerChoiceId,
  answerText,
  title
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center p-5 w-full">
        <CustomText>{title}</CustomText>
      </div>
      {hasChoices ? (
        <div className="shrink px-6">
          {question.choices.map((choice) => (
            <div key={choice.id} className="flex gap-1">
              <input
                type="radio"
                id={choice.id}
                name="answerChoiceId"
                value={choice.id}
                className="accent-primary cursor-pointer"
                checked={answerChoiceId === choice.id}
                readOnly={true}
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
          ))}
        </div>
      ) : null}
      {hasChoices ? (
        <div className="shrink text-lg font-bold px-6 pt-5">
          Justifique su respuesta
        </div>
      ) : null}
      <input type="hidden" name="questionId" value={question.id || ''} />
      {/* <input type="hidden" name="answerId" value={answerId || ''} /> */}
      <input type="hidden" name="initialAnswerText" value={answerText || ''} />
      <AnswerText answerText={answerText} isReadOnly={true} />
    </div>
  );
};
