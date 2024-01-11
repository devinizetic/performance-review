alter table "public"."choices" drop constraint "choices_question_id_fkey";

alter table "public"."user_review" drop constraint "user_review_review_id_user_id_role_id_key";

alter table "public"."user_review" drop constraint "user_review_role_id_fkey";

alter table "public"."user_review" drop constraint "user_review_user_id_fkey";

drop index if exists "public"."user_review_review_id_user_id_role_id_key";

create table "public"."question_choice" (
    "question_id" uuid not null,
    "choice_id" uuid not null,
    "sequence" smallint not null default '0'::smallint
);

alter table "public"."question_choice" enable row level security;

alter table "public"."choices" drop column "question_id";

alter table "public"."choices" add column "choice_value" smallint;

alter table "public"."review_question" add column "sequence" smallint not null default '0'::smallint;

alter table "public"."user_review" drop column "role_id";

alter table "public"."user_review" drop column "user_id";

alter table "public"."user_review" add column "reviewee_id" uuid not null;

alter table "public"."user_review" add column "reviewer_id" uuid not null;

alter table "public"."user_review" disable row level security;

CREATE UNIQUE INDEX question_choice_pkey ON public.question_choice USING btree (question_id, choice_id);

CREATE UNIQUE INDEX user_review_review_id_reviewer_id_reviewee_id_key ON public.user_review USING btree (review_id, reviewer_id, reviewee_id);

alter table "public"."question_choice" add constraint "question_choice_pkey" PRIMARY KEY using index "question_choice_pkey";

alter table "public"."question_choice" add constraint "question_choice_choice_id_fkey" FOREIGN KEY (choice_id) REFERENCES choices(id) not valid;

alter table "public"."question_choice" validate constraint "question_choice_choice_id_fkey";

alter table "public"."question_choice" add constraint "question_choice_question_id_fkey" FOREIGN KEY (question_id) REFERENCES questions(id) not valid;

alter table "public"."question_choice" validate constraint "question_choice_question_id_fkey";

alter table "public"."user_review" add constraint "user_review_review_id_reviewer_id_reviewee_id_key" UNIQUE using index "user_review_review_id_reviewer_id_reviewee_id_key";

alter table "public"."user_review" add constraint "user_review_reviewee_id_fkey" FOREIGN KEY (reviewee_id) REFERENCES auth.users(id) not valid;

alter table "public"."user_review" validate constraint "user_review_reviewee_id_fkey";

alter table "public"."user_review" add constraint "user_review_reviewer_id_fkey" FOREIGN KEY (reviewer_id) REFERENCES auth.users(id) not valid;

alter table "public"."user_review" validate constraint "user_review_reviewer_id_fkey";

grant delete on table "public"."question_choice" to "anon";

grant insert on table "public"."question_choice" to "anon";

grant references on table "public"."question_choice" to "anon";

grant select on table "public"."question_choice" to "anon";

grant trigger on table "public"."question_choice" to "anon";

grant truncate on table "public"."question_choice" to "anon";

grant update on table "public"."question_choice" to "anon";

grant delete on table "public"."question_choice" to "authenticated";

grant insert on table "public"."question_choice" to "authenticated";

grant references on table "public"."question_choice" to "authenticated";

grant select on table "public"."question_choice" to "authenticated";

grant trigger on table "public"."question_choice" to "authenticated";

grant truncate on table "public"."question_choice" to "authenticated";

grant update on table "public"."question_choice" to "authenticated";

grant delete on table "public"."question_choice" to "service_role";

grant insert on table "public"."question_choice" to "service_role";

grant references on table "public"."question_choice" to "service_role";

grant select on table "public"."question_choice" to "service_role";

grant trigger on table "public"."question_choice" to "service_role";

grant truncate on table "public"."question_choice" to "service_role";

grant update on table "public"."question_choice" to "service_role";