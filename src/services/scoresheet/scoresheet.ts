// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  scoresheetDataValidator,
  scoresheetPatchValidator,
  scoresheetQueryValidator,
  scoresheetResolver,
  scoresheetExternalResolver,
  scoresheetDataResolver,
  scoresheetPatchResolver,
  scoresheetQueryResolver
} from './scoresheet.schema'

import type { Application } from '../../declarations'
import { ScoresheetService, getOptions } from './scoresheet.class'
import { scoresheetPath, scoresheetMethods } from './scoresheet.shared'

export * from './scoresheet.class'
export * from './scoresheet.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const scoresheet = (app: Application) => {
  // Register our service on the Feathers application
  app.use(scoresheetPath, new ScoresheetService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: scoresheetMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(scoresheetPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(scoresheetExternalResolver),
        schemaHooks.resolveResult(scoresheetResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(scoresheetQueryValidator),
        schemaHooks.resolveQuery(scoresheetQueryResolver)
      ],
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
    [scoresheetPath]: ScoresheetService
  }
}
