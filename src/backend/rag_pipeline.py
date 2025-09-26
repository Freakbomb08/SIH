import os
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import CSVLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain_google_genai import GoogleGenerativeAIEmbeddings, GoogleGenerativeAI
from dotenv import load_dotenv

# --- Always load .env from backend folder ---
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=dotenv_path)

# === Load Google API key ===
GOOGLE_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_KEY:
    raise ValueError("❌ GOOGLE_API_KEY is not set. Please check your .env file.")
else:
    print("✅ GOOGLE_API_KEY loaded:", GOOGLE_KEY[:6] + "*****")

# === Load CSV dataset ===
csv_path = "D:/sih/sih/Data/argo_sample.nc.csv"
loader = CSVLoader(file_path=csv_path)

docs = loader.load()

# === Split documents into chunks ===
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
docs_split = text_splitter.split_documents(docs)

# === Create embeddings & FAISS vector store ===
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001",
    google_api_key=GOOGLE_KEY
)
vectorstore = FAISS.from_documents(docs_split, embeddings)

# === Setup LLM & RetrievalQA chain ===
llm = GoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0,
    google_api_key=GOOGLE_KEY
)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(),
    return_source_documents=True
)

# === Run a sample query ===
if __name__ == "__main__":
    query = "What variables are available in this dataset?"
    result = qa_chain.invoke(query)

    print("\n🔹 Query:", query)
    print("🔹 Answer:", result["result"])

    
