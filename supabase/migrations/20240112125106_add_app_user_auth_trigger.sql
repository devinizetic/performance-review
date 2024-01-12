revoke delete on table "public"."app_user" from "anon";

revoke insert on table "public"."app_user" from "anon";

revoke references on table "public"."app_user" from "anon";

revoke select on table "public"."app_user" from "anon";

revoke trigger on table "public"."app_user" from "anon";

revoke truncate on table "public"."app_user" from "anon";

revoke update on table "public"."app_user" from "anon";

revoke delete on table "public"."app_user" from "authenticated";

revoke insert on table "public"."app_user" from "authenticated";

revoke references on table "public"."app_user" from "authenticated";

revoke select on table "public"."app_user" from "authenticated";

revoke trigger on table "public"."app_user" from "authenticated";

revoke truncate on table "public"."app_user" from "authenticated";

revoke update on table "public"."app_user" from "authenticated";

revoke delete on table "public"."app_user" from "service_role";

revoke insert on table "public"."app_user" from "service_role";

revoke references on table "public"."app_user" from "service_role";

revoke select on table "public"."app_user" from "service_role";

revoke trigger on table "public"."app_user" from "service_role";

revoke truncate on table "public"."app_user" from "service_role";

revoke update on table "public"."app_user" from "service_role";

alter table "public"."app_user" drop constraint "app_user_id_fkey";

alter table "public"."app_user" drop constraint "app_user_user_name_key";

alter table "public"."answers" drop constraint "answers_user_id_fkey";

alter table "public"."reviewer_reviewee" drop constraint "reviewer_reviewee_reviewee_id_fkey";

alter table "public"."reviewer_reviewee" drop constraint "reviewer_reviewee_reviewer_id_fkey";

alter table "public"."user_review" drop constraint "user_review_reviewee_id_fkey";

alter table "public"."user_review" drop constraint "user_review_reviewer_id_fkey";

alter table "public"."user_role" drop constraint "user_role_user_id_fkey";

alter table "public"."app_user" drop constraint "app_user_pkey";

drop index if exists "public"."app_user_pkey";

drop index if exists "public"."app_user_user_name_key";

drop table "public"."app_user";

create table "public"."app_users" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "username" text not null,
    "full_name" text,
    "avatar_url" text
);


alter table "public"."app_users" enable row level security;

CREATE UNIQUE INDEX app_user_pkey ON public.app_users USING btree (id);

CREATE UNIQUE INDEX app_user_user_name_key ON public.app_users USING btree (username);

alter table "public"."app_users" add constraint "app_user_pkey" PRIMARY KEY using index "app_user_pkey";

alter table "public"."app_users" add constraint "app_user_user_name_key" UNIQUE using index "app_user_user_name_key";

alter table "public"."app_users" add constraint "app_users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."app_users" validate constraint "app_users_id_fkey";

alter table "public"."answers" add constraint "answers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES app_users(id) not valid;

alter table "public"."answers" validate constraint "answers_user_id_fkey";

alter table "public"."reviewer_reviewee" add constraint "reviewer_reviewee_reviewee_id_fkey" FOREIGN KEY (reviewee_id) REFERENCES app_users(id) not valid;

alter table "public"."reviewer_reviewee" validate constraint "reviewer_reviewee_reviewee_id_fkey";

alter table "public"."reviewer_reviewee" add constraint "reviewer_reviewee_reviewer_id_fkey" FOREIGN KEY (reviewer_id) REFERENCES app_users(id) not valid;

alter table "public"."reviewer_reviewee" validate constraint "reviewer_reviewee_reviewer_id_fkey";

alter table "public"."user_review" add constraint "user_review_reviewee_id_fkey" FOREIGN KEY (reviewee_id) REFERENCES app_users(id) not valid;

alter table "public"."user_review" validate constraint "user_review_reviewee_id_fkey";

alter table "public"."user_review" add constraint "user_review_reviewer_id_fkey" FOREIGN KEY (reviewer_id) REFERENCES app_users(id) not valid;

alter table "public"."user_review" validate constraint "user_review_reviewer_id_fkey";

alter table "public"."user_role" add constraint "user_role_user_id_fkey" FOREIGN KEY (user_id) REFERENCES app_users(id) not valid;

alter table "public"."user_role" validate constraint "user_role_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.app_users (id, username, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');

  insert into public.user_role (user_id, role_id)
  values (new.id, '3c1b01c4-4d13-4e60-b0f8-9fd4a98c3cae');

  return new;
end;
$function$
;

grant delete on table "public"."app_users" to "anon";

grant insert on table "public"."app_users" to "anon";

grant references on table "public"."app_users" to "anon";

grant select on table "public"."app_users" to "anon";

grant trigger on table "public"."app_users" to "anon";

grant truncate on table "public"."app_users" to "anon";

grant update on table "public"."app_users" to "anon";

grant delete on table "public"."app_users" to "authenticated";

grant insert on table "public"."app_users" to "authenticated";

grant references on table "public"."app_users" to "authenticated";

grant select on table "public"."app_users" to "authenticated";

grant trigger on table "public"."app_users" to "authenticated";

grant truncate on table "public"."app_users" to "authenticated";

grant update on table "public"."app_users" to "authenticated";

grant delete on table "public"."app_users" to "service_role";

grant insert on table "public"."app_users" to "service_role";

grant references on table "public"."app_users" to "service_role";

grant select on table "public"."app_users" to "service_role";

grant trigger on table "public"."app_users" to "service_role";

grant truncate on table "public"."app_users" to "service_role";

grant update on table "public"."app_users" to "service_role";

create policy "Users can insert their own app_users."
on "public"."app_users"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "Users can update own app_users."
on "public"."app_users"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "app_users are viewable by everyone."
on "public"."app_users"
as permissive
for select
to authenticated
using (true);