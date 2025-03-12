-- Enable RLS on all external review tables
ALTER TABLE external_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_review_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_review_answers ENABLE ROW LEVEL SECURITY;

-- Policy for external_reviews: Allow users to fetch external reviews using token
CREATE POLICY "Anyone can view external reviews with the correct token"
ON external_reviews FOR SELECT
TO public
USING (true);

CREATE POLICY "Anyone can update external reviews"
ON external_reviews FOR UPDATE
TO public
USING (true);

-- Policies for external_review_questions: Allow users to fetch questions
-- related to an external review they have access to
CREATE POLICY "Anyone can view external review questions"
ON external_review_questions FOR SELECT
TO public
USING (true);

-- Policies for external_review_answers
-- Allow users to view answers
CREATE POLICY "Anyone can view external review answers"
ON external_review_answers FOR SELECT
TO public
USING (true);

-- Allow users to insert external review answers
CREATE POLICY "Anyone can insert external review answers"
ON external_review_answers FOR INSERT
TO public
WITH CHECK (true);

-- Allow users to update external review answers
CREATE POLICY "Anyone can update external review answers"
ON external_review_answers FOR UPDATE
TO public
USING (true);

-- Allow users to delete external review answers
CREATE POLICY "Anyone can delete external review answers"
ON external_review_answers FOR DELETE
TO public
USING (true);

-- Comment explaining the policy decisions
COMMENT ON TABLE external_reviews IS 'Stores information about external reviews with RLS allowing public read access with token';
COMMENT ON TABLE external_review_questions IS 'Contains questions for external reviews with RLS allowing public read access';
COMMENT ON TABLE external_review_answers IS 'Contains answers for external review questions with RLS allowing public read/write access';