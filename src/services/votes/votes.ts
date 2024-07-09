// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  votesDataValidator,
  votesPatchValidator,
  votesQueryValidator,
  votesResolver,
  votesExternalResolver,
  votesDataResolver,
  votesPatchResolver,
  votesQueryResolver
} from './votes.schema'

import type { Application } from '../../declarations'
import { VotesService, getOptions } from './votes.class'
import { votesPath, votesMethods } from './votes.shared'
import { ensureConnectionForVote } from '../../hooks/ensure-connection-for-vote'
import { pickWinnerFood } from '../../hooks/pick-winner-food'

export * from './votes.class'
export * from './votes.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const votes = (app: Application) => {
  // Register our service on the Feathers application
  app.use(votesPath, new VotesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: votesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(votesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(votesExternalResolver),
        schemaHooks.resolveResult(votesResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(votesQueryValidator), schemaHooks.resolveQuery(votesQueryResolver)],
      find: [],
      get: [],
      create: [ensureConnectionForVote, schemaHooks.validateData(votesDataValidator), schemaHooks.resolveData(votesDataResolver)],
      patch: [schemaHooks.validateData(votesPatchValidator), schemaHooks.resolveData(votesPatchResolver)],
      remove: []
    },
    after: {
      all: [],
      create: [pickWinnerFood]
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [votesPath]: VotesService
  }
}
