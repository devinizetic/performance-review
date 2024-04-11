import AutoSizeTextarea from '@/app/components/auto-size-textarea';
import React from 'react';

interface AnswerTextProps {
  answerText: string;
  isReadOnly: boolean;
}

const AnswerText: React.FC<AnswerTextProps> = ({ answerText, isReadOnly }) => {
  return (
    <div className="flex h-full">
      {isReadOnly ? (
        <div className="px-6 pb-6">
          <p>{answerText}</p>
        </div>
      ) : (
        <AutoSizeTextarea value={answerText} onChange={() => {}} />
      )}
    </div>
  );
};

export default AnswerText;
