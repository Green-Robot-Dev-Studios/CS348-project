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

export interface ScoresheetParams extends Params<ScoresheetQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class ScoresheetService<ServiceParams extends ScoresheetParams = ScoresheetParams>
  implements ServiceInterface<Scoresheet, ScoresheetData, ServiceParams, ScoresheetPatch>
{
  constructor(public options: ScoresheetServiceOptions) {}

  async get(roomId: string, _params?: ServiceParams): Promise<Scoresheet> {
    const [quickDrawResult, leastDecisiveResult, mostPickyResult, mostEasygoingResult] = await Promise.all([
      this.options.db.raw(
        `
        WITH userVoteTime AS (
          SELECT v.userId, TIMEDIFF(MAX(v.timestamp), MIN(v.timestamp)) AS voteTime
          FROM votes v
          WHERE v.roomId = ?
          GROUP BY v.userId
        ), MinVoteTime AS (
          SELECT MIN(uv.voteTime) AS fastest
          FROM userVoteTime uv
        )
        SELECT uv.userId, m.fastest as FastestTime
        FROM userVoteTime uv JOIN MinVoteTime m ON uv.voteTime = m.fastest;`,
        [roomId]
      ),

      this.options.db.raw(
        `
        WITH userVoteTime AS (
          SELECT v.userId, TIMEDIFF(MAX(v.timestamp), MIN(v.timestamp)) AS voteTime
          FROM votes v
          WHERE v.roomId = ?
          GROUP BY v.userId
        ), MaxVoteTime AS (
          SELECT MAX(uv.voteTime) AS slowest
          FROM userVoteTime uv
        )
        SELECT uv.userId, m.slowest as SlowestTime
        FROM userVoteTime uv JOIN MaxVoteTime m ON uv.voteTime = m.slowest;`,
        [roomId]
      ),

      this.options.db.raw(
        `
        WITH userVoteCount AS (
          SELECT v.userId, SUM(v.approved) AS voteCount
          FROM votes v
          WHERE v.roomId = ?
          GROUP BY v.userId
        ), MinVoteCount AS (
          SELECT MIN(uv.voteCount) AS mostPicky
          FROM userVoteCount uv
        )
        SELECT uv.userId, m.mostPicky as voteCount
        FROM userVoteCount uv JOIN MinVoteCount m ON uv.voteCount = m.mostPicky;`,
        [roomId]
      ),

      this.options.db.raw(
        `
        WITH userVoteCount AS (
          SELECT v.userId, SUM(v.approved) AS voteCount
          FROM votes v
          WHERE v.roomId = ?
          GROUP BY v.userId
        ), MaxVoteCount AS (
          SELECT MAX(uv.voteCount) AS mostEasygoing
          FROM userVoteCount uv
        )
        SELECT uv.userId, m.mostEasygoing as voteCount
        FROM userVoteCount uv JOIN MaxVoteCount m ON uv.voteCount = m.mostEasygoing;`,
        [roomId]
      )
    ])

    const quickDraw = {
      user: await this.options.app.service('users').get(quickDrawResult[0][0].userId),
      time: quickDrawResult[0][0].FastestTime
    }

    const leastDecisive = {
      user: await this.options.app.service('users').get(leastDecisiveResult[0][0].userId),
      time: leastDecisiveResult[0][0].SlowestTime
    }

    const mostPicky = {
      user: await this.options.app.service('users').get(mostPickyResult[0][0].userId),
      voteCount: mostPickyResult[0][0].voteCount
    }

    const mostEasygoing = {
      user: await this.options.app.service('users').get(mostEasygoingResult[0][0].userId),
      voteCount: mostEasygoingResult[0][0].voteCount
    }

    const scoresheet = { quickDraw, leastDecisive, mostPicky, mostEasygoing }
    return { id: randomUUID(), roomId, ...scoresheet }
  }
}

export const getOptions = (app: Application) => {
  return { app, db: app.get('mysqlClient') }
}
