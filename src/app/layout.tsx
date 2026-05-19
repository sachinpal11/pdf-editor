import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PdfProvider } from '@/context/PdfContext';
import { Analytics } from "@vercel/analytics/next"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
};

export const metadata = {
  metadataBase: new URL('https://onthegopdf.vercel.app'),
  title: {
    default: 'On The Go PDF - Free Online PDF Editor & PDF Tools',
    template: '%s | On The Go PDF',
  },
  description:
    'On The Go PDF is a free online PDF editor. Edit PDF files instantly — add text, images, draw, annotate, and sign PDFs. No installation, no signup required.',
  applicationName: 'On The Go PDF',
  appleWebApp: {
    title: 'On The Go PDF',
  },
  keywords: [
    'On The Go PDF',
    'On The Go PDF editor',
    'On The Go PDF tools',
    'On The Go PDF converter',
    'onthegopdf',
    'free PDF editor',
    'online PDF editor',
    'edit PDF online',
    'edit PDF free',
    'PDF tools online',
    'PDF editor no signup',
    'merge PDF online free',
    'compress PDF online',
    'sign PDF free online',
    'annotate PDF online',
    'add text to PDF free',
    'edit PDF in browser',
    'no installation PDF editor',
    'best free PDF tools',
  ],
  authors: [{ name: 'On The Go PDF', url: 'https://onthegopdf.vercel.app' }],
  creator: 'On The Go PDF',
  publisher: 'On The Go PDF',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://onthegopdf.vercel.app',
    siteName: 'On The Go PDF',
    title: 'On The Go PDF - Free Online PDF Editor',
    description:
      'Edit PDF files online for free. Add text, images, draw, and annotate PDFs instantly with On The Go PDF.',
    images: [
      {
        url: '/og-image.png', // create a 1200x630 branded image
        width: 1200,
        height: 630,
        alt: 'On The Go PDF - Free Online PDF Editor',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'On The Go PDF - Free Online PDF Editor',
    description:
      'Edit PDF files online for free. No installation or signup needed.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://onthegopdf.vercel.app',
  },

  // Add these after verifying in Google/Bing
  // verification: {
  //   google: 'YOUR_CODE_HERE',
  //   yandex: 'YOUR_CODE_HERE',
  // },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Brand identity schema — tells Google who you are
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'On The Go PDF',
    alternateName: 'OnTheGoPDF',
    url: 'https://onthegopdf.vercel.app',
    logo: 'https://onthegopdf.vercel.app/logo.png',
    description:
      'On The Go PDF provides free online PDF tools including a PDF editor, available in your browser without installation.',
    // Add your real social links here
    sameAs: [
      'https://twitter.com/onthegopdf',
      'https://facebook.com/onthegopdf',
    ],
  };

  // Tells Google this is a searchable website
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'On The Go PDF',
    alternateName: 'OnTheGoPDF',
    url: 'https://onthegopdf.vercel.app',
    description:
      'Free online PDF editor and PDF tools. Edit, annotate, and manage PDFs in your browser.',
  };



  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="RPZ_QtajeThtNhEraHKv7n-egeQEvsmZxbcW5gDJY8I" />
        <meta name="application-name" content="On The Go PDF" />
        <meta name="apple-mobile-web-app-title" content="On The Go PDF" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Analytics />
        <PdfProvider>{children}</PdfProvider></body>
    </html>
  );
}

