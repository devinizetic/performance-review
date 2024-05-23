import { createServerClient } from '@/utils/supabase/server';
import { sendEmail } from './amazon-ses-service';

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

    const messageBody = `Hola <b>${data.full_name}</b>, gracias por completar tu autoevaluación.`;

    const response = await sendEmail({
      to: data.username,
      from: DEFAULT_FROM_EMAIL,
      subject: 'Evaluación completada',
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

    const messageBody = `<div>Hola <b>${reviewerData.full_name}</b>, gracias por completar la evaluacion de <b>${revieweeData.full_name}</b>.<div>`;

    const response = await sendEmail({
      to: reviewerData.username,
      from: DEFAULT_FROM_EMAIL,
      subject: 'Evaluación completada',
      body: messageBody
    });

    return true;
  } catch (_) {
    return false;
  }
};

const sendStartReviewEmail = async ({
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

    const reviewerMessageBody = `<div>Hola <b>${reviewerData.full_name}</b>, en este periodo te toca evaluar a <b>${revieweeData.full_name}</b>.<div>`;
    const revieweeMessageBody = `<div>Hola <b>${revieweeData.full_name}</b>, en este periodo vas a ser evaluado por <b>${reviewerData.full_name}</b>.<div>`;

    const reviewerResp = await sendEmail({
      to: reviewerData.username,
      from: DEFAULT_FROM_EMAIL,
      subject: 'Inicio de Periodo de Evaluacion',
      body: reviewerMessageBody
    });

    const revieweeResp = await sendEmail({
      to: revieweeData.username,
      from: DEFAULT_FROM_EMAIL,
      subject: 'Inicio de Periodo de Evaluacion',
      body: revieweeMessageBody
    });

    return true;
  } catch (_) {
    return false;
  }
};

const EmailService = {
  sendCompleteReviewRevieweeEmail,
  sendCompleteReviewReviewerEmail,
  sendStartReviewEmail
};

export default EmailService;
