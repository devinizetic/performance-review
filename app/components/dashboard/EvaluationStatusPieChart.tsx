import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { SimpleUserReview } from '@/types/supabase.types';

interface EvaluationStatusPieChartProps {
  reviews: SimpleUserReview[];
}

export function EvaluationStatusPieChart({ reviews }: EvaluationStatusPieChartProps) {
  const data = reviews.reduce((acc, review) => {
    const revieweeCompleted = review.reviewee_completed_timestamp;
    const reviewerCompleted = review.reviewer_completed_timestamp;

    if (revieweeCompleted && reviewerCompleted) {
      acc.bothCompleted++;
    } else if (revieweeCompleted) {
      acc.onlyRevieweeCompleted++;
    } else if (reviewerCompleted) {
      acc.onlyReviewerCompleted++;
    } else {
      acc.noneCompleted++;
    }
    return acc;
  }, {
    bothCompleted: 0,
    onlyRevieweeCompleted: 0,
    onlyReviewerCompleted: 0,
    noneCompleted: 0
  });

  const chartData = [
    { name: 'Completado por ambos', value: data.bothCompleted, color: '#22c55e' },
    { name: 'Solo evaluado', value: data.onlyRevieweeCompleted, color: '#eab308' },
    { name: 'Solo evaluador', value: data.onlyReviewerCompleted, color: '#3b82f6' },
    { name: 'Pendiente', value: data.noneCompleted, color: '#ef4444' }
  ].filter(item => item.value > 0);

  if (chartData.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No hay evaluaciones activas
      </div>
    );
  }

  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}