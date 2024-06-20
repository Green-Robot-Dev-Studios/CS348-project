// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Votes, VotesData, VotesPatch, VotesQuery } from './votes.schema'

export type { Votes, VotesData, VotesPatch, VotesQuery }

export interface VotesParams extends KnexAdapterParams<VotesQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class VotesService<ServiceParams extends Params = VotesParams> extends KnexService<
  Votes,
  VotesData,
  VotesParams,
  VotesPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'votes'
  }
}
