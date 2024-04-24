import { UserRole } from '@/types/supabase.types';
import { createServerClient } from '@/utils/supabase/server';

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
  getUserRoles
};

export default UserRepository;
