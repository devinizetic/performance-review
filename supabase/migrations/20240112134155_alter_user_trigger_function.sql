set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.app_users (id, username, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');

  insert into public.user_role (user_id, role_id)
  values (new.id, 'f7bd405b-ff62-47a5-812c-c6058781b2e1');

  return new;
end;
$function$
;


