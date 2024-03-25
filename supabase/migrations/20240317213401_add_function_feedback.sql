drop policy "Enable select for authenticated users only" on "public"."reviewer_reviewee";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_user(email text, password text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
  declare
  user_id uuid;
  encrypted_pw text;
BEGIN
  user_id := gen_random_uuid();
  encrypted_pw := crypt(password, gen_salt('bf'));
  
  INSERT INTO auth.users
    (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
  VALUES
    ('00000000-0000-0000-0000-000000000000', user_id, 'authenticated', 'authenticated', email, encrypted_pw, '2023-05-03 19:41:43.585805+00', '2023-04-22 13:10:03.275387+00', '2023-04-22 13:10:31.458239+00', '{"provider":"email","providers":["email"]}', '{}', '2023-05-03 19:41:43.580424+00', '2023-05-03 19:41:43.585948+00', '', '', '', '');
  
  INSERT INTO auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  VALUES
    (gen_random_uuid(), '110906221786223868751', user_id, format('{"sub":"%s","email":"%s"}', user_id::text, email)::jsonb, 'email', '2023-05-03 19:41:43.582456+00', '2023-05-03 19:41:43.582497+00', '2023-05-03 19:41:43.582497+00');
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_feedback(user_review_id uuid)
 RETURNS TABLE(id uuid)
 LANGUAGE sql
AS $function$
    select UR.id
    from user_review AS UR
    where UR.id = user_review_id
$function$
;

CREATE OR REPLACE FUNCTION public.get_feedback_question_answers(user_review_id uuid, reviewer_id uuid, reviewee_id uuid)
 RETURNS TABLE(id uuid, question_sequence integer, feedback_answer_id uuid, reviewee_answer_text text, reviewee_answer_choice_id uuid, feedback_text text, feedback_choice_id uuid, reviewer_answer_text text, reviewer_answer_choice_id uuid)
 LANGUAGE sql
AS $function$
  with reviewerAnswersCTE AS (
  select id, user_id, question_id, answer_choice_id, answer_text, feedback_text, feedback_choice_id 
  from answers AS A
  where A.user_review_id = user_review_id and A.user_id = reviewer_id
),

revieweeAnswersCTE AS (
  select id, user_id, question_id, answer_choice_id, answer_text, feedback_text, feedback_choice_id 
  from answers AS A
  where A.user_review_id = user_review_id and A.user_id = reviewee_id
)

select Q.id,
       RQ.question_sequence,
       ReACte.id AS feedback_answer_id,
       ReACte.answer_text AS reviewee_answer_text,
       ReACte.answer_choice_id AS reviewee_answer_choice_id,
       ReACte.feedback_text,
       ReACte.feedback_choice_id,
       RrACte.answer_text AS reviewer_answer_text, 
       RrACte.answer_choice_id AS reviewer_answer_choice_id
from user_review AS UR
      inner join reviews AS R ON UR.review_id = R.id
      inner join review_question AS RQ ON RQ.review_id = R.Id
      inner join questions AS Q ON Q.id = RQ.question_id
      left join reviewerAnswersCTE AS RrACte ON RrACte.question_id = Q.id
      left join revieweeAnswersCTE AS ReACte ON ReACte.question_id = Q.id
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
    ur.reviewee_completed,
    ur.reviewer_completed,
    ur.is_completed
   FROM (((reviewer_reviewee
     JOIN app_users reviewer ON ((reviewer_reviewee.reviewer_id = reviewer.id)))
     JOIN app_users reviewee ON ((reviewer_reviewee.reviewee_id = reviewee.id)))
     LEFT JOIN user_review ur ON (((ur.reviewer_id = reviewer.id) AND (ur.reviewee_id = reviewee.id))));


create policy "Enable insert for users based on user_id"
on "public"."answers"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));


create policy "Enable update for users based on user_id"
on "public"."answers"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Enable read access for all users"
on "public"."reviewer_reviewee"
as permissive
for select
to authenticated
using (true);



