// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { getValidator, querySyntax, Type } from '@feathersjs/typebox'

import { randomUUID } from 'crypto'
import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { userSchema } from '../users/users.schema'
import { type ConnectionsService } from './connections.class'

// Main data model schema
export const connectionsSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),
    userId: Type.String({ format: 'uuid' }),
    user: Type.Ref(userSchema),
    roomId: Type.String({ format: 'uuid' }),
    ready: Type.Boolean(),
  },
  { $id: 'Connections', additionalProperties: false }
)
export type Connections = Static<typeof connectionsSchema>
export const connectionsValidator = getValidator(connectionsSchema, dataValidator)
export const connectionsResolver = resolve<Connections, HookContext<ConnectionsService>>({})

export const connectionsExternalResolver = resolve<Connections, HookContext<ConnectionsService>>({
  user: (user, value, context) => context.app.service('users').get(value.userId)
})

// Schema for creating new entries
export const connectionsDataSchema = Type.Pick(connectionsSchema, ['userId', 'roomId'], {
  $id: 'ConnectionsData'
})
export type ConnectionsData = Static<typeof connectionsDataSchema>
export const connectionsDataValidator = getValidator(connectionsDataSchema, dataValidator)
export const connectionsDataResolver = resolve<Connections, HookContext<ConnectionsService>>({
  id: async () => randomUUID(),
  ready: async () => false,
  userId: async (value, user, context) => {
    if (context.params.user) {
      return context.params.user.id
    }

    return value
  }
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
