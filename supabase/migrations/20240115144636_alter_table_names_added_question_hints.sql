create table "public"."question_hints" (
    "id" uuid not null default gen_random_uuid(),
    "question_id" uuid not null,
    "hint_text" text not null,
    "hint_sequence" smallint not null
);


alter table "public"."question_hints" enable row level security;

alter table "public"."question_choice" drop column "sequence";

alter table "public"."question_choice" add column "choice_sequence" smallint not null default '0'::smallint;

alter table "public"."questions" add column "question_description" text;

alter table "public"."questions" alter column "question_title" drop not null;

alter table "public"."review_question" drop column "sequence";

alter table "public"."review_question" add column "question_sequence" smallint not null default '0'::smallint;

alter table "public"."reviews" drop column "active";

alter table "public"."reviews" add column "is_active" boolean not null;

CREATE UNIQUE INDEX question_hints_pkey ON public.question_hints USING btree (id);

alter table "public"."question_hints" add constraint "question_hints_pkey" PRIMARY KEY using index "question_hints_pkey";

alter table "public"."question_hints" add constraint "question_hints_question_id_fkey" FOREIGN KEY (question_id) REFERENCES questions(id) not valid;

alter table "public"."question_hints" validate constraint "question_hints_question_id_fkey";

grant delete on table "public"."question_hints" to "anon";

grant insert on table "public"."question_hints" to "anon";

grant references on table "public"."question_hints" to "anon";

grant select on table "public"."question_hints" to "anon";

grant trigger on table "public"."question_hints" to "anon";

grant truncate on table "public"."question_hints" to "anon";

grant update on table "public"."question_hints" to "anon";

grant delete on table "public"."question_hints" to "authenticated";

grant insert on table "public"."question_hints" to "authenticated";

grant references on table "public"."question_hints" to "authenticated";

grant select on table "public"."question_hints" to "authenticated";

grant trigger on table "public"."question_hints" to "authenticated";

grant truncate on table "public"."question_hints" to "authenticated";

grant update on table "public"."question_hints" to "authenticated";

grant delete on table "public"."question_hints" to "service_role";

grant insert on table "public"."question_hints" to "service_role";

grant references on table "public"."question_hints" to "service_role";

grant select on table "public"."question_hints" to "service_role";

grant trigger on table "public"."question_hints" to "service_role";

grant truncate on table "public"."question_hints" to "service_role";

grant update on table "public"."question_hints" to "service_role";


