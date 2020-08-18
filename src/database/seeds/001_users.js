const uuidv4 = require('uuidv4');

const uuid = uuidv4.uuid;

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: uuid(), 
          name: 'Douglas',
          lastname: 'Pereira Pessoa',
          phone: '(21) 96601-8518',
          email: 'douglaspereira1@outlook.com',
          password: '123456789'
        },
      ]);
    });
};
