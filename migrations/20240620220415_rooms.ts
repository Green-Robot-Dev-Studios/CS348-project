// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('rooms', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(uuid())'))

    table.string('picked', 64).nullable().references('id').inTable('food')
    table.double('longitude').notNullable()
    table.double('latitude').notNullable()
    table.integer('searchNumber').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('rooms')
}
