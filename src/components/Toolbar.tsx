'use client';

import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, Download, FileText, Type } from 'lucide-react';
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

export default function Toolbar({
  filename,
  pageIndex,
  numPages,
  scale,
  editCount,
  selectedFont,
  onFontChange,
  onPagePrev,
  onPageNext,
  onZoomIn,
  onZoomOut,
  onDownload,
  onClose,
  downloading,
}: Props) {
  return (
    <div className="sticky top-0 z-50 flex items-center gap-2 px-4 py-3 bg-gray-900 text-white shadow-lg flex-wrap">
      <button
        onClick={onClose}
        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        title="Close"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-2 text-sm text-gray-300 min-w-0">
        <FileText className="w-4 h-4 flex-shrink-0 text-amber-400" />
        <span className="truncate max-w-40 text-white font-medium">{filename}</span>
      </div>

      <div className="h-5 w-px bg-gray-600 mx-1" />

      <div className="flex items-center gap-1">
        <button
          onClick={onPagePrev}
          disabled={pageIndex === 0}
          className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm text-gray-300 px-2 tabular-nums">
          {pageIndex + 1} / {numPages}
        </span>
        <button
          onClick={onPageNext}
          disabled={pageIndex >= numPages - 1}
          className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="h-5 w-px bg-gray-600 mx-1" />

      <div className="flex items-center gap-1">
        <button
          onClick={onZoomOut}
          disabled={scale <= 0.5}
          className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-40 transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-sm text-gray-300 px-2 tabular-nums w-14 text-center">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={onZoomIn}
          disabled={scale >= 3}
          className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-40 transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>

      <div className="h-5 w-px bg-gray-600 mx-1" />

      <div className="flex items-center gap-2">
        <Type className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <select
          value={selectedFont.css}
          onChange={(e) => {
            const found = FONT_OPTIONS.find((f) => f.css === e.target.value) ?? DEFAULT_FONT;
            onFontChange(found);
          }}
          className="bg-gray-800 text-white text-sm rounded-lg px-2 py-1.5 border border-gray-600 focus:outline-none focus:border-amber-400 cursor-pointer hover:bg-gray-700 transition-colors"
          style={{ fontFamily: selectedFont.css }}
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.css + f.label} value={f.css} style={{ fontFamily: f.css }}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {editCount > 0 && (
          <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full">
            {editCount} edit{editCount !== 1 ? 's' : ''}
          </span>
        )}
        <button
          onClick={onDownload}
          disabled={downloading}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg text-sm transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {downloading ? (
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {downloading ? 'Exporting…' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
}
