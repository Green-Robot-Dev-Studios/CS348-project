// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('votes', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(uuid())'))

    table.uuid('userId').notNullable()
    table.uuid('roomId').notNullable()
    table.uuid('foodId').notNullable().references('id').inTable('food')
    table.timestamp('timestamp').notNullable().defaultTo(knex.fn.now())
    table.boolean('approved').notNullable()

    table.foreign(['userId', 'roomId']).references(['userId', 'roomId']).inTable('connections')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('votes')
}
