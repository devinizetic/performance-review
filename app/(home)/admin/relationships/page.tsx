import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UserRepository from '@/lib/repository/user-repository';
import { ADMIN_ROLE_ID } from '@/constants';

export default async function RelationshipsAdminPage() {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  // Get the current user's roles to verify they're an admin
  const userRoles = await UserRepository.getUserRoles({ id: session.user.id });
  const isAdmin = userRoles.some(role => role.role_id === ADMIN_ROLE_ID);

  if (!isAdmin) {
    // If not an admin, redirect to home
    redirect('/');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Relaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground">
          Aquí se implementará la gestión de relaciones entre usuarios.
        </div>
      </CardContent>
    </Card>
  );
}