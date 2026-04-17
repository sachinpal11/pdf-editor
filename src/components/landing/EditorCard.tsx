import { Info } from 'lucide-react';

const tools = ['Annotate', 'Compress', 'Sign', 'Merge'];

export default function EditorCard() {
  return (
    <div
      className="transition-all duration-200 w-[360px] bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 shrink-0 z-10 hover:-translate-y-1 hover:border-white/[0.14]"
      style={{
        borderTop: '2px solid #F5520C',
        transform: 'translateY(-28px)',
        boxShadow: '0 50px 120px rgba(0,0,0,0.7), 0 0 60px rgba(245,82,12,0.08)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-semibold text-white">PDF Editor</span>
          <Info size={12} color="#555555" />
        </div>
        <button className="bg-[#F5520C] rounded-[6px] px-3 py-[5px] text-[11px] font-bold text-white border-none cursor-pointer">
          Export
        </button>
      </div>

      {/* Document preview */}
      <div className="relative h-[180px] bg-[#161616] rounded-[10px] border border-white/[0.06] p-4">
        <div className="w-[40%] h-2 bg-[#333333] rounded-full mb-3.5" />
        <div className="w-[90%] h-[5px] bg-[#252525] rounded-full mb-2" />
        <div className="w-[75%] h-[5px] bg-[#252525] rounded-full mb-2" />
        <div className="w-[60%] h-[5px] bg-[rgba(245,82,12,0.4)] rounded-full mb-2" />
        <div className="w-[85%] h-[5px] bg-[#252525] rounded-full mb-2" />
        <div className="w-[70%] h-[5px] bg-[#252525] rounded-full" />
        <div className="absolute top-2.5 right-2.5 bg-[#1A1A1A] border border-white/10 rounded-full px-2.5 py-1 text-[10px] text-white">
          ✏️ 3 edits made
        </div>
      </div>

      {/* Tool pills */}
      <div className="flex flex-wrap gap-2 mt-3">
        {tools.map((t) => {
          const active = t === 'Annotate';
          return (
            <span
              key={t}
              className={`rounded-[6px] px-2.5 py-[5px] text-[11px] border ${active ? 'bg-[rgba(245,82,12,0.15)] border-[rgba(245,82,12,0.4)] text-[#F5520C]' : 'bg-[#1A1A1A] border-white/[0.08] text-[#888888]'}`}
            >
              {t}
            </span>
          );
        })}
      </div>

      {/* Progress */}
      <div className="mt-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-[#888888]">Processing...</span>
          <span className="text-[11px] text-[#F5520C] font-semibold tabular-nums">67%</span>
        </div>
        <div className="w-full h-[3px] bg-[#1A1A1A] rounded-full">
          <div className="w-[67%] h-full rounded-full" style={{ background: 'linear-gradient(to right,#F5520C,#FF6B2B)' }} />
        </div>
      </div>
    </div>
  );
}
