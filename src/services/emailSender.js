import nodemailer from 'nodemailer';
import emailConfig from '../config/email';

export default async function emailSender(to, subject, html) {
  const { host, port, pass, user } = emailConfig;

  const transporter = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
  });

  const result = await transporter.sendMail({
    from: user,
    to,
    subject,
    html
  });

  return result;
}