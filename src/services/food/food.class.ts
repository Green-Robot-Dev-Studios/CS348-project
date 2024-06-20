// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Food, FoodData, FoodPatch, FoodQuery } from './food.schema'

export type { Food, FoodData, FoodPatch, FoodQuery }

export interface FoodParams extends KnexAdapterParams<FoodQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class FoodService<ServiceParams extends Params = FoodParams> extends KnexService<
  Food,
  FoodData,
  FoodParams,
  FoodPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'food'
  }
}
