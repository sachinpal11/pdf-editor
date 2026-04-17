const barHeights = [30, 50, 40, 65, 45, 70, 55, 100];
const sparkPoints = [0, 18, 8, 22, 12, 26, 16, 20, 10, 28, 14, 24, 18, 32]
  .map((y, i) => `${i * 8},${32 - y}`)
  .join(' ');

export default function StatsCard() {
  return (
    <div className="transition-all duration-200 w-[240px] bg-[#111111] border border-white/[0.07] rounded-2xl p-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] shrink-0 hover:-translate-y-1 hover:border-white/[0.14]">
      {/* Top stat */}
      <p className="text-[11px] text-[#888888] mb-1">Conversions today</p>
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-[24px] font-extrabold text-white tabular-nums">2,847</span>
        <span className="bg-[rgba(34,197,94,0.12)] text-[#22C55E] rounded-full px-2 py-[3px] text-[11px] font-semibold">+18.4%</span>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-1 h-10">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="w-4 rounded-t-[3px]"
            style={{ height: `${h}%`, background: i === barHeights.length - 1 ? '#F5520C' : 'rgba(245,82,12,0.3)' }}
          />
        ))}
      </div>

      <div className="h-px bg-white/[0.05] my-3.5" />

      {/* Bottom stat */}
      <p className="text-[11px] text-[#888888] mb-1">Avg. convert time</p>
      <p className="text-[20px] font-extrabold text-white tabular-nums mb-0.5">1.4s</p>
      <p className="text-[11px] text-[#F5520C] mb-2">⚡ Fastest in class</p>

      <svg width="100%" height="32" viewBox="0 0 104 32" preserveAspectRatio="none">
        <polyline points={sparkPoints} fill="none" stroke="#F5520C" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
