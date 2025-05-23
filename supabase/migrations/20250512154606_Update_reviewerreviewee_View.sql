create or replace view
  public.reviewerreviewee as
select
  reviewer_reviewee.reviewer_id,
  reviewer_reviewee.reviewee_id,
  reviewee.username,
  reviewee.full_name,
  reviewee.avatar_url,
  ur.id as user_review_id,
  case
    when ur.reviewee_completed_timestamp is not null then true
    else false
  end as reviewee_completed,
  case
    when ur.reviewer_completed_timestamp is not null then true
    else false
  end as reviewer_completed
from
  reviewer_reviewee
  join app_users reviewer on reviewer_reviewee.reviewer_id = reviewer.id
  join app_users reviewee on reviewer_reviewee.reviewee_id = reviewee.id
  left join user_review ur on ur.reviewer_id = reviewer.id
  and ur.reviewee_id = reviewee.id
  left join reviews r on ur.review_id = r.id
where r.is_active = true