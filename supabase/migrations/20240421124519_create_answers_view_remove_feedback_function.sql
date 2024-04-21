drop function if exists "public"."get_feedback_question_answers"(user_review_id uuid);

create or replace view "public"."answers_sorted" as  SELECT a.question_id AS id,
    rq.question_sequence,
    a.id AS feedback_answer_id,
    a.reviewer_answer_text,
    a.reviewer_answer_choice_id,
    a.feedback_text,
    a.feedback_choice_id,
    a.reviewee_answer_text,
    a.reviewee_answer_choice_id,
    a.user_review_id
   FROM (answers a
     JOIN review_question rq ON ((a.question_id = rq.question_id)))
  ORDER BY rq.question_sequence;



