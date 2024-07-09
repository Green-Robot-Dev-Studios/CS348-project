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
