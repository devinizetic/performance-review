'use client';
import React, { useState } from 'react';

interface ReviewFooterProps {
  onPrevious: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  showBackButton: boolean;
  formId: string;
}

const ReviewFooter: React.FC<ReviewFooterProps> = ({
  onPrevious,
  onSubmit,
  showBackButton,
  formId
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    const form = document.getElementById(formId) as HTMLFormElement;
    if (form && form.checkValidity()) {
      setIsLoading(true);
      // Manually handle form submission
      const formData = new FormData(form);
      await onSubmit(formData);
      setIsLoading(false);
    } else {
      form.reportValidity();
    }
  };
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
        type="button"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? 'Guardando...' : 'Siguiente'}
      </button>
    </div>
  );
};

export default ReviewFooter;
