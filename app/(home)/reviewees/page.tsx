import RevieweesRepository from '@/lib/repository/reviewees-repository';
import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import RevieweesTable from './components/RevieweesTable';

export default async function Home() {
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const revieweesList = await RevieweesRepository.getAllByReviewerId({
    id: session.user.id
  });
  console.log(revieweesList);
  return revieweesList && revieweesList.length ? (
    <div>
      <RevieweesTable reviewees={revieweesList}></RevieweesTable>
    </div>
  ) : (
    <div className="flex-1 w-full flex flex-col items-center">
      Por el momento no tenes evaluados asignados.
    </div>
  );
}
