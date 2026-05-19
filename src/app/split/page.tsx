'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import SplitTool from '@/components/split/SplitTool';
import GradientText from '@/components/ui/GradientText';

export default function SplitPage() {
  const router = useRouter();

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white flex flex-col justify-between">
      <Navbar onGetStarted={() => router.push('/all-tools')} />

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

      <main className="relative z-10 flex-grow max-w-[1000px] mx-auto w-full px-6 pt-[120px] pb-24 flex flex-col items-center">
        {/* Back button */}
        <button
          onClick={() => router.push('/all-tools')}
          className="self-start flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-full px-3.5 py-[7px] text-[12px] text-[#888888] cursor-pointer transition-all duration-150 mb-10 hover:text-white hover:border-white/[0.18]"
        >
          <ArrowLeft size={13} />
          Back to Tools
        </button>

        {/* Header */}
        <div className="text-center mb-10 w-full">
          <div className="inline-flex items-center gap-2 bg-[rgba(245,82,12,0.1)] border border-[rgba(245,82,12,0.2)] rounded-full px-3.5 py-[5px] mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F5520C]" />
            <span className="text-[11px] font-semibold text-[#F5520C] tracking-[0.06em] uppercase">Split PDF</span>
          </div>

          <h1 className="text-[clamp(24px,4vw,36px)] font-medium text-white tracking-[-0.02em] leading-[1.1] mb-3">
            Split <GradientText>PDF Files</GradientText>
          </h1>
          <p className="text-[14px] text-[#9b9b9b] leading-[1.6]">
            Extract specific pages from a PDF document in your browser. Fast, secure, and no installation required.
          </p>
        </div>

        <div className="w-full">
          <SplitTool />
        </div>
      </main>

      <Footer />
    </div>
  );
}
