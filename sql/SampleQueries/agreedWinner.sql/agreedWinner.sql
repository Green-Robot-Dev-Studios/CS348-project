-- fId => a given place's foodId
-- rId => a given room's roomId

SELECT SUM(approved) AS approvedCount
FROM votes 
WHERE foodId = fId AND roomId = rId;

SELECT COUNT(DISTINCT userId) AS totalUsers
FROM connections 
WHERE roomId = rId;