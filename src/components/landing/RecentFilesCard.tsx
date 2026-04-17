const files = [
  { icon: 'pdf', name: 'Q4_Report_Final.pdf', size: '2.4 MB', time: '2m ago', status: 'done' },
  { icon: 'doc', name: 'Contract_Draft_v3.docx', size: '840 KB', time: '18m ago', status: 'processing' },
  { icon: 'xls', name: 'Budget_2025.xlsx', size: '1.1 MB', time: '1h ago', status: 'done' },
];

const iconMeta = (type: string) => {
  if (type === 'pdf') return { bg: 'bg-[rgba(245,82,12,0.15)]', color: 'text-[#F5520C]' };
  if (type === 'doc') return { bg: 'bg-[rgba(59,130,246,0.15)]', color: 'text-[#3B82F6]' };
  return { bg: 'bg-[rgba(34,197,94,0.15)]', color: 'text-[#22C55E]' };
};

export default function RecentFilesCard() {
  return (
    <div className="transition-all duration-200 w-[260px] bg-[#111111] border border-white/[0.07] rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] shrink-0 hover:-translate-y-1 hover:border-white/[0.14]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[13px] font-bold text-white">Recent Files</span>
        <a href="#" className="text-[11px] text-[#F5520C] no-underline">See All →</a>
      </div>

      <div className="flex flex-col gap-3">
        {files.map((f, i) => {
          const m = iconMeta(f.icon);
          return (
            <div key={i}>
              <div className="flex items-center gap-2.5">
                <div className={`flex items-center justify-center rounded-lg w-8 h-8 shrink-0 ${m.bg}`}>
                  <span className={`text-[8px] font-bold ${m.color}`}>{f.icon.toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-white truncate">{f.name}</p>
                  <p className="text-[10px] text-[#555555]">{f.size}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] text-[#444444]">{f.time}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${f.status === 'done' ? 'bg-[#22C55E]' : 'bg-[#F5520C]'}`} />
                </div>
              </div>
              {i < files.length - 1 && <div className="h-px bg-white/[0.04] mt-3" />}
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <p className="text-[11px] text-[#555555]">12 files this week</p>
        <div className="w-10 h-0.5 bg-[#F5520C] rounded-full mt-1.5" />
      </div>
    </div>
  );
}
