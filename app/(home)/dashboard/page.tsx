import { createServerClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import ReviewerDashboard from './components/reviewer-dashboard';
import RevieweeDashboard from './components/reviewee-dashboard';

const Dashboard: React.FC = async () => {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: userRoles, error } = await supabase
    .from('app_users')
    .select('roles(role_name)')
    .eq('id', user?.id || '');

  const isReviewer =
    userRoles &&
    userRoles.length &&
    userRoles[0].roles.some((rol) => rol.role_name === 'reviewer');
  const isReviewee =
    userRoles &&
    userRoles.length &&
    userRoles[0].roles.some((rol) => rol.role_name === 'reviewee');

  return error || !userRoles || !userRoles.length ? (
    <div>Este usuario todavia no tiene un rol asignado</div>
  ) : (
    <div className="flex flex-col flex-grow">
      {isReviewer && <ReviewerDashboard />}
      {isReviewee && <RevieweeDashboard />}
    </div>
  );
};

export default Dashboard;
