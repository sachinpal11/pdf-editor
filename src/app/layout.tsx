import type { Metadata } from 'next';
import './globals.css';
import { PdfProvider } from '@/context/PdfContext';

export const metadata: Metadata = {
  title: 'PDFEdit - Edit PDFs in your browser',
  description: 'Click any text to edit it. Download when done. No uploads, no accounts.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><PdfProvider>{children}</PdfProvider></body>
    </html>
  );
}
