// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type { Scoresheet, ScoresheetData, ScoresheetPatch, ScoresheetQuery } from './scoresheet.schema'
import knex, { Knex } from 'knex'
import { randomUUID } from 'crypto'

export type { Scoresheet, ScoresheetData, ScoresheetPatch, ScoresheetQuery }

export interface ScoresheetServiceOptions {
  app: Application
  db: Knex
}

export interface ScoresheetParams extends Params<ScoresheetQuery> { }

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class ScoresheetService<ServiceParams extends ScoresheetParams = ScoresheetParams>
  implements ServiceInterface<Scoresheet, ScoresheetData, ServiceParams, ScoresheetPatch> {
  constructor(public options: ScoresheetServiceOptions) { }

  async get(roomId: string, _params?: ServiceParams): Promise<Scoresheet> {
    const [quickDrawResult, leastDecisiveResult, mostPickyResult, mostEasygoingResult] = await Promise.all([
      this.options.db.raw(
        `
        WITH userVoteTime AS (
          SELECT v.userId, TIMEDIFF(MAX(v.timestamp), MIN(v.timestamp)) AS voteTime
          FROM votes v
          WHERE v.roomId = ?
          GROUP BY v.userId
        ), minVoteTime AS (
          SELECT MIN(uv.voteTime) AS fastest
          FROM userVoteTime uv
        )
        SELECT DISTINCT uv.userId, m.fastest as FastestTime
        FROM userVoteTime uv 
        JOIN minVoteTime m ON uv.voteTime = m.fastest;`,
        [roomId]
      ),

      this.options.db.raw(
        `
        WITH userVoteTime AS (
          SELECT v.userId, TIMEDIFF(MAX(v.timestamp), MIN(v.timestamp)) AS voteTime
          FROM votes v
          WHERE v.roomId = ?
          GROUP BY v.userId
        ), maxVoteTime AS (
          SELECT MAX(uv.voteTime) AS slowest
          FROM userVoteTime uv
        )
        SELECT DISTINCT uv.userId, m.slowest as SlowestTime
        FROM userVoteTime uv 
        JOIN maxVoteTime m ON uv.voteTime = m.slowest;`,
        [roomId]
      ),

      this.options.db.raw(
        `
        WITH userVoteCount AS (
          SELECT v.userId, SUM(v.approved) AS voteCount
          FROM votes v
          WHERE v.roomId = ?
          GROUP BY v.userId
        ), minVoteCount AS (
          SELECT MIN(uv.voteCount) AS mostPicky
          FROM userVoteCount uv
        )
        SELECT DISTINCT uv.userId, m.mostPicky as voteCount
        FROM userVoteCount uv 
        JOIN minVoteCount m ON uv.voteCount = m.mostPicky;`,
        [roomId]
      ),

      this.options.db.raw(
        `
        WITH userVoteCount AS (
          SELECT v.userId, SUM(v.approved) AS voteCount
          FROM votes v
          WHERE v.roomId = ?
          GROUP BY v.userId
        ), maxVoteCount AS (
          SELECT MAX(uv.voteCount) AS mostEasygoing
          FROM userVoteCount uv
        )
        SELECT DISTINCT uv.userId, m.mostEasygoing as voteCount
        FROM userVoteCount uv 
        JOIN maxVoteCount m ON uv.voteCount = m.mostEasygoing;`,
        [roomId]
      )
    ])

    const quickDraw = {
      users: await Promise.all(quickDrawResult[0].map(
        (row: { userId: string }) => this.options.app.service('users').get(row.userId))),
      time: quickDrawResult[0][0].FastestTime
    }

    const leastDecisive = {
      users: await Promise.all(leastDecisiveResult[0].map(
        (row: { userId: string }) => this.options.app.service('users').get(row.userId))),
      time: leastDecisiveResult[0][0].SlowestTime
    }

    const mostPicky = {
      users: await Promise.all(mostPickyResult[0].map(
        (row: { userId: string }) => this.options.app.service('users').get(row.userId))),
      voteCount: mostPickyResult[0][0].voteCount
    }

    const mostEasygoing = {
      users: await Promise.all(mostEasygoingResult[0].map(
        (row: { userId: string }) => this.options.app.service('users').get(row.userId))),
      voteCount: mostEasygoingResult[0][0].voteCount
    }

    const scoresheet = { quickDraw, leastDecisive, mostPicky, mostEasygoing }
    return { id: randomUUID(), roomId, ...scoresheet }
  }
}

export const getOptions = (app: Application) => {
  return { app, db: app.get('mysqlClient') }
}
