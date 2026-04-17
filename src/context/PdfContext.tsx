'use client';

import { createContext, useContext, useState } from 'react';

interface PdfState {
  buffer: ArrayBuffer | null;
  filename: string;
  setFile: (buf: ArrayBuffer, name: string) => void;
  clear: () => void;
}

const PdfContext = createContext<PdfState>(null!);

export function PdfProvider({ children }: { children: React.ReactNode }) {
  const [buffer, setBuffer] = useState<ArrayBuffer | null>(null);
  const [filename, setFilename] = useState('');

  return (
    <PdfContext.Provider value={{
      buffer,
      filename,
      setFile: (buf, name) => { setBuffer(buf); setFilename(name); },
      clear: () => { setBuffer(null); setFilename(''); },
    }}>
      {children}
    </PdfContext.Provider>
  );
}

export const usePdf = () => useContext(PdfContext);
