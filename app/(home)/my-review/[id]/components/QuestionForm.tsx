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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, answerChoiceId: e.target.value });
  };

  const hasChoices = question.choices && question.choices.length > 0;
  return (
    <div className="flex flex-col gap-6 bg-white/95 rounded-2xl shadow-lg border border-gray-100 p-0">
      <div className="rounded-t-2xl px-6 pt-6 pb-3 border-b border-gray-100 bg-white">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {question.question_title}
        </h1>
        <div className="text-base font-medium text-gray-600 opacity-90">
          {question.question_description}
        </div>
      </div>
      {question.questionHints && question.questionHints.length > 0 ? (
        <div className="px-6">
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 text-blue-900 rounded-lg p-3">
            <svg
              className="w-5 h-5 mt-0.5 text-blue-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <ul className="space-y-1">
              {question.questionHints.map((hint, index) => (
                <li key={hint.id} className="text-sm">
                  {isReviewee
                    ? hint.hint_text_reviewee
                    : hint.hint_text_reviewer}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
      <div className="px-6 pt-2">
        <div className="text-lg font-semibold text-gray-800 mb-2">
          {isReviewee
            ? question.question_text_reviewee
            : question.question_text_reviewer}
        </div>
        {hasChoices ? (
          <div className="flex flex-col gap-2">
            {question.choices.map((choice) => (
              <label
                key={choice.id}
                className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 hover:border-primary/60 transition cursor-pointer bg-gray-50"
              >
                <input
                  type="radio"
                  id={choice.id}
                  name="answerChoiceId"
                  value={choice.id}
                  className="accent-primary focus:ring-2 focus:ring-primary/50 cursor-pointer"
                  checked={formState.answerChoiceId === choice.id}
                  onChange={handleChoiceChange}
                  required
                />
                <input
                  type="hidden"
                  name="initialAnswerChoiceId"
                  value={formState.initialAnswerChoiceId}
                />
                <span className="w-5 text-end font-bold text-primary/90">{`${choice.choice_value}:`}</span>
                <span className="text-gray-700">
                  {isReviewee
                    ? choice.choice_text_reviewee
                    : choice.choice_text_reviewer}
                </span>
              </label>
            ))}
          </div>
        ) : null}
        {hasChoices ? (
          <div className="text-base font-medium text-gray-700 mt-4 mb-1">
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
      </div>
      <div className="px-6 pb-6">
        <AutoSizeTextarea
          className="w-full min-h-[70px] rounded-lg border border-gray-200 bg-gray-50 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 px-3 py-2 text-gray-900 transition resize-none"
          value={formState.answerText}
          onChange={(e) =>
            setFormState({ ...formState, answerText: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default QuestionForm;
