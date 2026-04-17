import { Tool } from './toolsData';

interface Props {
  tool: Tool;
  onClick: () => void;
}

export default function ToolCard({ tool, onClick }: Props) {
  const { icon: Icon, label, desc, active } = tool;

  return (
    <div
      onClick={onClick}
      className={`transition-all duration-200 rounded-2xl p-6 relative ${active ? 'cursor-pointer opacity-100 hover:-translate-y-1' : 'cursor-default opacity-50'}`}
      style={{
        background: active ? 'linear-gradient(0deg,#F5520C 0%,#FF823E 100%)' : 'black',
        border: active ? '1px solid rgba(255,146,100,0.83)' : '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Badge */}
      <span
        className="absolute top-3.5 right-3.5 rounded-full px-2 py-[2px] text-[10px] font-semibold"
        style={{
          background: active ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.05)',
          color: active ? '#FFFFFF' : '#555555',
          border: `1px solid ${active ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.07)'}`,
        }}
      >
        {active ? 'Available' : 'Soon'}
      </span>

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl mb-4 flex items-center justify-center"
        style={{ background: active ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.05)' }}
      >
        <Icon size={20} color={active ? '#FFFFFF' : '#444444'} />
      </div>

      <p className={`text-[14px] font-bold mb-1.5 ${active ? 'text-white' : 'text-[#555555]'}`}>{label}</p>
      <p className={`text-[12px] leading-[1.5] ${active ? 'text-white/70' : 'text-[#3A3A3A]'}`}>{desc}</p>
    </div>
  );
}
