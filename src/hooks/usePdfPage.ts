'use client';

import { useState, useEffect, RefObject } from 'react';
import type { PDFDocumentProxy, PageViewport } from 'pdfjs-dist';

export function usePdfPage(
  pdf: PDFDocumentProxy | null,
  pageIndex: number,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  scale: number,
) {
  const [viewport, setViewport] = useState<PageViewport | null>(null);

  useEffect(() => {
    if (!pdf || !canvasRef.current) return;

    let cancelled = false;

    pdf.getPage(pageIndex + 1).then((page) => {
      if (cancelled) return;
      const vp = page.getViewport({ scale });
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = vp.width;
      canvas.height = vp.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      page.render({ canvasContext: ctx, viewport: vp }).promise.then(() => {
        if (!cancelled) setViewport(vp);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [pdf, pageIndex, scale]);

  return { viewport };
}
