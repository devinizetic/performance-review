import React, { useRef, useEffect, useState } from 'react';

interface Props {
  value: string;
}

const AutoSizeTextarea: React.FC<Props> = ({ value }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentAnswerText, setCurrentAnswerText] = useState(value);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currentAnswerText]);

  return (
    <div className="px-6 pb-6">
      <textarea
        ref={textareaRef}
        name="answerText"
        value={currentAnswerText}
        onChange={(e) => setCurrentAnswerText(e.target.value)}
        className="w-full border-b border-black bg-transparent outline-none overflow-hidden focus:border-primary focus:border-b-2 resize-none"
        rows={1}
      />
    </div>
  );
};

export default AutoSizeTextarea;
