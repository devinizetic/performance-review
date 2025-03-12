-- Create external_reviews table
CREATE TABLE public.external_reviews (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    token UUID NOT NULL DEFAULT gen_random_uuid(),
    review_id UUID NOT NULL,
    reviewee_id UUID NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.external_reviews ENABLE ROW LEVEL SECURITY;

CREATE UNIQUE INDEX external_reviews_pkey ON public.external_reviews USING btree (id);
CREATE UNIQUE INDEX external_reviews_token_key ON public.external_reviews USING btree (token);

ALTER TABLE public.external_reviews ADD CONSTRAINT external_reviews_pkey PRIMARY KEY USING INDEX external_reviews_pkey;
ALTER TABLE public.external_reviews ADD CONSTRAINT external_reviews_token_key UNIQUE USING INDEX external_reviews_token_key;
ALTER TABLE public.external_reviews ADD CONSTRAINT external_reviews_review_id_fkey FOREIGN KEY (review_id) REFERENCES reviews(id) NOT VALID;
ALTER TABLE public.external_reviews VALIDATE CONSTRAINT external_reviews_review_id_fkey;
ALTER TABLE public.external_reviews ADD CONSTRAINT external_reviews_reviewee_id_fkey FOREIGN KEY (reviewee_id) REFERENCES app_users(id) NOT VALID;
ALTER TABLE public.external_reviews VALIDATE CONSTRAINT external_reviews_reviewee_id_fkey;

-- Create external_review_questions table
CREATE TABLE public.external_review_questions (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    external_review_id UUID NOT NULL,
    text TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('rating', 'text', 'multiple_choice')),
    options JSONB,
    "order" INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.external_review_questions ENABLE ROW LEVEL SECURITY;

CREATE UNIQUE INDEX external_review_questions_pkey ON public.external_review_questions USING btree (id);
ALTER TABLE public.external_review_questions ADD CONSTRAINT external_review_questions_pkey PRIMARY KEY USING INDEX external_review_questions_pkey;
ALTER TABLE public.external_review_questions ADD CONSTRAINT external_review_questions_external_review_id_fkey FOREIGN KEY (external_review_id) REFERENCES external_reviews(id) NOT VALID;
ALTER TABLE public.external_review_questions VALIDATE CONSTRAINT external_review_questions_external_review_id_fkey;

-- Create external_review_answers table
CREATE TABLE public.external_review_answers (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    external_review_question_id UUID NOT NULL,
    external_review_id UUID NOT NULL,
    answer JSONB,
    submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.external_review_answers ENABLE ROW LEVEL SECURITY;

CREATE UNIQUE INDEX external_review_answers_pkey ON public.external_review_answers USING btree (id);
ALTER TABLE public.external_review_answers ADD CONSTRAINT external_review_answers_pkey PRIMARY KEY USING INDEX external_review_answers_pkey;
ALTER TABLE public.external_review_answers ADD CONSTRAINT external_review_answers_external_review_question_id_fkey FOREIGN KEY (external_review_question_id) REFERENCES external_review_questions(id) NOT VALID;
ALTER TABLE public.external_review_answers VALIDATE CONSTRAINT external_review_answers_external_review_question_id_fkey;
ALTER TABLE public.external_review_answers ADD CONSTRAINT external_review_answers_external_review_id_fkey FOREIGN KEY (external_review_id) REFERENCES external_reviews(id) NOT VALID;
ALTER TABLE public.external_review_answers VALIDATE CONSTRAINT external_review_answers_external_review_id_fkey;

-- Grant permissions to auth roles for external_reviews
grant select, update on table public.external_reviews to anon;
grant delete, insert, references, select, trigger, truncate, update on table public.external_reviews to authenticated;
grant delete, insert, references, select, trigger, truncate, update on table public.external_reviews to service_role;

-- Grant permissions to auth roles for external_review_questions
grant select on table public.external_review_questions to anon;
grant delete, insert, references, select, trigger, truncate, update on table public.external_review_questions to authenticated;
grant delete, insert, references, select, trigger, truncate, update on table public.external_review_questions to service_role;

-- Grant permissions to auth roles for external_review_answers
grant delete, insert, select, update on table public.external_review_answers to anon;
grant delete, insert, references, select, trigger, truncate, update on table public.external_review_answers to authenticated;
grant delete, insert, references, select, trigger, truncate, update on table public.external_review_answers to service_role;