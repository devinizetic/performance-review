drop policy "Enable insert for users based on user_id" on "public"."answers";

drop policy "Enable update for users based on user_id" on "public"."answers";

alter table "public"."answers" drop constraint "answers_answer_choice_id_fkey";

alter table "public"."answers" drop constraint "answers_user_id_fkey";

drop function if exists "public"."get_feedback"(user_review_id uuid);

drop function if exists "public"."get_feedback_question_answers"(user_review_id uuid, reviewer_id uuid, reviewee_id uuid);

alter table "public"."answers" drop column "answer_choice_id";

alter table "public"."answers" drop column "answer_text";

alter table "public"."answers" drop column "user_id";

alter table "public"."answers" add column "reviewee_answer_choice_id" uuid;

alter table "public"."answers" add column "reviewee_answer_text" text;

alter table "public"."answers" add column "reviewer_answer_choice_id" uuid;

alter table "public"."answers" add column "reviewer_answer_text" text;

alter table "public"."answers" add constraint "answers_reviewee_answer_choice_id_fkey" FOREIGN KEY (reviewee_answer_choice_id) REFERENCES choices(id) not valid;

alter table "public"."answers" validate constraint "answers_reviewee_answer_choice_id_fkey";

alter table "public"."answers" add constraint "answers_reviewer_answer_choice_id_fkey" FOREIGN KEY (reviewer_answer_choice_id) REFERENCES choices(id) not valid;

alter table "public"."answers" validate constraint "answers_reviewer_answer_choice_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_feedback_question_answers(user_review_id uuid)
 RETURNS record
 LANGUAGE sql
AS $function$with answersCTE AS (
    select id, question_id, reviewer_answer_choice_id, reviewer_answer_text, feedback_text, feedback_choice_id,
    reviewee_answer_choice_id, reviewee_answer_text
    from answers AS A
    where A.user_review_id = user_review_id
)

select Q.id,
     RQ.question_sequence,
     RACte.id AS feedback_answer_id,
     RACte.reviewer_answer_text,
     RACte.reviewer_answer_choice_id,
     RACte.feedback_text,
     RACte.feedback_choice_id,
     RACte.reviewee_answer_text, 
     RACte.reviewee_answer_choice_id
from user_review AS UR
    inner join reviews AS R ON UR.review_id = R.id
    inner join review_question AS RQ ON RQ.review_id = R.Id
    inner join questions AS Q ON Q.id = RQ.question_id
    left join answersCTE AS RACte ON RACte.question_id = Q.id
where UR.id = user_review_id
order by RQ.question_sequence$function$
;


