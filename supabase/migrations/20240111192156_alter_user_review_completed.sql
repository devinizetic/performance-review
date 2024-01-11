alter table "public"."user_review" add column "reviewee_completed" boolean not null default false;

alter table "public"."user_review" add column "reviewer_completed" boolean not null default false;