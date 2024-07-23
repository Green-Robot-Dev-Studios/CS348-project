create table food
(
    accessibilityOptionsHasWheelchairAccessibleEntrance tinyint(1)    null,
    accessibilityOptionsHasWheelchairAccessibleRestroom tinyint(1)    null,
    accessibilityOptionsHasWheelchairAccessibleSeating  tinyint(1)    null,
    accessibilityOptionsHasWheelchairAccessibleParking  tinyint(1)    null,
    businessStatus                                      varchar(1024) null,
    id                                                  varchar(64)   not null
        primary key,
    hasDelivery                                         tinyint(1)    null,
    hasDineIn                                           tinyint(1)    null,
    servesVegetarianFood                                varchar(1024) null,
    displayName                                         varchar(1024) not null,
    formattedAddress                                    varchar(1024) not null,
    locationLat                                         double        not null,
    locationLng                                         double        not null,
    nationalPhoneNumber                                 varchar(1024) null,
    regularOpeningHoursPeriods                          json          null,
    regularOpeningHoursWeekdayDescriptions              json          null,
    paymentOptionsAcceptsCreditCards                    tinyint(1)    null,
    paymentOptionsAcceptsDebitCards                     tinyint(1)    null,
    paymentOptionsAcceptsCashOnly                       tinyint(1)    null,
    paymentOptionsAcceptsNfc                            tinyint(1)    null,
    photoLink                                           varchar(1024) not null,
    priceLevel                                          varchar(1024) null,
    rating                                              double        null,
    hasTakeout                                          tinyint(1)    null,
    types                                               json          null,
    userRatingCount                                     bigint        null,
    websiteURI                                          varchar(1024) null,
    editorialSummary                                    varchar(1024) null,
    parkingOptionsHasFreeParkingLot                     tinyint(1)    null,
    parkingOptionsHasPaidParkingLot                     tinyint(1)    null,
    parkingOptionsHasFreeStreetParking                  tinyint(1)    null,
    parkingOptionsHasPaidStreetParking                  tinyint(1)    null,
    parkingOptionsHasValetParking                       tinyint(1)    null,
    parkingOptionsHasFreeGarageParking                  tinyint(1)    null,
    parkingOptionsHasPaidGarageParking                  tinyint(1)    null,
    regularOpeningHours                                 varchar(1024) null
);

