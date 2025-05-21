-- Add initial_email_sent column to user_review table
ALTER TABLE user_review
ADD COLUMN initial_email_sent BOOLEAN NOT NULL DEFAULT FALSE;
