-- ...existing code...
ALTER TABLE reviews ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE external_reviews ADD COLUMN company_name TEXT;
ALTER TABLE external_reviews ADD COLUMN language TEXT NOT NULL DEFAULT 'english';