from fastapi import FastAPI
from pydantic import BaseModel
from embeddings.build_embeddings import build_embedings

app = FastAPI()
retriever = build_embedings()

class QueryIn(BaseModel):
    text: str
    mode: str = "auto"   # auto|sql|semantic|combined
    k: int = 5

@app.post("/query")
def handle(q: QueryIn):
    result = retriever.retrieve(q.text, mode=q.mode, k=q.k)
    return result
