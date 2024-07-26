# fynder.food

It's tinder for food.

**We fetched our data from Google Places API:**
<https://developers.google.com/maps/documentation/places/web-service/overview>

However, sample data cannot be supplied since the returned data contains Google's API keys. For further information on how we processed the data, navigate to `/data/JSONtoSQL.md`

**Development Setup:**

1. Run `npm run install` inside parent folder and `/Client`.
2. Run `npm run dev` inside parent folder to run the server.
3. Run `npm run dev` inside `/Client` to run the client.

**NOTE:** You won't be able to run the server until your SSH key has been added in to be able to access our local MySQL instance


<br/>

**How to populate the sample database:**

Our sample database has already been populated. To do so yourself, you can follow the steps specified in `/data/JSONtoSQL.md`.

<br/>

**How to populate the production database:**

The production data was procured by repeatedly calling the Google Maps Place API in a grid-search pattern over a subset of the Waterloo Regional Municipality. These successive calls were inserted into the database and deduplicated through the primary key (the Google Place Id). In addition, we pulled all the image static assets from Google to cache them locally for faster speeds. See `/data/JSONtoSQL.md` for more details.

<br />

**Important note regarding sample and production queries (C3 and C4)**

The two folders `SampleQueries` and `ProdQueries` are identical because our sample database was identical to our production database. As a result, the expected outcome for the sample queries is the same as well.  

<br />

**Implemented features:**

For a demo of current features and corresponding tests, here is a video: [Youtube Demo](https://youtu.be/hYvPZ2dyOQY). 

* Feature 1: User joins a room and this relation is added as a new row in the Connections table. This feature is implemented [here](./src/services/connections/connections.class.ts). 
**NOTE**: This feature is initially written as raw SQL queries found [here](./sql/SampleQueries/joinRoom/joinRoom.sql). However as we integrate it into our application, it is now implemented as a call using the `create` method, which can be found [here](./client/src/routes/room.$roomid.lazy.tsx).

* Feature 2: Get ALL restaurants that fit into a certain inputted distance and sort by increasing distance from the user. This feature is implemented [here](./src/services/close-food/close-food.class.ts) and is integrated into our client through the code [here](./client/src/routes/swipe.$roomId.lazy.tsx). 

* Feature 3: Determine the restaurant with the majority of votes at the end of the voting in a room in the case that no restaurant has votes from all users. This features is implemented [here](./src/hooks/pick-winner-food.ts).

* Feature 4: Determine which user in a room took the shortest time to finish voting. This feature is implemented [here](./src/services/scoresheet/scoresheet.class.ts).

* Feature 5: Updates the `Picked` attribute of a room instance with the determined winner from either feature 3 or 6. This feature is implemented [here](./src/services/scoresheet/scoresheet.class.ts).
**NOTE**: This feature is initially written as raw SQL queries found [here](./sql/SampleQueries/updateRoomWinner/updateRoomWinner.sql). However as we integrate it into our application, it is now implemented as an asynchronous call using the `patch` method provided by the `rooms` service, and the call can be found [here](./src/hooks/pick-winner-food.ts). 

* Feature 6: If all the users vote 'yes' for a certain restaurant, then it automatically exits the voting process and returns the id of the agreed of restaurant. This feature focuses on shortening the decision process through a short circuit. It is implemented [here](./src/services/scoresheet/scoresheet.class.ts).

<br />

**Fancy features:**

* Fancy Feature 1: User-friendly Interface, including mobile-friendly, responsive, microinteractions; swiping card animation; notifications for success/error as toasts; loading states as spinners/skeletons; immediate feedback for presses and actions; real-time updates for readying up or consensus, etc.

* Fancy Feature 2: OAuth Integration. Instead of just username/password authentication, we added GitHub OAuth authentication as an easy and quick way to log in. We also get the email and avatar image for later display. This can be more secure since our database won’t be the only point of attack for hackers.

* Fancy Feature 3: Multi-user support. Our application is built from the ground-up to handle multiple concurrent users with their own accounts, seamlessly updating live using WebSockets without needing to refresh the page. 

* Fancy Feature 4: DX/CI/CD. We have npm scripts to streamline the development experience, such that running npm i and then npm run dev for server and client is enough to let anybody start developing, with hot-reloading and automatic database connection. We also have our git repository set up with a continuous integration script to run tests, apply migrations, build a docker container, and hot swap it into production. 

* Fancy Feature #5: Security. We have a separate database for development and production. The development database is secured behind a firewall and can only be accessed through an SSH tunnel with restrictions. No developer has access to the production database, which is only accessed by the production environment. Additionally, every endpoint that requires authentication is enforced on the backend and checked.

<br />

**Sample queries:** 

Sample queries and tests can be found under the folder `CS348-project/sql`, including `joinRoom`, `updateRoomWinner`, `findCloseFood`, and `fastestUser`
