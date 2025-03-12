-- Add policies for admin users to manage reviewer_reviewee relationships

-- First, drop any existing policy that might conflict
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."reviewer_reviewee";
DROP POLICY IF EXISTS "Enable select for authenticated users only" ON "public"."reviewer_reviewee";

-- Create policy for users to see only their own relationships
CREATE POLICY "Users can see their own relationships"
ON "public"."reviewer_reviewee"
FOR SELECT 
TO authenticated
USING (
  auth.uid() = reviewer_id OR 
  auth.uid() = reviewee_id
);

-- Create policy for admin users to see all relationships
CREATE POLICY "Admins can see all relationships"
ON "public"."reviewer_reviewee"
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_role ur
    WHERE ur.user_id = auth.uid() 
    AND ur.role_id = 'ced3b2b5-cb87-4010-bfbf-f034d4d96d71' -- ADMIN_ROLE_ID
  )
);

-- Create policy for admin users to insert relationships
CREATE POLICY "Admins can insert relationships"
ON "public"."reviewer_reviewee"
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_role ur
    WHERE ur.user_id = auth.uid() 
    AND ur.role_id = 'ced3b2b5-cb87-4010-bfbf-f034d4d96d71' -- ADMIN_ROLE_ID
  )
);

-- Create policy for admin users to delete relationships
CREATE POLICY "Admins can delete relationships"
ON "public"."reviewer_reviewee"
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_role ur
    WHERE ur.user_id = auth.uid() 
    AND ur.role_id = 'ced3b2b5-cb87-4010-bfbf-f034d4d96d71' -- ADMIN_ROLE_ID
  )
);

-- Create policy for admin users to update relationships
CREATE POLICY "Admins can update relationships"
ON "public"."reviewer_reviewee"
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_role ur
    WHERE ur.user_id = auth.uid() 
    AND ur.role_id = 'ced3b2b5-cb87-4010-bfbf-f034d4d96d71' -- ADMIN_ROLE_ID
  )
);