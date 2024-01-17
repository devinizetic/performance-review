'use client';
import { FullReview } from '@/lib/repository/user-review-repository';
import React, { useState } from 'react';

interface UserReviewProps {
  activeReview: FullReview;
}

const UserReview: React.FC<UserReviewProps> = ({ activeReview }) => {
  const [currentStep, setCurrentStep] = useState(0);

  function handlePrevious(): void {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  }

  function handleNext(): void {
    if (currentStep === (activeReview?.review?.questions.length || 0) - 1)
      return;
    setCurrentStep(currentStep + 1);
  }

  const questionComponents = activeReview?.review?.questions.map(
    (question, index) => {
      return (
        <div key={question.id}>
          <h1 className="text-xl font-bold">{question.question_title}</h1>
          <div className="text-lg">{question.question_description}</div>
          <div className="text-lg font-bold">{question.question_text}</div>
          <input type="text" />
          <div>
            <ul>
              {question.question_hints.map((hint, index) => (
                <li key={hint.id}>{hint.hint_text}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  );

  return (
    <div className="flex flex-col justify-center items-center flex-grow">
      <div>
        {questionComponents &&
          questionComponents.length &&
          questionComponents[currentStep]}
      </div>
      <div className="flex justify-between w-full">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default UserReview;
