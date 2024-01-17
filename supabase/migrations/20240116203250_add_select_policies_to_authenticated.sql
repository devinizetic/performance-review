drop policy "app_users are viewable by everyone." on "public"."app_users";

create policy "Enable select for authenticated users only"
on "public"."answers"
as permissive
for select
to authenticated
using (true);


create policy "Enable select for authenticated users only"
on "public"."app_users"
as permissive
for select
to authenticated
using (true);


create policy "Enable select for authenticated users only"
on "public"."choices"
as permissive
for select
to authenticated
using (true);


create policy "Enable select for authenticated users only"
on "public"."question_choice"
as permissive
for select
to authenticated
using (true);


create policy "Enable select for authenticated users only"
on "public"."question_hints"
as permissive
for select
to authenticated
using (true);


create policy "Enable select for authenticated users only"
on "public"."questions"
as permissive
for select
to authenticated
using (true);


create policy "Enable select for authenticated users only"
on "public"."review_question"
as permissive
for select
to authenticated
using (true);


create policy "Enable select for authenticated users only"
on "public"."reviewer_reviewee"
as permissive
for select
to authenticated
using (true);


create policy "Enable select for authenticated users only"
on "public"."reviews"
as permissive
for select
to authenticated
using (true);


create policy "Enable select for authenticated users only"
on "public"."user_review"
as permissive
for select
to authenticated
using (true);



