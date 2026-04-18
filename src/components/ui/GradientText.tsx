import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const GradientText: React.FC<GradientTextProps> = ({ children, className = "", style = {} }) => {
  return (
    <span
      className={className}
      style={{
        background: 'linear-gradient(0deg, #F5520C 0%, #FF823E 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
        ...style
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;
