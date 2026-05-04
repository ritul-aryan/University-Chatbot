import { useState, useRef, useEffect, useCallback } from 'react';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [sttSupported, setSttSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* ── Auto-resize ───────────────────────────────────────── */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`;
    }
  }, [input]);

  /* ── Global keystroke → focus textarea ────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement ||
        e.ctrlKey || e.metaKey || e.altKey
      ) return;
      if (e.key.length === 1 || e.key === 'Backspace') {
        textareaRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  /* ── Send ──────────────────────────────────────────────── */
  const send = useCallback(() => {
    const t = input.trim();
    if (!t || disabled) return;
    onSend(t);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }, [input, onSend, disabled]);

  /* ── STT ───────────────────────────────────────────────── */
  const startListening = useCallback(() => {
    const SRAPI =
      (window as unknown as { SpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
    if (!SRAPI) { setSttSupported(false); return; }
    const r = new SRAPI();
    r.continuous = false;
    r.interimResults = false;
    r.lang = 'en-IN';
    r.onresult = (e: SpeechRecognitionEvent) => {
      const t = Array.from(e.results).map((x) => x[0].transcript).join('');
      setInput((prev) => prev ? `${prev} ${t}` : t);
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recognitionRef.current = r;
    r.start();
    setListening(true);
  }, []);

  const stopListening = useCallback(() => {
    try { recognitionRef.current?.stop(); } catch { /* ignore */ }
    recognitionRef.current = null;
    setListening(false);
  }, []);

  const hasInput = input.trim().length > 0;

  return (
    <div className="input-glass" style={{ display: 'flex', alignItems: 'flex-end', gap: 8, padding: '8px 8px 8px 4px' }}>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
        }}
        placeholder="Ask about SOET courses, syllabi, or regulations…"
        rows={1}
        disabled={disabled}
        style={{
          flex: 1,
          maxHeight: 128,
          resize: 'none',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: '#fff',
          fontSize: 14.5,
          lineHeight: 1.65,
          letterSpacing: '0.01em',
          fontFamily: 'inherit',
          fontWeight: 400,
          padding: '10px 8px 10px 16px',
          caretColor: '#0060AA',
        }}
      />

      {/* Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 6, paddingRight: 4, flexShrink: 0 }}>

        {/* Mic */}
        {sttSupported && (
          <button
            type="button"
            onClick={listening ? stopListening : startListening}
            disabled={disabled}
            title={listening ? 'Stop recording' : 'Voice input'}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: listening ? '1px solid rgba(227,30,36,0.3)' : '1px solid transparent',
              background: listening ? 'rgba(227,30,36,0.08)' : 'transparent',
              color: listening ? '#F87171' : 'rgba(100,116,139,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              animation: listening ? 'mic-pulse 1.6s ease-in-out infinite' : 'none',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              if (!listening) {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,96,170,0.08)';
                (e.currentTarget as HTMLButtonElement).style.color = '#5BB3E8';
                (e.currentTarget as HTMLButtonElement).style.border = '1px solid rgba(0,96,170,0.2)';
              }
            }}
            onMouseLeave={e => {
              if (!listening) {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(100,116,139,0.8)';
                (e.currentTarget as HTMLButtonElement).style.border = '1px solid transparent';
              }
            }}
          >
            {listening ? (
              /* Animated waveform when recording */
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="7" width="2.5" height="10" rx="1.25" opacity="0.6" />
                <rect x="6" y="3" width="2.5" height="18" rx="1.25" />
                <rect x="10" y="1" width="2.5" height="22" rx="1.25" />
                <rect x="14" y="4" width="2.5" height="16" rx="1.25" />
                <rect x="18" y="8" width="2.5" height="8" rx="1.25" opacity="0.6" />
              </svg>
            ) : (
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        )}

        {/* Send */}
        <button
          type="button"
          onClick={send}
          disabled={disabled || !hasInput}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: 'none',
            background: hasInput && !disabled
              ? 'linear-gradient(135deg, #1A7EC4 0%, #0060AA 55%, #004D88 100%)'
              : 'rgba(255,255,255,0.06)',
            color: hasInput && !disabled ? '#fff' : 'rgba(100,116,139,0.5)',
            boxShadow: hasInput && !disabled
              ? '0 0 20px rgba(0,96,170,0.5), 0 0 40px rgba(0,96,170,0.15)'
              : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: hasInput && !disabled ? 'pointer' : 'not-allowed',
            transition: 'all 0.25s ease',
            flexShrink: 0,
          }}
        >
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginLeft: 1 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
}