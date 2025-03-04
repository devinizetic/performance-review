'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export const updateUserStatus = async (userId: string, isActive: boolean) => {
  const supabase = await createClient();
  
  // Update user's active status
  const { error } = await supabase
    .from('app_users')
    .update({ is_active: isActive })
    .eq('id', userId);
  
  if (error) {
    throw new Error(`Failed to update user status: ${error.message}`);
  }
  
  // Revalidate the users page to reflect changes
  revalidatePath('/admin/users');
  
  return { success: true };
};

export const updateUserRoles = async (userId: string, roleIds: string[]) => {
  const supabase = await createClient();
  
  // First remove all current roles
  const { error: deleteError } = await supabase
    .from('user_role')
    .delete()
    .eq('user_id', userId);
  
  if (deleteError) {
    throw new Error(`Failed to remove existing roles: ${deleteError.message}`);
  }
  
  // Then add all the selected roles
  if (roleIds.length > 0) {
    const userRoles = roleIds.map(roleId => ({
      user_id: userId,
      role_id: roleId
    }));
    
    const { error: insertError } = await supabase
      .from('user_role')
      .insert(userRoles);
    
    if (insertError) {
      throw new Error(`Failed to add new roles: ${insertError.message}`);
    }
  }
  
  // Revalidate the users page to reflect changes
  revalidatePath('/admin/users');
  
  return { success: true };
};