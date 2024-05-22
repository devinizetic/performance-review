import AvatarImage from '@/app/components/avatar-image';
import { FeedbackScore } from '@/types/supabase.types';
import React from 'react';

interface FeedbackResultTableProps {
  feedbackScores: FeedbackScore[];
}

const FeedbackResultTable: React.FC<FeedbackResultTableProps> = ({
  feedbackScores
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
            Puntaje
          </th>
        </tr>
      </thead>
      <tbody>
        {feedbackScores.map((feedback) => {
          return (
            <tr
              key={feedback.id}
              className={`border-b last:border-b-0 dark:border-neutral-500`}
            >
              <td className="whitespace-nowrap px-6 py-4 items-center">
                {feedback.reviewer_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 items-center">
                {feedback.reviewee_name}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {feedback.score}/25
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default FeedbackResultTable;
