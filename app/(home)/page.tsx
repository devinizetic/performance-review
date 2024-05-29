import { REVIEWEE_ROLE_ID, REVIEWER_ROLE_ID } from '@/constants';
import UserRepository from '@/lib/repository/user-repository';
import UserReviewRepository from '@/lib/repository/user-review-repository';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const userRoles = await UserRepository.getUserRoles({ id: session.user.id });
  const isReviewer = userRoles.some(
    (uRole) => uRole.role_id === REVIEWER_ROLE_ID
  );

  const isReviewee = userRoles.some(
    (uRole) => uRole.role_id === REVIEWEE_ROLE_ID
  );

  if (isReviewer) redirect('/reviewees');
  else if (isReviewee) {
    const userReview =
      await UserReviewRepository.getActiveUserReviewByRevieweeId({
        revieweeId: session.user.id
      });
    redirect(`/my-review/${userReview.id}`);
  }

  return session.user ? (
    <div className="flex-1 w-full flex flex-col items-center">
      Hello {session.user.email}!!!
    </div>
  ) : (
    <div className="flex-1 w-full flex flex-col items-center">
      You are logged in but this is wrong
    </div>
  );
}
