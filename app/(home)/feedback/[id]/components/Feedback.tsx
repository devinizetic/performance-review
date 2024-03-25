'use client';
import { FeedbackQuestionAnswer } from '@/types/supabase.types';
import React, { useState } from 'react';
import QuestionCard from './QuestionCard';

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
    <div>
      {questionAnswers.map((qAnswer) => (
        <div key={qAnswer.id} className="flex gap-5">
          <QuestionCard
            questionId={qAnswer.id}
            answerChoiceId={qAnswer.reviewer_answer_choice_id}
            answerText={qAnswer.reviewer_answer_text}
            isVisible={currentStep == qAnswer.question_sequence}
          />
          <QuestionCard
            questionId={qAnswer.id}
            answerChoiceId={qAnswer.reviewee_answer_choice_id}
            answerText={qAnswer.reviewee_answer_text}
            isVisible={currentStep == qAnswer.question_sequence}
          />
        </div>
      ))}
      <button type="button" onClick={handleNext}>
        Siguiente
      </button>
    </div>
  );
};

export default Feedback;
