'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="bg-[#0A0A0A]  text-white overflow-x-hidden flex flex-col">
      <Navbar onGetStarted={() => router.push('/all-tools')} />

      <main className="flex-grow flex h-[100vh] flex-col items-center justify-center relative px-5 pt-20">
        {/* Background glow */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            height: 600,
            background: 'radial-gradient(ellipse at center, rgba(255,90,20,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* 404 Watermark */}
        <div
          className="absolute pointer-events-none z-0 select-none opacity-[0.03] font-black tracking-tighter"
          style={{ fontSize: 'clamp(150px, 40vw, 500px)' }}
        >
          404
        </div>

        <div className="relative z-10 text-center max-w-[600px] animate-fade-up">


          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            Oops! Page not found.
          </h1>

          <p className="text-[#9A9A9A] text-lg md:text-xl mb-10 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track to editing your PDFs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto rounded-xl text-[15px] font-medium text-white cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(245,82,12,0.6),0_4px_10px_rgba(0,0,0,0.2)] px-8 py-3.5 border-[1.5px] border-[rgba(255,154,100,0.79)]"
              style={{ background: 'linear-gradient(0deg,#F5520C 0%,#FF823E 100%)' }}
            >
              Back to Home
            </Link>

            <button
              onClick={() => router.push('/all-tools')}
              className="w-full sm:w-auto rounded-xl text-[15px] font-medium text-white cursor-pointer transition-all duration-150 hover:bg-white/10 px-8 py-3.5 border border-white/10 bg-white/5"
            >
              Explore Tools
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
