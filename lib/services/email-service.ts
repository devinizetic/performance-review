import { createClient } from '@/utils/supabase/server';
import { sendEmail } from './amazon-ses-service';
import UserRepository from '../repository/user-repository';
import { addDays, format } from 'date-fns';

const DEFAULT_FROM_EMAIL = 'Devlights ED <ed@devlights.com>';

const getUserInfoQuery = async (userId: string) => {
  const supabase = await createClient();

  return supabase
    .from('app_users')
    .select(
      `
      full_name,
      username
      `
    )
    .eq('id', userId)
    .single();
};

const sendCompleteReviewRevieweeEmail = async ({
  revieweeId
}: {
  revieweeId: string;
}): Promise<boolean> => {
  try {
    const { data, error } = await getUserInfoQuery(revieweeId);

    if (error) return false;

    const messageBody = `
    <div>
    <p>Hola <b>${data.full_name}</b>,</p>
    <p>
      Esperamos que este mensaje te encuentre bien. Nos complace informarte que hemos recibido
      tu autoevaluación de desempeño de manera exitosa.
    </p>
    <p>
      Queremos agradecerte por tu tiempo y dedicación en completar este importante proceso.
      Tu participación activa es fundamental para nuestro continuo crecimiento y mejora.
    </p>
    <p>
      En los próximos días, coordinaremos una entrevista de retroalimentación para discutir los resultados
      de la evaluación. Este será un espacio para compartir perspectivas, celebrar logros y 
      establecer objetivos para el futuro. Si tienes alguna pregunta o inquietud,
      no dudes en ponerte en contacto con nosotros.
    </p>
    <p>Saludos cordiales</p>
    </div>
    `;

    const response = await sendEmail({
      to: data.username,
      from: DEFAULT_FROM_EMAIL,
      subject: 'Confirmación de recepción de tu Autoevaluación de Desempeño',
      body: messageBody
    });

    return true;
  } catch (_) {
    return false;
  }
};

const sendCompleteReviewReviewerEmail = async ({
  revieweeId,
  reviewerId
}: {
  revieweeId: string;
  reviewerId: string;
}): Promise<boolean> => {
  try {
    const { data: revieweeData, error: revieweeError } = await getUserInfoQuery(
      revieweeId
    );
    const { data: reviewerData, error: reviewerError } = await getUserInfoQuery(
      reviewerId
    );

    if (revieweeError || reviewerError) return false;

    const messageBody = `
    <div>
    <p>Hola <b>${reviewerData.full_name}</b>,</p>
    <p>
      Esperamos que este mensaje te encuentre bien. Nos complace informarte que hemos recibido con éxito
      la evaluación de desempeño que has completado sobre <b>${revieweeData.full_name}</b>.
    </p>
    <p>
      Queremos agradecerte por tu tiempo y dedicación en este importante proceso.
      Tu valiosa perspectiva y retroalimentación son esenciales para el desarrollo y crecimiento de nuestro equipo.
    </p>
    <p>
      En los próximos días, coordinaremos una entrevista de retroalimentación para discutir los resultados
      de la evaluación. Este será un espacio para compartir perspectivas, celebrar logros y establecer
      objetivos para el futuro. Si tienes alguna pregunta o inquietud, no dudes en ponerte en contacto con nosotros.
    </p>
    <p>Saludos cordiales</p>
    </div>
    `;

    const response = await sendEmail({
      to: reviewerData.username,
      from: DEFAULT_FROM_EMAIL,
      subject: `Confirmación de finalización de la Evaluación de Desempeño de ${revieweeData.full_name}`,
      body: messageBody
    });

    return true;
  } catch (_) {
    return false;
  }
};

const sendStartReviewEmail = async ({
  userFullName,
  userEmail
}: {
  userFullName: string;
  userEmail: string;
}): Promise<boolean> => {
  try {
    const messageBody = `
    <div>
    <p>Hola <b>${userFullName}</b>,</p>
    <p>
      Esperamos que te encuentres bien. Nos complace informarte que ha comenzado el proceso de
      Evaluación de Desempeño en Devlights. Este proceso tiene como objetivo acompañarte en
      tu desarrollo profesional dentro de nuestra organización, identificando aspectos de rendimiento
      y áreas de crecimiento.
    </p>
    <p>
      Durante las últimas semanas, hemos realizado un seguimiento quincenal de tu desempeño,
      y nos gustaría cerrar esta etapa con un feedback integral de todo este tiempo. Esta evaluación es una
      oportunidad para reflexionar sobre tus logros, identificar oportunidades de mejora y establecer nuevos objetivos.
    </p>
    <p>
      Para participar, por favor ingresa al siguiente enlace utilizando tu correo de Devlights (@devlights.com):
    </p>
    <p>
      <b>${process.env.VERCEL_SITE_URL}</b>
    </p>
    <p>
      Si eres evaluador, tienes hasta el <b>07/07/2024</b> para completar tus evaluaciones.
    </p>
    <p>
      Si eres evaluado, tienes hasta el <b>30/06/2024</b> para completar tu autoevaluación.
    </p>
    <p>Si tienes alguna pregunta o necesitas ayuda con algo, no dudes en ponerte en contacto con nosotros.</p>
    <p>Saludos cordiales</p>
    <img style="width:100%" src="https://drive.usercontent.google.com/download?id=1MkTW1dVTEULP9hxOUUdWaNfzJILf-b-e&export=view&authuser=0" alt="Image">
    </div>
    `;

    const resp = await sendEmail({
      to: userEmail,
      from: DEFAULT_FROM_EMAIL,
      subject: '¡Comienza tu Evaluación de Desempeño en Devlights!',
      body: messageBody
    });

    return true;
  } catch (_) {
    return false;
  }
};

// Send tailored initial review emails to both reviewer and reviewee for a user_review
const sendInitialReviewEmail = async ({
  reviewer,
  reviewee,
  userReviewId
}: {
  reviewer: { full_name: string; username: string };
  reviewee: { full_name: string; username: string };
  userReviewId: string;
}): Promise<{ reviewerSent: boolean; revieweeSent: boolean }> => {
  try {
    const now = new Date();
    const revieweeDeadline = format(addDays(now, 7), 'dd/MM/yyyy');
    const reviewerDeadline = format(addDays(now, 14), 'dd/MM/yyyy');
    // Reviewee email
    const revieweeBody = `
      <div>
      <p>Hola <b>${reviewee.full_name}</b>,</p>
      <p>
        Te informamos que ha comenzado el proceso de Evaluación de Desempeño en Devlights. Por favor, ingresa a tu formulario de autoevaluación usando el siguiente enlace:
      </p>
      <p>
        <a href="${process.env.VERCEL_SITE_URL}/my-review/${userReviewId}">${process.env.VERCEL_SITE_URL}/my-review/${userReviewId}</a>
      </p>
      <p><b>Fecha límite para completar tu autoevaluación: ${revieweeDeadline}</b></p>
      <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
      <p>Saludos cordiales</p>
      <img style="width:100%;margin-top:16px" src="https://drive.usercontent.google.com/download?id=1MkTW1dVTEULP9hxOUUdWaNfzJILf-b-e&export=view&authuser=0" alt="Google Drive Image" />
      </div>
    `;
    const revieweeResult = await sendEmail({
      to: reviewee.username,
      from: DEFAULT_FROM_EMAIL,
      subject: 'Comienza tu Autoevaluación de Desempeño',
      body: revieweeBody
    });

    // Reviewer email
    const reviewerBody = `
      <div>
      <p>Hola <b>${reviewer.full_name}</b>,</p>
      <p>
        Te informamos que ha comenzado el proceso de Evaluación de Desempeño en Devlights. Por favor, ingresa a tu formulario de evaluación para <b>${reviewee.full_name}</b> usando el siguiente enlace:
      </p>
      <p>
        <a href="${process.env.VERCEL_SITE_URL}/my-review/${userReviewId}">${process.env.VERCEL_SITE_URL}/my-review/${userReviewId}</a>
      </p>
      <p><b>Fecha límite para completar tu evaluación: ${reviewerDeadline}</b></p>
      <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
      <p>Saludos cordiales</p>
      <img style="width:100%;margin-top:16px" src="https://drive.usercontent.google.com/download?id=1MkTW1dVTEULP9hxOUUdWaNfzJILf-b-e&export=view&authuser=0" alt="Google Drive Image" />
      </div>
    `;
    const reviewerResult = await sendEmail({
      to: reviewer.username,
      from: DEFAULT_FROM_EMAIL,
      subject: `Comienza tu Evaluación de Desempeño para ${reviewee.full_name}`,
      body: reviewerBody
    });

    return {
      reviewerSent: !!reviewerResult,
      revieweeSent: !!revieweeResult
    };
  } catch (_) {
    return { reviewerSent: false, revieweeSent: false };
  }
};

const sendCompleteFeedbackRevieweeEmail = async ({
  revieweeId
}: {
  revieweeId: string;
}): Promise<boolean> => {
  try {
    const { data, error } = await getUserInfoQuery(revieweeId);

    if (error) return false;

    const messageBody = `
    <div>
    <p>Hola <b>${data.full_name}</b>,</p>
    <p>
      Esperamos que este mensaje te encuentre bien. Nos complace informarte que tu proceso de
      Evaluación de Desempeño en Devlights ha sido completado con éxito
    </p>
    <p>
      La entrevista de retroalimentación se ha llevado a cabo y el formulario de feedback correspondiente
      ha sido completado. Queremos agradecerte por tu participación activa y tu compromiso durante todo el proceso.
    </p>
    <p>
      Ahora puedes acceder a los resultados de tu evaluación en cualquier momento para revisarla.
      Creemos que esta información será valiosa para tu desarrollo profesional continuo.
    </p>
    <p>
      Si tienes alguna pregunta o inquietud sobre tu evaluación o el proceso en general, 
      no dudes en ponerte en contacto con nosotros.
    </p>
    <p>
      Saludos cordiales
    </p>
    </div>
    `;

    const response = await sendEmail({
      to: data.username,
      from: DEFAULT_FROM_EMAIL,
      subject:
        '¡Tu Evaluación de Desempeño está completa y lista para revisar!',
      body: messageBody
    });

    return true;
  } catch (_) {
    return false;
  }
};

const EmailService = {
  sendCompleteReviewRevieweeEmail,
  sendCompleteReviewReviewerEmail,
  sendInitialReviewEmail,
  sendCompleteFeedbackRevieweeEmail
};

export default EmailService;
