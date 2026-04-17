const barHeights = [30, 50, 40, 65, 45, 70, 55, 100];
const sparkPoints = [0, 18, 8, 22, 12, 26, 16, 20, 10, 28, 14, 24, 18, 32]
  .map((y, i) => `${i * 8},${32 - y}`)
  .join(' ');

export default function StatsCard() {
  return (
    <div
      className="transition-all duration-200"
      style={{
        width: 240, background: '#111111',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16, padding: 18,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
    >
      {/* Top stat */}
      <p style={{ fontSize: 11, color: '#888888', marginBottom: 4 }}>Conversions today</p>
      <div className="flex items-center" style={{ gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', fontVariantNumeric: 'tabular-nums' }}>2,847</span>
        <span style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E', borderRadius: 999, padding: '3px 8px', fontSize: 11, fontWeight: 600 }}>+18.4%</span>
      </div>

      {/* Bar chart */}
      <div className="flex items-end" style={{ gap: 4, height: 40 }}>
        {barHeights.map((h, i) => (
          <div
            key={i}
            style={{
              width: 16, height: `${h}%`,
              background: i === barHeights.length - 1 ? '#F5520C' : 'rgba(245,82,12,0.3)',
              borderRadius: '3px 3px 0 0',
            }}
          />
        ))}
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '14px 0' }} />

      {/* Bottom stat */}
      <p style={{ fontSize: 11, color: '#888888', marginBottom: 4 }}>Avg. convert time</p>
      <p style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', fontVariantNumeric: 'tabular-nums', marginBottom: 2 }}>1.4s</p>
      <p style={{ fontSize: 11, color: '#F5520C', marginBottom: 8 }}>⚡ Fastest in class</p>

      {/* Sparkline */}
      <svg width="100%" height="32" viewBox="0 0 104 32" preserveAspectRatio="none">
        <polyline points={sparkPoints} fill="none" stroke="#F5520C" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
