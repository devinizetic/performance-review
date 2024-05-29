import Link from 'next/link';
import React from 'react';

type ReviewStateProps = {
  userReviewId: string;
  isReviewerCompleted: boolean;
  isRevieweeCompleted: boolean;
  reviewerId: string;
  revieweeId: string;
};

const ReviewLabel: React.FC<{ text: string }> = ({ text }) => <div>{text}</div>;

const ReviewState: React.FC<ReviewStateProps> = ({
  userReviewId,
  isReviewerCompleted,
  isRevieweeCompleted,
  reviewerId,
  revieweeId
}) => {
  if (!userReviewId) return <ReviewLabel text="No hay evaluaciones activas" />;

  if (isReviewerCompleted && !isRevieweeCompleted)
    return <ReviewLabel text="Esperando evaluacion del evaluado" />;

  const isComplete = isReviewerCompleted && isRevieweeCompleted;
  const linkPath = isComplete
    ? `/feedback/${userReviewId}`
    : `/my-review/${userReviewId}`;
  const linkLabel = isComplete ? 'Ver Feedback' : 'Realizar Evaluación';

  return (
    <Link
      className="inline-block px-6 py-2 rounded-lg bg-primary text-white text-center cursor-pointer font-bold transform transition-transform duration-300 hover:scale-105"
      href={{ pathname: linkPath }}
    >
      {linkLabel}
    </Link>
  );
};

export default ReviewState;
