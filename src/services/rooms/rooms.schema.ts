// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { RoomsService } from './rooms.class'
import { foodSchema } from '../food/food.schema'
import { randomUUID } from 'crypto'

// Main data model schema
export const roomsSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),
    picked: Type.Optional(Type.String()),
    pickedFood: Type.Optional(Type.Ref(foodSchema)),
    longitude: Type.Number(),
    latitude: Type.Number(),
    searchNumber: Type.Number(),
    maxDistance: Type.Number()
  },
  { $id: 'Rooms', additionalProperties: false }
)
export type Rooms = Static<typeof roomsSchema>
export const roomsValidator = getValidator(roomsSchema, dataValidator)
export const roomsResolver = resolve<Rooms, HookContext<RoomsService>>({})

export const roomsExternalResolver = resolve<Rooms, HookContext<RoomsService>>({
  pickedFood: async (food, value, context) => {
    if (value.picked) return context.app.service('food').get(value.picked)
  }
})

// Schema for creating new entries
export const roomsDataSchema = Type.Pick(
  roomsSchema,
  ['longitude', 'latitude', 'searchNumber', 'maxDistance'],
  {
    $id: 'RoomsData'
  }
)
export type RoomsData = Static<typeof roomsDataSchema>
export const roomsDataValidator = getValidator(roomsDataSchema, dataValidator)
export const roomsDataResolver = resolve<Rooms, HookContext<RoomsService>>({
  id: async () => randomUUID(),
})

// Schema for updating existing entries
export const roomsPatchSchema = Type.Partial(roomsSchema, {
  $id: 'RoomsPatch'
})
export type RoomsPatch = Static<typeof roomsPatchSchema>
export const roomsPatchValidator = getValidator(roomsPatchSchema, dataValidator)
export const roomsPatchResolver = resolve<Rooms, HookContext<RoomsService>>({})

// Schema for allowed query properties
export const roomsQueryProperties = Type.Pick(roomsSchema, [
  'id',
  'picked',
  'longitude',
  'latitude',
  'searchNumber',
  'maxDistance'
])
export const roomsQuerySchema = Type.Intersect(
  [
    querySyntax(roomsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type RoomsQuery = Static<typeof roomsQuerySchema>
export const roomsQueryValidator = getValidator(roomsQuerySchema, queryValidator)
export const roomsQueryResolver = resolve<RoomsQuery, HookContext<RoomsService>>({})
