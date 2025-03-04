CREATE POLICY "Admins can insert user roles" ON user_role
FOR INSERT 
TO authenticated
WITH CHECK (
  -- Check if user is admin
  EXISTS (
    SELECT 1 FROM user_role ur
    WHERE ur.user_id = auth.uid() 
    AND ur.role_id = 'ced3b2b5-cb87-4010-bfbf-f034d4d96d71' -- Replace with your actual admin role ID
  )
);

CREATE POLICY "Admins can delete user roles" ON user_role
FOR DELETE 
TO authenticated
USING (
  -- Check if user is admin
  EXISTS (
    SELECT 1 FROM user_role ur
    WHERE ur.user_id = auth.uid() 
    AND ur.role_id = 'ced3b2b5-cb87-4010-bfbf-f034d4d96d71' -- Replace with your actual admin role ID
  )
);

CREATE POLICY "Admins can update users" ON app_users
FOR UPDATE 
TO authenticated
USING (
  -- Check if user is admin
  EXISTS (
    SELECT 1 FROM user_role ur
    WHERE ur.user_id = auth.uid() 
    AND ur.role_id = 'ced3b2b5-cb87-4010-bfbf-f034d4d96d71' -- Replace with your actual admin role ID
  )
);