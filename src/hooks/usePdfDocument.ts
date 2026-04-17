'use client';

import { useState, useEffect } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';

async function getPdfjsLib() {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
  return pdfjsLib;
}

export function usePdfDocument(buffer: ArrayBuffer | null) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!buffer) {
      setPdf(null);
      setNumPages(0);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    getPdfjsLib()
      .then((lib) => {
        const copy = buffer.slice(0);
        return lib.getDocument({ data: copy }).promise;
      })
      .then((doc) => {
        if (cancelled) return;
        setPdf(doc);
        setNumPages(doc.numPages);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message ?? 'Failed to load PDF');
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [buffer]);

  return { pdf, numPages, loading, error };
}
