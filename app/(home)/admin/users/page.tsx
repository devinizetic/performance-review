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

  // Get all users with their roles
  const users = await UserRepository.getAllUsersWithRoles();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuarios del Sistema</CardTitle>
      </CardHeader>
      <CardContent>
        {users && users.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
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
                    <Badge 
                      variant={user.is_active ? "default" : "destructive"}
                      className={user.is_active ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {user.is_active ? 'Activo' : 'Inactivo'}
                    </Badge>
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