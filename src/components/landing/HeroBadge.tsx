export default function HeroBadge() {
  return (
    <div className="animate-fade-up delay-0" style={{ marginBottom: 24, display: 'inline-flex' }}>
      <span
        className="transition-all duration-200 cursor-pointer"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 999, padding: '7px 18px',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 12, fontWeight: 500, color: '#CCCCCC',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(245,82,12,0.4)'; e.currentTarget.style.background = 'rgba(245,82,12,0.08)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
      >
        No Login Required, Use for Free
      </span>
    </div>
  );
}
