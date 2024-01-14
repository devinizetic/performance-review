import React from 'react';

const ReviewerDashboard: React.FC = () => {
  const reviewees = [
    { id: '1', name: 'test1', status: 'active', date: '2024-01-14' },
    { id: '2', name: 'test2', status: 'active', date: '2024-01-14' },
    { id: '3', name: 'test3', status: 'active', date: '2024-01-14' }
  ];
  return (
    <div className="flex-grow">
      <div className="text-2xl underline font-bold mb-2">
        Evaluaciones actuales
      </div>
      <div className="flex flex-wrap gap-2">
        {reviewees.map((reviewee) => (
          <div
            key={reviewee.id}
            className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{reviewee.name}</div>
              <p className="text-gray-700 text-base">{reviewee.status}</p>
              <p className="text-gray-700 text-base">{reviewee.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewerDashboard;
