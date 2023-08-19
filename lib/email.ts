import { render } from '@react-email/render';
import MagicLinkEmail from 'emails/verify-email';
import { SendVerificationRequestParams } from 'next-auth/providers';
import { createTransport } from 'nodemailer';

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  const emailHtml = render(MagicLinkEmail({ magicLink: params.url }));

  const { identifier, url, provider } = params;
  const { host } = new URL(url);

  const transport = createTransport(provider.server);

  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    html: emailHtml,
  });

  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
  }
};
