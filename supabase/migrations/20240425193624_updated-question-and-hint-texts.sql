alter table "public"."question_hints" drop column "hint_text";

alter table "public"."question_hints" add column "hint_text_reviewee" text not null;

alter table "public"."question_hints" add column "hint_text_reviewer" text not null;

alter table "public"."questions" drop column "question_text";

alter table "public"."questions" add column "question_text_reviewee" text not null;

alter table "public"."questions" add column "question_text_reviewer" text not null;


