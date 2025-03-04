import { AppUser, Role, UserRole, UserWithRoles } from '@/types/supabase.types';
import { createClient } from '@/utils/supabase/server';

const getAllUsersQuery = async () => {
  const supabase = await createClient();
  return supabase
    .from('app_users')
    .select(
      `
      full_name,
      username
      `
    )
    .eq('is_active', true);
};

const getAllUsers = async (): Promise<AppUser[]> => {
  const { data, error } = await getAllUsersQuery();
  if (error) {
    throw new Error(error.message);
  }

  if (!data) return [] as AppUser[];

  return data as AppUser[];
};

const userRolesQuery = async (userId: string) => {
  const supabase = await createClient();
  return supabase
    .from('user_role')
    .select(
      `
      user_id,
      role_id
      `
    )
    .eq('user_id', userId);
};

const getUserRoles = async ({ id }: { id: string }): Promise<UserRole[]> => {
  const { data, error } = await userRolesQuery(id);
  if (error) {
    throw new Error(error.message);
  }

  if (!data) return [] as UserRole[];

  return data as UserRole[];
};

const getAllUsersWithRolesQuery = async () => {
  const supabase = await createClient();
  return supabase
    .from('app_users')
    .select(`
      id,
      username,
      full_name,
      is_active
    `);
};

const getAllUsersWithRoles = async (): Promise<UserWithRoles[]> => {
  const supabase = await createClient();
  
  // Get all users
  const { data: users, error } = await getAllUsersWithRolesQuery();
  
  if (error) {
    throw new Error(error.message);
  }

  if (!users || users.length === 0) return [] as UserWithRoles[];

  // Get all roles
  const { data: allRoles } = await supabase
    .from('roles')
    .select('id, role_name');

  // Create a mapping of role ids to role names
  const rolesMap = allRoles?.reduce((map, role) => {
    map[role.id] = role.role_name;
    return map;
  }, {} as Record<string, string>) || {};

  // Get roles for each user
  const usersWithRoles: UserWithRoles[] = [];
  
  for (const user of users) {
    const { data: userRoles } = await supabase
      .from('user_role')
      .select('role_id')
      .eq('user_id', user.id);
      
    const userWithRoles = {
      ...user,
      roles: userRoles?.map(ur => ({
        role_id: ur.role_id,
        role_name: rolesMap[ur.role_id] || 'Unknown'
      })) || []
    };
    
    usersWithRoles.push(userWithRoles);
  }

  return usersWithRoles;
};

const getAllRoles = async (): Promise<Role[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('roles')
    .select('id, role_name')
    .order('role_name');
  
  if (error) {
    throw new Error(error.message);
  }

  if (!data) return [] as Role[];

  return data as Role[];
};

const getUserRoleIds = async (userId: string): Promise<string[]> => {
  const userRoles = await getUserRoles({ id: userId });
  return userRoles.map(role => role.role_id);
};

const UserRepository = {
  getUserRoles,
  getAllUsers,
  getAllUsersWithRoles,
  getAllRoles,
  getUserRoleIds
};

export default UserRepository;
