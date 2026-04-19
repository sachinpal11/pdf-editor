'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FeaturedCardProps {
  badge: string;
  title: string;
  description: string;
  ctaText: string;
  accentColor: string;
  graphic: React.ReactNode;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ badge, title, description, ctaText, accentColor, graphic }) => {
  return (
    <div className="group relative rounded-[32px] border border-white/[0.08] bg-[#111111] p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-[#161616]">
      {/* Background Accent Glow */}
      <div 
        className="absolute top-0 right-0 w-[300px] h-[300px] opacity-[0.08] blur-[80px] pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.12]"
        style={{ background: accentColor }}
      />
      
      <div className="relative z-10 flex-1 pr-24">
        <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60 mb-6 tracking-wide">
          {badge}
        </span>
        
        <h3 className="text-3xl font-bold text-white mb-4 leading-tight tracking-tight">
          {title}
        </h3>
        
        <p className="text-[#888888] text-[15px] leading-relaxed max-w-[340px]">
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-8">
        <button className="flex items-center gap-2 text-white font-medium group/btn">
          <span className="border-b border-white/20 pb-0.5 group-hover/btn:border-white/60 transition-colors duration-300">
            {ctaText}
          </span>
          <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>

      {/* Abstract Graphic */}
      <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-20 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3">
        {graphic}
      </div>
    </div>
  );
};

export default function FeatureGrid() {
  const cards = [
    {
      badge: 'Smart OCR',
      title: 'Save Hours with AI-Powered Detection',
      description: 'Automatically recognize and edit text in scanned PDFs with our advanced high-precision OCR engine.',
      ctaText: 'Get Started',
      accentColor: '#FF5722',
      graphic: (
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="40" width="120" height="120" rx="30" transform="rotate(-15 40 40)" fill="#FF5722" fillOpacity="0.3" />
          <rect x="100" y="80" width="100" height="100" rx="25" transform="rotate(10 100 80)" fill="#FF5722" fillOpacity="0.2" />
        </svg>
      )
    },
    {
      badge: 'Teamwork',
      title: 'Work Seamlessly with Your Team',
      description: 'Bring your team together with live collaboration, instant feedback, and version control—no more messy emails.',
      ctaText: 'Try It Now',
      accentColor: '#3B82F6',
      graphic: (
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="120" cy="120" r="80" fill="#3B82F6" fillOpacity="0.2" />
          <path d="M120 40C164.183 40 200 75.8172 200 120C200 164.183 164.183 200 120 200C75.8172 200 40 164.183 40 120" stroke="#3B82F6" strokeWidth="20" strokeLinecap="round" strokeOpacity="0.3" />
        </svg>
      )
    },
    {
      badge: 'Cloud Sync',
      title: 'Connect with Your Favorite Tools',
      description: 'Integrate with Google Drive, Dropbox, and OneDrive to keep your workflow efficient and connected across platforms.',
      ctaText: 'Explore Integrations',
      accentColor: '#A855F7',
      graphic: (
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 120L120 60L180 120L120 180L60 120Z" fill="#A855F7" fillOpacity="0.3" />
          <path d="M100 160L160 100L220 160L160 220L100 160Z" fill="#A855F7" fillOpacity="0.2" />
        </svg>
      )
    },
    {
      badge: 'Privacy First',
      title: 'Make Data-Secure Decisions',
      description: 'Gain peace of mind with industrial-grade encryption and local processing that ensures your files never leave your device.',
      ctaText: 'View Security',
      accentColor: '#22C55E',
      graphic: (
        <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="60" y="60" width="120" height="120" rx="40" fill="#22C55E" fillOpacity="0.3" />
          <path d="M120 20L220 120L120 220L20 120L120 20Z" fill="#22C55E" fillOpacity="0.1" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 px-6 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {cards.map((card, index) => (
          <FeaturedCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
}
