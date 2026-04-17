export default function HeroHeadline() {
  return (
    <h1
      className="animate-fade-up delay-120"
      style={{
        fontSize: 'clamp(34px, 5.5vw, 60px)',
        fontWeight: 500, color: '#FFFFFF',
        lineHeight: 1.08, letterSpacing: '-0.03em',
        marginBottom: 20,
      }}
    >
      Convert &amp; Edit
      <span style={{ color: '#F5520C' }}> PDFs</span> Anywhere, Instantly.
    </h1>
  );
}
