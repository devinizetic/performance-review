create policy "Enable insert for authenticated users" on "public"."review_question"
as permissive
for insert
to authenticated
with check (true);