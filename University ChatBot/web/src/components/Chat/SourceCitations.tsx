import type { SourceDocument } from '../../api/client';

interface SourceCitationsProps {
  sources: SourceDocument[];
}

export function SourceCitations({ sources }: SourceCitationsProps) {
  if (!sources?.length) return null;

  return (
    <div style={{ paddingTop: 10, borderTop: '1px solid rgba(0,96,170,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <svg width="12" height="12" fill="none" stroke="rgba(0,96,170,0.7)" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span style={{
          fontSize: 10.5,
          fontWeight: 600,
          color: 'rgba(0,96,170,0.7)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>Sources</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {sources.map((s, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 11px',
              borderRadius: 99,
              fontSize: 11.5,
              fontWeight: 500,
              background: 'rgba(0,96,170,0.06)',
              border: '1px solid rgba(0,96,170,0.16)',
              color: 'rgba(148,163,184,0.9)',
              cursor: 'default',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLSpanElement;
              el.style.borderColor = 'rgba(0,96,170,0.38)';
              el.style.background = 'rgba(0,96,170,0.12)';
              el.style.color = '#fff';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLSpanElement;
              el.style.borderColor = 'rgba(0,96,170,0.16)';
              el.style.background = 'rgba(0,96,170,0.06)';
              el.style.color = 'rgba(148,163,184,0.9)';
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(0,96,170,0.8)', flexShrink: 0, display: 'inline-block' }} />
            {s.source}
            {s.page != null && (
              <span style={{ marginLeft: 2, fontWeight: 700, color: '#1A7EC4' }}>p.{s.page}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}