# Explanation on Output File

The csv file contains the columns result from selecting all restaurants with the maximum number of votes in a room.
The final query updates the `rooms` table and sets the `picked` column to the food id of the first restaurant with the maximum number of votes in a room.
The updated row in `rooms` is as follows:
|id|picked|longitude|latitude|searchNumber|maxDistance|
|---|---|---|---|---|---|
|38ce856e-2f6a-11ef-930f-560003e49317|ChIJ-TpQ44n1K4gRNMFD7SyfXEQ|-79.832107|43.238005|40|10000|
