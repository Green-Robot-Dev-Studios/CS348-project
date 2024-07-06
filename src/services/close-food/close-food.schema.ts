// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { CloseFoodService } from './close-food.class'
import { Food, foodSchema } from '../food/food.schema'

// Main data model schema
export const closeFoodSchema = Type.Object(
  {
    roomId: Type.String({ format: 'uuid' }),
    ...foodSchema.properties,
    distance: Type.Number()
  },
  { $id: 'CloseFood', additionalProperties: false }
)
export type CloseFood = Static<typeof closeFoodSchema>
export const closeFoodValidator = getValidator(closeFoodSchema, dataValidator)
export const closeFoodResolver = resolve<CloseFood, HookContext<CloseFoodService>>({})

export const closeFoodExternalResolver = resolve<CloseFood, HookContext<CloseFoodService>>({})

// Schema for creating new entries
export const closeFoodDataSchema = Type.Pick(closeFoodSchema, ['id'], {
  $id: 'CloseFoodData'
})
export type CloseFoodData = Static<typeof closeFoodDataSchema>
export const closeFoodDataValidator = getValidator(closeFoodDataSchema, dataValidator)
export const closeFoodDataResolver = resolve<CloseFood, HookContext<CloseFoodService>>({})

// Schema for updating existing entries
export const closeFoodPatchSchema = Type.Partial(closeFoodSchema, {
  $id: 'CloseFoodPatch'
})
export type CloseFoodPatch = Static<typeof closeFoodPatchSchema>
export const closeFoodPatchValidator = getValidator(closeFoodPatchSchema, dataValidator)
export const closeFoodPatchResolver = resolve<CloseFood, HookContext<CloseFoodService>>({})

// Schema for allowed query properties
export const closeFoodQueryProperties = Type.Pick(closeFoodSchema, ['roomId'])
export const closeFoodQuerySchema = Type.Intersect(
  [
    querySyntax(closeFoodQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CloseFoodQuery = Static<typeof closeFoodQuerySchema>
export const closeFoodQueryValidator = getValidator(closeFoodQuerySchema, queryValidator)
export const closeFoodQueryResolver = resolve<CloseFoodQuery, HookContext<CloseFoodService>>({})
