'use client';
import { AnswersSortedView } from '@/types/supabase.types';
import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import { CustomButton } from '@/app/components/common';
import { setFeedbackCompleted, updateAnswer } from '@/app/actions';
import { FormType } from '@/types';
import { useRouter } from 'next/navigation';

interface FeedbackProps {
  questionAnswers: AnswersSortedView[];
  readonly?: boolean;
  userReviewId?: string;
}

const Feedback: React.FC<FeedbackProps> = ({
  questionAnswers,
  readonly = false,
  userReviewId = null
}) => {
  const maxStep = Math.max(
    ...questionAnswers.map((qAnswer) => qAnswer.question_sequence ?? 0)
  );
  const minStep = Math.min(
    ...questionAnswers.map((qAnswer) => qAnswer.question_sequence ?? 0)
  );

  const [currentStep, setCurrentStep] = useState(minStep);

  function handlePrevious(): void {
    if (currentStep === minStep) return;
    const newStep = currentStep - 1;
    setCurrentStep(newStep);
  }

  const router = useRouter();
  const handleNext = async () => {
    if (currentStep === maxStep && readonly) return;
    if (currentStep === maxStep && !readonly) {
      router.push(`/feedback/${userReviewId}/complete`);
      return;
    }
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
  };

  const handleSubmitAnswer = async (formData: FormData): Promise<void> => {
    if (!readonly) {
      const answerId = formData.get('answerId');
      if (answerId) await updateAnswer(formData, FormType.FEEDBACK);
      if (userReviewId && currentStep === maxStep)
        await setFeedbackCompleted(userReviewId);
    }
    handleNext();
  };

  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex w-full h-full">
        {questionAnswers.map((qAnswer) => {
          return currentStep === qAnswer.question_sequence ? (
            <div key={qAnswer.id} className={`flex gap-5 w-full h-ful`}>
              <div className="flex items-between justify-center gap-5 w-full h-full">
                <QuestionCard
                  questionId={qAnswer.id ?? ''}
                  reviewerAnswerChoiceId={
                    qAnswer.reviewer_answer_choice_id ?? ''
                  }
                  reviewerAnswerText={qAnswer.reviewer_answer_text ?? ''}
                  revieweeAnswerChoiceId={
                    qAnswer.reviewee_answer_choice_id ?? ''
                  }
                  revieweeAnswerText={qAnswer.reviewee_answer_text ?? ''}
                  feedbackChoiceId={qAnswer.feedback_choice_id ?? ''}
                  feedbackText={qAnswer.feedback_text ?? ''}
                  handleSubmitAnswer={handleSubmitAnswer}
                  feedbackAnswerId={qAnswer.feedback_answer_id ?? ''}
                  readonly={readonly}
                />
              </div>
            </div>
          ) : null;
        })}
      </div>
      <div className="flex pt-4 gap-5">
        {currentStep !== minStep && (
          <CustomButton
            form="feedback-form"
            type="button"
            onClick={handlePrevious}
          >
            Anterior
          </CustomButton>
        )}
        <CustomButton form="feedback-form" type="submit">
          {currentStep === maxStep && !readonly ? 'Enviar' : 'Siguiente'}
        </CustomButton>
      </div>
    </div>
  );
};

export default Feedback;
