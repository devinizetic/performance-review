-- Add ReviewerName column to external_reviews table
ALTER TABLE external_reviews
ADD COLUMN reviewer_name VARCHAR(255);

-- Add comment for the new column
COMMENT ON COLUMN external_reviews.reviewer_name IS 'Name of the person providing the external review';