import { SimpleUserReview } from '@/types/supabase.types';
import React from 'react';

interface CurrentReviewTableProps {
  currentReviews: SimpleUserReview[];
}

const CurrentReviewTable: React.FC<CurrentReviewTableProps> = ({
  currentReviews
}) => {
  return (
    <table className="min-w-full text-left text-sm bg-white rounded-md shadow-md">
      <thead className="border-b font-medium dark:border-neutral-500">
        <tr>
          <th scope="col" className="px-6 py-4">
            Evaluador
          </th>
          <th scope="col" className="px-6 py-4">
            Evaluado
          </th>
          <th scope="col" className="px-6 py-4">
            Estado
          </th>
        </tr>
      </thead>
      <tbody>
        {currentReviews.map((curReview) => {
          const revieweeCompleted = curReview.reviewee_completed_timestamp;
          const reviewerCompleted = curReview.reviewer_completed_timestamp;
          const isComplete = revieweeCompleted && reviewerCompleted;
          const isFeedbackComplete = curReview.feedback_completed_timestamp;
          const bgColor = isComplete
            ? 'bg-green-100'
            : reviewerCompleted || revieweeCompleted
            ? 'bg-yellow-100'
            : 'bg-red-100';
          return (
            <tr
              key={curReview.id}
              className={`border-b last:border-b-0 dark:border-neutral-500 ${bgColor}`}
            >
              <td className="whitespace-nowrap px-6 py-4 items-center">
                {curReview.reviewer.full_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 items-center">
                {curReview.reviewee.full_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {isFeedbackComplete
                  ? 'Feedback completado'
                  : isComplete
                  ? 'Completada por ambos'
                  : revieweeCompleted
                  ? 'Falta que el evaluador complete'
                  : reviewerCompleted
                  ? 'Falta que el evaluado complete'
                  : 'Falta que ambos completen'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CurrentReviewTable;
