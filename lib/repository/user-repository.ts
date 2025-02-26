import { AppUser, UserRole } from '@/types/supabase.types';
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

const UserRepository = {
  getUserRoles,
  getAllUsers
};

export default UserRepository;
