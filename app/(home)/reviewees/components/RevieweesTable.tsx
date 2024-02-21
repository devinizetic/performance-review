import AvatarImage from '@/app/components/avatar-image';
import { ReviewerRevieweeView } from '@/types/supabase.types';
import React from 'react';

interface RevieweesTableProps {
  reviewees: ReviewerRevieweeView[];
}

const RevieweesTable: React.FC<RevieweesTableProps> = ({ reviewees }) => {
  return (
    <table className="bg-white w-1/2 p-3">
      <thead>
        <tr>
          <th>Evaluado</th>
          <th>Estado de evaluacion</th>
        </tr>
      </thead>
      <tbody>
        {reviewees.map((reviewee) => (
          <tr key={reviewee.reviewee_id}>
            <td>
              <AvatarImage
                src={reviewee.avatar_url || ''}
                userInitials={`${reviewee.full_name?.split(' ')[0]}${
                  reviewee.full_name?.split(' ')[1]
                }`}
              ></AvatarImage>
              {reviewee.full_name}
            </td>
            <td>Estado de evaluacion</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RevieweesTable;
