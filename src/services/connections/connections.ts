// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  connectionsDataValidator,
  connectionsPatchValidator,
  connectionsQueryValidator,
  connectionsResolver,
  connectionsExternalResolver,
  connectionsDataResolver,
  connectionsPatchResolver,
  connectionsQueryResolver
} from './connections.schema'

import type { Application } from '../../declarations'
import { ConnectionsService, getOptions } from './connections.class'
import { connectionsPath, connectionsMethods } from './connections.shared'

export * from './connections.class'
export * from './connections.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const connections = (app: Application) => {
  // Register our service on the Feathers application
  app.use(connectionsPath, new ConnectionsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: connectionsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(connectionsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(connectionsExternalResolver),
        schemaHooks.resolveResult(connectionsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(connectionsQueryValidator),
        schemaHooks.resolveQuery(connectionsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(connectionsDataValidator),
        schemaHooks.resolveData(connectionsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(connectionsPatchValidator),
        schemaHooks.resolveData(connectionsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [connectionsPath]: ConnectionsService
  }
}
