import React from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import UserReviewRepository from '@/lib/repository/user-review-repository';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getRandomCompletedImage } from '@/utils/common/common';

interface MyReviewProps {
  params: Promise<{ id: string }>;
}

const MyReviewCompletePage: React.FC<MyReviewProps> = async ({ params }) => {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const activeReview = await UserReviewRepository.getById({
    id
  });

  const isReviewee = session.user.id === activeReview.reviewee_id;

  const imagePath = getRandomCompletedImage();

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl max-w-sm sm:max-w-md md:max-w-lg w-full p-0 m-4 overflow-hidden border border-gray-100">
        <div className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-primary/90 to-primary/60 p-6 pb-4">
          <Image
            src={`/images/${imagePath}`}
            width={180}
            height={180}
            alt="Picture of an employeer celebrating with balloons and confetti."
            className="rounded-full shadow-lg border-4 border-white bg-white"
          />
        </div>
        <div className="w-full px-6 pb-6 pt-2">
          {isReviewee && (
            <div className="mb-4">
              <h2 className="text-xl font-bold text-primary mb-2 text-center">
                ¡Autoevaluación completada!
              </h2>
              <p className="text-center text-gray-800 text-base leading-relaxed bg-primary/10 rounded-lg p-3 font-medium">
                ¡Excelente! Has completado tu autoevaluación con éxito.
                <br />
                Agradecemos tu tiempo y reflexión en este importante paso. En
                breve recibirás un correo de confirmación.
                <br />
                Recuerda, esta evaluación es una herramienta valiosa para tu
                crecimiento y desarrollo profesional.
                <br />
                <span className="block mt-2 font-semibold text-primary">
                  Una vez que ambos, tú y tu evaluador, hayan completado la
                  evaluación, podrás ver los resultados en esta página.
                </span>
                <br />
                ¡Gracias por tu compromiso con este proceso!
              </p>
            </div>
          )}
          {!isReviewee && (
            <div className="mb-4">
              <h2 className="text-xl font-bold text-primary mb-2 text-center">
                ¡Evaluación enviada!
              </h2>
              <p className="text-center text-gray-800 text-base leading-relaxed bg-primary/10 rounded-lg p-3 font-medium">
                ¡Excelente trabajo! Has completado la evaluación de{' '}
                <b>{activeReview.reviewee.full_name}</b>.<br />
                Te agradecemos tu tiempo y esfuerzo en este proceso.
                <br />
                Si tienes más evaluados, puedes continuar con sus evaluaciones
                en la sección:
              </p>
              <p className="text-center mt-3">
                <Link
                  className="inline-block px-6 py-2 rounded-lg bg-primary text-white text-center cursor-pointer font-bold transform transition-transform duration-150 hover:scale-105 shadow-md"
                  href={{ pathname: '/reviewees' }}
                >
                  Mis evaluados
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReviewCompletePage;
