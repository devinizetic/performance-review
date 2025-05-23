create policy "Enable insert for authenticated users" on "public"."review_question"
as permissive
for insert
to authenticated
with check (true);

create policy "Enable update for authenticated users" on "public"."review_question"
as permissive
for update
to authenticated
using (true)
with check (true);

create policy "Enable delete for authenticated users" on "public"."review_question"
as permissive
for delete
to authenticated
using (true);

create policy "Enable delete for authenticated users" on "public"."user_review"
as permissive
for delete
to authenticated
using (true);