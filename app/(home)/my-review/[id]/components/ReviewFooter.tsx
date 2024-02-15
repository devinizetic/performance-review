import React from 'react';

interface ReviewFooterProps {
  onPrevious: () => void;
}

const ReviewFooter: React.FC<ReviewFooterProps> = ({ onPrevious }) => {
  return (
    <div className="flex gap-2 w-full mt-4">
      <button
        className="shrink rounded-lg font-medium border bg-white shadow-lg w-36 py-1 hover:border-none hover:bg-primary hover:text-white"
        type="button"
        onClick={onPrevious}
      >
        Atrás
      </button>
      <button
        className="shrink rounded-lg font-medium border bg-white shadow-lg w-36 py-1 hover:border-none hover:bg-primary hover:text-white"
        type="submit"
        form="question-form"
      >
        Siguiente
      </button>
    </div>
  );
};

export default ReviewFooter;
