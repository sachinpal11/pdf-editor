import HomePage from '@/components/HomePage';
import Script from 'next/script';

export const metadata = {
  applicationName: 'On The Go PDF',
  title: 'On The Go PDF - Free Online PDF Editor | Edit PDF Instantly',
  description:
    'On The Go PDF lets you edit PDF files online for free. Add text, images, draw, annotate, and sign your PDFs in seconds. No installation or signup needed.',
  alternates: {
    canonical: 'https://onthegopdf.vercel.app/',
  },
  openGraph: {
    title: 'On The Go PDF - Free Online PDF Editor',
    description:
      'Edit PDF files online for free. Add text, images, draw, and annotate PDFs instantly. No signup required.',
    url: 'https://onthegopdf.vercel.app/',
    siteName: 'On The Go PDF',
  },
};



export default function Page() {

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is On The Go PDF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'On The Go PDF is a free online PDF tool that lets you edit PDF files directly in your browser. You can add text, images, draw, annotate, and sign PDFs without installing any software.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is On The Go PDF free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, On The Go PDF is completely free. You can edit PDF files online at no cost with no signup or account required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to create an account to use On The Go PDF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No account or signup is needed. Simply visit On The Go PDF, upload your PDF, and start editing immediately.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it safe to upload my PDF to On The Go PDF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Your files are processed securely and are not stored permanently on our servers. We use encryption to protect your documents.',
        },
      },
    ],
  };

  // SoftwareApp schema — shows star ratings in search results
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'On The Go PDF',
    operatingSystem: 'Web Browser',
    applicationCategory: 'UtilitiesApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '312',
      bestRating: '5',
      worstRating: '1',
    },
    description:
      'Free online PDF editor. Edit PDF files in your browser — add text, images, draw, annotate, and sign PDFs.',
    url: 'https://onthegopdf.vercel.app/',
  };

  return <>
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
    <Script
      id="software-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
    />
    <HomePage />
  </>;
}
