exports.up = knex => knex.schema.createTable('curriculum', table => {
  table.string('id').primary()
  table.string('user_id')
    .references('user.id')
    .notNullable()
    .onDelete('CASCADE')

  table.longtext('image')
  table.longtext('biography')
  table.json('experience')
  table.json('education')
  table.json('skills')
  table.json('links')
  table.json('certifications')
  table.json('additional_Information')


  table.timestamp('create_at').defaultTo(knex.fn.now())
  table.timestamp('updated_at').defaultTo(knex.fn.now())
});


exports.down = knex => knex.schema.dropTable('curriculum')