import CustomText from './CustomText';

interface ProgressBarProps {
  total: number;
  completed: number;
}

const ProgressBar = ({ total, completed }: ProgressBarProps) => {
  const progress = Number(((completed / total) * 100).toFixed(0));

  return (
    <div className="relative flex flex-col w-full">
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div className="w-full bg-white rounded-full h-4 border border-gray-200">
          <div
            className="bg-primary h-4 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <CustomText
        className="inset-0 flex items-center justify-center pt-2"
        bold
      >
        {`${completed} / ${total} `}
      </CustomText>
    </div>
  );
};

export default ProgressBar;
