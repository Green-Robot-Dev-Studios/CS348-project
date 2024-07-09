-- feature 2: find the food that is within a distance threshold to a room.
SELECT *
FROM food f JOIN (
    SELECT r.id, r.longitude, r.latitude, r.maxDistance
    FROM rooms r
    WHERE r.id = '3945a8c3-2f75-11ef-930f-560003e49317'
) r
WHERE ST_Distance_Sphere(
              point(f.locationLat, f.locationLng),
              point(r.latitude, r.longitude)) <= r.maxDistance
ORDER BY ST_Distance_Sphere(point(f.locationLat, f.locationLng), point(r.latitude, r.longitude)) ASC;