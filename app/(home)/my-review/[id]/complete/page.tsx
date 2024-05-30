import React from 'react';
import Image from 'next/image';

const MyReviewCompletePage: React.FC = async () => {
  return (
    // <div className="flex flex-col justify-center items-center flex-grow">
    //   <div>
    //     <Image
    //       src="/images/axel-fiesta.png"
    //       width={250}
    //       height={250}
    //       alt="Picture of an employeer celebrating with balloons and confetti."
    //     />
    //   </div>
    //   <div>
    //     ¡Gracias por haber completado la evaluación! En breve recibirás un
    //     correo de confirmación. Una vez que ambos hayan completado la
    //     evaluación, podrás ver los resultados en esta página.
    //   </div>
    // </div>
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg max-w-sm w-full overflow-hidden">
        <Image
          src="/images/axel-fiesta.png"
          width={250}
          height={250}
          alt="Picture of an employeer celebrating with balloons and confetti."
        />
        <div className="p-4">
          <p className="text-center">
            ¡Gracias por haber completado la evaluación! En breve recibirás un
            correo de confirmación. Una vez que ambos hayan completado la
            evaluación, podrás ver los resultados en esta página.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyReviewCompletePage;
