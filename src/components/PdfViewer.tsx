'use client';

import { useRef } from 'react';
import { usePdfPage } from '@/hooks/usePdfPage';
import TextLayer from './TextLayer';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { EditsMap, TextEdit } from '@/types/pdf';
import type { FontOption } from '@/lib/fontOptions';

interface Props {
  pdf: PDFDocumentProxy;
  pageIndex: number;
  scale: number;
  edits: EditsMap;
  selectedFont: FontOption;
  onEdit: (key: string, edit: TextEdit) => void;
}

export default function PdfViewer({ pdf, pageIndex, scale, edits, selectedFont, onEdit }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { viewport } = usePdfPage(pdf, pageIndex, canvasRef, scale);

  return (
    <div
      className="relative shadow-2xl bg-white"
      style={{ width: viewport?.width ?? 'auto', height: viewport?.height ?? 'auto' }}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 block" />
      {viewport && (
        <TextLayer
          pdf={pdf}
          pageIndex={pageIndex}
          viewport={viewport}
          edits={edits}
          selectedFont={selectedFont}
          canvasRef={canvasRef}
          onEdit={onEdit}
        />
      )}
      {!viewport && (
        <div className="flex items-center justify-center w-full h-96">
          <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
