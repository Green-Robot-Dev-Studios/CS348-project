// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  closeFoodDataValidator,
  closeFoodPatchValidator,
  closeFoodQueryValidator,
  closeFoodResolver,
  closeFoodExternalResolver,
  closeFoodDataResolver,
  closeFoodPatchResolver,
  closeFoodQueryResolver
} from './close-food.schema'

import type { Application } from '../../declarations'
import { CloseFoodService, getOptions } from './close-food.class'
import { closeFoodPath, closeFoodMethods } from './close-food.shared'

export * from './close-food.class'
export * from './close-food.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const closeFood = (app: Application) => {
  // Register our service on the Feathers application
  app.use(closeFoodPath, new CloseFoodService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: closeFoodMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(closeFoodPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(closeFoodExternalResolver),
        schemaHooks.resolveResult(closeFoodResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(closeFoodQueryValidator),
        schemaHooks.resolveQuery(closeFoodQueryResolver)
      ],
      find: [],
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
    [closeFoodPath]: CloseFoodService
  }
}
