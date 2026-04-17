'use client';

import { useState, useCallback } from 'react';
import PdfViewer from '@/components/PdfViewer';
import Toolbar from '@/components/Toolbar';
import { usePdfDocument } from '@/hooks/usePdfDocument';
import { useEdits } from '@/hooks/useEdits';
import { exportPdf } from '@/lib/pdfExporter';
import { DEFAULT_FONT } from '@/lib/fontOptions';
import type { FontOption } from '@/lib/fontOptions';
import type { TextEdit } from '@/types/pdf';

interface Props {
  buffer: ArrayBuffer;
  filename: string;
  onClose: () => void;
}

export default function EditorPage({ buffer, filename, onClose }: Props) {
  const { pdf, numPages, loading, error } = usePdfDocument(buffer);
  const { edits, setEdit, clearEdits } = useEdits();
  const [pageIndex, setPageIndex] = useState(0);
  const [scale, setScale] = useState(1.25);
  const [downloading, setDownloading] = useState(false);
  const [selectedFont, setSelectedFont] = useState<FontOption>(DEFAULT_FONT);

  const handleEdit = useCallback((key: string, edit: TextEdit) => {
    setEdit(key, edit);
  }, [setEdit]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const bytes = await exportPdf(buffer, edits);
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename.replace(/\.pdf$/i, '') + '_edited.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const editCount = Array.from(edits.values()).filter(
    (e) => e.originalText !== e.newText,
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-[3px] border-[#F5520C] border-t-transparent rounded-full animate-spin" />
          <p className="text-[14px] text-[#666666] font-medium">Loading PDF…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center max-w-md px-6 bg-[#111111] border border-white/[0.07] rounded-2xl p-10">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-400 text-xl">✕</span>
          </div>
          <p className="text-white font-semibold text-[16px] mb-2">Failed to load PDF</p>
          <p className="text-[#555555] text-[13px] mb-6">{error}</p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-[13px] font-semibold text-white cursor-pointer transition-all duration-150 hover:-translate-y-px hover:shadow-[0_0_20px_rgba(245,82,12,0.4)]"
            style={{ background: 'linear-gradient(0deg,#F5520C 0%,#FF823E 100%)', border: '1.5px solid rgba(255,154,100,0.79)' }}
          >
            Try another file
          </button>
        </div>
      </div>
    );
  }

  if (!pdf) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <Toolbar
        filename={filename}
        pageIndex={pageIndex}
        numPages={numPages}
        scale={scale}
        editCount={editCount}
        selectedFont={selectedFont}
        onFontChange={setSelectedFont}
        onPagePrev={() => setPageIndex((p) => Math.max(0, p - 1))}
        onPageNext={() => setPageIndex((p) => Math.min(numPages - 1, p + 1))}
        onZoomIn={() => setScale((s) => Math.min(3, parseFloat((s + 0.25).toFixed(2))))}
        onZoomOut={() => setScale((s) => Math.max(0.5, parseFloat((s - 0.25).toFixed(2))))}
        onDownload={handleDownload}
        onClose={() => { clearEdits(); onClose(); }}
        downloading={downloading}
      />

      {/* PDF canvas area */}
      <div className="flex-1 overflow-auto p-8 bg-[#0A0A0A]">
        <div className="flex justify-center">
          <div className="shadow-[0_8px_60px_rgba(0,0,0,0.6)] rounded-lg overflow-hidden">
            <PdfViewer
              pdf={pdf}
              pageIndex={pageIndex}
              scale={scale}
              edits={edits}
              selectedFont={selectedFont}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>

      {/* Bottom hint bar */}
      <div className="sticky bottom-0 bg-[#111111] border-t border-white/[0.06] px-4 py-2 text-center">
        <span className="text-[11px] text-[#444444]">
          Click any text to edit · Font dropdown changes typeface ·{' '}
          <span className="text-[#F5520C]">Orange highlight</span> = edited text
        </span>
      </div>
    </div>
  );
}
