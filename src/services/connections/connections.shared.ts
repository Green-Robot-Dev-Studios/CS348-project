// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Connections,
  ConnectionsData,
  ConnectionsPatch,
  ConnectionsQuery,
  ConnectionsService
} from './connections.class'

export type { Connections, ConnectionsData, ConnectionsPatch, ConnectionsQuery }

export type ConnectionsClientService = Pick<
  ConnectionsService<Params<ConnectionsQuery>>,
  (typeof connectionsMethods)[number]
>

export const connectionsPath = 'connections'

export const connectionsMethods: Array<keyof ConnectionsService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const connectionsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(connectionsPath, connection.service(connectionsPath), {
    methods: connectionsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [connectionsPath]: ConnectionsClientService
  }
}
