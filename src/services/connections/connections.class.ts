// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Connections, ConnectionsData, ConnectionsPatch, ConnectionsQuery } from './connections.schema'

export type { Connections, ConnectionsData, ConnectionsPatch, ConnectionsQuery }

export interface ConnectionsParams extends KnexAdapterParams<ConnectionsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ConnectionsService<ServiceParams extends Params = ConnectionsParams> extends KnexService<
  Connections,
  ConnectionsData,
  ConnectionsParams,
  ConnectionsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'connections'
  }
}
