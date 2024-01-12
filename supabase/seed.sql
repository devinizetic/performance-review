INSERT INTO public.roles (id, role_name) 
VALUES 
  ('ced3b2b5-cb87-4010-bfbf-f034d4d96d71', 'admin'),
  ('34a62928-ecab-477d-bb50-210e2e2ff15e', 'reviewer'),
  ('f7bd405b-ff62-47a5-812c-c6058781b2e1', 'reviewee')
  ;

INSERT INTO public.choices (id, choice_text, choice_value) 
VALUES 
  ('e6baf2e7-1cb3-4c9c-a063-557c84a01e3d', 'No cumplió las expectativas', 1),
  ('0fe15ebf-4dbc-4529-a602-1a875af97b94', 'Cumplió las expectativas parcialmente', 2),
  ('34baac1b-e558-43f7-9e02-cb1080e66b66', 'Cumplió las expectativas con éxito', 3),
  ('3b9625b1-7cd1-4293-812e-c8fc2dbf6ffc', 'Superó las expectativas', 4),
  ('f559db54-a438-40c7-8fb5-3cfda244a7ec', 'Superó las expectativas ampliamente', 5)
  ;