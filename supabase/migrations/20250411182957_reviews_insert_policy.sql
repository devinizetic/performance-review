-- Create policy for inserting into reviews table
CREATE POLICY "Allow authenticated users to create reviews" 
ON public.reviews
FOR INSERT 
TO authenticated
WITH CHECK (true);  -- Allow all authenticated users to insert

-- Ensure RLS is enabled on the reviews table
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;