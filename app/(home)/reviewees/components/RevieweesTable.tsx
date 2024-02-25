import AvatarImage from '@/app/components/avatar-image';
import { ReviewerRevieweeView } from '@/types/supabase.types';
import Link from 'next/link';
import React from 'react';

interface RevieweesTableProps {
  reviewees: ReviewerRevieweeView[];
}

const RevieweesTable: React.FC<RevieweesTableProps> = ({ reviewees }) => {
  return (
    <table className="min-w-full text-left text-sm bg-white rounded-md shadow-md">
      <thead className="border-b font-medium dark:border-neutral-500">
        <tr>
          <th scope="col" className="px-6 py-4">
            Evaluado
          </th>
          <th scope="col" className="px-6 py-4">
            Estado de evaluacion
          </th>
        </tr>
      </thead>
      <tbody>
        {reviewees.map((reviewee) => (
          <tr
            key={reviewee.reviewee_id}
            className="border-b last:border-b-0 dark:border-neutral-500"
          >
            <td className="whitespace-nowrap px-6 py-4 flex items-center">
              <AvatarImage
                src={reviewee.avatar_url || ''}
                userInitials={`${reviewee.full_name?.split(' ')[0]}${
                  reviewee.full_name?.split(' ')[1]
                }`}
              ></AvatarImage>
              {reviewee.full_name}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              {reviewee.user_review_id ? (
                <Link
                  className="text-blue-700 underline cursor-pointer"
                  href={`/my-review/${reviewee.user_review_id}`}
                >
                  En curso
                </Link>
              ) : (
                'No existe evaluacion actual'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RevieweesTable;
