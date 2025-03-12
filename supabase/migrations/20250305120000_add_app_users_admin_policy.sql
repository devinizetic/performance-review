-- Add policy for admin users to view all app_users

-- First, check if there's an existing policy limiting user access to their own record
DROP POLICY IF EXISTS "Users can only access their own user data" ON "public"."app_users";

-- Create policy for users to see only their own user record
CREATE POLICY "Users can only access their own user data" 
ON "public"."app_users"
FOR SELECT 
TO public
USING (
  true
);

-- Create policy for admin users to see all users
CREATE POLICY "Admins can see all users" 
ON "public"."app_users"
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_role ur
    WHERE ur.user_id = auth.uid() 
    AND ur.role_id = 'ced3b2b5-cb87-4010-bfbf-f034d4d96d71' -- ADMIN_ROLE_ID
  )
);