import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import UserRepository from '@/lib/repository/user-repository';
import { ADMIN_ROLE_ID } from '@/constants';
import { EditRolesDialog } from './components/edit-roles-dialog';
import { UserStatusToggle } from './components/user-status-toggle';
import { ExportUsersButton } from './components/export-users-button';

export default async function UsersAdminPage() {
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
  // Get all users with their roles and all available roles
  const [users, allRoles] = await Promise.all([
    UserRepository.getAllUsersWithRoles(),
    UserRepository.getAllRoles()
  ]);

  // Sort users by full_name alphabetically
  const sortedUsers = users.sort((a, b) => {
    const nameA = a.full_name?.toLowerCase() || '';
    const nameB = b.full_name?.toLowerCase() || '';
    return nameA.localeCompare(nameB);
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle>Usuarios del Sistema</CardTitle>
        {sortedUsers.length > 0 && (
          <ExportUsersButton users={sortedUsers} />
        )}
      </CardHeader>      <CardContent>
        {sortedUsers && sortedUsers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.full_name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.roles && user.roles.map((role) => (
                        <Badge 
                          key={role.role_id} 
                          variant={role.role_id === ADMIN_ROLE_ID ? "default" : "outline"}
                        >
                          {role.role_name || 'Usuario'}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <UserStatusToggle user={user} />
                  </TableCell>
                  <TableCell>
                    <EditRolesDialog 
                      user={user}
                      allRoles={allRoles}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center text-muted-foreground">
            No hay usuarios registrados en el sistema.
          </div>
        )}
      </CardContent>
    </Card>
  );
}