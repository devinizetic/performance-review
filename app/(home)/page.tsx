import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import UserReviewRepository from '@/lib/repository/user-review-repository';
import RevieweesRepository from '@/lib/repository/reviewees-repository';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { ReviewList } from '../components/dashboard/ReviewList';
import { RevieweesList } from '../components/dashboard/RevieweesList';
import { AdminReviewCard } from '../components/dashboard/AdminReviewCard';
import UserRepository from '@/lib/repository/user-repository';
import { ADMIN_ROLE_ID, REVIEWEE_ROLE_ID, REVIEWER_ROLE_ID } from '@/constants';
import ReviewsRepository from '@/lib/repository/reviews-repository';
import { RevieweeStatusCard } from '../components/dashboard/RevieweeStatusCard';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  // Get user roles to check if admin
  const userRoles = await UserRepository.getUserRoles({
    id: session.user.id
  });
  const isAdmin = userRoles.some((role) => role.role_id === ADMIN_ROLE_ID);
  const isReviewer = userRoles.some(
    (role) => role.role_id === REVIEWER_ROLE_ID
  );
  const isReviewee = userRoles.some(
    (role) => role.role_id === REVIEWEE_ROLE_ID
  );

  // Get reviews where I am the reviewee
  const myReviews = await UserReviewRepository.getCurrentReviewsByRevieweeId({
    revieweeId: session.user.id
  });

  // Get reviewees assigned to me
  const myReviewees = isReviewer
    ? await RevieweesRepository.getAllByReviewerId({
        id: session.user.id
      })
    : [];

  // Get all reviews for admin view
  const activeReview = await ReviewsRepository.getActive();

  const allReviews =
    isAdmin && activeReview?.id
      ? await UserReviewRepository.getAllCurrentReviews(activeReview.id)
      : [];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto w-full">
      <div className="grid gap-8 md:grid-cols-2">
        {isAdmin && <AdminReviewCard reviews={allReviews} />}
        {isReviewee && myReviews.length > 0 && (
          <DashboardCard title="Estado de tu Evaluación">
            <RevieweeStatusCard
              review={myReviews.find((r) => r.review?.is_active)!}
            />
          </DashboardCard>
        )}
        {isReviewee && (
          <DashboardCard title="Mis Evaluaciones">
            <ReviewList reviews={myReviews} baseUrl="/my-review" />
          </DashboardCard>
        )}
        {isReviewer && (
          <DashboardCard title="Mis Evaluados">
            <RevieweesList reviewees={myReviewees} />
          </DashboardCard>
        )}
      </div>
    </div>
  );
}
