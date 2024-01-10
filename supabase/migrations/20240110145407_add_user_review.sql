create table "public"."user_review" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "review_id" uuid not null,
    "user_id" uuid not null,
    "role_id" uuid not null,
    "is_completed" boolean not null default false
);


alter table "public"."user_review" enable row level security;

alter table "public"."answers" add column "user_review_id" uuid not null;

CREATE UNIQUE INDEX user_review_pkey ON public.user_review USING btree (id);

CREATE UNIQUE INDEX user_review_review_id_user_id_role_id_key ON public.user_review USING btree (review_id, user_id, role_id);

alter table "public"."user_review" add constraint "user_review_pkey" PRIMARY KEY using index "user_review_pkey";

alter table "public"."answers" add constraint "answers_user_review_id_fkey" FOREIGN KEY (user_review_id) REFERENCES user_review(id) not valid;

alter table "public"."answers" validate constraint "answers_user_review_id_fkey";

alter table "public"."user_review" add constraint "user_review_review_id_fkey" FOREIGN KEY (review_id) REFERENCES reviews(id) not valid;

alter table "public"."user_review" validate constraint "user_review_review_id_fkey";

alter table "public"."user_review" add constraint "user_review_review_id_user_id_role_id_key" UNIQUE using index "user_review_review_id_user_id_role_id_key";

alter table "public"."user_review" add constraint "user_review_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) not valid;

alter table "public"."user_review" validate constraint "user_review_role_id_fkey";

alter table "public"."user_review" add constraint "user_review_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."user_review" validate constraint "user_review_user_id_fkey";

grant delete on table "public"."user_review" to "anon";

grant insert on table "public"."user_review" to "anon";

grant references on table "public"."user_review" to "anon";

grant select on table "public"."user_review" to "anon";

grant trigger on table "public"."user_review" to "anon";

grant truncate on table "public"."user_review" to "anon";

grant update on table "public"."user_review" to "anon";

grant delete on table "public"."user_review" to "authenticated";

grant insert on table "public"."user_review" to "authenticated";

grant references on table "public"."user_review" to "authenticated";

grant select on table "public"."user_review" to "authenticated";

grant trigger on table "public"."user_review" to "authenticated";

grant truncate on table "public"."user_review" to "authenticated";

grant update on table "public"."user_review" to "authenticated";

grant delete on table "public"."user_review" to "service_role";

grant insert on table "public"."user_review" to "service_role";

grant references on table "public"."user_review" to "service_role";

grant select on table "public"."user_review" to "service_role";

grant trigger on table "public"."user_review" to "service_role";

grant truncate on table "public"."user_review" to "service_role";

grant update on table "public"."user_review" to "service_role";