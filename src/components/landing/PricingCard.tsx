import React from 'react';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isBlurred?: boolean;
  isActive?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, isBlurred = false, isActive = false }) => {
  if (isBlurred) {
    return (
      <div className="relative bg-[#0D0D0D] border border-white/[0.10] rounded-[24px] p-8 filter blur-xs opacity-30 pointer-events-none select-none">
        <h3 className="text-[20px] font-semibold text-white mb-2">{title}</h3>
        <div className="text-[40px] font-bold text-white mb-6">{price}</div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-4 bg-white/5 rounded-full w-full" />
          ))}
        </div>
        <button className='w-full py-4 rounded-xl text-white bg-neutral-600 border border-white/[0.10] mt-10 font-bold text-[15px] transition-all duration-200 hover:-translate-y-0.5'>
          Get Started Now
        </button>
      </div>
    );
  }

  return (
    <div className={`relative bg-[#0D0D0D] border ${isActive ? 'border-[#F5520C]/40 shadow-[0_0_50px_rgba(245,82,12,0.1)]' : 'border-white/[0.08]'} rounded-[24px] p-10 transition-all duration-500 overflow-hidden flex flex-col h-full`}>
      {isActive && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5520C] to-transparent" />
      )}

      <div className="mb-8">
        <h3 className="text-[18px] font-medium text-[#888888] mb-2">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-[48px] font-bold text-white tracking-tight">{price}</span>
          <span className="text-[#555555] font-medium">/forever</span>
        </div>
      </div>

      <div className="space-y-5 mb-10 flex-1">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-[#F5520C]/10 flex items-center justify-center shrink-0">
              <Check size={12} className="text-[#F5520C]" />
            </div>
            <span className="text-[15px] text-[#BBBBBB]">{feature}</span>
          </div>
        ))}
      </div>

      <button
        className="w-full py-4 rounded-xl text-white font-bold text-[15px] transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: 'linear-gradient(0deg,#F5520C 0%,#FF823E 100%)',
          border: '1.5px solid rgba(255,154,100,0.79)',
          boxShadow: '0 0 20px rgba(245,82,12,0.3)'
        }}
      >
        Get Started for Free
      </button>

      {/* Decorative background glow for active card */}
      {isActive && (
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#F5520C] blur-[100px] opacity-20 pointer-events-none" />
      )}
    </div>
  );
};

export default PricingCard;
