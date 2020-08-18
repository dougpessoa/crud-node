import knex from '../../database';
import { uuid } from 'uuidv4';
import { hash } from 'bcryptjs';

export default class CurriculumController {
  async show(request, response) {
    console.log(request.user);
    const { username } = request.params;

    const [query] = await knex('curriculum')
    .where({ username })
    .join('users', 'users.username', '=', 'curriculum.user_username');
    
    const result = {
      ...query,
      experience: JSON.parse(query.experience),
      skills: JSON.parse(query.skills),
      links: JSON.parse(query.links),
      certifications: JSON.parse(query.certifications),
      additional_Information: JSON.parse(query.additional_Information),
      education: JSON.parse(query.education),
    };

    delete result.password;

    return response.json(result);
  }

  async store(request, response) {
    const {
      username,
      image,
      biography,
      experience,
      education,
      skills,
      links,
      certifications,
      additional_Information,
    } = request.body;

    const user = await knex('users').where({ username });

    if(!user) {
      return response.json({ message: 'User is not exists' });
    }

    const [curriculum] = await knex('curriculum').where({ user_username: username }).count();

    if(curriculum['count(*)'] === 1) {
      return response.json({ message: 'User already have curriculum' })
    }

    const result = await knex('curriculum').insert([{
      id: uuid(),
      user_username: username,
      image,
      biography,
      experience: JSON.stringify(experience),
      education: JSON.stringify(education),
      skills: JSON.stringify(skills),
      links: JSON.stringify(links),
      certifications: JSON.stringify(certifications),
      additional_Information: JSON.stringify(additional_Information)
    }]);

    if(result[0] === 0) {
      return response.status(201).send();
    }

    return response.json({ error: 'Something is wrong' });
  }
}