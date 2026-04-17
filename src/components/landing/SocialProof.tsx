const avatarColors = ['#F5520C', '#3B82F6', '#8B5CF6', '#22C55E', '#F0B429'];

export default function SocialProof() {
  return (
    <div className="animate-fade-up delay-480 flex items-center justify-center flex-wrap gap-3 mb-16">
      <div className="flex items-center">
        {avatarColors.map((c, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full border-2 border-[#0A0A0A] relative"
            style={{ background: c, marginLeft: i === 0 ? 0 : -8, zIndex: avatarColors.length - i }}
          />
        ))}
      </div>
      <span className="text-[13px] text-[#888888]">Trusted by 120,000+ users</span>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-[12px] text-[#F5520C]">★</span>
        ))}
      </div>
      <span className="text-[12px] font-semibold text-[#CCCCCC] tabular-nums">4.9/5</span>
    </div>
  );
}
