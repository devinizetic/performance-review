'use client';
import React, { useRef, useEffect, useState } from 'react';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  readonly?: boolean;
}

const AutoSizeTextarea: React.FC<Props> = ({
  value,
  onChange,
  required = true,
  readonly = false
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="px-6 pb-6">
      <textarea
        ref={textareaRef}
        name="answerText"
        value={value}
        onChange={onChange}
        className="w-full border-b border-black bg-transparent outline-none overflow-hidden focus:border-primary focus:border-b-2 resize-none"
        rows={1}
        required={required}
        disabled={readonly}
      />
    </div>
  );
};

export default AutoSizeTextarea;
