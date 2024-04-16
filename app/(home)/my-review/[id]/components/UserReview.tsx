'use client';
import {
  createAnswer,
  setPerformanceReviewStarted,
  updateAnswer
} from '@/app/actions';
import React, { useEffect, useState } from 'react';
import { FullUserReview } from '@/types/supabase.types';
import QuestionForm from './QuestionForm';
import ReviewFooter from './ReviewFooter';
import StartScreen from './StartScreen';

interface UserReviewProps {
  activeReview: FullUserReview;
  isReviewee: boolean;
}

function getCurrentQuestionId(
  activeReview: FullUserReview,
  isReviewee: boolean
): string | null {
  for (let question of activeReview.review.questions) {
    let answerForQuestion = activeReview.answers.find(
      (answer) =>
        answer.question_id === question.id &&
        (isReviewee
          ? answer.reviewee_answer_text !== null
          : answer.reviewer_answer_text !== null)
    );
    if (!answerForQuestion) {
      return question.id;
    }
  }

  return activeReview.review.questions[activeReview.review.questions.length - 1]
    .id; // return last question
}

const UserReview: React.FC<UserReviewProps> = ({
  activeReview,
  isReviewee
}) => {
  if (!activeReview) return <div>Actualmente no hay evaluaciones activas</div>;

  const currentQuestionId = getCurrentQuestionId(activeReview, isReviewee);
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

    if (answerId) await updateAnswer(formData, isReviewee);
    else await createAnswer(formData, isReviewee);

    handleNext();
  };

  const handleStartReview = async () => {
    const userReviewId = activeReview.id;

    if (!userReviewId) throw new Error('Missing user review id');

    await setPerformanceReviewStarted(userReviewId, isReviewee);
  };

  const showStartScreen = isReviewee
    ? !activeReview.reviewee_started_timestamp
    : !activeReview.reviewer_started_timestamp;
  const personName = isReviewee
    ? activeReview.reviewee.full_name
    : activeReview.reviewer.full_name;

  return (
    <div className="flex flex-col justify-center items-center flex-grow">
      {showStartScreen ? (
        <StartScreen
          onStart={handleStartReview}
          personName={personName || ''}
        />
      ) : (
        <div className="flex flex-col w-6/12 h-4/5">
          <div className="flex flex-col flex-1 gap-4 bg-white rounded-lg">
            <form
              id="question-form"
              action={(formData: FormData) => handleSubmitAnswer(formData)}
            >
              <input
                type="hidden"
                name="userReviewId"
                value={activeReview.id}
              />
              <QuestionForm
                activeReview={activeReview}
                currentStep={currentStep}
                isReviewee={isReviewee}
              />
            </form>
          </div>
          <ReviewFooter
            onPrevious={handlePrevious}
            showBackButton={currentStep !== 0}
          />
        </div>
      )}
    </div>
  );
};

export default UserReview;
