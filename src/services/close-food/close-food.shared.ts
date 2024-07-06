// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  CloseFood,
  CloseFoodData,
  CloseFoodPatch,
  CloseFoodQuery,
  CloseFoodService
} from './close-food.class'

export type { CloseFood, CloseFoodData, CloseFoodPatch, CloseFoodQuery }

export type CloseFoodClientService = Pick<
  CloseFoodService<Params<CloseFoodQuery>>,
  (typeof closeFoodMethods)[number]
>

export const closeFoodPath = 'close-food'

export const closeFoodMethods: Array<keyof CloseFoodService> = ['find']

export const closeFoodClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(closeFoodPath, connection.service(closeFoodPath), {
    methods: closeFoodMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [closeFoodPath]: CloseFoodClientService
  }
}
