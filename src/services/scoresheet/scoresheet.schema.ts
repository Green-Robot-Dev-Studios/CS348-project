// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ScoresheetService } from './scoresheet.class'
import { userSchema } from '../users/users.schema'

// Main data model schema
export const scoresheetSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),
    roomId: Type.String({ format: 'uuid' }),
    quickDraw: Type.Object({
      users: Type.Array(Type.Ref(userSchema)),
      time: Type.Number(),
    }),
    leastDecisive: Type.Object({
      users: Type.Array(Type.Ref(userSchema)),
      time: Type.Number(),
    }),
    mostPicky: Type.Object({
      users: Type.Array(Type.Ref(userSchema)),
      voteCount: Type.Number(),
    }),
    mostEasygoing: Type.Object({
      users: Type.Array(Type.Ref(userSchema)),
      voteCount: Type.Number(),
    })
  },
  { $id: 'Scoresheet', additionalProperties: false }
)
export type Scoresheet = Static<typeof scoresheetSchema>
export const scoresheetValidator = getValidator(scoresheetSchema, dataValidator)
export const scoresheetResolver = resolve<Scoresheet, HookContext<ScoresheetService>>({})

export const scoresheetExternalResolver = resolve<Scoresheet, HookContext<ScoresheetService>>({})

// Schema for creating new entries
export const scoresheetDataSchema = Type.Pick(scoresheetSchema, ['id'], {
  $id: 'ScoresheetData'
})
export type ScoresheetData = Static<typeof scoresheetDataSchema>
export const scoresheetDataValidator = getValidator(scoresheetDataSchema, dataValidator)
export const scoresheetDataResolver = resolve<Scoresheet, HookContext<ScoresheetService>>({})

// Schema for updating existing entries
export const scoresheetPatchSchema = Type.Partial(scoresheetSchema, {
  $id: 'ScoresheetPatch'
})
export type ScoresheetPatch = Static<typeof scoresheetPatchSchema>
export const scoresheetPatchValidator = getValidator(scoresheetPatchSchema, dataValidator)
export const scoresheetPatchResolver = resolve<Scoresheet, HookContext<ScoresheetService>>({})

// Schema for allowed query properties
export const scoresheetQueryProperties = Type.Pick(scoresheetSchema, ['roomId'])
export const scoresheetQuerySchema = Type.Intersect(
  [
    querySyntax(scoresheetQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ScoresheetQuery = Static<typeof scoresheetQuerySchema>
export const scoresheetQueryValidator = getValidator(scoresheetQuerySchema, queryValidator)
export const scoresheetQueryResolver = resolve<ScoresheetQuery, HookContext<ScoresheetService>>({})
