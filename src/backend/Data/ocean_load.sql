-- 1. Drop table if it already exists
DROP TABLE IF EXISTS ocean_observations;

-- 2. Create new table
CREATE TABLE ocean_observations (
    id SERIAL PRIMARY KEY,
    day_low_temperature_c FLOAT,
    day_high_temperature_c FLOAT,
    timestamp TIMESTAMP,
    pressure_dbar FLOAT,
    humidity_percent FLOAT,
    longitude FLOAT,
    latitude FLOAT,
    salinity_psu FLOAT,
    temperature_c FLOAT
);

-- 3. Copy data from CSV into table
-- ⚠️ Make sure the CSV file path is correct and accessible to PostgreSQL server
COPY ocean_observations(timestamp, longitude, latitude, temperature_c, day_low_temperature_c, day_high_temperature_c, pressure_dbar, humidity_percent, salinity_psu)
FROM 'src/backend/Data/argo_sample.csv'
DELIMITER ',' CSV HEADER;

-- 4. Populate geom column from longitude & latitude
UPDATE ocean_observations
SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);

-- 5. Create spatial index on geom
CREATE INDEX ocean_geom_idx
ON ocean_observations
USING GIST (geom);
