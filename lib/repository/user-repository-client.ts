import {
  AppUser,
  ReviewerWithReviewees,
  Role,
  UserRole,
  UserWithRoles
} from '@/types/supabase.types';
import { createClient } from '@/utils/supabase/client';
import { REVIEWER_ROLE_ID } from '@/constants';

const getAllUsersQuery = async () => {
  const supabase = createClient();
  return supabase
    .from('app_users')
    .select(
      `
      id,
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
  const supabase = createClient();
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
  const supabase = createClient();
  return supabase.from('app_users').select(`
      id,
      username,
      full_name,
      is_active
    `);
};

const getAllUsersWithRoles = async (): Promise<UserWithRoles[]> => {
  const supabase = createClient();

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
  const rolesMap =
    allRoles?.reduce((map, role) => {
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
      roles:
        userRoles?.map((ur) => ({
          role_id: ur.role_id,
          role_name: rolesMap[ur.role_id] || 'Unknown'
        })) || []
    };

    usersWithRoles.push(userWithRoles);
  }

  return usersWithRoles;
};

const getAllRoles = async (): Promise<Role[]> => {
  const supabase = createClient();
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
  return userRoles.map((role) => role.role_id);
};

const getReviewersWithReviewees = async (): Promise<
  ReviewerWithReviewees[]
> => {
  const supabase = createClient();

  // Get all users with reviewer role
  const { data: reviewerIds, error: roleError } = await supabase
    .from('user_role')
    .select('user_id')
    .eq('role_id', REVIEWER_ROLE_ID);

  if (roleError) {
    throw new Error(roleError.message);
  }

  if (!reviewerIds || reviewerIds.length === 0)
    return [] as ReviewerWithReviewees[];

  const reviewerIdArray = reviewerIds.map((item) => item.user_id);

  const { data: reviewers, error: reviewersError } = await supabase
    .from('app_users')
    .select('id, username, full_name, avatar_url')
    .eq('is_active', true)
    .in('id', reviewerIdArray);

  if (reviewersError) {
    throw new Error(reviewersError.message);
  }

  if (!reviewers || reviewers.length === 0)
    return [] as ReviewerWithReviewees[];

  // For each reviewer, get their reviewees
  const reviewersWithReviewees: ReviewerWithReviewees[] = [];
  for (const reviewer of reviewers) {
    const { data: reviewerReviewees, error: revieweesError } = await supabase
      .from('reviewer_reviewee')
      .select(
        `
        reviewee:reviewee_id(
          id,
          username,
          full_name,
          avatar_url
        )
      `
      )
      .eq('reviewer_id', reviewer.id);

    if (revieweesError) {
      console.error(
        `Error fetching reviewees for reviewer ${reviewer.id}:`,
        revieweesError.message
      );
      continue;
    }

    const reviewerWithReviewees = {
      ...reviewer,
      reviewees: reviewerReviewees
        ? reviewerReviewees.map((r) => r.reviewee as any)
        : []
    };

    reviewersWithReviewees.push(reviewerWithReviewees);
  }

  return reviewersWithReviewees;
};

const UserRepositoryClient = {
  getUserRoles,
  getAllUsers,
  getAllUsersWithRoles,
  getAllRoles,
  getUserRoleIds,
  getReviewersWithReviewees
};

export default UserRepositoryClient;
