// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import knex from 'knex'
import type { Knex } from 'knex'
import type { Application } from './declarations'

declare module './declarations' {
  interface Configuration {
    mysqlClient: Knex
  }
}

export const mysql = (app: Application) => {
  const config = app.get('mysql')
  const db = knex(config!)

  app.set('mysqlClient', db)

  // Heartbeat to keep connection alive, every 10 min
  setInterval(() => db.raw('select 1+1 as result'), 10 * 60 * 60 * 1000)
}
