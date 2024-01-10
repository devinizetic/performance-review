create table "public"."review_question" (
    "review_id" uuid not null,
    "question_id" uuid not null
);


alter table "public"."review_question" enable row level security;

CREATE UNIQUE INDEX review_question_pkey ON public.review_question USING btree (review_id, question_id);

alter table "public"."review_question" add constraint "review_question_pkey" PRIMARY KEY using index "review_question_pkey";

alter table "public"."review_question" add constraint "review_question_question_id_fkey" FOREIGN KEY (question_id) REFERENCES questions(id) not valid;

alter table "public"."review_question" validate constraint "review_question_question_id_fkey";

alter table "public"."review_question" add constraint "review_question_review_id_fkey" FOREIGN KEY (review_id) REFERENCES reviews(id) not valid;

alter table "public"."review_question" validate constraint "review_question_review_id_fkey";

grant delete on table "public"."review_question" to "anon";

grant insert on table "public"."review_question" to "anon";

grant references on table "public"."review_question" to "anon";

grant select on table "public"."review_question" to "anon";

grant trigger on table "public"."review_question" to "anon";

grant truncate on table "public"."review_question" to "anon";

grant update on table "public"."review_question" to "anon";

grant delete on table "public"."review_question" to "authenticated";

grant insert on table "public"."review_question" to "authenticated";

grant references on table "public"."review_question" to "authenticated";

grant select on table "public"."review_question" to "authenticated";

grant trigger on table "public"."review_question" to "authenticated";

grant truncate on table "public"."review_question" to "authenticated";

grant update on table "public"."review_question" to "authenticated";

grant delete on table "public"."review_question" to "service_role";

grant insert on table "public"."review_question" to "service_role";

grant references on table "public"."review_question" to "service_role";

grant select on table "public"."review_question" to "service_role";

grant trigger on table "public"."review_question" to "service_role";

grant truncate on table "public"."review_question" to "service_role";

grant update on table "public"."review_question" to "service_role";