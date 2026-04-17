interface Props {
  onGetStarted: () => void;
}

export default function CTAButtons({ onGetStarted }: Props) {
  return (
    <div
      className="animate-fade-up delay-360 flex flex-col sm:flex-row items-center justify-center"
      style={{ gap: 12, marginBottom: 48 }}
    >
      <button
        onClick={onGetStarted}
        className="transition-all duration-150 w-full  sm:w-auto rounded-xl "
        style={{
          background: 'linear-gradient(0deg, #F5520C 0%, #FF823E 100%)',
          padding: '14px 32px', fontSize: 15, fontWeight: 400, color: 'white',
          border: '1.5px solid rgba(255, 154, 100, 0.79)', cursor: 'pointer',
          // boxShadow: '0 0 40px rgba(245,82,12,0.45), 0 4px 20px rgba(0,0,0,0.3)',
          maxWidth: 320,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(245,82,12,0.6), 0 4px 10px rgba(0,0,0,0.2)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }} //reset to boxshadow none
      >
        Get Started Free
      </button>

    </div>
  );
}
