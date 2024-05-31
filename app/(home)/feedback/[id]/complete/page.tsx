import React from 'react';
import Image from 'next/image';

const FeedbackCompletePage: React.FC = async () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg max-w-sm sm:max-w-md md:max-w-lg w-full p-4 m-4 overflow-hidden">
        <Image
          src="/images/axel-fiesta.png"
          width={250}
          height={250}
          alt="Picture of an employeer celebrating with balloons and confetti."
        />
        <div className="p-4">
          <p className="text-center">
            ¡Excelente! Has completado tu autoevaluación con éxito. Agradecemos
            tu tiempo y reflexión en este importante paso. En breve recibirás un
            correo de confirmación. Recuerda, esta evaluación es una herramienta
            valiosa para tu crecimiento y desarrollo profesional. Una vez que
            ambos, tú y tu evaluador, hayan completado la evaluación, podrás ver
            los resultados en esta página. ¡Gracias por tu compromiso con este
            proceso!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCompletePage;
