-- feature 4: find the user who voted the fastest in a room.
WITH userVoteTime AS (
    SELECT v.userId, (MAX(v.timestamp) - MIN(v.timestamp)) AS voteTime
    FROM votes v
    WHERE v.roomId = roomId
    GROUP BY v.userId
), MinVoteTime AS (
    SELECT MIN(uv.voteTime) AS fastest
    FROM userVoteTime uv
)
SELECT uv.userId, m.fastest as FastestTime
FROM userVoteTime uv
    JOIN MinVoteTime m ON uv.voteTime = m.fastest;