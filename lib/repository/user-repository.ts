import { AppUser, UserRole } from '@/types/supabase.types';
import { createServerClient } from '@/utils/supabase/server';

const getAllUsersQuery = () => {
  const supabase = createServerClient();
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

const userRolesQuery = (userId: string) => {
  const supabase = createServerClient();
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
