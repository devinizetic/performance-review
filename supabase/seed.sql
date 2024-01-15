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

INSERT INTO public.questions (id, question_answer_type, question_text, role_id, question_title, question_description) 
VALUES 
  ('84951CE2-37C3-434D-BB8A-20407C7CF074', 'text', '¿Cuáles consideras que son sus fortalezas?', null, 'Fortalezas', 'Las fortalezas son virtudes, rasgos positivos y capacidades personales.'),
  ('268C30C8-88DB-4440-8CC7-3B828E83F2C0', 'text', '¿Dónde identifica oportunidades de mejora?', null, 'Áreas de oportunidad / mejora', 'Las areas de oportunidad son cosas que sirven para otras cosas'),
  ('5E2BD2BF-5D9E-43F8-B150-4BC8E310C966', 'text', '¿Cómo crees que tu referente puede acompañarte mejor?', 'f7bd405b-ff62-47a5-812c-c6058781b2e1', 'Relación con tu referente (PM, Líder Técnico) dentro del proyecto', null),
  ('319CD909-34A1-4E09-95BA-86D939690AB4', 'text', '¿Estás satisfecho con la comunicación con tu referente? ¿Por qué?', 'f7bd405b-ff62-47a5-812c-c6058781b2e1', 'Relación con tu referente (PM, Líder Técnico) dentro del proyecto', null),
  ('6A1865E2-2BED-41D9-9082-9E14F3FA9B01', 'text', '¿Algún feedback que quieras compartir sobre tu referente?', 'f7bd405b-ff62-47a5-812c-c6058781b2e1', 'Relación con tu referente (PM, Líder Técnico) dentro del proyecto', null),
  ('8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', 'multiple_choice_with_text', 'Marque el puntaje que considere correcto', null, 'Calidad en entregas', 'Esto se basa en la entrega de resultados en sus asignaciones actuales.'),
  ('96311BB5-2F2E-4940-9470-91A7AEE8145D', 'multiple_choice_with_text', 'Marque el puntaje que considere correcto', null, 'Actitud ante los desafíos', 'TODO: que es actitud? es solo una cuestion de actitud'),
  ('57E35424-085F-4684-B58F-718E728E760E', 'multiple_choice_with_text', 'Marque el puntaje que considere correcto', null, 'Espíritu de equipo', 'TODO: Espiritu de equipo, definir descripcion'),
  ('CB579AD8-EF6A-43B3-8E66-B2E89117221F', 'multiple_choice_with_text', 'Marque el puntaje que considere correcto', null, 'Dueño de tu futuro', 'TODO: definir estooo'),
  ('3B09B63F-DAD7-4153-A4D2-A129D8586210', 'multiple_choice_with_text', 'Marque el puntaje que considere correcto', null, 'Inglés', 'TODO: definir descripcion de ingles'),
  ('3C70B7B5-EB22-4D6E-870C-CC1F1614AE97', 'text', '¿En que aspectos te gustaría que se enfoque estos próximos 6 meses?', null, 'Próximo ciclo', null),
  ('873632CB-3FCA-48FB-91A6-FB16417B0224', 'text', '¿Qué podemos hacer para ayudarlo a cumplir sus metas?', null, 'Próximo ciclo', null)
  ;

INSERT INTO public.question_hints (id, question_id, hint_text, hint_sequence)
VALUES
  ('D66164F6-A42D-4EC3-BF49-20EF6170B12F', '84951CE2-37C3-434D-BB8A-20407C7CF074', '¿De qué logro/s estas orgulloso/a?', 1),
  ('8B4A3777-CA5D-4115-8965-6CEA57BEC2CC', '84951CE2-37C3-434D-BB8A-20407C7CF074', '¿Qué meta/s cumplió? ¿Qué le permitió cumplirlas?', 2),
  ('6ED9D8A5-4E7B-4D48-8E25-86D7159DEC82', '84951CE2-37C3-434D-BB8A-20407C7CF074', '¿En qué áreas podría seguir creciendo en esta compañía?', 3),
  ('B6349C71-C93B-42DB-AC9F-8D472039D354', '84951CE2-37C3-434D-BB8A-20407C7CF074', '¿Es una persona curiosa?', 4),
  ('7B1632A9-33CE-4E78-8664-9F1CAA4C69B9', '84951CE2-37C3-434D-BB8A-20407C7CF074', '¿Es una persona con facilidad de trabajar en equipo?', 5),

  ('6DECFF04-23CF-4E72-BD7C-9F7BA1A384F8', '268C30C8-88DB-4440-8CC7-3B828E83F2C0', '¿En qué área/aspecto de su trabajo crees que no alcanzo sus metas?', 1),
  ('9547F6A5-2A8E-44FF-9CF5-BEB3C5B60266', '268C30C8-88DB-4440-8CC7-3B828E83F2C0', '¿Qué elementos/aspectos de su trabajo encontrás más desafiante?', 2),
  ('E362156C-F561-4A6C-AAA3-C21998488D3D', '268C30C8-88DB-4440-8CC7-3B828E83F2C0', '¿Qué te parece que debería hacer distinto en el próximo ciclo y porque?', 3),
  
  ('F7E9A1CC-B1F6-4BC8-8781-0B0EEFAB7189', '8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', 'Se comunica efectivamente', 1),
  ('6C085511-AC86-49E8-A7BA-1095AB4F8128', '8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', 'Se alinea a los objetivos del cliente y la organización', 2),
  ('82BBFF38-D27A-444A-9CB4-1D48FF5DED4E', '8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', 'Presenta muy buenos entregables, código de buena calidad (Claridad, simplicidad, aplicación de buenas prácticas)', 3),
  ('2AD7F393-9924-4883-9306-6556DB80C6F5', '8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', 'Cumple con las deadlines establecidas en el proyecto', 4),

  ('9E31DAEE-C400-49A4-B083-046D4D2AA31F', '96311BB5-2F2E-4940-9470-91A7AEE8145D', 'Innovación', 1),
  ('96B9D5A6-2428-45AA-A8DB-293BEF10BDFD', '96311BB5-2F2E-4940-9470-91A7AEE8145D', 'Actitud positiva', 2),
  ('379FD7C7-8499-4805-BEAE-4DF12925284E', '96311BB5-2F2E-4940-9470-91A7AEE8145D', 'Apertura, acepta feedback, está abierto a otras posturas/formas de hacer las cosas', 3),
  ('2AB30953-9B25-4875-B3B1-64C4E0206983', '96311BB5-2F2E-4940-9470-91A7AEE8145D', 'Proactividad. Busca el mejor camino, no el más rápido', 4),

  ('782E8CC6-FCAC-4DAD-9763-6028E364D137', '57E35424-085F-4684-B58F-718E728E760E', 'Amabilidad en las actividades diarias, trata bien a los demás integrantes, respetuoso, hace de mentor para otros', 1),
  ('ADD4E5DD-21A7-45FE-9646-6A0B2FB60C28', '57E35424-085F-4684-B58F-718E728E760E', 'Alienta el trabajo en equipo', 2),
  ('7C987592-5AC5-4ED1-B0BD-7BA00CC68612', '57E35424-085F-4684-B58F-718E728E760E', 'Acepta la diversidad  de ideas y puntos de vista de otros compañeros', 3),
  ('B7E4E4A5-CC1A-4E17-B2D7-8539A4673475', '57E35424-085F-4684-B58F-718E728E760E', 'Empatía. Festeja los logros propios y ajenos', 4),

  ('D1AAD1DE-0EF3-4A60-A007-00CF2B2DEB89', 'CB579AD8-EF6A-43B3-8E66-B2E89117221F', 'Busca sabiduría', 1),
  ('EC96857A-D236-404D-A50E-0F58D8D204A8', 'CB579AD8-EF6A-43B3-8E66-B2E89117221F', 'Compromiso – Responsabilidad', 2),
  ('BCE50243-EF67-4EFD-B71A-509A295A0D1B', 'CB579AD8-EF6A-43B3-8E66-B2E89117221F', 'Actitud proactiva', 3),
  ('706F9C05-02F6-46BC-AE47-720ACB873593', 'CB579AD8-EF6A-43B3-8E66-B2E89117221F', 'Aprendizaje continuo / Pasión por aprender', 4),

  ('52E27F3D-F072-4828-BE6D-038E82EBC942', '3B09B63F-DAD7-4153-A4D2-A129D8586210', 'Noto una mejoría en el idioma en los últimos 6 meses', 1),
  ('B990519A-D0BC-4340-B231-076DB7B87D99', '3B09B63F-DAD7-4153-A4D2-A129D8586210', 'Necesita reforzar el idioma', 2),
  ('566606FC-97E6-4941-BA8E-08E906695CB5', '3B09B63F-DAD7-4153-A4D2-A129D8586210', 'Asistió a las clases de inglés siempre que el proyecto se lo permite', 3)
  ;

INSERT INTO public.question_choice (question_id, choice_id, choice_sequence)
VALUES
  ('8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', 'e6baf2e7-1cb3-4c9c-a063-557c84a01e3d', 1),
  ('8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', '0fe15ebf-4dbc-4529-a602-1a875af97b94', 2),
  ('8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', '34baac1b-e558-43f7-9e02-cb1080e66b66', 3),
  ('8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', '3b9625b1-7cd1-4293-812e-c8fc2dbf6ffc', 4),
  ('8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', 'f559db54-a438-40c7-8fb5-3cfda244a7ec', 5),

  ('96311BB5-2F2E-4940-9470-91A7AEE8145D', 'e6baf2e7-1cb3-4c9c-a063-557c84a01e3d', 1),
  ('96311BB5-2F2E-4940-9470-91A7AEE8145D', '0fe15ebf-4dbc-4529-a602-1a875af97b94', 2),
  ('96311BB5-2F2E-4940-9470-91A7AEE8145D', '34baac1b-e558-43f7-9e02-cb1080e66b66', 3),
  ('96311BB5-2F2E-4940-9470-91A7AEE8145D', '3b9625b1-7cd1-4293-812e-c8fc2dbf6ffc', 4),
  ('96311BB5-2F2E-4940-9470-91A7AEE8145D', 'f559db54-a438-40c7-8fb5-3cfda244a7ec', 5),

  ('57E35424-085F-4684-B58F-718E728E760E', 'e6baf2e7-1cb3-4c9c-a063-557c84a01e3d', 1),
  ('57E35424-085F-4684-B58F-718E728E760E', '0fe15ebf-4dbc-4529-a602-1a875af97b94', 2),
  ('57E35424-085F-4684-B58F-718E728E760E', '34baac1b-e558-43f7-9e02-cb1080e66b66', 3),
  ('57E35424-085F-4684-B58F-718E728E760E', '3b9625b1-7cd1-4293-812e-c8fc2dbf6ffc', 4),
  ('57E35424-085F-4684-B58F-718E728E760E', 'f559db54-a438-40c7-8fb5-3cfda244a7ec', 5),

  ('CB579AD8-EF6A-43B3-8E66-B2E89117221F', 'e6baf2e7-1cb3-4c9c-a063-557c84a01e3d', 1),
  ('CB579AD8-EF6A-43B3-8E66-B2E89117221F', '0fe15ebf-4dbc-4529-a602-1a875af97b94', 2),
  ('CB579AD8-EF6A-43B3-8E66-B2E89117221F', '34baac1b-e558-43f7-9e02-cb1080e66b66', 3),
  ('CB579AD8-EF6A-43B3-8E66-B2E89117221F', '3b9625b1-7cd1-4293-812e-c8fc2dbf6ffc', 4),
  ('CB579AD8-EF6A-43B3-8E66-B2E89117221F', 'f559db54-a438-40c7-8fb5-3cfda244a7ec', 5),

  ('3B09B63F-DAD7-4153-A4D2-A129D8586210', 'e6baf2e7-1cb3-4c9c-a063-557c84a01e3d', 1),
  ('3B09B63F-DAD7-4153-A4D2-A129D8586210', '0fe15ebf-4dbc-4529-a602-1a875af97b94', 2),
  ('3B09B63F-DAD7-4153-A4D2-A129D8586210', '34baac1b-e558-43f7-9e02-cb1080e66b66', 3),
  ('3B09B63F-DAD7-4153-A4D2-A129D8586210', '3b9625b1-7cd1-4293-812e-c8fc2dbf6ffc', 4),
  ('3B09B63F-DAD7-4153-A4D2-A129D8586210', 'f559db54-a438-40c7-8fb5-3cfda244a7ec', 5)
  ;

INSERT INTO public.reviews (id, start_date, end_date, is_active)
VALUES
  ('F8A54867-D690-451F-989B-6337CEAA651C', '2024-01-01', '2024-01-31', true)
  ;

INSERT INTO public.review_question (review_id, question_id, question_sequence)
VALUES
  ('F8A54867-D690-451F-989B-6337CEAA651C', '84951CE2-37C3-434D-BB8A-20407C7CF074', 1),
  ('F8A54867-D690-451F-989B-6337CEAA651C', '268C30C8-88DB-4440-8CC7-3B828E83F2C0', 2),
  ('F8A54867-D690-451F-989B-6337CEAA651C', '5E2BD2BF-5D9E-43F8-B150-4BC8E310C966', 3),
  ('F8A54867-D690-451F-989B-6337CEAA651C', '319CD909-34A1-4E09-95BA-86D939690AB4', 4),
  ('F8A54867-D690-451F-989B-6337CEAA651C', '6A1865E2-2BED-41D9-9082-9E14F3FA9B01', 5),
  ('F8A54867-D690-451F-989B-6337CEAA651C', '8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', 6),
  ('F8A54867-D690-451F-989B-6337CEAA651C', '96311BB5-2F2E-4940-9470-91A7AEE8145D', 7),
  ('F8A54867-D690-451F-989B-6337CEAA651C', '57E35424-085F-4684-B58F-718E728E760E', 8),
  ('F8A54867-D690-451F-989B-6337CEAA651C', 'CB579AD8-EF6A-43B3-8E66-B2E89117221F', 9),
  ('F8A54867-D690-451F-989B-6337CEAA651C', '3B09B63F-DAD7-4153-A4D2-A129D8586210', 10),
  ('F8A54867-D690-451F-989B-6337CEAA651C', '3C70B7B5-EB22-4D6E-870C-CC1F1614AE97', 11),
  ('F8A54867-D690-451F-989B-6337CEAA651C', '873632CB-3FCA-48FB-91A6-FB16417B0224', 12)
  ;