'use client';

import React, { useRef } from 'react';
import { usePdfPage } from '@/hooks/usePdfPage';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { Check } from 'lucide-react';

interface PageThumbnailProps {
  pdf: PDFDocumentProxy;
  pageIndex: number;
  selected: boolean;
  onClick: () => void;
}

export const PageThumbnail: React.FC<PageThumbnailProps> = ({
  pdf,
  pageIndex,
  selected,
  onClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Scale 0.35 renders a high-quality thumbnail (roughly 200px width)
  const { viewport } = usePdfPage(pdf, pageIndex, canvasRef, 0.35);

  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col items-center p-4 rounded-2xl border cursor-pointer select-none transition-all duration-200 ${
        selected
          ? 'border-[#F5520C] bg-[#121212] shadow-[0_0_20px_rgba(245,82,12,0.2)] scale-[1.02]'
          : 'border-white/[0.08] hover:border-white/[0.2] bg-[#0D0D0D] hover:bg-[#111111] hover:scale-[1.01]'
      }`}
    >
      {/* Thumbnail Canvas Area */}
      <div className="relative w-full aspect-[3/4] flex items-center justify-center bg-[#070707] rounded-xl overflow-hidden border border-white/[0.04]">
        <canvas ref={canvasRef} className="block max-w-full max-h-full transition-transform duration-300 group-hover:scale-[1.03]" />
        
        {/* Selection Checkbox Overlay */}
        <div
          className={`absolute top-3 right-3 w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200 border ${
            selected
              ? 'bg-[#F5520C] border-[#F5520C] text-white opacity-100 scale-100'
              : 'bg-black/60 border-white/20 text-transparent opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
          }`}
        >
          <Check size={14} className="stroke-[3.5px]" />
        </div>

        {/* Glow overlay */}
        {selected && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5520C]/10 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Page Number Label */}
      <span className={`text-xs mt-4 font-semibold transition-colors ${
        selected ? 'text-[#F5520C]' : 'text-[#888888] group-hover:text-white'
      }`}>
        Page {pageIndex + 1}
      </span>
    </div>
  );
};
