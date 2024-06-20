// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('connections', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(uuid())'))

    table.uuid('userId').notNullable().references('id').inTable('users')
    table.uuid('roomId').notNullable().references('id').inTable('rooms')
    table.boolean('ready').notNullable().defaultTo(false)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('connections')
}
