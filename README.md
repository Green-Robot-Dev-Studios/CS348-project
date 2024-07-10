# Waterfood

**We fetched our data from Google Places API:**
<https://developers.google.com/maps/documentation/places/web-service/overview>

However, sample data cannot be supplied since the returned data contains Google's API keys. For further information on how we processed the data, navigate to `/data/JSONtoSQL.md`

**Development Setup:**

1. Run `npm run install` inside parent folder and `/Client`.
2. Run `npm run dev` inside parent folder to run the server.
3. Run `npm run dev` inside `/Client` to run the client.

**NOTE:** You won't be able to run the server until your SSH key has been added in to be able to access our local MySQL instance

**How to populate the sample database:**
Our sample database has already been populated. To do so yourself, you can follow the steps specified in `/data/JSONtoSQL.md`.

**Important note regarding sample and production queries (C3 and C4)**
The two folders `SampleQueries` and `ProdQueries` are identical because our sample database was already very similar, if not, identical to our production database. As a result, the expected outcome for the sample queries is identical as well.  

**Implemented features:**

* Feature 3: Determine the restaurant with the majority of votes at the end of the voting in a room in the case that no restaurant has votes from all users. This features is implemented [here](./src/hooks/pick-winner-food.ts).

* Feature 4: Determine which user in a room took the shortest time to finish voting. This feature is implemented [here](./src/services/scoresheet/scoresheet.class.ts).

* Feature 5: Updates the `Picked` attribute of a room instance with the determined winner from either feature 3 or 6. This feature is implemented [here](./src/services/scoresheet/scoresheet.class.ts).
**NOTE**: This feature is initially written as raw SQL queries found [here](./sql/updateRoomWinner/updateRoomWinner.sql). However as we integrate it into our application, it is now implemented as an asynchronous call using the `patch` method provided by the `rooms` service.

* Feature 6: If all the users vote 'yes' for a certain restaurant, then it automatically exits the voting process and returns the id of the agreed of restaurant. This feature focuses on shortening the decision process through a short circuit. It is implemented [here](./src/services/scoresheet/scoresheet.class.ts).

**Sample queries:** Sample queries and tests can be found under the folder `CS348-project/sql`, including `joinRoom`, `updateRoomWinner`, `findCloseFood`, and `fastestUser`
