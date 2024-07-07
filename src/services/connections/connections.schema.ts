// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ConnectionsService } from './connections.class'
import { userSchema } from '../users/users.schema'
import { roomsSchema } from '../rooms/rooms.schema'
import { randomUUID } from 'crypto'

// Main data model schema
export const connectionsSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),
    userId: Type.String({ format: 'uuid' }),
    roomId: Type.String({ format: 'uuid' }),
    ready: Type.Boolean(),
  },
  { $id: 'Connections', additionalProperties: false }
)
export type Connections = Static<typeof connectionsSchema>
export const connectionsValidator = getValidator(connectionsSchema, dataValidator)
export const connectionsResolver = resolve<Connections, HookContext<ConnectionsService>>({})

export const connectionsExternalResolver = resolve<Connections, HookContext<ConnectionsService>>({})

// Schema for creating new entries
export const connectionsDataSchema = Type.Pick(connectionsSchema, ['userId', 'roomId'], {
  $id: 'ConnectionsData'
})
export type ConnectionsData = Static<typeof connectionsDataSchema>
export const connectionsDataValidator = getValidator(connectionsDataSchema, dataValidator)
export const connectionsDataResolver = resolve<Connections, HookContext<ConnectionsService>>({
  id: async () => randomUUID(),
  ready: async () => false
})

// Schema for updating existing entries
export const connectionsPatchSchema = Type.Partial(connectionsSchema, {
  $id: 'ConnectionsPatch'
})
export type ConnectionsPatch = Static<typeof connectionsPatchSchema>
export const connectionsPatchValidator = getValidator(connectionsPatchSchema, dataValidator)
export const connectionsPatchResolver = resolve<Connections, HookContext<ConnectionsService>>({})

// Schema for allowed query properties
export const connectionsQueryProperties = Type.Pick(connectionsSchema, ['id', 'userId', 'roomId', 'ready'])
export const connectionsQuerySchema = Type.Intersect(
  [
    querySyntax(connectionsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ConnectionsQuery = Static<typeof connectionsQuerySchema>
export const connectionsQueryValidator = getValidator(connectionsQuerySchema, queryValidator)
export const connectionsQueryResolver = resolve<ConnectionsQuery, HookContext<ConnectionsService>>({})
