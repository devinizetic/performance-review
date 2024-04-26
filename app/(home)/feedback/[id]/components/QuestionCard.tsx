'use client';
import QuestionsRepositoryClient from '@/lib/repository/questions-repository-client';
import React, { useCallback, useEffect, useState } from 'react';
import AnswerText from './AnswerTextForm';
import { FullQuestion } from '@/types/supabase.types';
import { CustomButton, CustomText } from '@/app/components/common';
import AutoSizeTextarea from '@/app/components/auto-size-textarea';
import ChoiceCard from './content/ChoiceCard';
import AnswersCard from './content/AnswersCard';
import FeedbackForm from './content/FeedbackForm';

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
    setQuestion(questionData);
  }, [questionId]);

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  if (!question) return <div>La pregunta no existe</div>;

  const hasChoices = question.choices && question.choices.length > 0;

  console.log(reviewerAnswerText);
  console.log(reviewerAnswerChoiceId);

  return (
    <div className={`flex w-full flex-col bg-white rounded-lg`}>
      <h1 className="shrink text-xl font-bold p-6 text-white bg-primary rounded-t-lg">
        {question.question_title}
      </h1>
      <div className="flex flex-col gap-4 px-6 py-4">
        <div className="shrink text-lg font-medium">
          {question.question_description}
        </div>
        {question.questionHints && question.questionHints.length > 0 ? (
          <div className="shrink">
            <div className="bg-primary bg-opacity-10 font-medium p-2 rounded-lg">
              <ul>
                {question.questionHints.map((hint, index) => (
                  <li key={hint.id} className="p-1">
                    {hint.hint_text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        <div className="">
          <CustomText size="medium" bold className="pt-2">
            {question.question_text}
          </CustomText>
          <div className="flex items-between justify-around gap-8">
            <AnswersCard
              title="Evaluado"
              question={question}
              hasChoices={hasChoices}
              answerChoiceId={revieweeAnswerChoiceId}
              answerText={revieweeAnswerText}
              readonly={readonly}
            />
            {(reviewerAnswerText || reviewerAnswerChoiceId) && (
              <AnswersCard
                title="Evaluador"
                question={question}
                hasChoices={hasChoices}
                answerChoiceId={reviewerAnswerChoiceId}
                answerText={reviewerAnswerText}
                readonly={readonly}
              />
            )}
          </div>
        </div>
        <div className="px-5">
          <FeedbackForm
            question={question}
            hasChoices={hasChoices}
            feedbackText={feedbackText}
            feedbackChoiceId={feedbackChoiceId}
            handleSubmitAnswer={handleSubmitAnswer}
            feedbackAnswerId={feedbackAnswerId}
            readonly={readonly}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
