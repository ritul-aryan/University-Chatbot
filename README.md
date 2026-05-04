# Universal Academic RAG Chatbot 🎓🤖

An open-source, full-stack Retrieval-Augmented Generation (RAG) assistant designed to be deployed by any university or educational institution. Simply drop your institution's PDF handbooks into the data folder, and the system instantly creates a tailored AI assistant for students and faculty.

*Note: The current repository and demo assets feature a reference implementation built for the School of Engineering and Technology (SOET) at K.R. Mangalam University, successfully indexing their specific curriculum and cybersecurity handbooks.*

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

*   `backend/` - Python backend server and RAG logic
    *   `core.py` - Custom RAG chain and LLM integration
    *   `ingest.py` - Document loading, chunking, and embedding logic
    *   `main.py` - API routes and server initialization
*   `data/` - Place your institution's PDF handbooks here
*   `vector_db/` - Locally generated ChromaDB storage (Git-ignored)
*   `web/` - React/TypeScript frontend application
    *   `src/api/` - Backend communication clients
    *   `src/components/` - Reusable UI components (Chat, Layout, etc.)
    *   `src/pages/` - ChatPage and AdminPage

## 🧠 How It Works (The RAG Pipeline)

1.  **Dynamic Ingestion (`ingest.py`):** PDF handbooks placed in the `data` directory are dynamically processed using PyMuPDF. The text is split into 2000-character chunks with 300-character overlaps and vectorized locally using HuggingFace models before being stored in ChromaDB.
2.  **Retrieval (`core.py`):** When a user asks a question, the system queries the local ChromaDB for the 15 most relevant chunks.
3.  **Generation:** The compiled context and the user's prompt are sent to Gemini 2.5 Flash. Strict system prompts force the AI to use ONLY the provided context, merge split tables, and cite specific page numbers.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   Python (3.10+)
*   Google Gemini API Key

### Installation & Setup

1. **Clone the repository:**
   git clone https://github.com/yourusername/university-chatbot-v2.git
   cd university-chatbot-v2

2. **Backend Setup:**
   cd backend
   pip install -r requirements.txt
   
   *Create a .env file in the backend directory and add your API key:*
   GOOGLE_API_KEY=your_gemini_key_here
   
   *Ingest the PDF knowledge base (Ensure PDFs are in the /data folder)*
   python ingest.py
   
   *Start the backend server*
   python main.py

3. **Frontend Setup:**
   cd ../web
   npm install
   npm run dev

## 🌐 Deployment
The frontend is optimized for deployment on platforms like Vercel. Ensure your build commands point to the `web` directory and your environment variables are configured in your hosting dashboard to communicate with your hosted Python backend.
