import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandInput
} from '@aws-sdk/client-ses';

const client = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

interface SendEmailParams {
  to: string;
  from: string;
  subject: string;
  body: string;
}

export const sendEmail = async ({
  to,
  from,
  subject,
  body
}: SendEmailParams) => {
  const params: SendEmailCommandInput = {
    Source: from,
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Subject: {
        Data: subject
      },
      Body: {
        Html: {
          Data: body
        }
      }
    }
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};
