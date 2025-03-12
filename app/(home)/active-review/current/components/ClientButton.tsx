'use client';
import { startActiveReview } from '@/app/actions';
import React from 'react';

interface ClientButtonProps {
  reviewId: string;
}

const ClientButton: React.FC<ClientButtonProps> = ({ reviewId }) => {
  return (
    <button
      className="shrink rounded-lg font-medium border bg-white shadow-lg w-36 py-1 hover:bg-primary hover:text-white"
      onClick={() => startActiveReview(reviewId)}
    >
      Iniciar periodo actual
    </button>
  );
};

export default ClientButton;
