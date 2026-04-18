import React from 'react';
import { LucideIcon } from 'lucide-react';

import { ArrowRight } from 'lucide-react';

interface LandingToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

const LandingToolCard: React.FC<LandingToolCardProps> = ({ icon: Icon, title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative h-full bg-[#0D0D0D] border border-white/[0.08] rounded-[24px] p-8 transition-all duration-500 hover:border-[#F5520C]/40 hover:-translate-y-2 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Ambient Brand Glow (Default state) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(245,82,12,0.08),transparent_70%)] opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />

      {/* Modern Spotlight Effect (Hover state) */}
      <div className="absolute inset-0 bg-[radial-gradient(800px_at_50%_-20%,rgba(245,82,12,0.12),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Subtle Noise Texture for depth */}
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Card Header: Icon + Title */}
        <div className="flex items-center gap-5 mb-6">
          <div className="relative w-14 h-14 rounded-[18px] bg-[#161616] border border-white/[0.05] flex items-center justify-center transition-all duration-500 group-hover:bg-[#F5520C] group-hover:border-[#F5520C] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(245,82,12,0.4)]">
            <Icon size={26} className="text-[#F5520C] transition-colors duration-500 group-hover:text-white" />
          </div>

          <h3 className="text-[20px] font-medium text-white tracking-tight group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[15px] text-[#888888] leading-[1.6] transition-colors duration-500 group-hover:text-[#CCCCCC]">
          {description}
        </p>

        {/* Action Hint: Reveals on hover */}
        <div className="mt-auto pt-8 flex items-center gap-2 text-[13px] font-bold text-[#F5520C] opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
          <span className="uppercase tracking-wider">Get Started</span>
          <ArrowRight size={14} className="stroke-[3px]" />
        </div>


      </div>

      {/* Number Badge */}
      {/* //show only on hover */}


      {/* Decorative top border line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-[#F5520C]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

      {/* Bottom corner accent */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#F5520C] blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
    </div>
  );
};

export default LandingToolCard;
