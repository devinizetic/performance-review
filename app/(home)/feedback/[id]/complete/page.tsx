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
            ¡Felicitaciones a ambos! Han completado el último paso de este
            proceso de evaluación. Apreciamos su compromiso y colaboración en
            este proceso. Los resultados de esta evaluación serán de gran ayuda
            para el crecimiento y desarrollo profesional. ¡Gracias por su
            participación activa!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCompletePage;
