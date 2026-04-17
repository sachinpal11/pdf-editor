'use client';

import Navbar from './landing/Navbar';
import HeroBadge from './landing/HeroBadge';
import HeroHeadline from './landing/HeroHeadline';
import HeroSubheadline from './landing/HeroSubheadline';
import CTAButtons from './landing/CTAButtons';
import DashboardCards from './landing/DashboardCards';
import FeaturesStrip from './landing/FeaturesStrip';
import Footer from './landing/Footer';

interface Props {
  onUpload: () => void;
}

export default function HomePage({ onUpload }: Props) {
  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white overflow-x-hidden">
      <Navbar onGetStarted={onUpload} />

      <section className="min-h-screen flex flex-col items-center justify-center pt-24 relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: -400, left: '50%', transform: 'translateX(-50%)',
            width: 1000, height: 900,
            background: 'radial-gradient(ellipse at center,rgba(255,90,20,0.32) 0%,transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-[780px] w-full text-center px-5">
          <HeroBadge />
          <HeroHeadline />
          <HeroSubheadline />
          <CTAButtons onGetStarted={onUpload} />
          <DashboardCards />
        </div>
      </section>

      <FeaturesStrip />
      <Footer />
    </div>
  );
}
