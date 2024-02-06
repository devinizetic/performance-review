'use client';
import { createAnswer, updateAnswer } from '@/app/actions';
import AutoSizeTextarea from '@/app/components/auto-size-textarea';
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
          <h1 className="shrink text-xl font-bold p-6 text-white bg-primary rounded-t-lg">
            {question.question_title}
          </h1>
          <div className="shrink text-lg px-6 font-medium">
            {question.question_description}
          </div>
          {question.question_hints && question.question_hints.length > 0 ? (
            <div className="shrink px-6">
              <div className="bg-primary bg-opacity-10 font-medium p-2 rounded-lg">
                <ul>
                  {question.question_hints.map((hint, index) => (
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
                    defaultChecked={answer?.answer_choice_id === choice.id}
                  />
                  <input
                    type="hidden"
                    name="initialAnswerChoiceId"
                    value={answer?.answer_choice_id ?? ''}
                  />
                  <label
                    className="cursor-pointer flex gap-1"
                    htmlFor={choice.id}
                  >
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
          <input type="hidden" name="questionId" value={question.id} />
          <input type="hidden" name="userReviewId" value={activeReview.id} />
          <input type="hidden" name="answerId" value={answer?.id} />
          <input
            type="hidden"
            name="initialAnswerText"
            value={answer?.answer_text ?? ''}
          />
          <AutoSizeTextarea value={answer?.answer_text || ''} />
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

  const ReviewFooter = ({ onPrevious }: { onPrevious: () => void }) => {
    return (
      <div className="flex gap-2 w-full mt-4">
        <button
          className="shrink rounded-lg font-medium border bg-white shadow-lg w-36 py-1 hover:border-none hover:bg-primary hover:text-white"
          type="button"
          onClick={onPrevious}
        >
          Atrás
        </button>
        <button
          className="shrink rounded-lg font-medium border bg-white shadow-lg w-36 py-1 hover:border-none hover:bg-primary hover:text-white"
          type="submit"
          form="question-form"
        >
          Siguiente
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow">
      <div className="flex flex-col w-6/12 h-4/5">
        <div className="flex flex-col flex-1 gap-4 bg-white rounded-lg">
          <form
            id="question-form"
            action={(formData: FormData) => handleSubmitAnswer(formData)}
          >
            {questionComponents &&
              questionComponents.length &&
              questionComponents[currentStep]}
          </form>
        </div>
        <ReviewFooter onPrevious={handlePrevious} />
      </div>
    </div>
  );
};

export default UserReview;
