const uuidv4 = require('uuidv4');

const uuid = uuidv4.uuid;


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('curriculum').del()
    .then(function () {
      // Inserts seed entries
      return knex('curriculum').insert([
        {
          id: uuid(),
          user_id: '579068f8-888d-4f79-86d2-367092765873',
          image: 'image_goes_here',
          biography: 'lorem ipsum',
          experience: JSON.stringify({some: [{name: 'aaaa'}, {name: 'aaaa'}]}),
          education: JSON.stringify({some: [{name: 'aaaa'}, {name: 'aaaa'}]}),
          skills: JSON.stringify({some: [{name: 'aaaa'}, {name: 'aaaa'}]}),
          links: JSON.stringify({some: [{name: 'aaaa'}, {name: 'aaaa'}]}),
          certifications: JSON.stringify({some: [{name: 'aaaa'}, {name: 'aaaa'}]}),
          additional_Information: JSON.stringify({some: [{name: 'aaaa'}, {name: 'aaaa'}]}),
        }
      ]);
    });
};
