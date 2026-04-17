'use client';

import Navbar from './landing/Navbar';
import HeroBadge from './landing/HeroBadge';
import HeroHeadline from './landing/HeroHeadline';
import HeroSubheadline from './landing/HeroSubheadline';
import CTAButtons from './landing/CTAButtons';
import SocialProof from './landing/SocialProof';
import DashboardCards from './landing/DashboardCards';
import FeaturesStrip from './landing/FeaturesStrip';

interface Props {
  onUpload: () => void;
}

export default function HomePage({ onUpload }: Props) {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', fontFamily: "'Nimbus Sans Thai', sans-serif", color: '#FFFFFF', overflowX: 'hidden' }}>
      <Navbar onGetStarted={onUpload} />

      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 100, position: 'relative', overflow: 'hidden' }}>
        {/* Background glows */}
        {/* <div
          className="animate-glow-pulse"
          style={{
            position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)',
            width: 900, height: 700, pointerEvents: 'none', zIndex: 0,
            background: 'radial-gradient(ellipse at center, rgba(245,82,12,0.28) 0%, transparent 50%)',
          }}
        /> */}
        <div
          style={{
            position: 'absolute', top: -400, left: '50%', transform: 'translateX(-50%)',
            width: 1000, height: 900, pointerEvents: 'none', zIndex: 0,
            background: 'radial-gradient(ellipse at center, rgba(255, 90, 20, 0.32) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 780, width: '100%', textAlign: 'center', padding: '0 20px' }}>
          <HeroBadge />
          <HeroHeadline />
          <HeroSubheadline />
          <CTAButtons onGetStarted={onUpload} />
          {/* <SocialProof /> */}
          <DashboardCards />
        </div>
      </section>

      <FeaturesStrip />
    </div>
  );
}
