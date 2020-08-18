import knex from '../../database';

export default class VerifiedController {
  async update(request, response) {
    const { username, code } = request.body;

    const user = await knex('users').where({ username });

    if(user.length === 0) {
      return response.json({ message: 'User doesnt exists' });
    }

    const codeAndUsername = await knex('verification_users')
    .where({ username })
    .andWhere({ code });

    if(codeAndUsername.length === 0) {
      return response.json({ message: 'Username and code does not match' });
    }

    const result = await knex('verification_users').update({
      verified: true
    }).where({ username });

    if(!result) {
      return response.json({ message: 'Unfortunately there was a problem with the server' });
    }

    return response.json({ message: 'User successfully verified' });
  }
}