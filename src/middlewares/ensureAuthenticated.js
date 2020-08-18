import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

export default function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    return response.json({ message: `JWT token is missing` });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded;

    request.user = {
      id: sub
    }

    return next();
  } catch (err) {
    return response.json({ message: `Invalid JWT token` });
  }
}