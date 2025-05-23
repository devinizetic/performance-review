import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getExternalReviewsForActiveReview } from "@/lib/repository/external-reviews-repository";
import { ExternalReviewList } from "./components/ExternalReviewList";
import { CreateExternalReviewForm } from "./components/CreateExternalReviewForm";
import { createClient } from "@/utils/supabase/server";
import { AppUser } from "@/types/supabase.types";
import { Suspense } from "react";

export const revalidate = 0;

async function getReviewees() {
  const supabase = await createClient();
  
  // Fetch all active users that can be reviewees
  const { data: users, error } = await supabase
    .from('app_users')
    .select('id, full_name')
    .eq('is_active', true)
    .order('full_name', { ascending: true });
    
  if (error) {
    console.error('Error fetching reviewees:', error);
    return [];
  }
  
  return users as Pick<AppUser, 'id' | 'full_name'>[];
}

export default async function ExternalReviewPage() {
  // Fetch external reviews for the active review
  const externalReviews = await getExternalReviewsForActiveReview();
  
  // Fetch potential reviewees for creating new external reviews
  const reviewees = await getReviewees();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Evaluaciones Externas</CardTitle>
          <CardDescription>
            Gestión de evaluaciones externas para el periodo activo
          </CardDescription>
        </div>
        <Suspense fallback={<div>Cargando...</div>}>
          <CreateExternalReviewForm 
            reviewees={reviewees}
          />
        </Suspense>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div className="text-center py-4">Cargando evaluaciones externas...</div>}>
          <ExternalReviewList reviews={externalReviews} />
        </Suspense>
      </CardContent>
    </Card>
  );
}