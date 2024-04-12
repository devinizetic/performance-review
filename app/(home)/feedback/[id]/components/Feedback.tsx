'use client';
import { FeedbackQuestionAnswer } from '@/types/supabase.types';
import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import { CustomButton } from '@/app/components/common';

interface FeedbackProps {
  questionAnswers: FeedbackQuestionAnswer;
}

const Feedback: React.FC<FeedbackProps> = ({ questionAnswers }) => {
  const maxStep = Math.max(
    ...questionAnswers.map((qAnswer) => qAnswer.question_sequence)
  );
  const minStep = Math.min(
    ...questionAnswers.map((qAnswer) => qAnswer.question_sequence)
  );
  const [currentStep, setCurrentStep] = useState(minStep);
  function handlePrevious(): void {
    if (currentStep === minStep) return;
    const newStep = currentStep - 1;
    setCurrentStep(newStep);
  }

  const handleNext = async () => {
    if (currentStep === maxStep) return;
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
  };

  // const handleSubmitAnswer = async (formData: FormData): Promise<void> => {
  //   const answerId = formData.get('answerId');

  //   if (answerId) await updateAnswer(formData);
  //   else await createAnswer(formData);

  //   handleNext();
  // };

  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex w-full h-full">
        {questionAnswers.map((qAnswer) => {
          return (
            <div
              key={qAnswer.id}
              className={`flex gap-5 w-full h-ful ${
                currentStep === qAnswer.question_sequence ? 'block' : 'hidden'
              }`}
            >
              <div className="flex items-between justify-center gap-5 w-full h-full">
                <QuestionCard
                  questionId={qAnswer.id}
                  reviewerAnswerChoiceId={qAnswer.reviewer_answer_choice_id}
                  reviewerAnswerText={qAnswer.reviewer_answer_text}
                  revieweeAnswerChoiceId={qAnswer.reviewee_answer_choice_id}
                  revieweeAnswerText={qAnswer.reviewee_answer_text}
                  isVisible={currentStep == qAnswer.question_sequence}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex p-5 gap-5">
        {currentStep !== minStep && (
          <CustomButton type="button" onClick={handlePrevious}>
            Anterior
          </CustomButton>
        )}
        <CustomButton type="button" onClick={handleNext}>
          Siguiente
        </CustomButton>
      </div>
    </div>
  );
};

export default Feedback;
