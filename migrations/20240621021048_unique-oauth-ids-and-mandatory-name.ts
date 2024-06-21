import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.string('googleId').unique().alter()
    table.integer('githubId').unique().alter()

    table.string('name').notNullable().alter()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.string('googleId').alter()
    table.integer('githubId').alter()

    table.string('name').nullable().alter()
  })
}

