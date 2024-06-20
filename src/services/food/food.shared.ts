// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Food, FoodData, FoodPatch, FoodQuery, FoodService } from './food.class'

export type { Food, FoodData, FoodPatch, FoodQuery }

export type FoodClientService = Pick<FoodService<Params<FoodQuery>>, (typeof foodMethods)[number]>

export const foodPath = 'food'

export const foodMethods: Array<keyof FoodService> = ['find', 'get', 'create', 'patch', 'remove']

export const foodClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(foodPath, connection.service(foodPath), {
    methods: foodMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [foodPath]: FoodClientService
  }
}
