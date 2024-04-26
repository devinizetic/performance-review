create policy "Enable update for authenticated"
on "public"."reviews"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."user_review"
as permissive
for insert
to authenticated
with check (true);



