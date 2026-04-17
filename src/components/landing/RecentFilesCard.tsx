const files = [
  { icon: 'pdf', name: 'Q4_Report_Final.pdf', size: '2.4 MB', time: '2m ago', status: 'done' },
  { icon: 'doc', name: 'Contract_Draft_v3.docx', size: '840 KB', time: '18m ago', status: 'processing' },
  { icon: 'xls', name: 'Budget_2025.xlsx', size: '1.1 MB', time: '1h ago', status: 'done' },
];

const iconStyle = (type: string) => {
  if (type === 'pdf') return { bg: 'rgba(245,82,12,0.15)', color: '#F5520C' };
  if (type === 'doc') return { bg: 'rgba(59,130,246,0.15)', color: '#3B82F6' };
  return { bg: 'rgba(34,197,94,0.15)', color: '#22C55E' };
};

export default function RecentFilesCard() {
  return (
    <div
      className="transition-all duration-200"
      style={{
        width: 260, background: '#111111',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16, padding: 20,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
    >
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Recent Files</span>
        <a href="#" style={{ fontSize: 11, color: '#F5520C', textDecoration: 'none' }}>See All →</a>
      </div>

      <div className="flex flex-col" style={{ gap: 12 }}>
        {files.map((f, i) => {
          const s = iconStyle(f.icon);
          return (
            <div key={i}>
              <div className="flex items-center" style={{ gap: 10 }}>
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{ width: 32, height: 32, background: s.bg, flexShrink: 0 }}
                >
                  <span style={{ fontSize: 8, fontWeight: 700, color: s.color }}>{f.icon.toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</p>
                  <p style={{ fontSize: 10, color: '#555555' }}>{f.size}</p>
                </div>
                <div className="flex flex-col items-end" style={{ gap: 4, flexShrink: 0 }}>
                  <span style={{ fontSize: 10, color: '#444444' }}>{f.time}</span>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: f.status === 'done' ? '#22C55E' : '#F5520C' }} />
                </div>
              </div>
              {i < files.length - 1 && <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', marginTop: 12 }} />}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 11, color: '#555555' }}>12 files this week</p>
        <div style={{ width: 40, height: 2, background: '#F5520C', borderRadius: 999, marginTop: 6 }} />
      </div>
    </div>
  );
}
