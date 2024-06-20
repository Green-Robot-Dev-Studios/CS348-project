// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Rooms, RoomsData, RoomsPatch, RoomsQuery } from './rooms.schema'

export type { Rooms, RoomsData, RoomsPatch, RoomsQuery }

export interface RoomsParams extends KnexAdapterParams<RoomsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class RoomsService<ServiceParams extends Params = RoomsParams> extends KnexService<
  Rooms,
  RoomsData,
  RoomsParams,
  RoomsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'rooms'
  }
}
