'use client';
import AutoSizeTextarea from '@/app/components/auto-size-textarea';
import { FullUserReview } from '@/types/supabase.types';
import React, { FC, useEffect, useState } from 'react';

interface QuestionFormProps {
  currentStep: number;
  activeReview: FullUserReview;
}

const QuestionForm: FC<QuestionFormProps> = ({ currentStep, activeReview }) => {
  if (!activeReview) return null;
  const [formState, setFormState] = useState({
    answerText: '',
    answerChoiceId: ''
  });
  const question = activeReview.review.questions[currentStep];
  const answer = {
    ...activeReview.answers.find((answer) => answer.question_id === question.id)
  };

  useEffect(() => {
    setFormState({
      ...formState,
      answerText: answer?.answer_text ?? '',
      answerChoiceId: answer?.answer_choice_id ?? ''
    });
  }, [currentStep]);

  const hasChoices = question.choices && question.choices.length > 0;
  return (
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

      <div className="shrink text-lg font-bold px-6">
        {question.question_text}
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
                checked={formState.answerChoiceId === choice.id}
              />
              <input
                type="hidden"
                name="initialAnswerChoiceId"
                value={answer?.answer_choice_id ?? ''}
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
        <div className="shrink text-lg font-bold px-6">
          Justifique su respuesta
        </div>
      ) : null}
      <input type="hidden" name="questionId" value={question.id || ''} />
      <input type="hidden" name="answerId" value={answer?.id || ''} />
      <input
        type="hidden"
        name="initialAnswerText"
        value={answer?.answer_text || ''}
      />
      <AutoSizeTextarea
        value={formState.answerText}
        onChange={(e) =>
          setFormState({ ...formState, answerText: e.target.value })
        }
      />
    </div>
  );
};

export default QuestionForm;
