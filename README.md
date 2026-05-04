# Universal Academic RAG Chatbot 🎓🤖

An open-source, full-stack Retrieval-Augmented Generation (RAG) assistant designed to be deployed by any university or educational institution. Simply drop your institution's PDF handbooks into the data folder, and the system instantly creates a tailored AI assistant for students and faculty.

*Note: The current repository and demo assets feature a reference implementation built for the School of Engineering and Technology (SOET) at K.R. Mangalam University, successfully indexing their specific curriculum and handbooks.*

## 🌟 Key Features

*   **Hybrid RAG Architecture:** Combines zero-cost local HuggingFace embeddings (`all-MiniLM-L6-v2`) with cloud-based LLM generation (Google Gemini 2.5 Flash) for optimal performance, large context handling, and cost-efficiency.
*   **Precision Context Retrieval:** Retrieves up to 15 document chunks per query to seamlessly merge split tables and complex academic formatting.
*   **Source Citations:** AI responses explicitly cite source documents and page numbers, eliminating hallucinations and ensuring academic integrity.
*   **Admin Dashboard:** Real-time analytics tracking total queries, active sessions, average response times, and vector database indexing status.
*   **Rich UI/UX:** A responsive React/TypeScript frontend featuring message bubbles, voice input support, and direct source linking.

## 🛠️ Tech Stack

**Frontend (Web)**
*   React 18 with TypeScript & Vite
*   Tailwind CSS (via PostCSS)
*   Lucide React (Icons)

**Backend (Python)**
*   LangChain framework
*   Google Gemini 2.5 Flash (via `ChatGoogleGenerativeAI`)
*   HuggingFace Local Embeddings (`all-MiniLM-L6-v2`)
*   ChromaDB (Vector Database)
*   PyMuPDF (`PyMuPDFLoader` for robust text extraction)

## 📁 Project Structure
```text
UNIVERSITY_CHATBOT_V2/
├── backend/                # Python backend server and RAG logic
│   ├── core.py             # Custom RAG chain and LLM integration
│   ├── ingest.py           # Document loading, chunking, and embedding logic
│   └── main.py             # API routes and server initialization
├── data/                   # Place your institution's PDF handbooks here
├── vector_db/              # Locally generated ChromaDB storage (Git-ignored)
└── web/                    # React/TypeScript frontend application
    ├── public/
    └── src/
        ├── api/            # Backend communication clients
        ├── components/     # Reusable UI components (Chat, Layout, etc.)
        ├── pages/          # ChatPage and AdminPage
        └── types/          # TypeScript interface definitions
