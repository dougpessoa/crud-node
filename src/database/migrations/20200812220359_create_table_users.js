exports.up = knex => knex.schema.createTable('users', table => {
  table.string('id').primary()
  table.string('name').notNullable()
  table.string('lastname').notNullable()
  table.string('phone')
  table.text('email').notNullable().unique()
  table.text('password').notNullable()


  table.timestamp('create_at').defaultTo(knex.fn.now())
  table.timestamp('updated_at').defaultTo(knex.fn.now())
});


exports.down = knex => knex.schema.dropTable('users')
