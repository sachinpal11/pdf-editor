import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PdfProvider } from '@/context/PdfContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://onthegopdf.com'),
  title: 'OnTheGo PDF - Convert & Edit PDF, Anywhere, Instantly.',
  description: 'The fastest free online PDF editor. Edit text, merge, compress, convert and sign PDFs directly in your browser. No login, no uploads, no friction.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'OnTheGo PDF - Convert & Edit PDF, Anywhere, Instantly.',
    description: 'The fastest free online PDF editor. Edit, merge, compress, convert and sign PDFs in your browser.',
    url: 'https://onthegopdf.com',
    siteName: 'OnTheGo PDF',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OnTheGo PDF - Convert & Edit PDF, Anywhere, Instantly.',
    description: 'The fastest free online PDF editor. Edit, merge, compress, convert and sign PDFs in your browser.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><PdfProvider>{children}</PdfProvider></body>
    </html>
  );
}

