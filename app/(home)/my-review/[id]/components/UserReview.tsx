'use client';
import { createAnswer, updateAnswer } from '@/app/actions';
import React, { useEffect, useState } from 'react';
import { FullUserReview } from '@/types/supabase.types';
import QuestionForm from './QuestionForm';
import ReviewFooter from './ReviewFooter';

interface UserReviewProps {
  activeReview: FullUserReview;
}

function getCurrentQuestionId(activeReview: FullUserReview): string | null {
  for (let question of activeReview.review.questions) {
    let answerForQuestion = activeReview.answers.find(
      (answer) => answer.question_id === question.id
    );
    if (!answerForQuestion) {
      return question.id;
    }
  }

  return activeReview.review.questions[activeReview.review.questions.length - 1]
    .id; // return last question
}

const UserReview: React.FC<UserReviewProps> = ({ activeReview }) => {
  if (!activeReview) return <div>Actualmente no hay evaluaciones activas</div>;

  const currentQuestionId = getCurrentQuestionId(activeReview);
  const currentQuestionIndex = activeReview.review.questions.findIndex(
    (question) => question.id === currentQuestionId
  );

  const [currentStep, setCurrentStep] = useState(currentQuestionIndex || 0);
  function handlePrevious(): void {
    if (currentStep === 0) return;
    const newStep = currentStep - 1;
    setCurrentStep(newStep);
  }

  const handleNext = async () => {
    if (currentStep === (activeReview.review.questions.length || 0) - 1) return;
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
  };

  const handleSubmitAnswer = async (formData: FormData): Promise<void> => {
    const answerId = formData.get('answerId');

    if (answerId) await updateAnswer(formData);
    else await createAnswer(formData);

    handleNext();
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow">
      <div className="flex flex-col w-6/12 h-4/5">
        <div className="flex flex-col flex-1 gap-4 bg-white rounded-lg">
          <form
            id="question-form"
            action={(formData: FormData) => handleSubmitAnswer(formData)}
          >
            <input type="hidden" name="userReviewId" value={activeReview.id} />
            <QuestionForm
              activeReview={activeReview}
              currentStep={currentStep}
            />
          </form>
        </div>
        <ReviewFooter onPrevious={handlePrevious} />
      </div>
    </div>
  );
};

export default UserReview;
