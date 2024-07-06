// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { closeFoodClient } from './services/close-food/close-food.shared'
export type {
  CloseFood,
  CloseFoodData,
  CloseFoodQuery,
  CloseFoodPatch
} from './services/close-food/close-food.shared'

import { votesClient } from './services/votes/votes.shared'
export type { Votes, VotesData, VotesQuery, VotesPatch } from './services/votes/votes.shared'

import { connectionsClient } from './services/connections/connections.shared'
export type {
  Connections,
  ConnectionsData,
  ConnectionsQuery,
  ConnectionsPatch
} from './services/connections/connections.shared'

import { roomsClient } from './services/rooms/rooms.shared'
export type { Rooms, RoomsData, RoomsQuery, RoomsPatch } from './services/rooms/rooms.shared'

import { foodClient } from './services/food/food.shared'
export type { Food, FoodData, FoodQuery, FoodPatch } from './services/food/food.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the waterfood app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  const transport = process.env.NODE_ENV === 'production' ? rest() : rest('http://localhost:3030')
  const connection = transport.fetch(window.fetch.bind(window))

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)
  client.configure(foodClient)
  client.configure(roomsClient)
  client.configure(connectionsClient)
  client.configure(votesClient)
  client.configure(closeFoodClient)
  return client
}
