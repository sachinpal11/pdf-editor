const features = ['PDF to Word', 'Merge & Split', 'E-Signature', 'Cloud Sync', '256-bit Encryption'];

export default function FeaturesStrip() {
  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 20px' }}>
      <div
        className="flex flex-wrap items-center justify-center"
        style={{ maxWidth: 900, margin: '0 auto', gap: '16px 48px' }}
      >
        {features.map((f) => (
          <div key={f} className="flex items-center" style={{ gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="8" fill="#F5520C" />
              <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 13, color: '#777777', fontWeight: 400 }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
