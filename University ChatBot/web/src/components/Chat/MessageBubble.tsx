import type { ChatMessage } from '../../types/chat';
import { SpeakButton } from './SpeakButton';

interface NewMessageBubbleProps {
  message: ChatMessage;
}

export function NewMessageBubble({ message }: NewMessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div
        style={{
          maxWidth: '87%',
          padding: '14px 18px',
          borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          ...(isUser ? {
            background: 'linear-gradient(135deg, rgba(0,96,170,0.18) 0%, rgba(0,96,170,0.10) 100%)',
            border: '1px solid rgba(0,96,170,0.28)',
            boxShadow: '0 4px 24px rgba(0,96,170,0.08)',
          } : {
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
          }),
        }}
      >
        {/* Message text */}
        <p style={{
          fontSize: 14.5,
          lineHeight: 1.75,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          color: isUser ? '#fff' : 'rgba(203,213,225,0.92)',
          fontWeight: isUser ? 400 : 300,
          letterSpacing: '0.01em',
          margin: 0,
        }}>
          {message.content}
        </p>

        {/* AI footer */}
        {!isUser && message.content && (
          <div style={{
            marginTop: 12,
            paddingTop: 10,
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            {/* Avatar */}
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1A7EC4, #0060AA)',
              boxShadow: '0 0 10px rgba(0,96,170,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontWeight: 800, color: '#fff', fontSize: 9, lineHeight: 1 }}>K</span>
            </div>

            <span style={{
              fontSize: 10.5,
              fontWeight: 600,
              color: 'rgba(100,116,139,0.7)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}>
              SOET AI
            </span>

            <div style={{ marginLeft: 'auto', opacity: 0.65 }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.opacity = '1')}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.opacity = '0.65')}
            >
              <SpeakButton text={message.content} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}