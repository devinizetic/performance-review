drop view if exists "public"."reviewerreviewee";

alter table "public"."user_review" drop column "is_completed";

alter table "public"."user_review" drop column "reviewee_completed";

alter table "public"."user_review" drop column "reviewer_completed";

alter table "public"."user_review" add column "reviewee_completed_timestamp" timestamp without time zone;

alter table "public"."user_review" add column "reviewee_started_timestamp" timestamp without time zone;

alter table "public"."user_review" add column "reviewer_completed_timestamp" timestamp without time zone;

alter table "public"."user_review" add column "reviewer_started_timestamp" timestamp without time zone;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_feedback_question_answers(user_review_id uuid)
 RETURNS TABLE(id uuid, question_sequence integer, feedback_answer_id uuid, reviewer_answer_text text, reviewer_answer_choice_id uuid, feedback_text text, feedback_choice_id uuid, reviewee_answer_text text, reviewee_answer_choice_id uuid)
 LANGUAGE sql
AS $function$
with answersCTE AS (
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
order by RQ.question_sequence
$function$
;

create or replace view "public"."reviewerreviewee" as  SELECT reviewer_reviewee.reviewer_id,
    reviewer_reviewee.reviewee_id,
    reviewee.username,
    reviewee.full_name,
    reviewee.avatar_url,
    ur.id AS user_review_id,
        CASE
            WHEN (ur.reviewee_completed_timestamp IS NOT NULL) THEN true
            ELSE false
        END AS reviewee_completed,
        CASE
            WHEN (ur.reviewer_completed_timestamp IS NOT NULL) THEN true
            ELSE false
        END AS reviewer_completed
   FROM (((reviewer_reviewee
     JOIN app_users reviewer ON ((reviewer_reviewee.reviewer_id = reviewer.id)))
     JOIN app_users reviewee ON ((reviewer_reviewee.reviewee_id = reviewee.id)))
     LEFT JOIN user_review ur ON (((ur.reviewer_id = reviewer.id) AND (ur.reviewee_id = reviewee.id))));


create policy "Enable insert for authenticated users only"
on "public"."answers"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable update for auth"
on "public"."answers"
as permissive
for update
to authenticated
using (true);


create policy "Enable update for authenticated users"
on "public"."user_review"
as permissive
for update
to authenticated
using (true)
with check (true);



