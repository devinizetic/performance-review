import React from 'react';
import Image from 'next/image';
import { createServerClient } from '@/utils/supabase/server';
import UserReviewRepository from '@/lib/repository/user-review-repository';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface MyReviewProps {
  params: { id: string };
}

const MyReviewCompletePage: React.FC<MyReviewProps> = async ({
  params: { id }
}) => {
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const activeReview = await UserReviewRepository.getById({
    id
  });

  const isReviewee = session.user.id === activeReview.reviewee_id;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="card-container flex flex-col items-center justify-center bg-white rounded-lg shadow-lg max-w-sm sm:max-w-md md:max-w-lg w-full min-w-[300px] min-h-[200px] p-4 m-4 overflow-hidden">
        <Image
          src="/images/axel-fiesta.png"
          width={250}
          height={250}
          alt="Picture of an employeer celebrating with balloons and confetti."
        />
        <div className="p-4">
          {isReviewee && (
            <p className="text-center">
              ¡Excelente! Has completado tu autoevaluación con éxito.
              Agradecemos tu tiempo y reflexión en este importante paso. En
              breve recibirás un correo de confirmación. Recuerda, esta
              evaluación es una herramienta valiosa para tu crecimiento y
              desarrollo profesional. Una vez que ambos, tú y tu evaluador,
              hayan completado la evaluación, podrás ver los resultados en esta
              página. ¡Gracias por tu compromiso con este proceso!
            </p>
          )}
          {!isReviewee && (
            <>
              <p className="text-center">
                ¡Excelente trabajo! Has completado la evaluación de{' '}
                <b>{activeReview.reviewee.full_name}</b>. Te agradecemos tu
                tiempo y esfuerzo en este proceso. Si tienes más evaluados,
                puedes continuar con sus evaluaciones en la sección:
              </p>
              <p className="text-center">
                <Link
                  className="inline-block px-6 py-2 rounded-lg bg-primary text-white text-center cursor-pointer font-bold transform transition-transform duration-150 hover:scale-105"
                  href={{ pathname: '/reviewees' }}
                >
                  Mis evaluados
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReviewCompletePage;
