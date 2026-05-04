# SOET Academic Chatbot — Web Frontend

React + TypeScript + Tailwind frontend for the K.R. Mangalam University SOET Academic Chatbot.

## Setup

```bash
cd web
npm install
```

## Run

Start the **backend** from the **project root** (so RAG and vector DB resolve correctly):

```bash
# From university_chatbot/
python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Start the **frontend** (with API proxy to backend):

```bash
cd web
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Use **Chat** for the bot and **Admin** for the dashboard (placeholder until Tasks 3–5).

## Features (Tasks 1 & 2)

- **Chat UI:** Message bubbles, scrollable history, sleek input bar
- **Routing:** `/chat` (main bot), `/admin` (dashboard)
- **Voice input:** Microphone button uses Web Speech API (STT)
- **Voice output:** “Speak” on assistant messages uses browser TTS
- **API:** Chat requests go to FastAPI `/chat` via Vite proxy (`/api` → `http://127.0.0.1:8000`)
