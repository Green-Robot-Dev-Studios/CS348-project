// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('food', (table) => {
    table.boolean('accessibilityOptionsHasWheelchairAccessibleEntrance')
    table.boolean('accessibilityOptionsHasWheelchairAccessibleRestroom')
    table.boolean('accessibilityOptionsHasWheelchairAccessibleSeating')
    table.boolean('accessibilityOptionsHasWheelchairAccessibleParking')
    table.string('businessStatus', 1024)
    table.string('id', 64).primary()
    table.boolean('hasDelivery')
    table.boolean('hasDineIn')
    table.string('servesVegetarianFood', 1024)
    table.string('displayName', 1024).notNullable()
    table.string('formattedAddress', 1024).notNullable()
    table.double('locationLat').notNullable()
    table.double('locationLng').notNullable()
    table.string('nationalPhoneNumber', 1024)
    table.json('regularOpeningHoursPeriods')
    table.json('regularOpeningHoursWeekdayDescriptions')
    table.boolean('paymentOptionsAcceptsCreditCards')
    table.boolean('paymentOptionsAcceptsDebitCards')
    table.boolean('paymentOptionsAcceptsCashOnly')
    table.boolean('paymentOptionsAcceptsNfc')
    table.string('photoLink', 1024).notNullable()
    table.string('priceLevel', 1024)
    table.double('rating')
    table.boolean('hasTakeout')
    table.json('types')
    table.bigint('userRatingCount')
    table.string('websiteURI', 1024)
    table.string('editorialSummary', 1024)
    table.boolean('parkingOptionsHasFreeParkingLot')
    table.boolean('parkingOptionsHasPaidParkingLot')
    table.boolean('parkingOptionsHasFreeStreetParking')
    table.boolean('parkingOptionsHasPaidStreetParking')
    table.boolean('parkingOptionsHasValetParking')
    table.boolean('parkingOptionsHasFreeGarageParking')
    table.boolean('parkingOptionsHasPaidGarageParking')
    table.string('regularOpeningHours', 1024)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('food')
}
