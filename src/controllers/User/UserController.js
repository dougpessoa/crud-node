import knex from '../../database';
import { uuid } from 'uuidv4';
import { hash } from 'bcryptjs';

import emailSender from '../../services/emailSender';

import welcomeMessage from '../../templates/welcomeMessage';

export default class UserController {
  async index(request, response) {
    const results = await knex('users');
    
    return response.json(results);
  }

  async show(request, response) {
    const { username } = request.params;

    const [result] = await knex('users').where({ username });

    delete result.password;
    
    return response.json(result);
  }

  async store(request, response) {
    const {
      username,
      name, 
      lastname,
      phone,
      education,
      email,
      password
    } = request.body;

    async function generate_randomNumber_that_not_exists_into_db() {
      const randomNumber = (Math.random() * 999999).toFixed(0);

      const responseVerificator = await knex('verification_users').where({ 
        code: randomNumber
      });

      if(responseVerificator.length !== 0) {
        return generate_randomNumber_that_not_exists_into_db()
      }

      return randomNumber;
    }

    const [usernameSeached] = await knex('users').where({ username }).count();
    
    if(usernameSeached['count(*)'] === 1) {
      return response.json({ error: "Username is already exists" });
    }

    const [emailSearched] = await knex('users').where({ email }).count();

    if(emailSearched['count(*)'] === 1) {
      return response.json({ error: "Has a email account is already registered" });
    }

    const hashedPassword = await hash(password, 8);

    const result = await knex('users').insert([{
      id: uuid(), 
      username,
      name,
      lastname,
      phone,
      actual_education: education,
      email,
      password: hashedPassword
    }]);
    
    if(result[0] === 0) {
      const randomNumber = await generate_randomNumber_that_not_exists_into_db();

      const subject = "Código de verificação - Eu Sou Aluno e Quero um Emprego";
      const text = welcomeMessage(name, randomNumber);
  
      const responseEmail = await emailSender(email, subject, text);

      console.log(responseEmail);

      const resultCreateVerification = await knex('verification_users').insert([{
        id: uuid(),
        username,
        code: randomNumber,
        verified: false,
      }]);

      console.log(resultCreateVerification);

      return response.status(201).send();
    }
    
    return response.status(400).json({ error: 'something is wrong' });
  }
}