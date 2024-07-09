// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type {
  Id,
  NullableId,
  Paginated,
  PaginationParams,
  Params,
  ServiceInterface
} from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type { CloseFood, CloseFoodData, CloseFoodPatch, CloseFoodQuery } from './close-food.schema'
import { Food } from '../food/food.class'
import knex, { Knex } from 'knex'

export type { CloseFood, CloseFoodData, CloseFoodPatch, CloseFoodQuery }

export interface CloseFoodServiceOptions {
  app: Application
  db: Knex
}

export interface CloseFoodParams extends Params<CloseFoodQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class CloseFoodService<ServiceParams extends CloseFoodParams = CloseFoodParams>
  implements ServiceInterface<CloseFood, CloseFoodData, ServiceParams, CloseFoodPatch>
{
  constructor(public options: CloseFoodServiceOptions) {}

  async find(_params?: (ServiceParams & { paginate?: PaginationParams }) | undefined): Promise<any> {
    const roomId = _params?.query?.roomId as string
    if (!roomId) throw new Error('roomId is required')

    const searchNumber = (await this.options.app.service('rooms').get(roomId)).searchNumber
    const result = await this.options.db.raw(
      `
      SELECT f.*, ST_Distance_Sphere(point(f.locationLat, f.locationLng), point(r.latitude, r.longitude)) AS distance
      FROM rooms r JOIN food f
      WHERE r.id = ?
          AND ST_Distance_Sphere(point(f.locationLat, f.locationLng), point(r.latitude, r.longitude)) <= r.maxDistance
      ORDER BY distance
      LIMIT ${searchNumber};`,
      [roomId]
    )
    const data = result[0] as CloseFood[]
    return { limit: 0, skip: 0, total: data.length, data }
  }
}

export const getOptions = (app: Application) => {
  return { app, db: app.get('mysqlClient') }
}
