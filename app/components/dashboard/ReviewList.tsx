import { SimpleUserReview } from '@/types/supabase.types';
import React from 'react';
import { ReviewItem } from './ReviewItem';

interface ReviewListProps {
  reviews: SimpleUserReview[];
  baseUrl: string;
}

export function ReviewList({ reviews, baseUrl }: ReviewListProps) {
  if (!reviews.length) {
    return (
      <div className="text-gray-500 text-center py-4 bg-gray-50/50 rounded-md">
        No hay evaluaciones activas
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <ReviewItem 
          key={review.id}
          review={review}
          href={`${baseUrl}/${review.id}`}
        />
      ))}
    </div>
  );
}