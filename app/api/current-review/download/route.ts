import UserReviewRepository from '@/lib/repository/user-review-repository';
import * as XLSX from 'xlsx';

export async function GET(request: Request) {
  const currentReviews = await UserReviewRepository.getAllCurrentReviews();
  const exportItems = currentReviews.map((review) => {
    return {
      Evaluador: review.reviewer.full_name,
      Evaluado: review.reviewee.full_name,
      Estado: review.feedback_completed_timestamp
        ? 'Feedback completado'
        : review.reviewee_completed_timestamp &&
          review.reviewer_completed_timestamp
        ? 'Completada por ambos'
        : review.reviewee_completed_timestamp
        ? 'Falta que el evaluador complete'
        : review.reviewer_completed_timestamp
        ? 'Falta que el evaluado complete'
        : 'Falta que ambos completen'
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(exportItems);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Current Reviews');
  const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  return new Response(buf, {
    status: 200,
    headers: {
      'Content-disposition': 'attachment; filename=current-reviews.xlsx',
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  });
}
