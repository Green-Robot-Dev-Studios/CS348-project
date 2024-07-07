// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type { CloseFood, CloseFoodData, CloseFoodPatch, CloseFoodQuery } from './close-food.schema'
import { Food } from '../food/food.class'
import knex, { Knex } from 'knex'

export type { CloseFood, CloseFoodData, CloseFoodPatch, CloseFoodQuery }

export interface CloseFoodServiceOptions {
  app: Application,
  db: any
}

export interface CloseFoodParams extends Params<CloseFoodQuery> { }

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class CloseFoodService<ServiceParams extends CloseFoodParams = CloseFoodParams>
  implements ServiceInterface<CloseFood, CloseFoodData, ServiceParams, CloseFoodPatch> {
  constructor(public options: CloseFoodServiceOptions) { }

  async find(_params?: ServiceParams): Promise<CloseFood[]> {
    const roomId = _params?.query?.roomId as string;
    if (!roomId) throw new Error('roomId is required')

    const searchNumber = (await this.options.app.service('rooms').get(roomId)).searchNumber;
    const connection = knex(this.options.db)
    const result = await connection.raw(`
      SELECT f.*, ST_Distance_Sphere(point(f.locationLat, f.locationLng), point(r.latitude, r.longitude)) AS distance
      FROM rooms r JOIN food f
      WHERE r.id = ?
          AND ST_Distance_Sphere(point(f.locationLat, f.locationLng), point(r.latitude, r.longitude)) <= r.maxDistance
      ORDER BY distance
      LIMIT ${searchNumber};`, [roomId])
    return result[0]
  }
}

export const getOptions = (app: Application) => {
  return { app, db: app.get('mysql') }
}