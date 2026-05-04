import { useState, useRef, useEffect, useCallback } from 'react';
import { sendChatMessage } from '../api/client';
import type { ChatMessage } from '../types/chat';
import { NewMessageBubble } from '../components/Chat/MessageBubble';
import { SourceCitations } from '../components/Chat/SourceCitations';
import { ChatInput } from '../components/Chat/ChatInput';

function generateId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const SUGGESTED_PROMPTS = [
  { icon: '📘', label: 'Curriculum', text: 'What are the B.Tech CSE electives for 6th semester?' },
  { icon: '📋', label: 'Regulations', text: 'Explain the examination grading policy for SOET.' },
  { icon: '🔐', label: 'Cyber Sec', text: 'What topics are in the Cyber Security handbook?' },
  { icon: '🤖', label: 'BCA AI & DS', text: 'List the core subjects for BCA AI & DS program.' },
];

/* ────── Scaled down Hero Stat ───────────────────────────── */
function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[18px] font-bold text-[#5BB3E8] leading-none">{value}</span>
      <span className="text-[10px] text-slate-400 font-normal tracking-[0.04em]">{label}</span>
    </div>
  );
}

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = useCallback(async (text: string) => {
    setError(null);
    const userMsg: ChatMessage = { id: generateId(), role: 'user', content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await sendChatMessage(text);
      setMessages((prev) => [...prev, {
        id: generateId(),
        role: 'assistant',
        content: res.result,
        sourceDocuments: res.source_documents,
        timestamp: new Date(),
      }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setError(msg);
      setMessages((prev) => [...prev, { id: generateId(), role: 'assistant', content: `⚠ ${msg}`, timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">

      {/* ── Header ─────────────────────── */}
      {messages.length > 0 && (
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0060AA] shadow-[0_0_8px_rgba(0,96,170,0.8)] animate-pulse" />
            <span className="text-[12px] font-medium text-slate-300 tracking-[0.03em]">
              SOET AI Assistant
            </span>
          </div>
          <button
            onClick={() => { setMessages([]); setError(null); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-slate-400 border border-white/10 hover:text-white hover:border-white/30 hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
          >
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            New Chat
          </button>
        </div>
      )}

      {/* ── Main Content Area ─────────────────────────────────── */}
      {messages.length === 0 ? (

        /* ════ HERO WELCOME SCREEN (Scaled down ~20%) ════════════ */
        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center text-center p-6">

          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight shadow-sm hero-reveal">
            Welcome to SOET AI
          </h1>

          <p className="text-[13px] text-slate-400 max-w-[380px] leading-relaxed font-light mb-8 hero-reveal">
            Your intelligent academic assistant for K.R. Mangalam University. Ask about curricula, exam policies, regulations, and more.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-6 mb-8 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hero-reveal">
            <HeroStat value="3" label="Departments" />
            <div className="w-px h-6 bg-white/10" />
            <HeroStat value="100+" label="Research Labs" />
            <div className="w-px h-6 bg-white/10" />
            <HeroStat value="700+" label="Recruiters" />
          </div>

          {/* Suggested Prompts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-w-[550px] w-full mb-6 hero-reveal">
            {SUGGESTED_PROMPTS.map(({ icon, label, text }) => (
              <button
                key={text}
                onClick={() => handleSend(text)}
                className="text-left p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 group flex items-start gap-3.5 cursor-pointer"
              >
                <span className="text-xl mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">{icon}</span>
                <div>
                  <p className="text-[10px] font-bold text-[#5BB3E8] uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-[12px] text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed">{text}</p>
                </div>
              </button>
            ))}
          </div>

          <p className="text-[10px] text-slate-600 tracking-[0.1em] uppercase font-semibold hero-reveal">
            Start typing anywhere to begin
          </p>
        </div>

      ) : (

        /* ════ CHAT HISTORY ═══════════════════════════════════ */
        <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-5 py-5 pb-2">
          <div className="max-w-[700px] mx-auto flex flex-col gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className="animate-slide-up">
                <NewMessageBubble message={msg} />
                {msg.role === 'assistant' && msg.sourceDocuments?.length ? (
                  <div className="mt-2 ml-1 max-w-[88%]">
                    <SourceCitations sources={msg.sourceDocuments} />
                  </div>
                ) : null}
              </div>
            ))}

            {loading && (
              <div className="animate-slide-up flex justify-start">
                <div className="flex items-center gap-2 px-4 py-3 rounded-tr-xl rounded-br-xl rounded-bl-sm bg-white/[0.03] border border-white/[0.07] backdrop-blur-md">
                  <span className="text-[10px] text-slate-400 font-medium tracking-[0.04em] mr-1">Thinking</span>
                  <span className="thinking-dot" />
                  <span className="thinking-dot" />
                  <span className="thinking-dot" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Input Bar ──────────────────────────────────────────── */}
      <div className="flex-shrink-0 px-4 py-3 pb-5 max-w-[740px] w-full mx-auto box-border">
        {error && (
          <div className="mb-2 flex items-center gap-2 text-[12px] text-[#F87171] bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl px-3 py-2" role="alert">
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}