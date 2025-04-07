-- Add ReviewerName column to external_reviews table
ALTER TABLE external_reviews
ADD COLUMN reviewer_name VARCHAR(255);

-- First, drop the existing constraint if it exists
ALTER TABLE external_reviews
DROP CONSTRAINT IF EXISTS status_check;

-- Then add a new constraint that includes all four possible statuses
ALTER TABLE external_reviews
ADD CONSTRAINT status_check CHECK (status IN ('pending', 'completed', 'approved', 'declined'));

-- Add comment for the new column
COMMENT ON COLUMN external_reviews.reviewer_name IS 'Name of the person providing the external review';