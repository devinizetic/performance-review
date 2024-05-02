'use client';
import AutoSizeTextarea from '@/app/components/auto-size-textarea';
import { FullUserReview } from '@/types/supabase.types';
import React, { FC, useEffect, useState } from 'react';

interface QuestionFormProps {
  currentStep: number;
  activeReview: FullUserReview;
  isReviewee: boolean;
}

const QuestionForm: FC<QuestionFormProps> = ({
  currentStep,
  activeReview,
  isReviewee
}) => {
  if (!activeReview) return null;
  const [formState, setFormState] = useState({
    initialAnswerText: '',
    initialAnswerChoiceId: '',
    answerText: '',
    answerChoiceId: ''
  });
  const question = activeReview.review.questions[currentStep].question;
  const answer = {
    ...activeReview.answers.find((answer) => answer.question_id === question.id)
  };

  const answerText = isReviewee
    ? answer?.reviewee_answer_text
    : answer?.reviewer_answer_text;
  const answerChoiceId = isReviewee
    ? answer?.reviewee_answer_choice_id
    : answer?.reviewer_answer_choice_id;

  useEffect(() => {
    setFormState({
      ...formState,
      initialAnswerText: answerText ?? '',
      initialAnswerChoiceId: answerChoiceId ?? '',
      answerText: answerText ?? '',
      answerChoiceId: answerChoiceId ?? ''
    });
  }, [currentStep]);

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, answerChoiceId: e.target.value });
  };

  const hasChoices = question.choices && question.choices.length > 0;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="shrink text-xl font-bold p-6 text-white bg-primary rounded-t-lg">
        {question.question_title}
      </h1>
      <div className="shrink text-lg px-6 font-medium text-justify">
        {question.question_description}
      </div>
      {question.questionHints && question.questionHints.length > 0 ? (
        <div className="shrink px-6">
          <div className="bg-primary bg-opacity-10 font-medium p-2 rounded-lg">
            <ul>
              {question.questionHints.map((hint, index) => (
                <li key={hint.id} className="p-1">
                  {isReviewee
                    ? hint.hint_text_reviewee
                    : hint.hint_text_reviewer}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      <div className="shrink text-lg font-bold px-6">
        {isReviewee
          ? question.question_text_reviewee
          : question.question_text_reviewer}
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
                onChange={handleChoiceChange}
                required
              />
              <input
                type="hidden"
                name="initialAnswerChoiceId"
                value={formState.initialAnswerChoiceId}
              />
              <label className="cursor-pointer flex gap-1" htmlFor={choice.id}>
                <span className="w-4 text-end">{`${choice.choice_value}:`}</span>
                <span>{`${
                  isReviewee
                    ? choice.choice_text_reviewee
                    : choice.choice_text_reviewer
                }`}</span>
              </label>
            </div>
          ))}
        </div>
      ) : null}
      {hasChoices ? (
        <div className="shrink text-lg font-bold px-6">
          Justificá tu respuesta
        </div>
      ) : null}
      <input type="hidden" name="questionId" value={question.id || ''} />
      <input type="hidden" name="answerId" value={answer?.id || ''} />
      <input
        type="hidden"
        name="initialAnswerText"
        value={formState.initialAnswerText}
      />
      <AutoSizeTextarea
        className="px-6 pb-6"
        value={formState.answerText}
        onChange={(e) =>
          setFormState({ ...formState, answerText: e.target.value })
        }
      />
    </div>
  );
};

export default QuestionForm;
