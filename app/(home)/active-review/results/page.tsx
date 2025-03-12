import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import UserReviewRepository from '@/lib/repository/user-review-repository';
import FeedbackResultTable from './components/FeedbackResultTable';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function FeedbackResults() {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const feedbackResults = await UserReviewRepository.getFeedbackResults();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados de Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        {feedbackResults && feedbackResults.length ? (
          <FeedbackResultTable feedbackScores={feedbackResults} />
        ) : (
          <div className="text-center text-muted-foreground py-4">
            Aun no hay feedbacks completos.
          </div>
        )}
      </CardContent>
    </Card>
  );
}