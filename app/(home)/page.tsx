import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import UserReviewRepository from '@/lib/repository/user-review-repository';
import RevieweesRepository from '@/lib/repository/reviewees-repository';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { ReviewList } from '../components/dashboard/ReviewList';
import { RevieweesList } from '../components/dashboard/RevieweesList';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  // Get reviews where I am the reviewee
  const currentReviews = await UserReviewRepository.getAllCurrentReviews();
  const myReviews = currentReviews.filter(
    (review) => review.reviewee.id === session.user.id
  );

  // Get reviewees assigned to me
  const myReviewees = await RevieweesRepository.getAllByReviewerId({
    id: session.user.id
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto w-full">
      <div className="grid gap-8 md:grid-cols-2">
        <DashboardCard title="Mis Evaluaciones">
          <ReviewList 
            reviews={myReviews}
            baseUrl="/my-review"
          />
        </DashboardCard>

        <DashboardCard title="Mis Evaluados">
          <RevieweesList reviewees={myReviewees} />
        </DashboardCard>
      </div>
    </div>
  );
}
