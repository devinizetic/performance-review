import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import UserRepository from '@/lib/repository/user-repository';
import { ADMIN_ROLE_ID, REVIEWER_ROLE_ID } from '@/constants';
import { ReviewerWithReviewees } from '@/types/supabase.types';
import { RelationshipsList } from './components/relationships-list';

export default async function RelationshipsAdminPage() {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  // Get the current user's roles to verify they're an admin
  const userRoles = await UserRepository.getUserRoles({ id: session.user.id });
  const isAdmin = userRoles.some((role) => role.role_id === ADMIN_ROLE_ID);

  if (!isAdmin) {
    // If not an admin, redirect to home
    redirect('/');
  }
  // Get all reviewers with their reviewees
  const reviewersWithReviewees =
    await UserRepository.getReviewersWithReviewees();

  // Sort reviewers alphabetically by full_name
  const sortedReviewers = reviewersWithReviewees.sort((a, b) => {
    const nameA = a.full_name?.toLowerCase() || '';
    const nameB = b.full_name?.toLowerCase() || '';
    return nameA.localeCompare(nameB);
  });

  // Get all potential reviewees (users who could be assigned to reviewers)
  const potentialReviewees = await UserRepository.getAllUsersWithRoles();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Relaciones</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedReviewers.length > 0 ? (
          <RelationshipsList
            reviewers={sortedReviewers}
            allUsers={potentialReviewees}
          />
        ) : (
          <div className="text-center text-muted-foreground py-8">
            No hay revisores asignados en el sistema. Primero necesitas asignar
            el rol de revisor a algunos usuarios.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
