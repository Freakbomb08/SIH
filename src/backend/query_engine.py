import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from langchain_google_genai import GoogleGenerativeAI
from langchain_community.utilities import SQLDatabase
from langchain.chains import create_sql_query_chain
from tabulate import tabulate  # for table format

# Load environment variables
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
POSTGRES_URI = os.getenv("POSTGRES_URI")

if not GOOGLE_API_KEY:
    raise ValueError("❌ GOOGLE_API_KEY is missing in .env")
if not POSTGRES_URI:
    raise ValueError("❌ POSTGRES_URI is missing in .env")

# Initialize Google Gemini LLM
llm = GoogleGenerativeAI(
    model="gemini-1.5-flash",
    google_api_key=GOOGLE_API_KEY,
    temperature=0
)

# Connect to PostgreSQL database
db = SQLDatabase.from_uri(POSTGRES_URI, include_tables=["ocean_observations"])

# Create SQL Query Chain
query_chain = create_sql_query_chain(llm, db)

# SQLAlchemy engine to execute queries
engine = create_engine(POSTGRES_URI)

def extract_sql(response_text: str):
    """
    Extract SQL query from LLM response string.
    Assumes response contains 'SQLQuery: <actual SQL>'
    """
    marker = "SQLQuery:"
    if marker in response_text:
        return response_text.split(marker)[1].strip()
    return response_text.strip()  # fallback, return full text

def run_query(question: str):
    """Run natural language question on PostgreSQL DB"""
    print(f"🔍 Question: {question}")
    try:
        # Generate SQL query using LLM
        response = query_chain.invoke({"question": question})
        sql_query = extract_sql(response)
        print("\n✅ SQL Query Generated:\n", sql_query)

        # Execute the SQL on database
        with engine.connect() as conn:
            result = conn.execute(text(sql_query))
            rows = result.fetchall()
            if rows:
                columns = result.keys()
                print("\n📊 Query Result:\n")
                print(tabulate(rows, headers=columns, tablefmt="grid"))
            else:
                print("\n📊 Query Result: No rows found")
    except Exception as e:
        print("We are working on that:", e)

if __name__ == "__main__":
    print("🟢 Welcome to the SQL Query Engine for table: ocean_observations!")
    print("Type your question or 'exit' to quit.\n")
    
    while True:
        user_input = input("💬 Enter your query: ")
        if user_input.lower() in ["exit", "quit"]:
            print("👋 Goodbye!")
            break
        run_query(user_input)
