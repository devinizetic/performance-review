import { ReviewerRevieweeView } from '@/types/supabase.types';
import React from 'react';
import { RevieweeItem } from './RevieweeItem';

interface RevieweesListProps {
  reviewees: ReviewerRevieweeView[];
}

export function RevieweesList({ reviewees }: RevieweesListProps) {
  if (!reviewees.length) {
    return (
      <div className="text-gray-500 text-center py-4 bg-gray-50/50 rounded-md">
        No hay evaluados asignados
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reviewees.map((reviewee) => (
        <RevieweeItem 
          key={reviewee.reviewee_id}
          reviewee={reviewee}
        />
      ))}
    </div>
  );
}