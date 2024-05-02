import React from 'react';

interface ReviewFooterProps {
  onPrevious: () => void;
  showBackButton: boolean;
}

const ReviewFooter: React.FC<ReviewFooterProps> = ({
  onPrevious,
  showBackButton
}) => {
  return (
    <div className="flex justify-center items-center gap-2 w-full">
      {showBackButton && (
        <button
          className="shrink rounded-lg font-medium border bg-white shadow-lg w-36 py-1 hover:bg-primary hover:text-white"
          type="button"
          onClick={onPrevious}
        >
          Atrás
        </button>
      )}
      <button
        className="shrink rounded-lg font-medium border bg-white shadow-lg w-36 py-1 hover:bg-primary hover:text-white"
        type="submit"
        form="question-form"
      >
        Siguiente
      </button>
    </div>
  );
};

export default ReviewFooter;
