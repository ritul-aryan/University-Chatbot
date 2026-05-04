/** * Automatically connects to your local FastAPI server on port 8000
 * if no production environment variable is set.
 */
const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000';

export interface SourceDocument {
  content: string;
  source: string;
  page: number | null;
}

export interface ChatResponse {
  result: string;
  source_documents: SourceDocument[];
}

export async function sendChatMessage(query: string): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error((err as { detail?: string }).detail || 'Request failed');
  }

  return res.json();
}

export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return res.ok;
  } catch {
    return false;
  }
}