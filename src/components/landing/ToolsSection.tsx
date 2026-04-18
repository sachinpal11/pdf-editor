import React from 'react';
import { FileEdit, FilePlus, FileSearch, FileOutput, FileLock, FileSignature, ArrowRight } from 'lucide-react';
import LandingToolCard from './LandingToolCard';
import GradientText from '../ui/GradientText';

const tools = [
  {
    icon: FileEdit,
    title: 'Edit PDF',
    description: 'Edit text and images directly in your PDF documents without leaving the browser.'
  },
  {
    icon: FilePlus,
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one neatly organized document in seconds.'
  },
  {
    icon: FileSearch,
    title: 'Compress PDF',
    description: 'Reduce file size while maintaining the highest possible quality for easy sharing.'
  },
  {
    icon: FileOutput,
    title: 'PDF to Word',
    description: 'Convert any PDF file into an editable Microsoft Word document with precision.'
  },
  {
    icon: FileLock,
    title: 'Protect PDF',
    description: 'Secure your documents with industrial-grade encryption and password protection.'
  },
  {
    icon: FileSignature,
    title: 'Sign PDF',
    description: 'Add your digital signature or hand-drawn signature to documents legally and securely.'
  }
];

interface ToolsSectionProps {
  onViewAll: () => void;
  onToolClick: (toolTitle: string) => void;
}

const ToolsSection: React.FC<ToolsSectionProps> = ({ onViewAll, onToolClick }) => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto w-full relative z-10">
      <div className="text-center mb-16">


        <h2 className="text-[clamp(32px,4vw,48px)] font-medium text-white tracking-tight">
          Tools We <GradientText>Provide</GradientText>
        </h2>

        <p className="text-[16px] text-[#888888] max-w-[600px] mx-auto leading-relaxed">
          Everything you need to manage your PDF documents in one place. Fast, secure, and completely free to use.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {tools.map((tool, index) => (
          <LandingToolCard
            key={index}
            icon={tool.icon}
            title={tool.title}
            description={tool.description}
            onClick={() => onToolClick(tool.title)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onViewAll}
          className="group flex items-center gap-2 px-8 py-3.5 rounded-xl text-[15px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(0deg,#F5520C 0%,#FF823E 100%)',
            border: '1.5px solid rgba(255,154,100,0.79)',
            boxShadow: '0 0 20px rgba(245,82,12,0.3)'
          }}
        >
          View All Tools
          <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

export default ToolsSection;
