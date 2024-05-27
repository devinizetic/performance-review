import { createServerClient } from '@/utils/supabase/server';
import { sendEmail } from './amazon-ses-service';
import UserRepository from '../repository/user-repository';

const DEFAULT_FROM_EMAIL = 'Devlights ED <ed@devlights.com>';

const getUserInfoQuery = (userId: string) => {
  const supabase = createServerClient();

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
    <p>Estimado/a <b>${data.full_name}</b>,</p>
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
    <p>Estimado/a <b>${reviewerData.full_name}</b>,</p>
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
      subject:
        'Confirmación de finalización de la Evaluación de Desempeño de tu evaluado',
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
    <p>Estimado/a <b>${userFullName}</b>,</p>
    <p>
      Esperamos que te encuentres bien. Nos complace informarte que ha comenzado el proceso de
      Evaluación de Desempeño en Devlights. Este proceso tiene como objetivo acompañarte en
      tu desarrollo profesional dentro de nuestra organización, identificando aspectos de rendimiento
      y áreas de crecimiento.      
    </p>
    <p>
      Para participar, por favor ingresa al siguiente enlace utilizando tu correo de Devlights (@devlights.com):
    </p>
    <p>
      <b>${process.env.VERCEL_SITE_URL}</b>
    </p>
    <p>
      Si eres evaluador, tienes hasta el <b>21/06/2024</b> para completar tu evaluación.
    </p>
    <p>
      Si eres evaluado, tienes hasta el <b>14/06/2024</b> para completar tu autoevaluación.
    </p>
    <p>Si tienes alguna pregunta o necesitas ayuda con algo, no dudes en ponerte en contacto con nosotros.</p>
    <p>Saludos cordiales</p>
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

const sendInitialReviewEmail = async (): Promise<boolean> => {
  try {
    const users = await UserRepository.getAllUsers();

    for (const user of users) {
      await sendStartReviewEmail({
        userFullName: user.full_name || '',
        userEmail: user.username
      });
    }

    return true;
  } catch (_) {
    return false;
  }
};

const EmailService = {
  sendCompleteReviewRevieweeEmail,
  sendCompleteReviewReviewerEmail,
  sendInitialReviewEmail
};

export default EmailService;
