import { useState, useCallback } from 'react';

interface SpeakButtonProps { text: string; }

export function SpeakButton({ text }: SpeakButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);

  const speak = useCallback(() => {
    if (!text.trim()) return;
    if (!window.speechSynthesis) { setSupported(false); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95; u.pitch = 1; u.lang = 'en-IN';
    u.onstart = () => setSpeaking(true);
    u.onend = u.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }, [text]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={speaking ? stop : speak}
      title={speaking ? 'Stop' : 'Read aloud'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 11,
        fontWeight: 500,
        padding: '4px 10px',
        borderRadius: 99,
        border: speaking ? '1px solid rgba(227,30,36,0.25)' : '1px solid transparent',
        background: speaking ? 'rgba(227,30,36,0.07)' : 'transparent',
        color: speaking ? '#F87171' : 'rgba(100,116,139,0.7)',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        if (!speaking) {
          (e.currentTarget as HTMLButtonElement).style.color = '#5BB3E8';
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,96,170,0.08)';
          (e.currentTarget as HTMLButtonElement).style.border = '1px solid rgba(0,96,170,0.2)';
        }
      }}
      onMouseLeave={e => {
        if (!speaking) {
          (e.currentTarget as HTMLButtonElement).style.color = 'rgba(100,116,139,0.7)';
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          (e.currentTarget as HTMLButtonElement).style.border = '1px solid transparent';
        }
      }}
    >
      {speaking ? (
        <><span style={{ width: 8, height: 8, borderRadius: 2, background: '#F87171', animation: 'pulse-soft 1.5s ease-in-out infinite', display: 'inline-block' }} /> Stop</>
      ) : (
        <>
          <svg width="13" height="13" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.924L4.235 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.235l4.148-3.924a1 1 0 011 0zM14.657 5.043a1 1 0 011.414 0 6 6 0 010 8.485 1 1 0 01-1.414-1.414 4 4 0 000-5.657 1 1 0 010-1.414zm2.829-2.829a1 1 0 011.414 0 10 10 0 010 14.142 1 1 0 01-1.414-1.414 8 8 0 000-11.314 1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Speak
        </>
      )}
    </button>
  );
}