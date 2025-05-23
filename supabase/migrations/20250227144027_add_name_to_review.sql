-- Add name column to reviews table
alter table "public"."reviews" add column "name" text;

-- Update existing records to have a default name (optional)
update "public"."reviews" set "name" = 'Evaluación Q4 2023' where "name" is null;

-- Make the column required for future inserts
alter table "public"."reviews" alter column "name" set not null;

-- Add comment to the column
comment on column "public"."reviews"."name" is 'The display name of the review period';