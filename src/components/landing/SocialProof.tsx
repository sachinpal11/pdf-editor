const avatarColors = ['#F5520C', '#3B82F6', '#8B5CF6', '#22C55E', '#F0B429'];

export default function SocialProof() {
  return (
    <div
      className="animate-fade-up delay-480 flex items-center justify-center flex-wrap"
      style={{ gap: 12, marginBottom: 64 }}
    >
      <div className="flex items-center">
        {avatarColors.map((c, i) => (
          <div
            key={i}
            style={{
              width: 24, height: 24, borderRadius: '50%',
              background: c, border: '2px solid #0A0A0A',
              marginLeft: i === 0 ? 0 : -8,
              zIndex: avatarColors.length - i,
              position: 'relative',
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: 13, color: '#888888' }}>Trusted by 120,000+ users</span>
      <div className="flex items-center" style={{ gap: 2 }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ fontSize: 12, color: '#F5520C' }}>★</span>
        ))}
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#CCCCCC', fontVariantNumeric: 'tabular-nums' }}>4.9/5</span>
    </div>
  );
}
