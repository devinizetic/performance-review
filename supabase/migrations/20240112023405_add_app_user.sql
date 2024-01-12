alter table "public"."answers" drop constraint "answers_user_id_fkey";

alter table "public"."reviewer_reviewee" drop constraint "reviewer_reviewee_reviewee_id_fkey";

alter table "public"."reviewer_reviewee" drop constraint "reviewer_reviewee_reviewer_id_fkey";

alter table "public"."user_review" drop constraint "user_review_reviewee_id_fkey";

alter table "public"."user_review" drop constraint "user_review_reviewer_id_fkey";

alter table "public"."user_role" drop constraint "user_role_user_id_fkey";

create table "public"."app_user" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "user_name" text not null,
    "full_name" text,
    "avatar_url" text
);


alter table "public"."app_user" enable row level security;

CREATE UNIQUE INDEX app_user_pkey ON public.app_user USING btree (id);

CREATE UNIQUE INDEX app_user_user_name_key ON public.app_user USING btree (user_name);

alter table "public"."app_user" add constraint "app_user_pkey" PRIMARY KEY using index "app_user_pkey";

alter table "public"."app_user" add constraint "app_user_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."app_user" validate constraint "app_user_id_fkey";

alter table "public"."app_user" add constraint "app_user_user_name_key" UNIQUE using index "app_user_user_name_key";

alter table "public"."answers" add constraint "answers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES app_user(id) not valid;

alter table "public"."answers" validate constraint "answers_user_id_fkey";

alter table "public"."reviewer_reviewee" add constraint "reviewer_reviewee_reviewee_id_fkey" FOREIGN KEY (reviewee_id) REFERENCES app_user(id) not valid;

alter table "public"."reviewer_reviewee" validate constraint "reviewer_reviewee_reviewee_id_fkey";

alter table "public"."reviewer_reviewee" add constraint "reviewer_reviewee_reviewer_id_fkey" FOREIGN KEY (reviewer_id) REFERENCES app_user(id) not valid;

alter table "public"."reviewer_reviewee" validate constraint "reviewer_reviewee_reviewer_id_fkey";

alter table "public"."user_review" add constraint "user_review_reviewee_id_fkey" FOREIGN KEY (reviewee_id) REFERENCES app_user(id) not valid;

alter table "public"."user_review" validate constraint "user_review_reviewee_id_fkey";

alter table "public"."user_review" add constraint "user_review_reviewer_id_fkey" FOREIGN KEY (reviewer_id) REFERENCES app_user(id) not valid;

alter table "public"."user_review" validate constraint "user_review_reviewer_id_fkey";

alter table "public"."user_role" add constraint "user_role_user_id_fkey" FOREIGN KEY (user_id) REFERENCES app_user(id) not valid;     

alter table "public"."user_role" validate constraint "user_role_user_id_fkey";

grant delete on table "public"."app_user" to "anon";

grant insert on table "public"."app_user" to "anon";

grant references on table "public"."app_user" to "anon";

grant select on table "public"."app_user" to "anon";

grant trigger on table "public"."app_user" to "anon";

grant truncate on table "public"."app_user" to "anon";

grant update on table "public"."app_user" to "anon";

grant delete on table "public"."app_user" to "authenticated";

grant insert on table "public"."app_user" to "authenticated";

grant references on table "public"."app_user" to "authenticated";

grant select on table "public"."app_user" to "authenticated";

grant trigger on table "public"."app_user" to "authenticated";

grant truncate on table "public"."app_user" to "authenticated";

grant update on table "public"."app_user" to "authenticated";

grant delete on table "public"."app_user" to "service_role";

grant insert on table "public"."app_user" to "service_role";

grant references on table "public"."app_user" to "service_role";

grant select on table "public"."app_user" to "service_role";

grant trigger on table "public"."app_user" to "service_role";

grant truncate on table "public"."app_user" to "service_role";

grant update on table "public"."app_user" to "service_role";

create policy "Enable select for authenticated users only"
on "public"."roles"
as permissive
for select
to authenticated
using (true);


create policy "Enable select for authenticated users only"
on "public"."user_role"
as permissive
for select
to authenticated
using (true);