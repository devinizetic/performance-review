# Performance Review Docs

## Supabase

### common commands

- start:
  npx supabase start

- stop:
  npx supabase stop
  docker ps -q | ForEach-Object { docker stop $\_ }
  docker rm $(docker ps -aq -f status=exited -f name=performance-review)

#### pull db changes

- Pull schema changes from remote database: https://supabase.com/docs/reference/cli/supabase-db-reset

```
npx supabase db reset
```

##### Seed db

- Step 1

Go to the [Authentication tab in the Supabase Dashboard](http://localhost:54323/project/default/auth/users) and create a new test user. This will trigger the creation of an App user as well.

```
fer@devlights.com
cyn@devlights.com
12345678
```

- Step 1.1

If desired, update the newly created 'app_user' full name to have meaningful data, e.g. TestLast, TestFirst.

```
Cyn Stefani
Fer Lujan
```

- Step 2

In the [Supabase Dashboard](http://localhost:54323/project/default/editor), add the role 'reviewer' to your user in the 'user_role' intermediate table.

- Step 3

Add an entry in the 'reviewer_reviewee' intermediate table, with your user as the reviewer and the newly created user as the reviewee.

- Step 4

Create a new 'user_review' and select the active 'review', with your user as the reviewer and the new test user as the reviewee.

- Step 5

Open the Next app and go to the 'Mis Evaluados' tab. You will see your reviewee. Click 'Comenzar Evaluacion' to complete their review.

- Step 6

To add reviewee answers to each created answer, access the Supabase dashboard and manually edit the rows.

- Step 7

To see the feedback, manually update the 'user_review' table in the dashboard and set both completed columns to true. You can access the feedback from the 'Mis Evaluados' page.
