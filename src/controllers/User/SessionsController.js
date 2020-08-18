import knex from '../../database';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import authConfig from '../../config/auth';

export default class SessionsController {
  async authentication(request, response) {
    const { email, password } = request.body;

    const [user] = await knex('users').where({ email });

    if(!user) {
      return response.json({ message: 'Email/Password is invalid' });
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      return response.json({ message: 'Email/Password is invalid' });
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return response.json({user, token});
  }
}