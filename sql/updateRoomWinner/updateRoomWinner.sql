-- feature 3: update room with the food that has the most votes.
WITH countedVotes AS (
    SELECT v.foodId, COUNT(v.approved) as foodVotes
    FROM votes v
    WHERE v.roomId = '38ce856e-2f6a-11ef-930f-560003e49317' AND v.approved = 1
    GROUP BY v.foodId
), MaxVotes AS (
    SELECT MAX(cv.foodVotes) as maxVotes
    FROM countedVotes cv
)
SELECT cv.foodId
FROM countedVotes cv
         JOIN MaxVotes mv ON cv.foodVotes = mv.maxVotes;


WITH countedVotes AS (
    SELECT v.foodId, COUNT(v.approved) as foodVotes
    FROM votes v
    WHERE v.roomId = '38ce856e-2f6a-11ef-930f-560003e49317' AND v.approved = 1
    GROUP BY v.foodId
), MaxVotes AS (
    SELECT MAX(cv.foodVotes) as maxVotes
    FROM countedVotes cv
)
UPDATE rooms r
SET r.picked = (
    SELECT cv.foodId
    FROM countedVotes cv
             JOIN MaxVotes mv ON cv.foodVotes = mv.maxVotes
    LIMIT 1
)
WHERE r.id = '38ce856e-2f6a-11ef-930f-560003e49317';