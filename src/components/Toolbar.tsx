'use client';

import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, Download, FileText, Type, Loader2 } from 'lucide-react';
import { FONT_OPTIONS, DEFAULT_FONT } from '@/lib/fontOptions';
import type { FontOption } from '@/lib/fontOptions';

interface Props {
  filename: string;
  pageIndex: number;
  numPages: number;
  scale: number;
  editCount: number;
  selectedFont: FontOption;
  onFontChange: (font: FontOption) => void;
  onPagePrev: () => void;
  onPageNext: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDownload: () => void;
  onClose: () => void;
  downloading: boolean;
}

function Divider() {
  return <div className="h-5 w-px bg-white/[0.08] mx-1" />;
}

function IconBtn({ onClick, disabled, title, children }: { onClick: () => void; disabled?: boolean; title?: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-white/[0.07] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
    >
      {children}
    </button>
  );
}

export default function Toolbar({
  filename, pageIndex, numPages, scale, editCount,
  selectedFont, onFontChange, onPagePrev, onPageNext,
  onZoomIn, onZoomOut, onDownload, onClose, downloading,
}: Props) {
  return (
    <div className="sticky top-0 z-50 flex items-center gap-2 px-4 py-2.5 flex-wrap bg-[#111111] border-b border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">

      {/* Close */}
      <IconBtn onClick={onClose} title="Back to tools">
        <X className="w-4 h-4" />
      </IconBtn>

      {/* Filename */}
      <div className="flex items-center gap-2 text-sm min-w-0">
        <FileText className="w-4 h-4 shrink-0 text-[#F5520C]" />
        <span className="truncate max-w-[160px] text-[13px] font-medium text-white">{filename}</span>
      </div>

      <Divider />

      {/* Page navigation */}
      <div className="flex items-center gap-1">
        <IconBtn onClick={onPagePrev} disabled={pageIndex === 0}>
          <ChevronLeft className="w-4 h-4" />
        </IconBtn>
        <span className="text-[12px] text-[#666666] px-2 tabular-nums">
          <span className="text-white">{pageIndex + 1}</span> / {numPages}
        </span>
        <IconBtn onClick={onPageNext} disabled={pageIndex >= numPages - 1}>
          <ChevronRight className="w-4 h-4" />
        </IconBtn>
      </div>

      <Divider />

      {/* Zoom */}
      <div className="flex items-center gap-1">
        <IconBtn onClick={onZoomOut} disabled={scale <= 0.5}>
          <ZoomOut className="w-4 h-4" />
        </IconBtn>
        <span className="text-[12px] text-[#666666] px-2 tabular-nums w-12 text-center">
          {Math.round(scale * 100)}%
        </span>
        <IconBtn onClick={onZoomIn} disabled={scale >= 3}>
          <ZoomIn className="w-4 h-4" />
        </IconBtn>
      </div>

      <Divider />

      {/* Font selector */}
      <div className="flex items-center gap-2">
        <Type className="w-4 h-4 text-[#555555] shrink-0" />
        <select
          value={selectedFont.css}
          onChange={(e) => {
            const found = FONT_OPTIONS.find((f) => f.css === e.target.value) ?? DEFAULT_FONT;
            onFontChange(found);
          }}
          className="bg-[#1A1A1A] text-white text-[12px] rounded-lg px-2.5 py-1.5 border border-white/[0.08] focus:outline-none focus:border-[rgba(245,82,12,0.5)] cursor-pointer hover:bg-[#222222] transition-colors"
          style={{ fontFamily: selectedFont.css }}
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.css + f.label} value={f.css} style={{ fontFamily: f.css }}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3">
        {editCount > 0 && (
          <span className="text-[11px] bg-[rgba(245,82,12,0.12)] text-[#F5520C] border border-[rgba(245,82,12,0.2)] px-2.5 py-1 rounded-full tabular-nums">
            {editCount} edit{editCount !== 1 ? 's' : ''}
          </span>
        )}
        <button
          onClick={onDownload}
          disabled={downloading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white cursor-pointer transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(245,82,12,0.4)] hover:-translate-y-px active:scale-95"
          style={{ background: 'linear-gradient(0deg,#F5520C 0%,#FF823E 100%)', border: '1.5px solid rgba(255,154,100,0.79)' }}
        >
          {downloading
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <Download className="w-4 h-4" />
          }
          {downloading ? 'Exporting…' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
}
