'use client';
import QuestionsRepositoryClient from '@/lib/repository/questions-repository-client';
import React, { useCallback, useEffect, useState } from 'react';
import { FullQuestion } from '@/types/supabase.types';
import AnswersCard from './content/AnswersCard';
import FeedbackForm from './content/FeedbackForm';
import Loading from '@/app/(home)/loading';

interface QuestionCardProps {
  questionId: string;
  // answerId: string;
  reviewerAnswerText: string;
  reviewerAnswerChoiceId: string;
  revieweeAnswerText: string;
  revieweeAnswerChoiceId: string;
  feedbackText: string;
  feedbackChoiceId: string;
  handleSubmitAnswer: (formData: FormData) => Promise<void>;
  feedbackAnswerId: string;
  readonly: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionId,
  // answerId,
  reviewerAnswerText,
  reviewerAnswerChoiceId,
  revieweeAnswerText,
  revieweeAnswerChoiceId,
  feedbackText,
  feedbackChoiceId,
  handleSubmitAnswer,
  feedbackAnswerId,
  readonly
}) => {
  const [question, setQuestion] = useState<FullQuestion | null>(null);

  const getQuestion = useCallback(async () => {
    const questionData = await QuestionsRepositoryClient.getById({
      id: questionId
    });

    if (questionData && questionData.choices) {
      questionData.choices.sort(
        (a, b) => (a.choice_value || 0) - (b.choice_value || 0)
      );
    }

    setQuestion(questionData);
  }, [questionId]);

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  if (!question)
    return (
      <div>
        <Loading />
      </div>
    );

  const hasChoices = question.choices && question.choices.length > 0;
  return (
    <div
      className={`flex w-full flex-col bg-white/95 rounded-2xl shadow-lg border border-gray-100`}
    >
      <div className="rounded-t-2xl px-6 pt-6 pb-3 border-b border-gray-100 bg-white">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {question.question_title}
        </h1>
        <div className="text-base font-medium text-gray-600 opacity-90">
          {question.question_description}
        </div>
      </div>
      {question.questionHints && question.questionHints.length > 0 ? (
        <div className="px-6 pt-6">
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
                  {hint.hint_text_reviewer}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
      <div className="flex flex-col gap-4 px-6 py-4">
        {' '}
        <div className="">
          <div className="text-lg font-semibold text-gray-800 mb-4">
            {question.question_text_reviewer}
          </div>
          <div className="flex items-between justify-around gap-8">
            <AnswersCard
              title="Evaluado"
              question={question}
              hasChoices={hasChoices}
              answerChoiceId={revieweeAnswerChoiceId}
              answerText={revieweeAnswerText}
              readonly={readonly}
              isReviewee={true}
            />
            {(reviewerAnswerText || reviewerAnswerChoiceId) && (
              <AnswersCard
                title="Evaluador"
                question={question}
                hasChoices={hasChoices}
                answerChoiceId={reviewerAnswerChoiceId}
                answerText={reviewerAnswerText}
                readonly={readonly}
                isReviewee={false}
              />
            )}
          </div>
        </div>
        <div>
          <FeedbackForm
            question={question}
            hasChoices={hasChoices}
            feedbackText={feedbackText}
            feedbackChoiceId={feedbackChoiceId}
            handleSubmitAnswer={handleSubmitAnswer}
            feedbackAnswerId={feedbackAnswerId}
            readonly={readonly}
            isReviewee={false}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
