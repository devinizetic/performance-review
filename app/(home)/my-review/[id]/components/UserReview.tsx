'use client';
import { createAnswer, updateAnswer } from '@/app/actions';
import { FullReview } from '@/lib/repository/user-review-repository';
import { Tables } from '@/types/supabase';
import { create } from 'domain';
import React, { useState } from 'react';

interface UserReviewProps {
  activeReview: FullReview;
}

function getCurrentQuestionId(activeReview: FullReview): string | null {
  for (let question of activeReview?.review?.questions || []) {
    let answerForQuestion = activeReview?.answers.find(
      (answer) => answer.question_id === question.id
    );
    if (!answerForQuestion) {
      return question.id;
    }
  }

  return (
    activeReview?.review?.questions[activeReview?.review?.questions.length - 1]
      .id || null
  ); // return last question
}

const UserReview: React.FC<UserReviewProps> = ({ activeReview }) => {
  const currentQuestionId = getCurrentQuestionId(activeReview);
  const currentQuestionIndex = activeReview?.review?.questions.findIndex(
    (question) => question.id === currentQuestionId
  );

  const [currentStep, setCurrentStep] = useState(currentQuestionIndex || 0);
  const initialQuestionAnswers: { questionId: string; answer_text?: string }[] =
    activeReview?.review?.questions.map((q) => {
      const answer = activeReview?.answers.find((a) => a.question_id === q.id);
      const questionAnswer = {
        questionId: q.id,
        answer_text: answer?.answer_text ?? ''
      };
      return questionAnswer;
    }) ?? [];

  function handlePrevious(): void {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  }

  const handleNext = async () => {
    if (currentStep === (activeReview?.review?.questions.length || 0) - 1)
      return;
    setCurrentStep(currentStep + 1);
  };

  const questionComponents = activeReview?.review?.questions.map(
    (question, index) => {
      const answer = activeReview?.answers.find(
        (a) => a.question_id === question.id
      );
      const hasChoices = question.choices && question.choices.length > 0;
      return (
        <div key={question.id} className="flex flex-col gap-4">
          <h1 className="shrink text-xl font-bold">
            {question.question_title}
          </h1>
          <div className="shrink text-lg">{question.question_description}</div>
          <div className="shrink">
            <span>Criterios Guía:</span>
            <ul>
              {question.question_hints.map((hint, index) => (
                <li key={hint.id} className="p-1">
                  * {hint.hint_text}
                </li>
              ))}
            </ul>
          </div>
          <div className="shrink text-lg font-bold">
            {question.question_text}
          </div>
          {hasChoices ? (
            <div className="shrink">
              {question.choices.map((choice) => (
                <div key={choice.id}>
                  <input
                    type="radio"
                    id={choice.id}
                    name="answerChoiceId"
                    value={choice.id}
                    defaultChecked={answer?.answer_choice_id === choice.id}
                  />
                  <label
                    htmlFor={choice.id}
                  >{`${choice.choice_value}: ${choice.choice_text}`}</label>
                </div>
              ))}
            </div>
          ) : null}
          {hasChoices ? (
            <div className="shrink text-lg font-bold">
              Justifique su respuesta
            </div>
          ) : null}
          <input type="hidden" name="questionId" value={question.id} />
          <input type="hidden" name="userReviewId" value={activeReview.id} />
          <input type="hidden" name="answerId" value={answer?.id} />
          <textarea
            name="answerText"
            rows={3}
            className="shrink border border-zinc-500 rounded-lg resize-none p-2"
            defaultValue={answer?.answer_text ?? ''}
          />
        </div>
      );
    }
  );

  const handleSubmitAnswer = async (formData: FormData): Promise<void> => {
    const answerId = formData.get('answerId');

    if (answerId) await updateAnswer(formData);
    else await createAnswer(formData);

    handleNext();
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow">
      <div className="border border-black rounded-lg p-8 flex flex-col gap-4 bg-white w-6/12 h-4/5">
        <form action={(formData: FormData) => handleSubmitAnswer(formData)}>
          {questionComponents &&
            questionComponents.length &&
            questionComponents[currentStep]}
          <div className="flex gap-2 w-full">
            <button
              className="shrink rounded-lg border border-zinc-500 shadow-lg w-36 py-1 hover:bg-zinc-500 hover:text-white"
              type="button"
              onClick={handlePrevious}
            >
              Atrás
            </button>
            <button
              className="shrink rounded-lg border border-zinc-500 shadow-lg w-36 py-1 hover:bg-zinc-500 hover:text-white"
              type="submit"
              // onClick={handleNext}
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserReview;
