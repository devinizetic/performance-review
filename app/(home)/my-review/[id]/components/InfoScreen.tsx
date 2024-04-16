import CustomSimpleButton from '@/app/components/common/CustomSimpleButton';
import React from 'react';

interface InfoScreenProps {
  onStart: () => void;
  onComplete: () => void;
  onBackPressed: () => void;
  isStartScreen: boolean;
  personName: string;
}

const InfoScreen: React.FC<InfoScreenProps> = ({
  onStart,
  onComplete,
  onBackPressed,
  isStartScreen,
  personName
}) => {
  return (
    <div className="flex flex-col w-6/12 h-3/6 gap-4">
      <div className="flex flex-col flex-1 gap-4 bg-white rounded-lg p-4">
        {isStartScreen ? (
          <div className="flex flex-col flex-1 gap-4">
            <p>
              Hola <b>{personName}</b>!
            </p>
            <p>
              Con el propósito de brindarte apoyo continuo a lo largo de tu
              trayectoria en Devlights y para identificar aspectos relacionados
              con el rendimiento, el desarrollo y el crecimiento dentro de la
              organización, damos inicio al proceso de Evaluación de Desempeño.
            </p>
            <p>¿Cuáles son los objetivos de esta ED?</p>
            <ul>
              <li>
                🌟 Evaluar el potencial de los colaboradores y cumplimiento de
                objetivos de su posición
              </li>
              <li>
                🌟 Detectar aspectos positivos de performance (técnicas + soft).
              </li>
              <li>
                🌟 Ayudar a tener una guía clara y previsible de crecimiento y
                posibilidades dentro de la organización
              </li>
            </ul>
            <p>
              Este proceso implica que deberás completar un formulario de
              autoevaluación / evaluación. Una vez finalizada esta etapa,
              coordinaremos una entrevistas entre vos, tu evaluador y el
              departamento de Recursos Humanos. Dichas entrevistas están
              diseñadas como un espacio integral de retroalimentación.
            </p>
          </div>
        ) : (
          <div className="flex flex-col flex-1 gap-4">
            <p>
              Gracias por completar la evaluación <b>{personName}</b>! 🎉
            </p>
            <p>
              Cuando ambos hayan completado la evaluación, coordinaremos una
              reunion de feedback para discutir los resultados.
            </p>
            <div className="bg-primary bg-opacity-10 font-medium p-2 rounded-lg">
              <p>
                Importante: Una vez presiones <b>Enviar</b> no podrás modificar
                tus respuestas
              </p>
            </div>
          </div>
        )}
      </div>
      {isStartScreen ? (
        <div className="flex items-center justify-center">
          <CustomSimpleButton onClick={onStart}>
            ¡¡Comencemos!!
          </CustomSimpleButton>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <CustomSimpleButton onClick={onBackPressed}>Atrás</CustomSimpleButton>
          <CustomSimpleButton onClick={onComplete}>Enviar</CustomSimpleButton>
        </div>
      )}
    </div>
  );
};

export default InfoScreen;
