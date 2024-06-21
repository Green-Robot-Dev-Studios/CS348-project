# Explanation on Output File

The query inserts a new row in the `connections` table making a connection between a user and a room. The `user_id` is the id of the user who joined the room, and the `room_id` is the id of the room the user joined. The newly inserted row looks like this:
|id|user_id|room_id|ready|
|---|---|---|---|
|336c645c-2f7a-11ef-930f-560003e49317|0ff4d10f-2f6a-11ef-930f-560003e49317|5a4de5d3-2f6a-11ef-930f-560003e49317|0
