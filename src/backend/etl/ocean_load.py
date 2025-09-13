import psycopg2
import pandas as pd

# File
csv_file = "ocean_dataset_6000.csv"

# DB connection
conn = psycopg2.connect(
    dbname="argo_db",
    user="postgres",
    password="StrongPass",
    host="localhost",
    port="5432"
)
cur = conn.cursor()

# Step 1: Create table
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

# Step 2: Load CSV into pandas
df = pd.read_csv("C:\Users\Ayush Jaiswal\Desktop\SIH\src\backend\Data\argo_sample.csv")

# Step 3: Insert data
for _, row in df.iterrows():
    cur.execute("""
        INSERT INTO ocean_observations (timestamp, longitude, latitude, temperature_c, day_low_temperature_c, day_high_temperature_c, pressure_dbar, humidity_percent, salinity_psu, geom)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, ST_SetSRID(ST_MakePoint(%s, %s), 4326));
        """,
        (row['timestamp'], row['longitude'], row['latitude'], row['temperature_c'], row['day_low_temperature_c'], row['day_high_temperature_c'], row['pressure_dbar'], row['humidity_percent'],
         row['salinity_psu'], row['temperature'], row['geom'] 
         )
    )

conn.commit()
cur.close()
conn.close()
print("Database created \n Data inserted successfully ✅")
