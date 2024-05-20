import CustomText from './CustomText';

interface ProgressBarProps {
  total: number;
  completed: number;
}

const ProgressBar = ({ total, completed }: ProgressBarProps) => {
  const progress = Number(((completed / total) * 100).toFixed(0));

  return (
    <div className="relative w-full bg-gray-200 rounded-full h-4">
      <CustomText className="absolute inset-0 flex items-center justify-center">
        {/* {`${total} de ${completed} preguntas respondidas`} */}
        {`${progress} % completado`}
      </CustomText>
      <div className="w-full bg-white rounded-full h-4 border border-gray-200">
        <div
          className="bg-primary h-4 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
