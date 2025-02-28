import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import CurrentReviewTable from './components/CurrentReviewTable';
import UserReviewRepository from '@/lib/repository/user-review-repository';
import ReviewsRepository from '@/lib/repository/reviews-repository';
import ClientButton from './components/ClientButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function CurrentReview() {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const activeReview = await ReviewsRepository.getActive();

  if (!activeReview) 
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            No hay evaluaciones activas
          </div>
        </CardContent>
      </Card>
    );

  if (!activeReview.start_date)
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center">
            <ClientButton reviewId={activeReview.id} />
          </div>
        </CardContent>
      </Card>
    );

  const currentReviews = await UserReviewRepository.getAllCurrentReviews(activeReview.id);

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>Estado de Evaluaciones</CardTitle>
        {currentReviews && currentReviews.length > 0 && (
          <Button asChild size="sm">
            <Link href="/api/current-review/download">
              <FileDown className="mr-2 h-4 w-4" />
              Exportar a Excel
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {currentReviews && currentReviews.length ? (
          <CurrentReviewTable currentReviews={currentReviews} />
        ) : (
          <div className="text-center text-muted-foreground">
            Por el momento no hay evaluaciones activas.
          </div>
        )}
      </CardContent>
    </Card>
  );
}