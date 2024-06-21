# Waterfood


**We fetched our data from Google Places API:**
https://developers.google.com/maps/documentation/places/web-service/overview

However, sample data cannot be supplied since the returned data contains Google's API keys. For further information on how we processed the data, navigate to `/data/JSONtoSQL.md`

**Development Setup:**
1. Run `npm run install` inside parent folder and `/Client`.
2. Run `npm run dev` inside parent folder to run the server.
3. Run `npm run dev` inside `/Client` to run the client.

**NOTE:** You won't be able to run the server until your SSH key has been added in to be able to access our local MySQL instance 

**How to populate the sample database:**
Our sample database has already been populated. To do so yourself, you can follow the steps specified in `/data/JSONtoSQL.md`.

**Currently supported features:**
1. We have a sample query demonstrating proof-of-concept. The results can be viewed when the client is first launched. 
2. Our sample queries and tests can be found under the folder CS348-project/sql, including joinRoom, updateRoomWinner, findCloseFood, and fastestUser