import AutoSizeTextarea from '@/app/components/auto-size-textarea';
import React from 'react';

interface AnswerTextProps {
  answerText: string;
  isReadOnly: boolean;
}

const AnswerText: React.FC<AnswerTextProps> = ({ answerText, isReadOnly }) => {
  return (
    <div className="flex h-full w-full border border-gray-200 rounded-lg bg-gray-50 break-words">
      {isReadOnly ? (
        <div className="p-3 w-full">
          <p className="text-gray-900 whitespace-pre-wrap">{answerText}</p>
        </div>
      ) : (
        <AutoSizeTextarea
          className="w-full min-h-[70px] rounded-lg border-0 bg-transparent focus:border-primary/60 focus:ring-2 focus:ring-primary/20 px-3 py-2 text-gray-900 transition resize-none"
          value={answerText}
          onChange={() => {}}
        />
      )}
    </div>
  );
};

export default AnswerText;
