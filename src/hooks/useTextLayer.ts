'use client';

import { useState, useEffect } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { extractTextItems } from '@/lib/textExtractor';
import type { TextItem } from '@/types/pdf';

export function useTextLayer(
  pdf: PDFDocumentProxy | null,
  pageIndex: number,
  viewport: { height: number; scale: number } | null,
) {
  const [items, setItems] = useState<TextItem[]>([]);

  useEffect(() => {
    if (!pdf || !viewport) return;

    let cancelled = false;

    pdf.getPage(pageIndex + 1).then((page) => {
      page.getTextContent().then((textContent) => {
        if (cancelled) return;
        const resolved = extractTextItems(
          textContent as { items: unknown[] },
          viewport,
        );
        setItems(resolved);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [pdf, pageIndex, viewport]);

  return { items };
}
