import knex from '../../database';
import path from 'path';
import uploadConfig from '../../config/upload';
import fs from 'fs';

export default class AvatarController {
  async update(request, response) { 
    const { id } = request.user;
    const { filename } = request.file;

    const [user] = await knex('users').where({ id });
    
    if(user.avatar) {
      const filePath = `${uploadConfig.directory}/${user.avatar}`;

      fs.unlinkSync(filePath);
    }

    const result = await knex('users')
    .update({ avatar: filename })
    .where({ id });

    if(result === 1) {
      return response.json({ message: 'avatar updated successfully' });
    }

    return response.json({ message: 'something is wrong' });
  }

  async delete(request, response) {
    const { id } = request.user;

    const [user] = await knex('users').where({ id });
    
    if(user.avatar) {
      const filePath = `${uploadConfig.directory}/${user.avatar}`;

      fs.unlinkSync(filePath);
    }

    const result = await knex('users')
    .update({ avatar: null })
    .where({ id });

    if(result === 1) {
      return response.json({ message: 'avatar deleted successfully' });
    }

    return response.json({ message: 'something is wrong' });
  }
}