'use client';

import React from 'react';
import { ArrowRight, Shield, Zap, Monitor, CloudOff } from 'lucide-react';
import GradientText from '../ui/GradientText';

const features = [
  {
    badge: 'Speed',
    title: 'Fast Processing',
    description: 'Edit and convert documents in milliseconds with our high-performance local engine.',
    cta: 'Get Started',
    icon: <Zap size={40} className="text-[#FF5722] opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
  },
  {
    badge: 'Privacy',
    title: 'Secure',
    description: 'Your privacy is our priority. All document processing happens securely on your device.',
    cta: 'Learn More',
    icon: <Shield size={40} className="text-[#FF5722] opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
  },
  {
    badge: 'Convenience',
    title: 'No Installation',
    description: 'No software to download or accounts to create. Access all tools directly in your browser.',
    cta: 'Try It Now',
    icon: <CloudOff size={40} className="text-[#FF5722] opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
  },
  {
    badge: 'Accessibility',
    title: 'Works on all devices',
    description: 'Desktop, tablet, or mobile. Enjoy a seamless PDF editing experience across all your screens.',
    cta: 'Explore Tools',
    icon: <Monitor size={40} className="text-[#FF5722] opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
  }
];

const FeaturesSection = () => {
  return (
    <section className="relative py-24 px-6 bg-[#0A0A0A] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial from-[#FF5722]/5 to-transparent pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-20 max-w-2xl mx-auto animate-fade-up">
        <h2 className="text-[clamp(32px,5vw,48px)] font-medium text-white leading-[1.15] tracking-tight">
          Engineered for Modern<br /><GradientText>PDF Workflows</GradientText>
        </h2>
        <p className="mt-4 text-[16px] text-[#888888] max-w-[500px] mx-auto leading-relaxed">
          Experience document management with tools designed for speed, security, and absolute flexibility.
        </p>
      </div>

      {/* 2x2 Grid */}
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <div key={i} className="group relative rounded-[32px] border border-white/[0.08] bg-[#111111] p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-[#FF5722]/30 hover:bg-[#141414]">
            {/* Ambient orange glow */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#FF5722]/5 blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-[#FF5722] mb-6 tracking-wide uppercase">
                {f.badge}
              </span>

              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                {f.title}
              </h3>

              <p className="text-[#888888] text-[15px] leading-relaxed max-w-[340px]">
                {f.description}
              </p>
            </div>

            <div className="relative z-10 mt-10">
              <button className="flex items-center gap-2 text-white font-medium group/btn">
                <span className="border-b border-white/10 pb-0.5 group-hover/btn:border-[#FF5722] transition-colors duration-300">
                  {f.cta}
                </span>
                <ArrowRight size={16} className="text-[#FF5722] transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>

            {/* Subtle Graphic Element */}
            <div className="absolute right-8 top-12 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700">
              {f.icon}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
