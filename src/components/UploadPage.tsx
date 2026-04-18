'use client';

import { ArrowLeft } from 'lucide-react';
import UploadZone from '@/components/UploadZone';
import GradientText from '@/components/ui/GradientText';
import Navbar from '@/components/landing/Navbar';

interface Props {
  onFile: (buf: ArrayBuffer, name: string) => void;
  onBack: () => void;
}

export default function UploadPage({ onFile, onBack }: Props) {
  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      <Navbar onGetStarted={onBack} />

      {/* Background glow */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          top: -200, left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 500,
          background: 'radial-gradient(ellipse at center,rgba(245,82,12,0.12) 0%,transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <main className="relative z-10 max-w-[600px] mx-auto px-6 pt-[80px] pb-20 flex flex-col items-center">
        {/* Back button */}
        <button
          onClick={onBack}
          className="self-start flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-full px-3.5 py-[7px] text-[12px] text-[#888888] cursor-pointer transition-all duration-150 mb-12 hover:text-white hover:border-white/[0.18]"
        >
          <ArrowLeft size={13} />
          Back to Tools
        </button>

        {/* Header */}
        <div className="text-center mb-10 w-full">
          <div className="inline-flex items-center gap-2 bg-[rgba(245,82,12,0.1)] border border-[rgba(245,82,12,0.2)] rounded-full px-3.5 py-[5px] mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F5520C]" />
            <span className="text-[11px] font-semibold text-[#F5520C] tracking-[0.06em] uppercase">Edit PDF</span>
          </div>

          <h1 className="text-[clamp(24px,4vw,36px)] font-medium text-white tracking-[-0.02em] leading-[1.1] mb-3">
            Upload your <GradientText>PDF</GradientText>
          </h1>
          <p className="text-[14px] text-[#9b9b9b] leading-[1.6]">
            Click any text to edit it. Your file never leaves your browser.
          </p>
        </div>

        {/* Upload zone */}
        <div className="w-full">
          <UploadZone onFile={onFile} />
        </div>
      </main>
    </div>
  );
}
