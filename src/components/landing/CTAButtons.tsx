interface Props {
  onGetStarted: () => void;
}

export default function CTAButtons({ onGetStarted }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
      <button
        onClick={onGetStarted}
        className="w-full sm:w-auto max-w-xs rounded-xl text-[15px] font-normal text-white cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(245,82,12,0.6),0_4px_10px_rgba(0,0,0,0.2)]"
        style={{ background: 'linear-gradient(0deg,#F5520C 0%,#FF823E 100%)', padding: '14px 32px', border: '1.5px solid rgba(255,154,100,0.79)' }}
      >
        Get Started Free
      </button>
    </div>
  );
}
