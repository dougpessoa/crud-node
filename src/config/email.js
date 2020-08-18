import 'dotenv/config';

export default {
  user: process.env.EMAIL,
  pass: process.env.EMAIL_PASS,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
}