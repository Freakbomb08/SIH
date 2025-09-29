-- -- 1. Drop table if it already exists
DROP TABLE IF EXISTS ocean_observations;

-- 2. Create new table
CREATE TABLE IF NOT EXISTS ocean_observations (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP,
    longitude FLOAT,
    latitude FLOAT,
    temperature_c FLOAT,
    day_low_temperature_c FLOAT,
    day_high_temperature_c FLOAT,
    pressure_dbar FLOAT,
    humidity_percent FLOAT,
    salinity_psu FLOAT,
    geom GEOMETRY(Point, 4326)
);

-- 3. Copy data from CSV into table
COPY ocean_observations(timestamp, longitude, latitude, temperature_c, day_low_temperature_c, day_high_temperature_c, pressure_dbar, humidity_percent, salinity_psu)
FROM 'C:\Users\Ayush Jaiswal\Desktop\SIH\src\backend\Data\argo_sample.csv'
DELIMITER ',' CSV HEADER;

-- 4. Populate geom column from longitude & latitude
UPDATE ocean_observations
SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);

-- 5. Create spatial index on geom
CREATE INDEX ocean_geom_idx
ON ocean_observations
USING GIST (geom);
-- Use this command to run the script