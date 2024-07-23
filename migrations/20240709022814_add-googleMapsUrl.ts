import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('food', (table) => {
    table.string('googleMapsUrl')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('food', (table) => {
    table.dropColumn('googleMapsUrl')
  })
}

