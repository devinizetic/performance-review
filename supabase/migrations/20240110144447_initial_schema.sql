create type "public"."answer_type" as enum ('text', 'multiple_choice', 'multiple_choice_with_text');

create table "public"."answers" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "question_id" uuid not null,
    "answer_choice_id" uuid,
    "answer_text" text,
    "feedback_text" text,
    "feedback_choice_id" uuid
);


alter table "public"."answers" enable row level security;

create table "public"."choices" (
    "id" uuid not null default gen_random_uuid(),
    "question_id" uuid not null,
    "choice_text" text not null
);


alter table "public"."choices" enable row level security;

create table "public"."questions" (
    "id" uuid not null default gen_random_uuid(),
    "question_answer_type" answer_type not null,
    "question_text" text not null,
    "role_id" uuid
);


alter table "public"."questions" enable row level security;

create table "public"."reviewer_reviewee" (
    "reviewer_id" uuid not null,
    "reviewee_id" uuid not null
);


alter table "public"."reviewer_reviewee" enable row level security;

create table "public"."reviews" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "start_date" date,
    "end_date" date,
    "active" boolean not null
);


alter table "public"."reviews" enable row level security;

create table "public"."roles" (
    "id" uuid not null default gen_random_uuid(),
    "role_name" text not null
);


alter table "public"."roles" enable row level security;

create table "public"."user_role" (
    "user_id" uuid not null,
    "role_id" uuid not null
);


alter table "public"."user_role" enable row level security;

CREATE UNIQUE INDEX "Roles_pkey" ON public.roles USING btree (id);

CREATE UNIQUE INDEX answers_pkey ON public.answers USING btree (id);

CREATE UNIQUE INDEX choices_pkey ON public.choices USING btree (id);

CREATE UNIQUE INDEX questions_pkey ON public.questions USING btree (id);

CREATE UNIQUE INDEX reviewer_reviewee_pkey ON public.reviewer_reviewee USING btree (reviewer_id, reviewee_id);

CREATE UNIQUE INDEX reviews_pkey ON public.reviews USING btree (id);

CREATE UNIQUE INDEX user_role_pkey ON public.user_role USING btree (user_id, role_id);

alter table "public"."answers" add constraint "answers_pkey" PRIMARY KEY using index "answers_pkey";

alter table "public"."choices" add constraint "choices_pkey" PRIMARY KEY using index "choices_pkey";

alter table "public"."questions" add constraint "questions_pkey" PRIMARY KEY using index "questions_pkey";

alter table "public"."reviewer_reviewee" add constraint "reviewer_reviewee_pkey" PRIMARY KEY using index "reviewer_reviewee_pkey";

alter table "public"."reviews" add constraint "reviews_pkey" PRIMARY KEY using index "reviews_pkey";

alter table "public"."roles" add constraint "Roles_pkey" PRIMARY KEY using index "Roles_pkey";

alter table "public"."user_role" add constraint "user_role_pkey" PRIMARY KEY using index "user_role_pkey";

alter table "public"."answers" add constraint "answers_answer_choice_id_fkey" FOREIGN KEY (answer_choice_id) REFERENCES choices(id) not valid;

alter table "public"."answers" validate constraint "answers_answer_choice_id_fkey";

alter table "public"."answers" add constraint "answers_feedback_choice_id_fkey" FOREIGN KEY (feedback_choice_id) REFERENCES choices(id) not valid;

alter table "public"."answers" validate constraint "answers_feedback_choice_id_fkey";

alter table "public"."answers" add constraint "answers_question_id_fkey" FOREIGN KEY (question_id) REFERENCES questions(id) not valid;

alter table "public"."answers" validate constraint "answers_question_id_fkey";

alter table "public"."answers" add constraint "answers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."answers" validate constraint "answers_user_id_fkey";

alter table "public"."choices" add constraint "choices_question_id_fkey" FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE not valid;

alter table "public"."choices" validate constraint "choices_question_id_fkey";

alter table "public"."questions" add constraint "questions_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) not valid;

alter table "public"."questions" validate constraint "questions_role_id_fkey";

alter table "public"."reviewer_reviewee" add constraint "reviewer_reviewee_reviewee_id_fkey" FOREIGN KEY (reviewee_id) REFERENCES auth.users(id) not valid;

alter table "public"."reviewer_reviewee" validate constraint "reviewer_reviewee_reviewee_id_fkey";

alter table "public"."reviewer_reviewee" add constraint "reviewer_reviewee_reviewer_id_fkey" FOREIGN KEY (reviewer_id) REFERENCES auth.users(id) not valid;

alter table "public"."reviewer_reviewee" validate constraint "reviewer_reviewee_reviewer_id_fkey";

alter table "public"."user_role" add constraint "user_role_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) not valid;

alter table "public"."user_role" validate constraint "user_role_role_id_fkey";

alter table "public"."user_role" add constraint "user_role_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."user_role" validate constraint "user_role_user_id_fkey";

grant delete on table "public"."answers" to "anon";

grant insert on table "public"."answers" to "anon";

grant references on table "public"."answers" to "anon";

grant select on table "public"."answers" to "anon";

grant trigger on table "public"."answers" to "anon";

grant truncate on table "public"."answers" to "anon";

grant update on table "public"."answers" to "anon";

grant delete on table "public"."answers" to "authenticated";

grant insert on table "public"."answers" to "authenticated";

grant references on table "public"."answers" to "authenticated";

grant select on table "public"."answers" to "authenticated";

grant trigger on table "public"."answers" to "authenticated";

grant truncate on table "public"."answers" to "authenticated";

grant update on table "public"."answers" to "authenticated";

grant delete on table "public"."answers" to "service_role";

grant insert on table "public"."answers" to "service_role";

grant references on table "public"."answers" to "service_role";

grant select on table "public"."answers" to "service_role";

grant trigger on table "public"."answers" to "service_role";

grant truncate on table "public"."answers" to "service_role";

grant update on table "public"."answers" to "service_role";

grant delete on table "public"."choices" to "anon";

grant insert on table "public"."choices" to "anon";

grant references on table "public"."choices" to "anon";

grant select on table "public"."choices" to "anon";

grant trigger on table "public"."choices" to "anon";

grant truncate on table "public"."choices" to "anon";

grant update on table "public"."choices" to "anon";

grant delete on table "public"."choices" to "authenticated";

grant insert on table "public"."choices" to "authenticated";

grant references on table "public"."choices" to "authenticated";

grant select on table "public"."choices" to "authenticated";

grant trigger on table "public"."choices" to "authenticated";

grant truncate on table "public"."choices" to "authenticated";

grant update on table "public"."choices" to "authenticated";

grant delete on table "public"."choices" to "service_role";

grant insert on table "public"."choices" to "service_role";

grant references on table "public"."choices" to "service_role";

grant select on table "public"."choices" to "service_role";

grant trigger on table "public"."choices" to "service_role";

grant truncate on table "public"."choices" to "service_role";

grant update on table "public"."choices" to "service_role";

grant delete on table "public"."questions" to "anon";

grant insert on table "public"."questions" to "anon";

grant references on table "public"."questions" to "anon";

grant select on table "public"."questions" to "anon";

grant trigger on table "public"."questions" to "anon";

grant truncate on table "public"."questions" to "anon";

grant update on table "public"."questions" to "anon";

grant delete on table "public"."questions" to "authenticated";

grant insert on table "public"."questions" to "authenticated";

grant references on table "public"."questions" to "authenticated";

grant select on table "public"."questions" to "authenticated";

grant trigger on table "public"."questions" to "authenticated";

grant truncate on table "public"."questions" to "authenticated";

grant update on table "public"."questions" to "authenticated";

grant delete on table "public"."questions" to "service_role";

grant insert on table "public"."questions" to "service_role";

grant references on table "public"."questions" to "service_role";

grant select on table "public"."questions" to "service_role";

grant trigger on table "public"."questions" to "service_role";

grant truncate on table "public"."questions" to "service_role";

grant update on table "public"."questions" to "service_role";

grant delete on table "public"."reviewer_reviewee" to "anon";

grant insert on table "public"."reviewer_reviewee" to "anon";

grant references on table "public"."reviewer_reviewee" to "anon";

grant select on table "public"."reviewer_reviewee" to "anon";

grant trigger on table "public"."reviewer_reviewee" to "anon";

grant truncate on table "public"."reviewer_reviewee" to "anon";

grant update on table "public"."reviewer_reviewee" to "anon";

grant delete on table "public"."reviewer_reviewee" to "authenticated";

grant insert on table "public"."reviewer_reviewee" to "authenticated";

grant references on table "public"."reviewer_reviewee" to "authenticated";

grant select on table "public"."reviewer_reviewee" to "authenticated";

grant trigger on table "public"."reviewer_reviewee" to "authenticated";

grant truncate on table "public"."reviewer_reviewee" to "authenticated";

grant update on table "public"."reviewer_reviewee" to "authenticated";

grant delete on table "public"."reviewer_reviewee" to "service_role";

grant insert on table "public"."reviewer_reviewee" to "service_role";

grant references on table "public"."reviewer_reviewee" to "service_role";

grant select on table "public"."reviewer_reviewee" to "service_role";

grant trigger on table "public"."reviewer_reviewee" to "service_role";

grant truncate on table "public"."reviewer_reviewee" to "service_role";

grant update on table "public"."reviewer_reviewee" to "service_role";

grant delete on table "public"."reviews" to "anon";

grant insert on table "public"."reviews" to "anon";

grant references on table "public"."reviews" to "anon";

grant select on table "public"."reviews" to "anon";

grant trigger on table "public"."reviews" to "anon";

grant truncate on table "public"."reviews" to "anon";

grant update on table "public"."reviews" to "anon";

grant delete on table "public"."reviews" to "authenticated";

grant insert on table "public"."reviews" to "authenticated";

grant references on table "public"."reviews" to "authenticated";

grant select on table "public"."reviews" to "authenticated";

grant trigger on table "public"."reviews" to "authenticated";

grant truncate on table "public"."reviews" to "authenticated";

grant update on table "public"."reviews" to "authenticated";

grant delete on table "public"."reviews" to "service_role";

grant insert on table "public"."reviews" to "service_role";

grant references on table "public"."reviews" to "service_role";

grant select on table "public"."reviews" to "service_role";

grant trigger on table "public"."reviews" to "service_role";

grant truncate on table "public"."reviews" to "service_role";

grant update on table "public"."reviews" to "service_role";

grant delete on table "public"."roles" to "anon";

grant insert on table "public"."roles" to "anon";

grant references on table "public"."roles" to "anon";

grant select on table "public"."roles" to "anon";

grant trigger on table "public"."roles" to "anon";

grant truncate on table "public"."roles" to "anon";

grant update on table "public"."roles" to "anon";

grant delete on table "public"."roles" to "authenticated";

grant insert on table "public"."roles" to "authenticated";

grant references on table "public"."roles" to "authenticated";

grant select on table "public"."roles" to "authenticated";

grant trigger on table "public"."roles" to "authenticated";

grant truncate on table "public"."roles" to "authenticated";

grant update on table "public"."roles" to "authenticated";

grant delete on table "public"."roles" to "service_role";

grant insert on table "public"."roles" to "service_role";

grant references on table "public"."roles" to "service_role";

grant select on table "public"."roles" to "service_role";

grant trigger on table "public"."roles" to "service_role";

grant truncate on table "public"."roles" to "service_role";

grant update on table "public"."roles" to "service_role";

grant delete on table "public"."user_role" to "anon";

grant insert on table "public"."user_role" to "anon";

grant references on table "public"."user_role" to "anon";

grant select on table "public"."user_role" to "anon";

grant trigger on table "public"."user_role" to "anon";

grant truncate on table "public"."user_role" to "anon";

grant update on table "public"."user_role" to "anon";

grant delete on table "public"."user_role" to "authenticated";

grant insert on table "public"."user_role" to "authenticated";

grant references on table "public"."user_role" to "authenticated";

grant select on table "public"."user_role" to "authenticated";

grant trigger on table "public"."user_role" to "authenticated";

grant truncate on table "public"."user_role" to "authenticated";

grant update on table "public"."user_role" to "authenticated";

grant delete on table "public"."user_role" to "service_role";

grant insert on table "public"."user_role" to "service_role";

grant references on table "public"."user_role" to "service_role";

grant select on table "public"."user_role" to "service_role";

grant trigger on table "public"."user_role" to "service_role";

grant truncate on table "public"."user_role" to "service_role";

grant update on table "public"."user_role" to "service_role";