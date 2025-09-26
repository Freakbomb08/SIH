import psycopg2
import chromadb
from dotenv import load_dotenv
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
from db.db_config import DB_CONFIG

# 1. Connect to DB
conn = psycopg2.connect(**DB_CONFIG)
cur = conn.cursor()

# 2. Fetch rows (limit first for testing)
cur.execute("SELECT id, timestamp, longitude, latitude, temperature_c, day_low_temperature_c, day_high_temperature_c, pressure_dbar, humidity_percent, salinity_psu FROM ocean_observations LIMIT 5000;")
rows = cur.fetchall()

# 3. Prepare documents + metadata
documents = []
metadatas = []
ids = []

for row in rows:
    rid, timestamp, longitude, latitude, temperature_c, day_low_temperature_c, day_high_temperature_c, pressure_dbar, humidity_percent, salinity_psu = row
    doc = f"Observation at lat {latitude:.2f}, lon {longitude:.2f}, time: {timestamp}: " \
          f"temperature = {temperature_c} °C, day_high temperature = {day_high_temperature_c}, day_low temperature = {day_low_temperature_c} °C, pressure = {pressure_dbar} hPa, humidity = {humidity_percent}%, salinity = {salinity_psu} PSU ."
    documents.append(doc)
    metadatas.append({"id": rid, "timestamp": timestamp, "latitude": latitude, "longitude": longitude})
    ids.append(str(rid))

# 4. Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")  # small + fast

# 5. Create ChromaDB client
client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory="./embeddings/chroma_db"  # store locally
))

# 6. Create collection
collection = client.get_or_create_collection("ocean_data")

# 7. Embed and insert
embeddings = model.encode(documents, show_progress_bar=True).tolist()
collection.add(
    documents=documents,
    metadatas=metadatas,
    ids=ids,
    embeddings=embeddings
)

print(f"✅ Inserted {len(documents)} records into ChromaDB")
client.persist()

cur.close()
conn.close()
