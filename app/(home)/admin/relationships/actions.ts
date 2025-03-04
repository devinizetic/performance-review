'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export const addReviewee = async (reviewerId: string, revieweeId: string) => {
  const supabase = await createClient();
  
  // Check if relationship already exists
  const { data: existingRelation, error: checkError } = await supabase
    .from('reviewer_reviewee')
    .select()
    .eq('reviewer_id', reviewerId)
    .eq('reviewee_id', revieweeId)
    .single();
  
  if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error code
    throw new Error(`Failed to check existing relationship: ${checkError.message}`);
  }
  
  if (existingRelation) {
    // Relationship already exists, no need to create it
    return { success: true, message: 'Relationship already exists' };
  }
  
  // Add the reviewee to the reviewer
  const { error } = await supabase
    .from('reviewer_reviewee')
    .insert({
      reviewer_id: reviewerId,
      reviewee_id: revieweeId
    });
  
  if (error) {
    throw new Error(`Failed to add reviewee: ${error.message}`);
  }
  
  // Revalidate the relationships page to reflect changes
  revalidatePath('/admin/relationships');
  
  return { success: true };
};

export const removeReviewee = async (reviewerId: string, revieweeId: string) => {
  const supabase = await createClient();
  
  // Remove the reviewee from the reviewer
  const { error } = await supabase
    .from('reviewer_reviewee')
    .delete()
    .eq('reviewer_id', reviewerId)
    .eq('reviewee_id', revieweeId);
  
  if (error) {
    throw new Error(`Failed to remove reviewee: ${error.message}`);
  }
  
  // Revalidate the relationships page to reflect changes
  revalidatePath('/admin/relationships');
  
  return { success: true };
};