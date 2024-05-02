INSERT INTO public.roles (id, role_name) 
VALUES 
  ('ced3b2b5-cb87-4010-bfbf-f034d4d96d71', 'admin'),
  ('34a62928-ecab-477d-bb50-210e2e2ff15e', 'reviewer'),
  ('f7bd405b-ff62-47a5-812c-c6058781b2e1', 'reviewee')
  ;

INSERT INTO public.choices (id, choice_text_reviewer, choice_text_reviewee, choice_value) 
VALUES 
  ('e6baf2e7-1cb3-4c9c-a063-557c84a01e3d', 'No cumplió las expectativas', 'No cumplí las expectativas', 1),
  ('0fe15ebf-4dbc-4529-a602-1a875af97b94', 'Cumplió las expectativas parcialmente', 'Cumplí las expectativas parcialmente', 2),
  ('34baac1b-e558-43f7-9e02-cb1080e66b66', 'Cumplió las expectativas con éxito', 'Cumplí las expectativas con éxito', 3),
  ('3b9625b1-7cd1-4293-812e-c8fc2dbf6ffc', 'Superó las expectativas', 'Superé las expectativas', 4),
  ('f559db54-a438-40c7-8fb5-3cfda244a7ec', 'Superó las expectativas ampliamente', 'Superé las expectativas ampliamente', 5)
  ;

INSERT INTO public.questions (id, question_answer_type, question_text_reviewer, question_text_reviewee, role_id, question_title, question_description) 
VALUES 
  ('84951CE2-37C3-434D-BB8A-20407C7CF074', 'text', '¿Cuáles considerás que son sus fortalezas?', 'En este último período, ¿Qué fortalezas o habilidades considerás que han contribuido a desempeñarte en tu rol en Devlights?', null, 'Fortalezas', 'Las fortalezas son habilidades, cualidades o atributos positivos que una persona posee y que le permiten desempeñarse de manera sobresaliente en diversas áreas de su vida profesional. Estas fortalezas pueden incluir tanto habilidades técnicas específicas relacionadas con el trabajo como habilidades interpersonales, como la capacidad de comunicación efectiva, el liderazgo, la resolución de problemas o la creatividad.'),
  ('268C30C8-88DB-4440-8CC7-3B828E83F2C0', 'text', '¿Dónde identifica oportunidades de mejora?', 'En tu rol actual, ¿Dónde identificás oportunidades de mejora?', null, 'Áreas de oportunidad / mejora', 'Un área de oportunidad o mejora  se refiere a aspectos específicos en los que uno puede desarrollarse o mejorar para aumentar su efectividad y contribución en el trabajo. Estas áreas pueden abarcar habilidades técnicas, competencias interpersonales o aspectos relacionados con la gestión del tiempo y la organización.'),
  ('5E2BD2BF-5D9E-43F8-B150-4BC8E310C966', 'text', '¿Cómo crees que tu referente puede acompañarte mejor?', '¿Cómo crees que tu referente puede acompañarte mejor?', 'f7bd405b-ff62-47a5-812c-c6058781b2e1', 'Relación con tu referente (PM, Líder Técnico) dentro del proyecto', null),
  ('319CD909-34A1-4E09-95BA-86D939690AB4', 'text', '¿Estás satisfecho con la comunicación con tu referente? ¿Por qué?', '¿Estás satisfecho con la comunicación con tu referente? ¿Por qué?', 'f7bd405b-ff62-47a5-812c-c6058781b2e1', 'Relación con tu referente (PM, Líder Técnico) dentro del proyecto', null),
  ('6A1865E2-2BED-41D9-9082-9E14F3FA9B01', 'text', '¿Algún feedback que quieras compartir sobre tu referente?', '¿Algún feedback que quieras compartir sobre tu referente?', 'f7bd405b-ff62-47a5-812c-c6058781b2e1', 'Relación con tu referente (PM, Líder Técnico) dentro del proyecto', null),
  ('8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', 'multiple_choice_with_text', 'Marcá el puntaje que consideres correcto', 'Marcá el puntaje que consideres correcto', null, 'Calidad en entregas', 'La "calidad de entrega" se refiere a la efectividad con la que el evaluado o un equipo completa y entrega los resultados de su trabajo'),
  ('96311BB5-2F2E-4940-9470-91A7AEE8145D', 'multiple_choice_with_text', 'Marcá el puntaje que consideres correcto', 'Marcá el puntaje que consideres correcto', null, 'Actitud ante los desafíos', 'La "actitud ante desafíos" se refiere a la disposición mental y emocional que una persona muestra cuando se enfrenta a situaciones difíciles, problemas o tareas que requieren un esfuerzo adicional o superación de obstáculos. Una actitud positiva y proactiva ante los desafíos es fundamental para el crecimiento personal y profesional'),
  ('57E35424-085F-4684-B58F-718E728E760E', 'multiple_choice_with_text', 'Marcá el puntaje que consideres correcto', 'Marcá el puntaje que consideres correcto', null, 'Espíritu de equipo', 'Se refiere a la actitud y la mentalidad compartida por los miembros de un grupo o equipo de trabajo. Implica colaboración, apoyo mutuo, compromiso compartido con metas y objetivos comunes, así como un sentido de compañerismo y cohesión dentro del equipo. '),
  ('CB579AD8-EF6A-43B3-8E66-B2E89117221F', 'multiple_choice_with_text', 'Marcá el puntaje que consideres correcto', 'Marcá el puntaje que consideres correcto', null, 'Dueño de tu futuro', 'Enfatiza la responsabilidad y el control que una persona tiene sobre su propio destino y desarrollo personal y profesional. Implica la idea de que cada individuo tiene la capacidad de tomar decisiones conscientes y acciones que moldean su futuro en lugar de simplemente dejarse llevar por circunstancias externas o pasivas. Ser dueño de tu futuro es un enfoque proactivo y capacitante para la vida y la carrera, que te permite crear la vida que deseas en lugar de esperar a que las cosas sucedan por sí solas.'),
  ('3B09B63F-DAD7-4153-A4D2-A129D8586210', 'multiple_choice_with_text', 'Marcá el puntaje que consideres correcto', 'Marcá el puntaje que consideres correcto', null, 'Inglés', 'El nivel de inglés se refiere a la capacidad de una persona para usar el idioma inglés en términos de lectura, escritura, habla y comprensión. Este nivel puede ser desde básico hasta avanzado o fluido. Evaluar el nivel de inglés puede ayudar a determinar la capacidad de una persona para desempeñarse en roles que requieren el uso del inglés.'),
  ('3C70B7B5-EB22-4D6E-870C-CC1F1614AE97', 'text', '¿En que aspectos te gustaría que se enfoque estos próximos 6 meses?', '¿En qué aspectos te gustaría enfocarte estos próximos 6 meses?', null, 'Próximo ciclo', null),
  ('873632CB-3FCA-48FB-91A6-FB16417B0224', 'text', '¿Qué podemos hacer para ayudarlo a cumplir sus metas?', '¿Qué podemos hacer para ayudarte a cumplir tus metas?', null, 'Próximo ciclo', null)
  ;

INSERT INTO public.question_hints (id, question_id, hint_text_reviewer, hint_text_reviewee, hint_sequence)
VALUES
  ('D66164F6-A42D-4EC3-BF49-20EF6170B12F', '84951CE2-37C3-434D-BB8A-20407C7CF074', '¿De qué logro/s estás orgulloso/a?', '¿De qué logro/s estás orgulloso/a?', 1),
  ('8B4A3777-CA5D-4115-8965-6CEA57BEC2CC', '84951CE2-37C3-434D-BB8A-20407C7CF074', '¿Qué meta/s cumplió? ¿Qué le permitió cumplirlas?', '¿Qué meta/s cumpliste? ¿Qué te permitió cumplirlas?', 2),
  ('6ED9D8A5-4E7B-4D48-8E25-86D7159DEC82', '84951CE2-37C3-434D-BB8A-20407C7CF074', '¿En qué áreas podría seguir creciendo en esta compañía?', '¿En qué áreas te gustaría seguir creciendo en esta compañía?', 3),
  ('B6349C71-C93B-42DB-AC9F-8D472039D354', '84951CE2-37C3-434D-BB8A-20407C7CF074', '¿Es una persona curiosa?', '¿Soy una persona curiosa?', 4),
  ('7B1632A9-33CE-4E78-8664-9F1CAA4C69B9', '84951CE2-37C3-434D-BB8A-20407C7CF074', '¿Es una persona con facilidad de trabajar en equipo?', '¿Soy una persona con facilidad de trabajar en equipo?', 5),

  ('6DECFF04-23CF-4E72-BD7C-9F7BA1A384F8', '268C30C8-88DB-4440-8CC7-3B828E83F2C0', '¿En qué área/aspecto de su trabajo crees que no alcanzo sus metas?', '¿En qué área/aspecto de tu trabajo crees que no alcanzaste tus metas?', 1),
  ('9547F6A5-2A8E-44FF-9CF5-BEB3C5B60266', '268C30C8-88DB-4440-8CC7-3B828E83F2C0', '¿Qué elementos/aspectos de su trabajo encontrás más desafiante?', '¿Qué elementos/aspectos de tu trabajo encontrás más desafiante?', 2),
  ('E362156C-F561-4A6C-AAA3-C21998488D3D', '268C30C8-88DB-4440-8CC7-3B828E83F2C0', '¿Qué te parece que debería hacer distinto en el próximo ciclo y porque?', '¿Qué te parece que deberías hacer distinto en el próximo ciclo y por qué?', 3),
  
  ('F7E9A1CC-B1F6-4BC8-8781-0B0EEFAB7189', '8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', 'Se comunica efectivamente', 'Te comunicás efectivamente', 1),
  ('6C085511-AC86-49E8-A7BA-1095AB4F8128', '8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', 'Se alinea a los objetivos del cliente y la organización', 'Te alineás a los objetivos del cliente y la organización', 2),
  ('82BBFF38-D27A-444A-9CB4-1D48FF5DED4E', '8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', 'Presenta muy buenos entregables, código de buena calidad (Claridad, simplicidad, aplicación de buenas prácticas)', 'Presentás muy buenos entregables, código de buena calidad (Claridad, simplicidad, aplicación de buenas prácticas)', 3),
  ('2AD7F393-9924-4883-9306-6556DB80C6F5', '8F5FC2D7-5D0A-41EB-AF91-5D789B77EE65', 'Cumple con las deadlines establecidas en el proyecto', 'Cumplís con las deadlines establecidas en el proyecto', 4),

  ('9E31DAEE-C400-49A4-B083-046D4D2AA31F', '96311BB5-2F2E-4940-9470-91A7AEE8145D', 'Innovación', 'Innovación', 1),
  ('96B9D5A6-2428-45AA-A8DB-293BEF10BDFD', '96311BB5-2F2E-4940-9470-91A7AEE8145D', 'Actitud positiva', 'Actitud positiva', 2),
  ('379FD7C7-8499-4805-BEAE-4DF12925284E', '96311BB5-2F2E-4940-9470-91A7AEE8145D', 'Apertura, acepta feedback, está abierto a otras posturas/formas de hacer las cosas', 'Apertura, aceptás feedback, estás abierto a otras posturas/formas de hacer las cosas', 3),
  ('2AB30953-9B25-4875-B3B1-64C4E0206983', '96311BB5-2F2E-4940-9470-91A7AEE8145D', 'Proactividad. Busca el mejor camino, no el más rápido', 'Proactividad. Buscás el mejor camino, no el más rápido', 4),

  ('782E8CC6-FCAC-4DAD-9763-6028E364D137', '57E35424-085F-4684-B58F-718E728E760E', 'Amabilidad en las actividades diarias, trata bien a los demás integrantes, respetuoso, hace de mentor para otros', 'Amabilidad en las actividades diarias, tratás bien a los demás integrantes, sos respetuoso, hacés de mentor para otros', 1),
  ('ADD4E5DD-21A7-45FE-9646-6A0B2FB60C28', '57E35424-085F-4684-B58F-718E728E760E', 'Alienta el trabajo en equipo', 'Alentás el trabajo en equipo', 2),
  ('7C987592-5AC5-4ED1-B0BD-7BA00CC68612', '57E35424-085F-4684-B58F-718E728E760E', 'Acepta la diversidad  de ideas y puntos de vista de otros compañeros', 'Aceptás la diversidad de ideas y puntos de vista de otros compañeros', 3),
  ('B7E4E4A5-CC1A-4E17-B2D7-8539A4673475', '57E35424-085F-4684-B58F-718E728E760E', 'Empatía. Festeja los logros propios y ajenos', 'Empatía. Festejás los logros propios y ajenos', 4),

  ('D1AAD1DE-0EF3-4A60-A007-00CF2B2DEB89', 'CB579AD8-EF6A-43B3-8E66-B2E89117221F', 'Busca sabiduría', 'Buscás sabiduría', 1),
  ('EC96857A-D236-404D-A50E-0F58D8D204A8', 'CB579AD8-EF6A-43B3-8E66-B2E89117221F', 'Compromiso – Responsabilidad', 'Compromiso – Responsabilidad', 2),
  ('BCE50243-EF67-4EFD-B71A-509A295A0D1B', 'CB579AD8-EF6A-43B3-8E66-B2E89117221F', 'Actitud proactiva', 'Actitud proactiva', 3),
  ('706F9C05-02F6-46BC-AE47-720ACB873593', 'CB579AD8-EF6A-43B3-8E66-B2E89117221F', 'Aprendizaje continuo / Pasión por aprender', 'Aprendizaje continuo / Pasión por aprender', 4),

  ('52E27F3D-F072-4828-BE6D-038E82EBC942', '3B09B63F-DAD7-4153-A4D2-A129D8586210', 'Noto una mejoría en el idioma en los últimos 6 meses', 'Notás una mejoría en el idioma en los últimos 6 meses', 1),
  ('B990519A-D0BC-4340-B231-076DB7B87D99', '3B09B63F-DAD7-4153-A4D2-A129D8586210', 'Necesita reforzar el idioma', 'Necesitás reforzar el idioma', 2),
  ('566606FC-97E6-4941-BA8E-08E906695CB5', '3B09B63F-DAD7-4153-A4D2-A129D8586210', 'Asistió a las clases de inglés siempre que el proyecto se lo permite', 'Asistís a las clases de inglés siempre que el proyecto te lo permite', 3)
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

INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, is_sso_user, raw_user_meta_data, aud, role, confirmation_token, recovery_token, reauthentication_token, email_change_token_new, email_change, email_change_token_current, email_change_confirm_status, phone_change, phone_change_token, instance_id)
VALUES
  ('3A95D6F3-D9F8-4B45-8A13-3DC82FABE148', 'cynthia.stefani@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Cynthia Soledad Stefani","email":"cynthia.stefani@devlights.com","full_name":"Cynthia Soledad Stefani","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('16219BD8-D8FA-4923-8B0A-6A69EDF59EEA', 'nicolas.dogi@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Nicolas Dogi","email":"nicolas.dogi@devlights.com","full_name":"Nicolas Dogi","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('90B07DD8-1D90-45FC-826D-82F2C265D5BF', 'luis.rajoy@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Luis Carlos Rajoy","email":"luis.rajoy@devlights.com","full_name":"Luis Carlos Rajoy","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('28A57B15-0F25-478C-899E-9CA11014FA39', 'santiago.acevedo@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Lindor Santiago Acevedo Micciche","email":"santiago.acevedo@devlights.com","full_name":"Lindor Santiago Acevedo Micciche","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('BCB62B75-3E11-4584-A937-A0260A367445', 'juan.rossi@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Juan Pablo Rossi Querin","email":"juan.rossi@devlights.com","full_name":"Juan Pablo Rossi Querin","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('BB84515B-6894-4AD6-99D4-A23B91B0D4DD', 'facundo.mierez@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Facundo Mierez","email":"facundo.mierez@devlights.com","full_name":"Facundo Mierez","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('6B0C3149-5860-4B67-A7A8-AFFC90B6302B', 'jorge.romero@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Jorge Luis Romero","email":"jorge.romero@devlights.com","full_name":"Jorge Luis Romero","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('1D96C6BF-C866-423C-8228-BB9653881E83', 'marcelo.escobar@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Marcelo Javier Escobar","email":"marcelo.escobar@devlights.com","full_name":"Marcelo Javier Escobar","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('861ECFEF-FDC8-46F4-8555-CE83E0BB8619', 'nahuel.gomez@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Nahuel Ignacio Gomez Rodriguez","email":"nahuel.gomez@devlights.com","full_name":"Nahuel Ignacio Gomez Rodriguez","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('82DC5623-058F-4EF9-9AB5-E527CD442365', 'federico.loebarth@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Federico Loebarth","email":"federico.loebarth@devlights.com","full_name":"Federico Loebarth","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('E0753386-5D5A-4414-83E9-10AAA54A73D2', 'maximiliano.tedesco@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Carlos Maximiliano Tedesco Lopez","email":"maximiliano.tedesco@devlights.com","full_name":"Carlos Maximiliano Tedesco Lopez","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('EAF78615-7CAE-48FC-A8A8-4355B965C6B6', 'fernando.lujan@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Fernando Luján","email":"fernando.lujan@devlights.com","full_name":"Fernando Luján","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('413876BD-DC83-4CE3-B55D-50C09FA24C22', 'guzman.aguirre@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Guzmán,Aguirre","email":"guzman.aguirre@devlights.com","full_name":"Guzmán,Aguirre","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('258A9939-7E37-413D-B38D-51D43B9BAB4C', 'joaquin.branca@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Joaquin Branca","email":"joaquin.branca@devlights.com","full_name":"Joaquin Branca","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('049DC895-FAC7-426D-AF63-79E8FF431B2D', 'ivan.nizetic@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Ivan Nizetic","email":"ivan.nizetic@devlights.com","full_name":"Ivan Nizetic","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('367E98D2-7C4E-4483-A9A9-BD17DC6C02B6', 'claudio.ramirez@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Claudio Marcelo Ramirez","email":"claudio.ramirez@devlights.com","full_name":"Claudio Marcelo Ramirez","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('57C8A536-F8A2-4FA5-8C36-C76874B72276', 'ivan.vallejos@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Ivan Vallejos","email":"ivan.vallejos@devlights.com","full_name":"Ivan Vallejos","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('12DFE7E4-7786-4D59-88C6-CF447E89E5AA', 'federico.frank@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Federico Frank","email":"federico.frank@devlights.com","full_name":"Federico Frank","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('F9AC4484-A64F-4821-B9B1-DA7C0C62C0EC', 'nicolas.romero@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Nicolas Eduardo Romero","email":"nicolas.romero@devlights.com","full_name":"Nicolas Eduardo Romero","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('9F82F92E-E6D0-46EE-9866-F25A56A44C5B', 'diego.komodowski@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Diego Hugo Komodowski","email":"diego.komodowski@devlights.com","full_name":"Diego Hugo Komodowski","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('FC18E6E3-FCBE-4B2B-95C7-01AC0425C696', 'jesus.zini@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Jesus Andres Zini","email":"jesus.zini@devlights.com","full_name":"Jesus Andres Zini","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('567B97BB-E842-4F72-98D7-0A173E326A23', 'jose.alcorta@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Jose Maria Alcorta","email":"jose.alcorta@devlights.com","full_name":"Jose Maria Alcorta","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('B9E22996-4FDA-4941-9EB4-23BB9BCD77E2', 'andres.sandoval@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Andrés Rafael Sandoval Vanasco","email":"andres.sandoval@devlights.com","full_name":"Andrés Rafael Sandoval Vanasco","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('42B3208A-4D67-4FB5-9214-452DC9F40B1B', 'agustin.santillan@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Agustín Santillán","email":"agustin.santillan@devlights.com","full_name":"Agustín Santillán","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('8CB15BF9-A076-4337-B908-68EBEC769627', 'ornella.toledo@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Ornella María Sol Toledo","email":"ornella.toledo@devlights.com","full_name":"Ornella María Sol Toledo","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('784D4E48-E69B-43B7-8EC8-B8A90448C05F', 'accounting@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Ana Vanina Fernández","email":"accounting@devlights.com","full_name":"Ana Vanina Fernández","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('BBC557FD-78DB-4A18-8741-B924DE066A41', 'sebastian.rodriguez@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Sebastián Atlántico Rodríguez Capurro","email":"sebastian.rodriguez@devlights.com","full_name":"Sebastián Atlántico Rodríguez Capurro","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('BF5CDFCB-AF9C-4D94-A002-CC555E2DC88A', 'axel.ibarra@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Axel Nahuel Ibarra","email":"axel.ibarra@devlights.com","full_name":"Axel Nahuel Ibarra","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('72335974-6487-4606-9DA9-CF5A17B7A561', 'martin.coutinho@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Martin Coutinho","email":"martin.coutinho@devlights.com","full_name":"Martin Coutinho","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('8EA7CFB8-157A-4A10-AD20-EFB4DAA2D52A', 'lucas.canteros@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Lucas Canteros","email":"lucas.canteros@devlights.com","full_name":"Lucas Canteros","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('3CD0F162-FBC4-43A6-8A74-0BF103A0CFCC', 'gabriel.leguizamon@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Gabriel Leguizamon","email":"gabriel.leguizamon@devlights.com","full_name":"Gabriel Leguizamon","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('20F2514C-E4A3-452D-871B-237F69B5EA8C', 'emilio.furrer@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Emilio Nicolás Furrer Alegre","email":"emilio.furrer@devlights.com","full_name":"Emilio Nicolás Furrer Alegre","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('B9A5E907-61EB-4BFB-8998-2F99BAC9A13E', 'tomas.paez@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Tomas Paez","email":"tomas.paez@devlights.com","full_name":"Tomas Paez","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('E5BAA6DD-74DA-4645-8A6D-3256E364636A', 'nicolas.mino@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Nicolas Miño","email":"nicolas.mino@devlights.com","full_name":"Nicolas Miño","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('7C3CCAEB-2ABC-40C6-B05A-3EE692C37CC1', 'santiago.castillo@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Santiago Américo Castillo","email":"santiago.castillo@devlights.com","full_name":"Santiago Américo Castillo","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('46B7382C-ECD2-46B7-AC04-501233DD0592', 'juan.horne@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Juan Ignacio Horne","email":"juan.horne@devlights.com","full_name":"Juan Ignacio Horne","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('349C6FC7-945E-4EC9-9D51-51ED54607EBE', 'yamil.luna@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Yamil Leonel Luna","email":"yamil.luna@devlights.com","full_name":"Yamil Leonel Luna","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('B1847D3C-F330-4424-BFA7-5DBA7D1F5FDF', 'catalina.galindez@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Catalina María Galindez","email":"catalina.galindez@devlights.com","full_name":"Catalina María Galindez","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('D7EB3913-4083-4E75-BAAD-5E11C58DCBB4', 'leonardo.canteros@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Leonardo Sebastián Canteros","email":"leonardo.canteros@devlights.com","full_name":"Leonardo Sebastián Canteros","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('C6EC5CFB-F41D-4C1E-B430-7F6FC2B9AE37', 'dario.ayala@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Darío Raúl Ayala","email":"dario.ayala@devlights.com","full_name":"Darío Raúl Ayala","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('43542004-C314-4D92-88B3-894AEAC26097', 'emiliano.estigarribia@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Emiliano Estigarribia","email":"emiliano.estigarribia@devlights.com","full_name":"Emiliano Estigarribia","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('CFAAC570-14B9-49F8-9FD0-8C5FC3596369', 'gonzalo.azofra@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Gonzalo Azofra","email":"gonzalo.azofra@devlights.com","full_name":"Gonzalo Azofra","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('6AA1AC60-A19E-43A2-8F53-8EE430AEDA5E', 'mauricio.lucero@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Mauricio Lucero","email":"mauricio.lucero@devlights.com","full_name":"Mauricio Lucero","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('74219ECA-1104-4EE9-BA84-A54054596E03', 'diego.muner@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Muner Diego Alberto","email":"diego.muner@devlights.com","full_name":"Muner Diego Alberto","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('0587841B-90EB-48D9-A93C-AF2D3EE18F59', 'martin.alzua@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Martin Alzua","email":"martin.alzua@devlights.com","full_name":"Martin Alzua","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('E6EB7159-16F7-4D09-830E-B66B18F2D695', 'adrian.medina@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Adrian Medina","email":"adrian.medina@devlights.com","full_name":"Adrian Medina","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('C2C1BFBE-09AD-4C9F-8705-C04D06957919', 'adrian.palma@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Adrian Arturo Palma Chacon","email":"adrian.palma@devlights.com","full_name":"Adrian Arturo Palma Chacon","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('C711A0FA-166A-4440-8C72-CEE7BE3FD539', 'manuel.bogino@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Manuel Bogino","email":"manuel.bogino@devlights.com","full_name":"Manuel Bogino","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('F9EBA160-329E-439F-A2CC-FCF3D60098E2', 'lucas.zapata@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Lucas Damian Zapata Caceres","email":"lucas.zapata@devlights.com","full_name":"Lucas Damian Zapata Caceres","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('93B16E5F-1C70-4A33-B1F5-FE52B81707F1', 'gaspar.escobar@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Gaspar Escobar","email":"gaspar.escobar@devlights.com","full_name":"Gaspar Escobar","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('3DBBA7F1-43AB-4777-860B-038E25A7A3E0', 'alejandro.presch@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Alejandro Nicolás Presch","email":"alejandro.presch@devlights.com","full_name":"Alejandro Nicolás Presch","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('A74F0784-AEAC-4E1E-AC0F-07E640A79DBE', 'nicolas.daneri@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Nicolás Pablo Daneri","email":"nicolas.daneri@devlights.com","full_name":"Nicolás Pablo Daneri","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('A5525376-E998-4286-BCBE-0B5C73921F5B', 'danilo.bata@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Danilo Marino Bata","email":"danilo.bata@devlights.com","full_name":"Danilo Marino Bata","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('7A4F04DC-AAD1-4127-BFB3-0FE6A857D9EC', 'lautaro.conde@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Lautaro Conde","email":"lautaro.conde@devlights.com","full_name":"Lautaro Conde","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('677CB2DB-6F64-4D7D-95D2-12EAA1EFDC74', 'paola.cartala@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Paola Cartala","email":"paola.cartala@devlights.com","full_name":"Paola Cartala","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('B2B836FB-E27A-4D2B-B42D-17D8328E992D', 'german.sandin@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"German Sandin","email":"german.sandin@devlights.com","full_name":"German Sandin","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('B7C84338-994D-491C-BDFC-202F153953B2', 'nicolas.taglienti@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Nicolas Taglienti","email":"nicolas.taglienti@devlights.com","full_name":"Nicolas Taglienti","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('7093B9A4-A6B0-4D1A-BD94-316E05ACBCFE', 'alejo.mansilla@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Alejo Mansilla","email":"alejo.mansilla@devlights.com","full_name":"Alejo Mansilla","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('721B8A04-20A4-4066-A2BF-365FC6323031', 'balthazar.deweert@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Joaquin Balthasar De Weert","email":"balthazar.deweert@devlights.com","full_name":"Joaquin Balthasar De Weert","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('5D801210-AE84-490F-8B04-44B847F70712', 'gonzalo.lorenzon@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Gonzalo Lorenzon","email":"gonzalo.lorenzon@devlights.com","full_name":"Gonzalo Lorenzon","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('FA7460F6-4A0F-467A-9D00-53A4BC1944C9', 'facundo.vega@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Facundo Vega Paladini","email":"facundo.vega@devlights.com","full_name":"Facundo Vega Paladini","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('BCE232C9-E4FB-4666-870A-5F6920344E52', 'brenda.daubrowsky@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Brenda Agustina Daubrowsky","email":"brenda.daubrowsky@devlights.com","full_name":"Brenda Agustina Daubrowsky","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('8C5D7498-C085-4575-BA72-70725613CCCE', 'german.condori@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"German Jose Condori","email":"german.condori@devlights.com","full_name":"German Jose Condori","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('4E280259-FCA0-4C76-92EF-7B3E15BCA882', 'ana.churruarin@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Ana Paula Churruarin","email":"ana.churruarin@devlights.com","full_name":"Ana Paula Churruarin","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('66D583F5-3804-47CE-8BBF-813CFB9B7358', 'matias.porra@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Matias Exequiel Porra Bustos","email":"matias.porra@devlights.com","full_name":"Matias Exequiel Porra Bustos","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('B431BA83-61DD-4FFF-8E1E-9079E8D1710B', 'horacio.zini@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Horacio Antonio Zini","email":"horacio.zini@devlights.com","full_name":"Horacio Antonio Zini","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('36DEB400-8268-4758-B3CE-90A228750D86', 'nicolas.garcia@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Nicolás Hernán García","email":"nicolas.garcia@devlights.com","full_name":"Nicolás Hernán García","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('3B873782-910C-4EC6-AA3A-A61738EAA7E2', 'ivo.maugeri@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Ivo Maugeri","email":"ivo.maugeri@devlights.com","full_name":"Ivo Maugeri","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('5D95B199-A0B3-4E00-868A-DEB14C4AC01D', 'gonzalo.avila@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Gonzalo Avila","email":"gonzalo.avila@devlights.com","full_name":"Gonzalo Avila","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000'),
  ('F4A8DA4A-1841-4FA4-BCF7-F42F72207378', 'mariana.mopty@devlights.com', '', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', '2024-04-17 15:07:55.839513+00', false, '{"name":"Mariana Beatriz Mopty","email":"mariana.mopty@devlights.com","full_name":"Mariana Beatriz Mopty","email_verified":true}', 'authenticated', 'authenticated', '', '', '', '', '', '', 0, '', '', '00000000-0000-0000-0000-000000000000')
  ;

INSERT INTO public.user_role(user_id, role_id)
VALUES 
  ('90B07DD8-1D90-45FC-826D-82F2C265D5BF', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  ('28A57B15-0F25-478C-899E-9CA11014FA39', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  ('BCB62B75-3E11-4584-A937-A0260A367445', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  ('82DC5623-058F-4EF9-9AB5-E527CD442365', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  ('EAF78615-7CAE-48FC-A8A8-4355B965C6B6', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  ('413876BD-DC83-4CE3-B55D-50C09FA24C22', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  ('258A9939-7E37-413D-B38D-51D43B9BAB4C', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  ('049DC895-FAC7-426D-AF63-79E8FF431B2D', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  ('12DFE7E4-7786-4D59-88C6-CF447E89E5AA', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  ('F9AC4484-A64F-4821-B9B1-DA7C0C62C0EC', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  ('9F82F92E-E6D0-46EE-9866-F25A56A44C5B', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  ('FC18E6E3-FCBE-4B2B-95C7-01AC0425C696', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  ('567B97BB-E842-4F72-98D7-0A173E326A23', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  ('42B3208A-4D67-4FB5-9214-452DC9F40B1B', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  ('677CB2DB-6F64-4D7D-95D2-12EAA1EFDC74', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  --dummy
  ('3A95D6F3-D9F8-4B45-8A13-3DC82FABE148', '34a62928-ecab-477d-bb50-210e2e2ff15e'),
  ('3A95D6F3-D9F8-4B45-8A13-3DC82FABE148', 'ced3b2b5-cb87-4010-bfbf-f034d4d96d71'),
  ('EAF78615-7CAE-48FC-A8A8-4355B965C6B6', 'ced3b2b5-cb87-4010-bfbf-f034d4d96d71')
  ;

INSERT INTO public.reviewer_reviewee(reviewer_id, reviewee_id)
VALUES 
--luis
  ('90B07DD8-1D90-45FC-826D-82F2C265D5BF', '6B0C3149-5860-4B67-A7A8-AFFC90B6302B'),
  ('90B07DD8-1D90-45FC-826D-82F2C265D5BF', 'E5BAA6DD-74DA-4645-8A6D-3256E364636A'),
--santi
('28A57B15-0F25-478C-899E-9CA11014FA39', 'E0753386-5D5A-4414-83E9-10AAA54A73D2'),
('28A57B15-0F25-478C-899E-9CA11014FA39', '413876BD-DC83-4CE3-B55D-50C09FA24C22'),
('28A57B15-0F25-478C-899E-9CA11014FA39', '784D4E48-E69B-43B7-8EC8-B8A90448C05F'),
('28A57B15-0F25-478C-899E-9CA11014FA39', '7C3CCAEB-2ABC-40C6-B05A-3EE692C37CC1'),
('28A57B15-0F25-478C-899E-9CA11014FA39', 'B7C84338-994D-491C-BDFC-202F153953B2'),
('28A57B15-0F25-478C-899E-9CA11014FA39', '3A95D6F3-D9F8-4B45-8A13-3DC82FABE148'),
--juan
('BCB62B75-3E11-4584-A937-A0260A367445', '57C8A536-F8A2-4FA5-8C36-C76874B72276'),
('BCB62B75-3E11-4584-A937-A0260A367445', '46B7382C-ECD2-46B7-AC04-501233DD0592'),
('BCB62B75-3E11-4584-A937-A0260A367445', '349C6FC7-945E-4EC9-9D51-51ED54607EBE'),
('BCB62B75-3E11-4584-A937-A0260A367445', 'B1847D3C-F330-4424-BFA7-5DBA7D1F5FDF'),
('BCB62B75-3E11-4584-A937-A0260A367445', 'BCE232C9-E4FB-4666-870A-5F6920344E52'),
('BCB62B75-3E11-4584-A937-A0260A367445', '36DEB400-8268-4758-B3CE-90A228750D86'),
--fede l
('82DC5623-058F-4EF9-9AB5-E527CD442365', 'F9AC4484-A64F-4821-B9B1-DA7C0C62C0EC'),
('82DC5623-058F-4EF9-9AB5-E527CD442365', '42B3208A-4D67-4FB5-9214-452DC9F40B1B'),
('82DC5623-058F-4EF9-9AB5-E527CD442365', '8EA7CFB8-157A-4A10-AD20-EFB4DAA2D52A'),
('82DC5623-058F-4EF9-9AB5-E527CD442365', 'A5525376-E998-4286-BCBE-0B5C73921F5B'),
('82DC5623-058F-4EF9-9AB5-E527CD442365', '8C5D7498-C085-4575-BA72-70725613CCCE'),
--fer
('EAF78615-7CAE-48FC-A8A8-4355B965C6B6', 'BF5CDFCB-AF9C-4D94-A002-CC555E2DC88A'),
--guz
('413876BD-DC83-4CE3-B55D-50C09FA24C22', '4E280259-FCA0-4C76-92EF-7B3E15BCA882'),
--joaquin
('258A9939-7E37-413D-B38D-51D43B9BAB4C', '72335974-6487-4606-9DA9-CF5A17B7A561'),
('258A9939-7E37-413D-B38D-51D43B9BAB4C', 'F9EBA160-329E-439F-A2CC-FCF3D60098E2'),
('258A9939-7E37-413D-B38D-51D43B9BAB4C', '7A4F04DC-AAD1-4127-BFB3-0FE6A857D9EC'),
--ivan
('049DC895-FAC7-426D-AF63-79E8FF431B2D', 'BB84515B-6894-4AD6-99D4-A23B91B0D4DD'),
('049DC895-FAC7-426D-AF63-79E8FF431B2D', '861ECFEF-FDC8-46F4-8555-CE83E0BB8619'),
('049DC895-FAC7-426D-AF63-79E8FF431B2D', 'EAF78615-7CAE-48FC-A8A8-4355B965C6B6'),
('049DC895-FAC7-426D-AF63-79E8FF431B2D', 'FC18E6E3-FCBE-4B2B-95C7-01AC0425C696'),
('049DC895-FAC7-426D-AF63-79E8FF431B2D', 'B9E22996-4FDA-4941-9EB4-23BB9BCD77E2'),
--fede f
('12DFE7E4-7786-4D59-88C6-CF447E89E5AA', '90B07DD8-1D90-45FC-826D-82F2C265D5BF'),
('12DFE7E4-7786-4D59-88C6-CF447E89E5AA', '82DC5623-058F-4EF9-9AB5-E527CD442365'),
('12DFE7E4-7786-4D59-88C6-CF447E89E5AA', '258A9939-7E37-413D-B38D-51D43B9BAB4C'),
('12DFE7E4-7786-4D59-88C6-CF447E89E5AA', '8CB15BF9-A076-4337-B908-68EBEC769627'),
('12DFE7E4-7786-4D59-88C6-CF447E89E5AA', 'B9A5E907-61EB-4BFB-8998-2F99BAC9A13E'),
--nico r
('F9AC4484-A64F-4821-B9B1-DA7C0C62C0EC', 'D7EB3913-4083-4E75-BAAD-5E11C58DCBB4'),
--diego
('9F82F92E-E6D0-46EE-9866-F25A56A44C5B', '1D96C6BF-C866-423C-8228-BB9653881E83'),
('9F82F92E-E6D0-46EE-9866-F25A56A44C5B', 'A74F0784-AEAC-4E1E-AC0F-07E640A79DBE'),
('9F82F92E-E6D0-46EE-9866-F25A56A44C5B', '7093B9A4-A6B0-4D1A-BD94-316E05ACBCFE'),
('9F82F92E-E6D0-46EE-9866-F25A56A44C5B', '677CB2DB-6F64-4D7D-95D2-12EAA1EFDC74'),
--jesus
('FC18E6E3-FCBE-4B2B-95C7-01AC0425C696', 'BBC557FD-78DB-4A18-8741-B924DE066A41'),
('FC18E6E3-FCBE-4B2B-95C7-01AC0425C696', '93B16E5F-1C70-4A33-B1F5-FE52B81707F1'),
('FC18E6E3-FCBE-4B2B-95C7-01AC0425C696', '3DBBA7F1-43AB-4777-860B-038E25A7A3E0'),
--jose
('567B97BB-E842-4F72-98D7-0A173E326A23', 'E6EB7159-16F7-4D09-830E-B66B18F2D695'),
('567B97BB-E842-4F72-98D7-0A173E326A23', 'C2C1BFBE-09AD-4C9F-8705-C04D06957919'),
('567B97BB-E842-4F72-98D7-0A173E326A23', 'B2B836FB-E27A-4D2B-B42D-17D8328E992D'),
('567B97BB-E842-4F72-98D7-0A173E326A23', '3B873782-910C-4EC6-AA3A-A61738EAA7E2'),
('567B97BB-E842-4F72-98D7-0A173E326A23', '5D95B199-A0B3-4E00-868A-DEB14C4AC01D'),
--agustin
('42B3208A-4D67-4FB5-9214-452DC9F40B1B', '20F2514C-E4A3-452D-871B-237F69B5EA8C'),
('42B3208A-4D67-4FB5-9214-452DC9F40B1B', '721B8A04-20A4-4066-A2BF-365FC6323031'),
('42B3208A-4D67-4FB5-9214-452DC9F40B1B', '5D801210-AE84-490F-8B04-44B847F70712'),
('42B3208A-4D67-4FB5-9214-452DC9F40B1B', 'B431BA83-61DD-4FFF-8E1E-9079E8D1710B'),
--paola
('677CB2DB-6F64-4D7D-95D2-12EAA1EFDC74', 'FA7460F6-4A0F-467A-9D00-53A4BC1944C9'),
('677CB2DB-6F64-4D7D-95D2-12EAA1EFDC74', '66D583F5-3804-47CE-8BBF-813CFB9B7358'),
--dummy
('3A95D6F3-D9F8-4B45-8A13-3DC82FABE148', '049DC895-FAC7-426D-AF63-79E8FF431B2D'),
('3A95D6F3-D9F8-4B45-8A13-3DC82FABE148', 'EAF78615-7CAE-48FC-A8A8-4355B965C6B6'),
('EAF78615-7CAE-48FC-A8A8-4355B965C6B6', '3A95D6F3-D9F8-4B45-8A13-3DC82FABE148')
  ;

INSERT INTO public.reviews (id, start_date, end_date, is_active)
VALUES
  ('F8A54867-D690-451F-989B-6337CEAA651C', null, null, true)
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