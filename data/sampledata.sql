CREATE TABLE `food` (
  `accessibilityOptionsHasWheelchairAccessibleEntrance` BOOLEAN,
  `accessibilityOptionsHasWheelchairAccessibleRestroom` BOOLEAN,
  `accessibilityOptionsHasWheelchairAccessibleSeating` BOOLEAN,
  `accessibilityOptionsHasWheelchairAccessibleParking` BOOLEAN,
  `businessStatus` VARCHAR(1024),
  `id` VARCHAR(1024),
  `hasDelivery` BOOLEAN,
  `hasDineIn` BOOLEAN,
  `servesVegetarianFood` VARCHAR(1024) NULL,
  `displayName` VARCHAR(1024),
  `formattedAddress` VARCHAR(1024),
  `locationLat` DOUBLE,
  `locationLng` DOUBLE,
  `nationalPhoneNumber` VARCHAR(1024),
  `regularOpeningHours` JSON,
  `paymentOptionsAcceptsCreditCards` BOOLEAN,
  `paymentOptionsAcceptsDebitCards` BOOLEAN,
  `paymentOptionsAcceptsCashOnly` BOOLEAN,
  `paymentOptionsAcceptsNfc` BOOLEAN,
  `priceLevel` VARCHAR(1024) NULL,
  `rating` DOUBLE,
  `hasTakeout` BOOLEAN,
  `types` JSON,
  `userRatingCount` BIGINT,
  `websiteURI` VARCHAR(1024) NULL,
  `editorialSummary` VARCHAR(1024) NULL,
  `parkingOptionsHasFreeParkingLot` BOOLEAN,
  `parkingOptionsHasPaidParkingLot` BOOLEAN,
  `parkingOptionsHasFreeStreetParking` BOOLEAN,
  `parkingOptionsHasPaidStreetParking` BOOLEAN,
  `parkingOptionsHasValetParking` BOOLEAN,
  `parkingOptionsHasFreeGarageParking` BOOLEAN,
  `parkingOptionsHasPaidGarageParking` BOOLEAN,
  `photoLink` VARCHAR(1024)
);

INSERT INTO `food` (`accessibilityOptionsHasWheelchairAccessibleEntrance`,`accessibilityOptionsHasWheelchairAccessibleRestroom`,`accessibilityOptionsHasWheelchairAccessibleSeating`,`accessibilityOptionsHasWheelchairAccessibleParking`,`businessStatus`,`id`,`hasDelivery`,`hasDineIn`,`servesVegetarianFood`,`displayName`,`formattedAddress`,`locationLat`,`locationLng`,`nationalPhoneNumber`,`regularOpeningHours`,`paymentOptionsAcceptsCreditCards`,`paymentOptionsAcceptsDebitCards`,`paymentOptionsAcceptsCashOnly`,`paymentOptionsAcceptsNfc`,`priceLevel`,`rating`,`hasTakeout`,`types`,`userRatingCount`,`websiteURI`,`editorialSummary`,`parkingOptionsHasFreeParkingLot`,`parkingOptionsHasPaidParkingLot`,`parkingOptionsHasFreeStreetParking`,`parkingOptionsHasPaidStreetParking`,`parkingOptionsHasValetParking`,`parkingOptionsHasFreeGarageParking`,`parkingOptionsHasPaidGarageParking`,`photoLink`)
VALUES
(TRUE,TRUE,TRUE,TRUE,'OPERATIONAL','ChIJ-wWzPQf0K4gRtf3wusBBydE',TRUE,TRUE,NULL,'KEN Sushi House Phillip Square','Blair House, 256 Phillip St, Waterloo, ON N2L 6B6, Canada',43.4735319,-80.5371266,'(519) 883-7272','["Monday: 11:30 AM – 3:00 PM, 4:00 – 10:00 PM","Tuesday: 11:30 AM – 3:00 PM, 4:00 – 10:00 PM","Wednesday: 11:30 AM – 3:00 PM, 4:00 – 10:00 PM","Thursday: 11:30 AM – 3:00 PM, 4:00 – 10:00 PM","Friday: 11:30 AM – 3:00 PM, 4:00 – 10:00 PM","Saturday: 12:00 – 3:00 PM, 4:00 – 10:00 PM","Sunday: 12:00 – 3:00 PM, 4:00 – 9:00 PM"]',TRUE,TRUE,FALSE,TRUE,'MODERATE',4.5,TRUE,'["sushi_restaurant","japanese_restaurant","restaurant","food","point_of_interest","establishment"]',2285,'https://www.kensushihouse.ca/','Cool spot for sushi, sashimi & specialty rolls, along with cooked Japanese fare.',TRUE,FALSE,FALSE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJ-wWzPQf0K4gRtf3wusBBydE/photos/AUc7tXX3HRFSKRSPR7SoSENxdsFinVXI5hSshEf9SeWSdR1NAy0dZWfUjAmcsqNwO5IvQOZjIMZILhGUgiB3ymoztSu8bNppHGKTTmLnwYIrCT48gf6Rleh5R_H9A39CE8Drc4KPaTOl5misBL0uj8hG3kPcD6DEruUcnkVV/media?maxWidthPx=4032&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,TRUE,TRUE,TRUE,'OPERATIONAL','ChIJe-KLAAf0K4gRswXZzquz6Gs',TRUE,TRUE,'true','Mel''s Diner','140 University Ave W, Waterloo, ON N2L 6J3, Canada',43.4728911,-80.5355579,'(519) 579-6357','["Monday: 7:30 AM – 11:00 PM","Tuesday: 7:30 AM – 11:00 PM","Wednesday: 7:30 AM – 11:00 PM","Thursday: 7:30 AM – 11:00 PM","Friday: 7:30 AM – 12:00 AM","Saturday: 7:30 AM – 12:00 AM","Sunday: 7:30 AM – 11:00 PM"]',TRUE,TRUE,FALSE,TRUE,'INEXPENSIVE',4.2,TRUE,'["hamburger_restaurant","breakfast_restaurant","american_restaurant","restaurant","food","point_of_interest","establishment"]',2042,'http://www.melsdiner.ca/','All-day breakfast, hand-pressed burgers & blue-plate specials in a retro diner setting.',TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJe-KLAAf0K4gRswXZzquz6Gs/photos/AUc7tXXqwiDP4IVpju1uzd87mj7SbQPrF85A5BJRF6unDxqHWik-GoZY8rfExz6nhYg_2_UpJxwNbjYcjOYsAEVuaqOcyo23n8GtV_gkc0KVy9Eh69dRiTW1T4f2KfdrHhi-LCJGroMttrbfNfCTcDgHGU4JwlHN58XS1P_L/media?maxWidthPx=3784&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,TRUE,TRUE,TRUE,'OPERATIONAL','ChIJSR96Vgb0K4gR134ElarG1Lg',TRUE,TRUE,'false','Burger King','150 University Ave W Unit 1a, Waterloo, ON N2L 3E4, Canada',43.4725446,-80.5357209,'(519) 884-6072','["Monday: 9:00 AM – 5:00 AM","Tuesday: 9:00 AM – 5:00 AM","Wednesday: 9:00 AM – 5:00 AM","Thursday: 9:00 AM – 5:00 AM","Friday: 9:00 AM – 5:00 AM","Saturday: 9:00 AM – 5:00 AM","Sunday: 9:00 AM – 5:00 AM"]',TRUE,TRUE,FALSE,TRUE,'INEXPENSIVE',3.3,TRUE,'["restaurant","fast_food_restaurant","food","point_of_interest","establishment"]',1136,'https://burgerking.com/store-locator/store/restaurant_11,513','Well-known fast-food chain serving grilled burgers, fries & shakes.',TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJSR96Vgb0K4gR134ElarG1Lg/photos/AUc7tXXQEBdr4fdKoYQcoCA08RJXyiwZ80L_ziKmhLwUb_NTsbs4p95VhC2mCOqbN6iqfma4gmNAjbHSK6PDxm7-DMTDTWEBc248-RtHLHPJNzALNqyBy-kPghBsEOKhxhRg1WQtGd3441e0Jjuu-VtoweyKIYCpj6TymR56/media?maxWidthPx=4032&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,FALSE,FALSE,TRUE,'OPERATIONAL','ChIJs-uUWrL1K4gRmr2UyfjqxBo',TRUE,TRUE,'true','Gol''s Lanzhou Noodle Waterloo','150 University Ave W Unit 6B, Waterloo, ON N2L 3E4, Canada',43.4727293,-80.5360072,'(519) 208-3923','["Monday: Closed","Tuesday: 11:00 AM – 9:00 PM","Wednesday: 11:00 AM – 9:00 PM","Thursday: 11:00 AM – 9:00 PM","Friday: 11:00 AM – 9:00 PM","Saturday: 11:00 AM – 9:00 PM","Sunday: 11:00 AM – 9:00 PM"]',TRUE,TRUE,FALSE,TRUE,NULL,4.6,TRUE,'["chinese_restaurant","barbecue_restaurant","ramen_restaurant","japanese_restaurant","restaurant","food","bar","point_of_interest","establishment"]',1381,'http://www.lanzhou.ca/',NULL,TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJs-uUWrL1K4gRmr2UyfjqxBo/photos/AUc7tXXth6t3cLL6cnVnMyZkCp4jlGKWWaqxc6D4oSoJwDMYsva2gnldLdFPJU4sYsvKyMh5-JUyUct4EeIrmquY5y9u1mJLinJbCYWlxgoU0pgRzTyTtT6EpJtLDLbqDsbIgacR_YaH7bY97NcKMFKb6ov2vV67k81sOQ_Y/media?maxWidthPx=1080&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,TRUE,FALSE,TRUE,'OPERATIONAL','ChIJHwYDnPXzK4gRXtqYfXMzDp0',TRUE,TRUE,'true','Aunty''s Kitchen - Waterloo','160 University Ave W, Waterloo, ON N2L 3E9, Canada',43.4722018,-80.53732629999999,'(519) 954-5633','["Monday: 11:00 AM – 3:00 AM","Tuesday: 11:00 AM – 3:00 AM","Wednesday: 11:00 AM – 3:00 AM","Thursday: 11:00 AM – 3:00 AM","Friday: 11:00 AM – 3:00 AM","Saturday: 10:30 AM – 3:00 AM","Sunday: 10:30 AM – 3:00 AM"]',TRUE,TRUE,FALSE,TRUE,'MODERATE',4.1,TRUE,'["fast_food_restaurant","restaurant","food","point_of_interest","establishment"]',2146,'http://www.auntyskitchen.ca/','Informal counter-serve nook providing familiar Indian & Canadian comfort eats in a minimalist space.',TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJHwYDnPXzK4gRXtqYfXMzDp0/photos/AUc7tXXHvBtGBFx7NXOtTLtQRjQV9CZfuhEBtaTSqapTJS84hw9vIKJHd04_vezAct5zCx1HyuQ7tHlSkkPgiRxZ2ZBnoDFBbQvKfvu3XG1FnxS1IMtrtPhTMV2SktA4KPZhBnSIdUbYPUit6tO0YxHTdhgKc8V1tRzgIVcH/media?maxWidthPx=4032&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(FALSE,FALSE,TRUE,TRUE,'OPERATIONAL','ChIJU9FlsU_1K4gRkJnDUJGrUH0',TRUE,TRUE,'true','Rani Chettinad - The Indian Kitchen (Specialized in Hyderabadi and serving South and North Indian, Indo-Chinese)','170 University Ave W #19, Waterloo, ON N2L 3E9, Canada',43.47233,-80.53903,'(548) 889-3494','["Monday: 12:00 PM – 12:00 AM","Tuesday: 12:00 PM – 12:00 AM","Wednesday: 9:00 AM – 2:00 AM","Thursday: 9:00 AM – 2:00 AM","Friday: 9:00 AM – 2:00 AM","Saturday: 9:00 AM – 2:00 AM","Sunday: 9:00 AM – 2:00 AM"]',TRUE,TRUE,FALSE,TRUE,NULL,4.7,TRUE,'["indian_restaurant","restaurant","food","point_of_interest","establishment"]',2064,'https://ranichettinad.ca/',NULL,TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJU9FlsU_1K4gRkJnDUJGrUH0/photos/AUc7tXVifm5G5opZv10LY_cUe4qP4dsXbdpiSrzweKXyYR5v_YeYPCqpQD8oJMwiyLGixjAd1ItgGGjM7bbcvd7zQVNiA-H3Pw6Rezt7FjBYRUtJ9011sz9mYM-G8rnA8bgzGzCC94_VIzTckigDtudG-el_s6pe2v1WRMaR/media?maxWidthPx=1255&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,TRUE,TRUE,TRUE,'OPERATIONAL','ChIJ2UBkrS71K4gRonJq3jY81P4',TRUE,TRUE,'true','Gladiator Burger Waterloo','222 Albert St, Waterloo, ON N2L 3T6, Canada',43.4740114,-80.53161209999999,'(519) 725-7777','["Monday: 11:30 AM – 11:00 PM","Tuesday: 11:30 AM – 11:00 PM","Wednesday: 11:30 AM – 11:00 PM","Thursday: 11:30 AM – 11:00 PM","Friday: 11:30 AM – 2:00 AM","Saturday: 11:30 AM – 2:00 AM","Sunday: 12:00 – 11:00 PM"]',TRUE,TRUE,FALSE,TRUE,NULL,4.8,TRUE,'["hamburger_restaurant","american_restaurant","restaurant","food","point_of_interest","establishment"]',1106,'http://www.gladiatorburger.com/',NULL,TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJ2UBkrS71K4gRonJq3jY81P4/photos/AUc7tXXKZReR3CJZH0fz4Lpa7limAAB6cWhIMqJB-O-TvRTgjzBdD_Ai-VrNMygUxgN_tOog75t4kENxCERIMR58GrPnYWIbT3Nb1e72AKxY7xJP7UYtzt_khc6DYYgSqvEw3aggtJQhNBM3usU0jC1-x6PUjJtNN8dZtwUl/media?maxWidthPx=1440&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,TRUE,FALSE,TRUE,'OPERATIONAL','ChIJg8Gc9iP1K4gREgG-kyXe6tk',TRUE,TRUE,NULL,'Shinwa Asian cuisine Waterloo','160 University Ave W, Waterloo, ON N2L 3E9, Canada',43.472209,-80.5379676,'(519) 588-7777','["Monday: 11:00 AM – 11:00 PM","Tuesday: 11:00 AM – 11:00 PM","Wednesday: 11:00 AM – 11:00 PM","Thursday: 11:00 AM – 11:00 PM","Friday: 11:00 AM – 11:00 PM","Saturday: 12:00 – 11:00 PM","Sunday: 12:00 – 11:00 PM"]',TRUE,TRUE,FALSE,TRUE,'INEXPENSIVE',4.2,TRUE,'["restaurant","chinese_restaurant","food","point_of_interest","establishment"]',914,'http://www.shinwa.ca/','Informal local venue for a selection of Chinese & other Asian dishes made using halal meat.',TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJg8Gc9iP1K4gREgG-kyXe6tk/photos/AUc7tXUDAmnw-SHoAIUifZr-62Bnw5Zs0IVJIr3S88hMe_yTn-zSf3s7UsX4sTV0ZjYmW4kaOLu4d_i3R_iGRQe-O7D3s9MB5C8gxyINp3xiOy25e5gV2oh1kNcoiylNzEL_hOap2rurV_1CYOo1r1xT8evLVJIcWq6O5-Gh/media?maxWidthPx=1920&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,FALSE,TRUE,TRUE,'OPERATIONAL','ChIJi6KKX7XzK4gRsD8rHOJUy-c',TRUE,TRUE,NULL,'TOP CHICKEN','280 Lester St #105, Waterloo, ON N2L 0G2, Canada',43.4753116,-80.5355701,'(519) 725-6163','["Monday: 4:15 – 11:45 PM","Tuesday: 4:15 – 11:45 PM","Wednesday: 4:15 – 11:45 PM","Thursday: 4:15 – 11:45 PM","Friday: 12:30 – 11:45 PM","Saturday: 12:30 – 11:45 PM","Sunday: 12:30 – 11:45 PM"]',TRUE,TRUE,FALSE,TRUE,'MODERATE',4.7,TRUE,'["korean_restaurant","restaurant","food","point_of_interest","establishment"]',595,NULL,NULL,FALSE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJi6KKX7XzK4gRsD8rHOJUy-c/photos/AUc7tXVoWjyEbJ4prnbleICvuFHP8qDAAKzKewU_Jzs1l6umWH_rngOmksGqrXAIDV7F2SFkAQkrbh1_xbmcsYTfAD0Z61D2RgIe8yPpxjhqRF5gX1Id5Wvk3QkDHcWsBhoY9t0paCL_sdP4mMf8CBHowbbdSrtBPCncfliS/media?maxWidthPx=4032&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,TRUE,FALSE,TRUE,'OPERATIONAL','ChIJTb3xmTbzK4gRJvwFS-G9Azc',TRUE,TRUE,'true','Manna''s Food Express','280 Lester St #112, Waterloo, ON N2L 3W5, Canada',43.4758761,-80.53568720000001,'(519) 725-2722','["Monday: 11:00 AM – 12:00 AM","Tuesday: 11:00 AM – 12:00 AM","Wednesday: 11:00 AM – 12:00 AM","Thursday: 11:00 AM – 12:00 AM","Friday: 11:00 AM – 12:00 AM","Saturday: 11:00 AM – 12:00 AM","Sunday: 11:00 AM – 12:00 AM"]',TRUE,TRUE,FALSE,TRUE,'MODERATE',4.7,TRUE,'["indian_restaurant","restaurant","food","point_of_interest","establishment"]',1362,'https://mannasfoods.ca/home',NULL,TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJTb3xmTbzK4gRJvwFS-G9Azc/photos/AUc7tXWKR90irDYi8M-9F-ptJBS67sy1yAzZvUMPraCcC-6IWAmlhkHOozIAxM9aIDWKpAM8MSWn93UrYZNUQgDGt9L6DPz2QeIqc8KSpnGNzNGzgIQwhz5XfeHKqjDMq3h32a_N4FoR3xFRVO4CZCNSdi7IbhsHHeq8oieX/media?maxWidthPx=3000&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,TRUE,TRUE,TRUE,'OPERATIONAL','ChIJ816IxAb0K4gRYpbXJOgIt1Y',TRUE,TRUE,'true','Shawerma Plus (Shawarma Plus)','160 University Ave W, Waterloo, ON N2L 3E9, Canada',43.4721275,-80.53724799999999,'(226) 908-0536','["Monday: 11:00 AM – 12:00 AM","Tuesday: 11:00 AM – 12:00 AM","Wednesday: 11:00 AM – 12:00 AM","Thursday: 11:00 AM – 1:00 AM","Friday: 11:00 AM – 1:00 AM","Saturday: 11:00 AM – 1:00 AM","Sunday: 11:00 AM – 12:00 AM"]',TRUE,TRUE,FALSE,TRUE,'INEXPENSIVE',4.5,TRUE,'["middle_eastern_restaurant","mediterranean_restaurant","lebanese_restaurant","fast_food_restaurant","restaurant","food","point_of_interest","establishment"]',1874,'http://www.shawermaplus.com/','Relaxed option offering Mediterranean dishes such as shawarma & falafel plates plus hearty sides.',TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJ816IxAb0K4gRYpbXJOgIt1Y/photos/AUc7tXVot2bZMoPGTF_eMi7eLECoQ6CzVOblqCxqNA6NSg9I43Y1S7eyaKGx3gx0qL0n4dINQZY1LLx_Le_YfXa6d40Z9Cj2oG34jgt8czYjBiL4m_AyBwUZH8HkevWddab1XspypTLgpN_lexl4K8MpVWjKGRiFvFYeb9ty/media?maxWidthPx=1600&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,FALSE,FALSE,TRUE,'OPERATIONAL','ChIJ0dJzbOT1K4gRUMyuA8Bu_Ew',TRUE,TRUE,NULL,'D Spot Desserts Waterloo','160 University Ave W Unit 14, Waterloo, ON N2L 3E9, Canada',43.4723544,-80.5374801,'(226) 896-0099','["Monday: 1:00 PM – 12:00 AM","Tuesday: 1:00 PM – 12:00 AM","Wednesday: 1:00 PM – 12:00 AM","Thursday: 1:00 PM – 12:00 AM","Friday: 1:00 PM – 2:00 AM","Saturday: 1:00 PM – 2:00 AM","Sunday: 1:00 PM – 12:00 AM"]',TRUE,TRUE,FALSE,TRUE,'MODERATE',4.6,TRUE,'["store","restaurant","food","point_of_interest","establishment"]',482,'http://www.dspotdessert.com/',NULL,TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJ0dJzbOT1K4gRUMyuA8Bu_Ew/photos/AUc7tXVtw29KWelX0pFkW5TyZE5-IUgXSirDTOerFXvTRDUyIx0_kzZ0rjB_RClBh3DRt2Db5lvYiu4GbM8L-SIGIOl0DBLlxzvvgddqSZYo3L3yPc0IUDA5ZW2Kr7g-L7HhCYo8EYp8sXNWYlXoOOqoCDbEMUWThyWcHAiK/media?maxWidthPx=3024&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,FALSE,FALSE,TRUE,'OPERATIONAL','ChIJ-TpQ44n1K4gRNMFD7SyfXEQ',TRUE,TRUE,NULL,'Chungchun Rice Hotdog Waterloo(Korean Style Corndog)','160 University Ave W Unit 1, Waterloo, ON N2L 3E9, Canada',43.4721202,-80.5381012,'(226) 647-8887','["Monday: 11:00 AM – 1:15 AM","Tuesday: 11:00 AM – 1:15 AM","Wednesday: 11:00 AM – 1:15 AM","Thursday: 11:00 AM – 1:15 AM","Friday: 11:00 AM – 2:15 AM","Saturday: 11:00 AM – 2:15 AM","Sunday: 11:00 AM – 1:15 AM"]',TRUE,TRUE,FALSE,TRUE,NULL,4.5,TRUE,'["fast_food_restaurant","restaurant","food","point_of_interest","establishment"]',307,'http://chungchunricedog.ca/menu/',NULL,TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJ-TpQ44n1K4gRNMFD7SyfXEQ/photos/AUc7tXV8d9NSOaZZn4e4cuAZRVQfIrN02l78weqiPri68lA9xx6l4wnooeL8V_QyQoeXDVZzjaIOwfnvCqr_Dt4fEf-fMOLqTh0h4nXcPqowOsj5ySbnR1HiR_YlnxHPPjMuewMK8kywZVrwlfy9tC97b_trEJD5qqKKx9f9/media?maxWidthPx=3520&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,TRUE,TRUE,TRUE,'OPERATIONAL','ChIJXZ7mzwb0K4gRSUBiWgcZbp4',TRUE,TRUE,'true','Subway','160 University Ave W Units 5 & 6, Waterloo, ON N2L 3E9, Canada',43.4722921,-80.5378337,'(519) 884-7821','["Monday: Open 24 hours","Tuesday: Open 24 hours","Wednesday: Open 24 hours","Thursday: Open 24 hours","Friday: Open 24 hours","Saturday: Open 24 hours","Sunday: Open 24 hours"]',TRUE,TRUE,FALSE,TRUE,'INEXPENSIVE',3.4,TRUE,'["sandwich_shop","fast_food_restaurant","meal_takeaway","restaurant","food","point_of_interest","establishment"]',502,'https://restaurants.subway.com/canada/on/waterloo/160-university-ave-west?utm_source=yxt-goog&utm_medium=local&utm_term=acq&utm_content=2969&utm_campaign=evergreen-2020&y_source=1_MTQ5MjExNTYtNzE1LWxvY2F0aW9uLndlYnNpdGU%3D','Casual counter-serve chain for build-your-own sandwiches & salads, with health-conscious options.',TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJXZ7mzwb0K4gRSUBiWgcZbp4/photos/AUc7tXXUHlKy36zEcusewIDkQ2gmV8F4ow45tYMxZZ7e_ozwC-X5fmo-bu9ZETprGEVdTlJQm2TJa05q6F7_HWI3d0xyY6vZvxKY6LARASphT9GedcbjMCnGJKztPWPL6iOCJhT6p38GFAI1lyl7MsiIOJGT2vCnrLS_P1-z/media?maxWidthPx=1024&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,TRUE,TRUE,TRUE,'OPERATIONAL','ChIJZYZCu9z1K4gRVYyfFFdvwtc',TRUE,TRUE,'true','Indian Sweet Master Waterloo','170 University Ave W Unit #1B, Waterloo, ON N2L 3E9, Canada',43.471759299999995,-80.5387664,'(548) 889-3491','["Monday: 11:00 AM – 1:00 AM","Tuesday: 11:00 AM – 1:00 AM","Wednesday: 11:00 AM – 1:00 AM","Thursday: 11:00 AM – 1:00 AM","Friday: 11:00 AM – 1:00 AM","Saturday: 11:00 AM – 1:00 AM","Sunday: 11:00 AM – 1:00 AM"]',TRUE,TRUE,FALSE,TRUE,NULL,4.4,TRUE,'["indian_restaurant","restaurant","food","point_of_interest","establishment"]',476,'https://indiansweetmaster.com/',NULL,TRUE,FALSE,FALSE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJZYZCu9z1K4gRVYyfFFdvwtc/photos/AUc7tXUwW1U85HHr3isPfB_4ZakZpYrdBthuNsE8XU4wfUgLSpk1Ow02gNyBxRGR9nFHzU2JQteV3HVsr0J8rEajJ-zd5Ut7ezreAKeHLw3cDjebC-3oLhLkLdni3LiDnL9QXGG5zYj5fKZnyYnizh2IZ554bWSQ0Tp27TFJ/media?maxWidthPx=1179&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,TRUE,FALSE,TRUE,'OPERATIONAL','ChIJ8dUjLgH0K4gREB0QrExd6W4',TRUE,TRUE,'true','Lazeez Shawarma','170 University Ave W, Waterloo, ON N2L 3E9, Canada',43.472395,-80.5387903,'(519) 208-0266','["Monday: 11:00 AM – 12:00 AM","Tuesday: 11:00 AM – 12:00 AM","Wednesday: 11:00 AM – 12:00 AM","Thursday: 11:00 AM – 12:00 AM","Friday: 11:00 AM – 12:00 AM","Saturday: 11:00 AM – 12:00 AM","Sunday: 11:00 AM – 12:00 AM"]',TRUE,TRUE,FALSE,TRUE,'INEXPENSIVE',3.8,TRUE,'["mediterranean_restaurant","middle_eastern_restaurant","restaurant","food","point_of_interest","establishment"]',1192,'https://lazeezshawarma.com/',NULL,TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJ8dUjLgH0K4gREB0QrExd6W4/photos/AUc7tXUvKLLvW-DVpImSdR3B04V8c6JN1ibC2VGgYRttSxoMp4Ub6i0iSeVQN7rAAequpcGXwd7Uvq5VwzBvbObFYGuwp59858Zc0dnYBrT-YlDfWhY0CJ00LnUfLWAwwJVWymus2ShUdUOuAIkFtq4WdvzPUo0wmsxfAhs7/media?maxWidthPx=960&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,TRUE,TRUE,TRUE,'OPERATIONAL','ChIJqRh4kgf1K4gRDQddbv6PQrM',TRUE,TRUE,'true','Kabob Shack','150 University Ave W Unit 5B, Waterloo, ON N2L 3E4, Canada',43.4725836,-80.53625129999999,'(519) 208-0404','["Monday: 11:30 AM – 11:30 PM","Tuesday: Closed","Wednesday: 11:30 AM – 9:30 PM","Thursday: 11:30 AM – 11:30 PM","Friday: 11:30 AM – 11:30 PM","Saturday: 11:30 AM – 11:30 PM","Sunday: 11:30 AM – 9:30 PM"]',TRUE,TRUE,FALSE,TRUE,NULL,4.6,TRUE,'["restaurant","food","point_of_interest","establishment"]',867,'http://kabobshack.ca/','Grilled kebabs, flatbreads & rice dishes offered in an easygoing, counter-service location.',TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJqRh4kgf1K4gRDQddbv6PQrM/photos/AUc7tXXjhVIJAi3PyTlz9ry25S48XEa0jLYx5kJPW8Kc-ZP4zxEPzT1sD-wKS9jZ_o6zC9VVYL-Ls9MpoGotlA5D8Y44qziEht4uEDsZ_aAzcoyKfe7eUzDXUNscOE3hgYdA2CD145cBE-WkVxHX4jOnbGqflKcoij9A7GPa/media?maxWidthPx=4000&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(FALSE,FALSE,FALSE,TRUE,'OPERATIONAL','ChIJzy-Klb71K4gRDbI6liHJLLw',TRUE,TRUE,NULL,'Yunshang Rice Noodle(Waterloo)云尚米线','170 University Ave W #35, Waterloo, ON N2L 3E9, Canada',43.4728003,-80.5376038,'(519) 208-0988','["Monday: 11:00 AM – 10:00 PM","Tuesday: 11:00 AM – 10:00 PM","Wednesday: 11:00 AM – 10:00 PM","Thursday: 11:00 AM – 10:00 PM","Friday: 11:00 AM – 10:00 PM","Saturday: 11:00 AM – 10:00 PM","Sunday: 11:00 AM – 10:00 PM"]',FALSE,TRUE,FALSE,TRUE,'INEXPENSIVE',4.2,TRUE,'["chinese_restaurant","restaurant","food","point_of_interest","establishment"]',148,'http://www.yunshang.ca/',NULL,TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJzy-Klb71K4gRDbI6liHJLLw/photos/AUc7tXXICG7QvGx_qyMrzQZXEH6dWxPC5D2X-ZIwUZ35kJNiTa3g3Vy9HbLMMuWZa5FGvCO4I9XuaKnjb2isClFoAMKqntGxqWEXesbxMFHr-_38XAerXj0LAEoIVAFULxArVl5dOf677k8TqS_gywJw-nFV05m5cxhtjpXa/media?maxWidthPx=1301&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,TRUE,TRUE,TRUE,'OPERATIONAL','ChIJQdQ9MgH0K4gR8qhZxX5JCAE',TRUE,TRUE,'true','Harvey''s','170 University Ave W #10, Waterloo, ON N2L 3E9, Canada',43.4717765,-80.5388858,'(519) 888-9744','["Monday: 10:30 AM – 6:00 AM","Tuesday: 10:30 AM – 6:00 AM","Wednesday: 10:30 AM – 6:00 AM","Thursday: 10:30 AM – 6:00 AM","Friday: 10:30 AM – 6:00 AM","Saturday: 10:30 AM – 6:00 AM","Sunday: 10:30 AM – 6:00 AM"]',TRUE,TRUE,FALSE,TRUE,'INEXPENSIVE',4.1,TRUE,'["restaurant","food","point_of_interest","establishment"]',429,'https://www.harveys.ca/en/locations/on/waterloo/170-university-ave-w',NULL,TRUE,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJQdQ9MgH0K4gR8qhZxX5JCAE/photos/AUc7tXVvQVSJ1rw2S9v8i9UbupygvUcf_K5BLW4cyMS7SShLxmlKD3hScsV-prqpesT_NiJq96g0gFZ36FnNMFfElAfaeK75qOV3083RhWOwwvLd6zsonugQ8BlNHp1eM5BkOULX2bA_IngTXvJoJulMlLFDOKgN3UoCJqhB/media?maxWidthPx=4032&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'),
(TRUE,TRUE,TRUE,TRUE,'CLOSED_TEMPORARILY','ChIJ_3ZnUpf1K4gRApoWTTAD55s',TRUE,TRUE,NULL,'Crush Social Eatery','170 University Ave W Unit 15-18, Waterloo, ON N2L 3E9, Canada',43.4721556,-80.53912590000002,'(226) 647-8800','[]',TRUE,FALSE,FALSE,FALSE,NULL,4.2,TRUE,'["restaurant","seafood_restaurant","food","point_of_interest","establishment"]',447,'http://crushsocialeatery.com/',NULL,TRUE,FALSE,FALSE,FALSE,FALSE,FALSE,FALSE,'https://places.googleapis.com/v1/places/ChIJ_3ZnUpf1K4gRApoWTTAD55s/photos/AUc7tXXE2Ox6RTSPGYn7wk5NksV4iGVtGmsvEBErn789SykEtInMVfJVncnWRKCSpuad688iDnvRR6LsNca2HLVWastuNuCezA4SwYt8jo_-Mfbf-jstgpW1iQEi2gttnjDrtu-LKwOtBCJeMnqh_gtDU_bUYsVzpQpGkYCn/media?maxWidthPx=2048&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg');
