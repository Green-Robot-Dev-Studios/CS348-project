// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('food', (table) => {
    table.boolean('accessibilityOptionsHasWheelchairAccessibleEntrance').notNullable()
    table.boolean('accessibilityOptionsHasWheelchairAccessibleRestroom').notNullable()
    table.boolean('accessibilityOptionsHasWheelchairAccessibleSeating').notNullable()
    table.boolean('accessibilityOptionsHasWheelchairAccessibleParking').notNullable()
    table.string('businessStatus', 1024).notNullable()
    table.string('id', 64).primary().notNullable()
    table.boolean('hasDelivery').notNullable()
    table.boolean('hasDineIn').nullable()
    table.string('servesVegetarianFood', 1024).nullable()
    table.string('displayName', 1024).notNullable()
    table.string('formattedAddress', 1024).notNullable()
    table.double('locationLat').notNullable()
    table.double('locationLng').notNullable()
    table.string('nationalPhoneNumber', 1024).notNullable()
    table.json('regularOpeningHoursPeriods').nullable()
    table.json('regularOpeningHoursWeekdayDescriptions').nullable()
    table.boolean('paymentOptionsAcceptsCreditCards').notNullable()
    table.boolean('paymentOptionsAcceptsDebitCards').notNullable()
    table.boolean('paymentOptionsAcceptsCashOnly').notNullable()
    table.boolean('paymentOptionsAcceptsNfc').notNullable()
    table.string('photoLink', 1024).notNullable()
    table.string('priceLevel', 1024).nullable()
    table.double('rating').notNullable()
    table.boolean('hasTakeout').notNullable()
    table.json('types').notNullable()
    table.bigint('userRatingCount').notNullable()
    table.string('websiteURI', 1024).nullable()
    table.string('editorialSummary', 1024).nullable()
    table.boolean('parkingOptionsHasFreeParkingLot').notNullable()
    table.boolean('parkingOptionsHasPaidParkingLot').notNullable()
    table.boolean('parkingOptionsHasFreeStreetParking').notNullable()
    table.boolean('parkingOptionsHasPaidStreetParking').notNullable()
    table.boolean('parkingOptionsHasValetParking').notNullable()
    table.boolean('parkingOptionsHasFreeGarageParking').notNullable()
    table.boolean('parkingOptionsHasPaidGarageParking').notNullable()
    table.string('regularOpeningHours', 1024).nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('food')
}
