'use client';

import React, { useState } from 'react';

interface FeatureCardProps {
  children: React.ReactNode;
  className?: string;
  pattern?: 'matrix' | 'dots' | 'none';
  hoverEffect?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  children, 
  className = "", 
  pattern = 'none',
  hoverEffect = true
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Generate random matrix-style characters
  const matrixChars = Array.from({ length: 40 }).map(() => 
    Math.random() > 0.5 ? (Math.random() > 0.5 ? '1' : '0') : String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join(' ');

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-[24px] border border-white/[0.08] bg-[#111111]/80 backdrop-blur-md p-7 flex flex-col overflow-hidden transition-all duration-500 ease-out ${hoverEffect ? 'hover:border-[#FF5722]/40 hover:-translate-y-1' : ''} ${className}`}
    >
      {/* Dynamic Spotlight Glow */}
      {hoverEffect && (
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,87,34,0.08), transparent 80%)`,
          }}
        />
      )}

      {/* Ambient Corner Glows */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF5722]/5 blur-[60px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FF5722]/5 blur-[60px] pointer-events-none" />

      {/* Patterns */}
      {pattern === 'matrix' && (
        <div className="absolute inset-0 opacity-[0.03] font-mono text-[9px] text-white p-4 select-none pointer-events-none break-all leading-tight tracking-widest transition-opacity duration-500 group-hover:opacity-[0.05]">
          {matrixChars} {matrixChars} {matrixChars}
        </div>
      )}
      
      {pattern === 'dots' && (
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ 
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
      )}

      {/* Border Glow for Hover */}
      <div className="absolute inset-0 border border-white/0 rounded-[24px] transition-colors duration-500 group-hover:border-white/10 pointer-events-none" />

      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};
