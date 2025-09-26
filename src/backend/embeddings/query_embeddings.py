import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer

# Reconnect
client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory="./embeddings/chroma_db"
))
collection = client.get_collection("ocean_data")

# Example query
query_text = "Find cold and salty ocean regions"
results = collection.query(
    query_texts=[query_text],
    n_results=5
)

print("🔎 Query:", query_text)
for doc, meta in zip(results['documents'][0], results['metadatas'][0]):
    print(doc)
    print("Metadata:", meta)
    print("----")
