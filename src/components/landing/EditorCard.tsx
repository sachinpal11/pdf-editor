import { Info } from 'lucide-react';

const tools = ['Annotate', 'Compress', 'Sign', 'Merge'];

export default function EditorCard() {
  return (
    <div
      className="transition-all duration-200"
      style={{
        width: 360, background: '#0D0D0D',
        border: '1px solid rgba(255,255,255,0.10)',
        borderTop: '2px solid #F5520C',
        borderRadius: 16, padding: 20,
        boxShadow: '0 50px 120px rgba(0,0,0,0.7), 0 0 60px rgba(245,82,12,0.08)',
        transform: 'translateY(-28px)',
        zIndex: 10, flexShrink: 0,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-32px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.borderTopColor = '#F5520C'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-28px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.borderTopColor = '#F5520C'; }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
        <div className="flex items-center" style={{ gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF' }}>PDF Editor</span>
          <Info size={12} color="#555555" />
        </div>
        <button style={{ background: '#F5520C', borderRadius: 6, padding: '5px 12px', fontSize: 11, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer' }}>
          Export
        </button>
      </div>

      {/* Document preview */}
      <div style={{ position: 'relative', height: 180, background: '#161616', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', padding: 16 }}>
        <div style={{ width: '40%', height: 8, background: '#333333', borderRadius: 999, marginBottom: 14 }} />
        <div style={{ width: '90%', height: 5, background: '#252525', borderRadius: 999, marginBottom: 8 }} />
        <div style={{ width: '75%', height: 5, background: '#252525', borderRadius: 999, marginBottom: 8 }} />
        <div style={{ width: '60%', height: 5, background: 'rgba(245,82,12,0.4)', borderRadius: 999, marginBottom: 8 }} />
        <div style={{ width: '85%', height: 5, background: '#252525', borderRadius: 999, marginBottom: 8 }} />
        <div style={{ width: '70%', height: 5, background: '#252525', borderRadius: 999 }} />
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 999, padding: '4px 10px',
          fontSize: 10, color: '#FFFFFF',
        }}>
          ✏️ 3 edits made
        </div>
      </div>

      {/* Tool pills */}
      <div className="flex flex-wrap" style={{ gap: 8, marginTop: 12 }}>
        {tools.map((t) => {
          const active = t === 'Annotate';
          return (
            <span key={t} style={{
              background: active ? 'rgba(245,82,12,0.15)' : '#1A1A1A',
              border: `1px solid ${active ? 'rgba(245,82,12,0.4)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 6, padding: '5px 10px',
              fontSize: 11, color: active ? '#F5520C' : '#888888',
            }}>
              {t}
            </span>
          );
        })}
      </div>

      {/* Progress */}
      <div style={{ marginTop: 12 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: '#888888' }}>Processing...</span>
          <span style={{ fontSize: 11, color: '#F5520C', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>67%</span>
        </div>
        <div style={{ width: '100%', height: 3, background: '#1A1A1A', borderRadius: 999 }}>
          <div style={{ width: '67%', height: '100%', background: 'linear-gradient(to right, #F5520C, #FF6B2B)', borderRadius: 999 }} />
        </div>
      </div>
    </div>
  );
}
