// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { FoodService } from './food.class'

// Main data model schema
export const foodSchema = Type.Object(
  {
    id: Type.String({ maxLength: 64 }),
    accessibilityOptionsHasWheelchairAccessibleEntrance: Type.Optional(Type.Boolean()),
    accessibilityOptionsHasWheelchairAccessibleRestroom: Type.Optional(Type.Boolean()),
    accessibilityOptionsHasWheelchairAccessibleSeating: Type.Optional(Type.Boolean()),
    accessibilityOptionsHasWheelchairAccessibleParking: Type.Optional(Type.Boolean()),
    businessStatus: Type.Optional(Type.String({ maxLength: 1024 })),
    hasDelivery: Type.Optional(Type.Boolean()),
    hasDineIn: Type.Optional(Type.Boolean()),
    servesVegetarianFood: Type.Optional(Type.String({ maxLength: 1024 })),
    displayName: Type.String({ maxLength: 1024 }),
    formattedAddress: Type.String({ maxLength: 1024 }),
    locationLat: Type.Number(),
    locationLng: Type.Number(),
    nationalPhoneNumber: Type.Optional(Type.String({ maxLength: 1024 })),
    regularOpeningHoursPeriods: Type.Optional(Type.Any()),
    regularOpeningHoursWeekdayDescriptions: Type.Optional(Type.Any()),
    paymentOptionsAcceptsCreditCards: Type.Optional(Type.Boolean()),
    paymentOptionsAcceptsDebitCards: Type.Optional(Type.Boolean()),
    paymentOptionsAcceptsCashOnly: Type.Optional(Type.Boolean()),
    paymentOptionsAcceptsNfc: Type.Optional(Type.Boolean()),
    photoLink: Type.String({ maxLength: 1024 }),
    priceLevel: Type.Optional(Type.String({ maxLength: 1024 })),
    rating: Type.Optional(Type.Number()),
    hasTakeout: Type.Optional(Type.Boolean()),
    types: Type.Optional(Type.Any()),
    userRatingCount: Type.Optional(Type.Integer()),
    websiteURI: Type.Optional(Type.String({ maxLength: 1024 })),
    googleMapsUrl: Type.Optional(Type.String()),
    editorialSummary: Type.Optional(Type.String({ maxLength: 1024 })),
    parkingOptionsHasFreeParkingLot: Type.Optional(Type.Boolean()),
    parkingOptionsHasPaidParkingLot: Type.Optional(Type.Boolean()),
    parkingOptionsHasFreeStreetParking: Type.Optional(Type.Boolean()),
    parkingOptionsHasPaidStreetParking: Type.Optional(Type.Boolean()),
    parkingOptionsHasValetParking: Type.Optional(Type.Boolean()),
    parkingOptionsHasFreeGarageParking: Type.Optional(Type.Boolean()),
    parkingOptionsHasPaidGarageParking: Type.Optional(Type.Boolean()),
    regularOpeningHours: Type.Optional(Type.String({ maxLength: 1024 }))
  },
  { $id: 'Food', additionalProperties: false }
)
export type Food = Static<typeof foodSchema>
export const foodValidator = getValidator(foodSchema, dataValidator)
export const foodResolver = resolve<Food, HookContext<FoodService>>({})

export const foodExternalResolver = resolve<Food, HookContext<FoodService>>({})

// Schema for creating new entries
export const foodDataSchema = Type.Omit(foodSchema, [], {
  $id: 'FoodData'
})
export type FoodData = Static<typeof foodDataSchema>
export const foodDataValidator = getValidator(foodDataSchema, dataValidator)
export const foodDataResolver = resolve<Food, HookContext<FoodService>>({})

// Schema for updating existing entries
export const foodPatchSchema = Type.Partial(foodSchema, {
  $id: 'FoodPatch'
})
export type FoodPatch = Static<typeof foodPatchSchema>
export const foodPatchValidator = getValidator(foodPatchSchema, dataValidator)
export const foodPatchResolver = resolve<Food, HookContext<FoodService>>({})

// Schema for allowed query properties
export const foodQueryProperties = foodSchema
export const foodQuerySchema = Type.Intersect(
  [
    querySyntax(foodQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type FoodQuery = Static<typeof foodQuerySchema>
export const foodQueryValidator = getValidator(foodQuerySchema, queryValidator)
export const foodQueryResolver = resolve<FoodQuery, HookContext<FoodService>>({})
