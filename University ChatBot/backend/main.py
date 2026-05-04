"""
FastAPI application for SOET Academic Chatbot.
Exposes RAG chat endpoint for the React frontend.
"""
import os
import sys

# Ensure backend and project root are on path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(
    title="SOET Academic Chatbot API",
    description="RAG-powered chatbot for K.R. Mangalam University School of Engineering & Technology",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    query: str


class SourceDocument(BaseModel):
    content: str
    source: str
    page: Optional[int] = None


class ChatResponse(BaseModel):
    result: str
    source_documents: list[SourceDocument]


def _serialize_sources(docs):
    """Convert LangChain documents to JSON-serializable dicts."""
    out = []
    seen = set()
    for doc in docs:
        source = doc.metadata.get("source", "Unknown")
        page = doc.metadata.get("page")
        key = (source, page)
        if key in seen:
            continue
        seen.add(key)
        out.append(
            SourceDocument(
                content=(doc.page_content or "")[:500],
                source=os.path.basename(source) if source else "Unknown",
                page=int(page) + 1 if page is not None else None,
            )
        )
    return out


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    query = (request.query or "").strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    try:
        from backend.core import get_qa_chain
        chain = get_qa_chain()
        response = chain.invoke({"query": query})
        result = response.get("result", "")
        docs = response.get("source_documents", [])
        return ChatResponse(
            result=result,
            source_documents=_serialize_sources(docs),
        )
    except FileNotFoundError as e:
        raise HTTPException(
            status_code=503,
            detail="Knowledge base not ready. Run ingest first.",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
