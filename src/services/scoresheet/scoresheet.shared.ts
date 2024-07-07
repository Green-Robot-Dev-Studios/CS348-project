// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Scoresheet,
  ScoresheetData,
  ScoresheetPatch,
  ScoresheetQuery,
  ScoresheetService
} from './scoresheet.class'

export type { Scoresheet, ScoresheetData, ScoresheetPatch, ScoresheetQuery }

export type ScoresheetClientService = Pick<
  ScoresheetService<Params<ScoresheetQuery>>,
  (typeof scoresheetMethods)[number]
>

export const scoresheetPath = 'scoresheet'

export const scoresheetMethods: Array<keyof ScoresheetService> = ['get']

export const scoresheetClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(scoresheetPath, connection.service(scoresheetPath), {
    methods: scoresheetMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [scoresheetPath]: ScoresheetClientService
  }
}
