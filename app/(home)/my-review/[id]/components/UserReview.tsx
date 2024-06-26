'use client';
import {
  createAnswer,
  setPerformanceReviewCompleted,
  setPerformanceReviewStarted,
  updateAnswer
} from '@/app/actions';
import React, { useCallback, useState } from 'react';
import { AnswersSortedView, FullUserReview } from '@/types/supabase.types';
import QuestionForm from './QuestionForm';
import ReviewFooter from './ReviewFooter';
import InfoScreen from './InfoScreen';
import { FormType } from '@/types';
import Feedback from '@/app/(home)/feedback/[id]/components/Feedback';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/app/components/common/ProgressBar';

interface UserReviewProps {
  activeReview: FullUserReview;
  isReviewee: boolean;
  questionAnswers: AnswersSortedView[];
}

function getCurrentQuestionId(
  activeReview: FullUserReview,
  isReviewee: boolean
): string | null {
  for (let question of activeReview.review.questions) {
    let answerForQuestion = activeReview.answers.find(
      (answer) =>
        answer.question_id === question.question.id &&
        (isReviewee
          ? answer.reviewee_answer_text !== null
          : answer.reviewer_answer_text !== null)
    );
    if (!answerForQuestion) {
      return question.question.id;
    }
  }

  return activeReview.review.questions[activeReview.review.questions.length - 1]
    .question.id; // return last question
}

const UserReview: React.FC<UserReviewProps> = ({
  activeReview,
  isReviewee,
  questionAnswers
}) => {
  if (!activeReview) return <div>Actualmente no hay evaluaciones activas</div>;
  const currentQuestionId = getCurrentQuestionId(activeReview, isReviewee);
  const currentQuestionIndex = activeReview.review.questions.findIndex(
    (question) => question.question.id === currentQuestionId
  );

  const step = currentQuestionIndex < 0 ? 0 : currentQuestionIndex;
  const [currentStep, setCurrentStep] = useState(step || 0);
  const [showCompleteScreen, setShowCompleteScreen] = useState(false);
  const router = useRouter();

  function handlePrevious(): void {
    if (currentStep === 0) return;
    const newStep = currentStep - 1;
    setCurrentStep(newStep);
  }

  function handleBackToLastStep(): void {
    setCurrentStep(activeReview.review.questions.length - 1);
    setShowCompleteScreen(false);
  }

  const handleNext = async () => {
    if (currentStep === (activeReview.review.questions.length || 0) - 1) {
      setShowCompleteScreen(true);
      return;
    }
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
  };

  const handleSubmitAnswer = async (formData: FormData): Promise<void> => {
    const answerId = formData.get('answerId');

    if (answerId)
      await updateAnswer(
        formData,
        isReviewee ? FormType.REVIEWEE : FormType.REVIEWER
      );
    else await createAnswer(formData, isReviewee);

    handleNext();
  };

  const handleStartReview = async () => {
    const userReviewId = activeReview.id;

    if (!userReviewId) throw new Error('Missing user review id');

    await setPerformanceReviewStarted(userReviewId, isReviewee);
  };

  const handleCompleteReview = async () => {
    const userReviewId = activeReview.id;

    if (!userReviewId) throw new Error('Missing user review id');

    await setPerformanceReviewCompleted(
      userReviewId,
      activeReview.reviewer_id,
      activeReview.reviewee_id,
      isReviewee
    );
    router.push(`/my-review/${userReviewId}/complete`);
  };

  const showStartScreen = isReviewee
    ? !activeReview.reviewee_started_timestamp
    : !activeReview.reviewer_started_timestamp;
  const personName = isReviewee
    ? activeReview.reviewee.full_name
    : activeReview.reviewer.full_name;

  const completedAnswersLength = !activeReview.answers
    ? 0
    : activeReview.answers.filter(
        (answer) =>
          (isReviewee && answer.reviewee_answer_text) ||
          (!isReviewee && answer.reviewer_answer_text)
      ).length;

  if (activeReview.feedback_completed_timestamp && questionAnswers.length > 0) {
    return (
      <div className="flex flex-col justify-center items-center flex-grow">
        <Feedback questionAnswers={questionAnswers} readonly />
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center flex-grow">
      {showStartScreen || showCompleteScreen ? (
        <div className="flex flex-col w-full h-full lg:pb-20 lg:px-52">
          <InfoScreen
            onStart={handleStartReview}
            onComplete={handleCompleteReview}
            onBackPressed={handleBackToLastStep}
            isStartScreen={showStartScreen}
            personName={personName || ''}
            isReviewee={isReviewee}
          />
        </div>
      ) : (
        <div className="flex flex-col w-full h-full lg:pb-20 lg:px-52 gap-4">
          <div className="flex flex-col w-full">
            <ProgressBar
              total={activeReview.review.questions.length}
              completed={completedAnswersLength}
              currentStep={currentStep + 1}
            />
          </div>
          {isReviewee ? null : (
            <div>
              <span>
                Estas evaluando a: <b>{activeReview.reviewee.full_name}</b>
              </span>
            </div>
          )}
          <div className="flex flex-col flex-1 gap-4 bg-white rounded-lg">
            <form id="question-form">
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
            onSubmit={handleSubmitAnswer}
            showBackButton={currentStep !== 0}
            formId="question-form"
          />
        </div>
      )}
    </div>
  );
};

export default UserReview;
