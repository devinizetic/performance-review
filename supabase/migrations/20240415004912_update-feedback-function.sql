drop function if exists "public"."get_feedback_question_answers"(user_review_id uuid);

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


