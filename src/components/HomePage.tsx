'use client';

import Navbar from './landing/Navbar';
import HeroBadge from './landing/HeroBadge';
import HeroHeadline from './landing/HeroHeadline';
import HeroSubheadline from './landing/HeroSubheadline';
import CTAButtons from './landing/CTAButtons';
import DashboardCards from './landing/DashboardCards';
import FeaturesStrip from './landing/FeaturesStrip';
import FeaturesSection from './landing/FeaturesSection';
import ToolsSection from './landing/ToolsSection';
import PricingSection from './landing/PricingSection';
import Footer from './landing/Footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  onUpload?: () => void;
}

export default function HomePage({ onUpload }: Props) {
  const router = useRouter();

  const handleGetStarted = () => {
    if (onUpload) {
      onUpload();
    } else {
      router.push('/all-tools');
    }
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white overflow-x-hidden">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[999] focus:p-4 focus:bg-white focus:text-black">Skip to main content</a>
      <Navbar onGetStarted={handleGetStarted} />

      <main id="main-content">
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
          <CTAButtons onGetStarted={handleGetStarted} />
          <div className="relative mt-24 max-w-[1000px] mx-auto">
            <div className="relative sm:scale-100 scale-140 sm:mt-0 mt-25 overflow-hidden rounded-xl">
              <Image
                src={"/images/onthegopdf1.webp"}
                alt="OnTheGo PDF editor dashboard showing PDF editing interface with tools for editing, merging, and converting documents"
                width={1000}
                height={600}
                priority
                className="w-full h-auto"
              />
              {/* Solid bottom fade to background color */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>


      <ToolsSection
        onViewAll={() => router.push('/all-tools')}
        onToolClick={(title) => {
          if (title === 'Edit PDF') {
            handleGetStarted();
          } else if (title === 'Merge PDF') {
            router.push('/merge');
          } else if (title === 'Split PDF') {
            router.push('/split');
          } else {
            router.push('/all-tools');
          }
        }}
      />

      {/* <FeaturesSection /> */}
      <PricingSection />

      <Footer />
      </main>
    </div>
  );
}
