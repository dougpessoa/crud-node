exports.up = knex => knex.schema.createTable('verification_users', table => {
  table.string('id').primary()
  table.string('username').unique()
  table.string('code_verificator').unique()


  table.timestamp('create_at').defaultTo(knex.fn.now())
  table.timestamp('updated_at').defaultTo(knex.fn.now())
});


exports.down = knex => knex.schema.dropTable('verification_users')
