const features = ['PDF to Word', 'Merge & Split', 'E-Signature', 'Cloud Sync', '256-bit Encryption'];

export default function FeaturesStrip() {
  return (
    <div className="border-t border-white/[0.06] py-10 px-5">
      <div className="flex flex-wrap items-center justify-center max-w-[900px] mx-auto gap-x-12 gap-y-4">
        {features.map((f) => (
          <div key={f} className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="8" fill="#F5520C" />
              <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[13px] text-[#777777] font-normal">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
