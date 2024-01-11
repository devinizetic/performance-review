INSERT INTO public.roles (role_name) 
VALUES 
  ('admin'),
  ('reviewer'),
  ('reviewee')
  ;

INSERT INTO public.choices (choice_text, choice_value) 
VALUES 
  ('No cumplió las expectativas', 1),
  ('Cumplió las expectativas parcialmente', 2),
  ('Cumplió las expectativas con éxito', 3),
  ('Superó las expectativas', 4),
  ('Superó las expectativas ampliamente', 5)
  ;