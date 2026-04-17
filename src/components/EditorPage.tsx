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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Loading PDF…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <p className="text-red-600 font-semibold text-lg mb-2">Failed to load PDF</p>
          <p className="text-gray-500 text-sm mb-6">{error}</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Try another file
          </button>
        </div>
      </div>
    );
  }

  if (!pdf) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
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

      <div className="flex-1 overflow-auto p-8">
        <div className="flex justify-center">
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

      <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-4 py-2 text-xs text-gray-400 text-center">
        Click any text to edit it. Use the font dropdown to change the typeface. Changes highlighted in amber.
      </div>
    </div>
  );
}
