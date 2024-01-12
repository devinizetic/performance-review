import { createServerClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import React from 'react';

const Dashboard: React.FC = async () => {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: userRoles, error } = await supabase.from('app_users').select();
  console.log(userRoles);
  if (error) {
    console.error('Error fetching user roles:', error);
    return;
  }

  if (error) {
    console.error('Error fetching user roles:', error);
    return;
  }

  return <div>Dashboard home page</div>;
};

export default Dashboard;
