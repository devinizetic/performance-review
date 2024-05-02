import AutoSizeTextarea from '@/app/components/auto-size-textarea';
import React from 'react';

interface AnswerTextProps {
  answerText: string;
  isReadOnly: boolean;
}

const AnswerText: React.FC<AnswerTextProps> = ({ answerText, isReadOnly }) => {
  return (
    <div className="flex h-full w-full border border-gray-200 rounded p-1 break-words">
      {isReadOnly ? (
        <div className="p-2">
          <p>{answerText}</p>
        </div>
      ) : (
        <AutoSizeTextarea
          className="px-6 pb-6"
          value={answerText}
          onChange={() => {}}
        />
      )}
    </div>
  );
};

export default AnswerText;
