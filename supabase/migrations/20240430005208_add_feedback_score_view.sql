create or replace view "public"."feedback_scores" as  SELECT urev.id,
    reviewer.full_name AS reviewer_name,
    reviewee.full_name AS reviewee_name,
    ( SELECT sum(c.choice_value) AS sum
           FROM (answers ans
             JOIN choices c ON ((ans.feedback_choice_id = c.id)))
          WHERE (ans.user_review_id = urev.id)) AS score
   FROM ((user_review urev
     JOIN app_users reviewer ON ((urev.reviewer_id = reviewer.id)))
     JOIN app_users reviewee ON ((urev.reviewee_id = reviewee.id)))
  WHERE (urev.feedback_completed_timestamp IS NOT NULL)
  ORDER BY ( SELECT sum(c.choice_value) AS sum
           FROM (answers ans
             JOIN choices c ON ((ans.feedback_choice_id = c.id)))
          WHERE (ans.user_review_id = urev.id));



