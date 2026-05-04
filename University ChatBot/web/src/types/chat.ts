import type { SourceDocument } from '../api/client';

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  sourceDocuments?: SourceDocument[];
  timestamp: Date;
}
