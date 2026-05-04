import os
import shutil
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from dotenv import load_dotenv

# --- PATH CONFIGURATION ---
current_dir = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(current_dir, "..", ".env")
PERSIST_DIRECTORY = os.path.join(current_dir, "..", "vector_db")
DATA_PATH = os.path.join(current_dir, "..", "data")

if os.path.exists(ENV_PATH):
    load_dotenv(ENV_PATH)


def _load_pdf(path: str):
    """Load PDF with PyMuPDF (better text extraction than PyPDF for many files)."""
    loader = PyMuPDFLoader(path)
    return loader.load()


def ingest_docs():
    if not os.path.exists(DATA_PATH):
        print(f"❌ Data directory not found: {DATA_PATH}")
        return

    files = [f for f in os.listdir(DATA_PATH) if f.lower().endswith(".pdf")]
    if not files:
        print(f"⚠️ No PDF files in {DATA_PATH}.")
        return

    # 1. Load all PDFs (PyMuPDF extracts text more reliably)
    documents = []
    for file in files:
        path = os.path.join(DATA_PATH, file)
        try:
            docs = _load_pdf(path)
            # Keep only pages that have real text
            for d in docs:
                if (d.page_content or "").strip():
                    documents.append(d)
            print(f"   Loaded {file}: {len(docs)} pages, {len([d for d in docs if (d.page_content or '').strip()])} with text")
        except Exception as e:
            print(f"   Error loading {file}: {e}")

    if not documents:
        print("❌ No text could be extracted from any PDF. Use PDFs with selectable text.")
        return

    # 2. Split into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=300,
        separators=["\n\n", "\n", " ", ""],
    )
    splits = text_splitter.split_documents(documents)

    if not splits:
        print("❌ No text chunks produced. Use PDFs with selectable text.")
        return

    # 3. Clear old DB and create new one (only when we have content)
    if os.path.exists(PERSIST_DIRECTORY):
        shutil.rmtree(PERSIST_DIRECTORY)

    print(f"⏳ Creating {len(splits)} embeddings...")
    try:
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        Chroma.from_documents(
            documents=splits,
            embedding=embeddings,
            persist_directory=PERSIST_DIRECTORY,
        )
        print(f"✅ Knowledge base ready ({len(splits)} chunks).")
    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    ingest_docs()
