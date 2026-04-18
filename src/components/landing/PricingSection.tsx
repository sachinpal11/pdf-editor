import React from 'react';
import PricingCard from './PricingCard';
import GradientText from '../ui/GradientText';

const PricingSection: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto w-full relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-[clamp(36px,5vw,56px)] font-medium text-white tracking-tight">
          Simple, Transparent <GradientText>Pricing</GradientText>
        </h2>
        <p className="text-[17px] text-[#888888] max-w-[600px] mx-auto leading-relaxed">
          We believe in keeping tools accessible. Our core features are free, and they always will be.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left Card - Blurred */}
        <PricingCard
          title="Basic"
          price="$9"
          features={[]}
          isBlurred={true}
        />

        {/* Middle Card - Active/Free */}
        <PricingCard
          title="Free Forever"
          price="Free"
          isActive={true}
          features={[
            'Unlimited PDF edits',
            'No login required',
            'Private & Secure (Browser-only)',
            'Unlimited file conversions',
            'High-speed processing',
            'Community support'
          ]}
        />

        {/* Right Card - Blurred */}
        <PricingCard
          title="Pro"
          price="$29"
          features={[]}
          isBlurred={true}
        />
      </div>
    </section>
  );
};

export default PricingSection;
