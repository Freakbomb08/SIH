import sys
import os
import psycopg2
import pandas as pd
from psycopg2 import extras

# ---- Fix import for DB_CONFIG ----
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from db.db_config import DB_CONFIG

# ---- CSV file path ----
csv_file = r"C:/Users/Ayush Jaiswal/Desktop/SIH/src/backend/Data/argo_sample.csv"

# ---- Connect to PostgreSQL ----
conn = psycopg2.connect(
    dbname=DB_CONFIG['dbname'],
    user=DB_CONFIG['user'],
    password=DB_CONFIG['password'],
    host=DB_CONFIG['host'],
    port=DB_CONFIG['port']
)
cur = conn.cursor()
print("✅ Connected to PostgreSQL")

# ---- Enable PostGIS ----
cur.execute("CREATE EXTENSION IF NOT EXISTS postgis;")
conn.commit()
print("✅ PostGIS extension enabled (if not already)")

# ---- Create table ----
cur.execute("""
DROP TABLE IF EXISTS ocean_observations;
CREATE TABLE ocean_observations (
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
""")
conn.commit()
print("✅ Table 'ocean_observations' created")

# ---- Load CSV into pandas ----
df = pd.read_csv(csv_file)
df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
print(df.columns)  # verify column names

# Prepare data for faster insert
records = [
    (
        row['timestamp'], row['longitude'], row['latitude'], row['temperature_c'],
        row['day_low_temperature_c'], row['day_high_temperature_c'],
        row['pressure_dbar'], row['humidity_percent'], row['salinity_psu'],
        row['longitude'], row['latitude']
    )
    for _, row in df.iterrows()
]

# ---- Insert data using execute_values (fast) ----
insert_query = """
INSERT INTO ocean_observations (
    timestamp, longitude, latitude, temperature_c,
    day_low_temperature_c, day_high_temperature_c,
    pressure_dbar, humidity_percent, salinity_psu,
    geom
) VALUES %s
"""
extras.execute_values(
    cur, insert_query, records,
    template="(%s, %s, %s, %s, %s, %s, %s, %s, %s, ST_SetSRID(ST_MakePoint(%s, %s), 4326))"
)
conn.commit()
print("✅ Data inserted successfully into 'ocean_observations' (fast)")

# ---- Create spatial index ----
cur.execute("""
CREATE INDEX IF NOT EXISTS geom
ON ocean_observations
USING GIST (geom);
""")
conn.commit()
print("✅ Spatial index 'geom' created on geom column")

# ---- Close connection ----
cur.close()
conn.close()
print("✅ Database connection closed")
