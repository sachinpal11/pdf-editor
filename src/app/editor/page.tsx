'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePdf } from '@/context/PdfContext';
import EditorPage from '@/components/EditorPage';

export default function Page() {
  const router = useRouter();
  const { buffer, filename, clear } = usePdf();

  useEffect(() => {
    if (!buffer) router.replace('/all-tools');
  }, [buffer, router]);

  if (!buffer) return null;

  return (
    <EditorPage
      buffer={buffer}
      filename={filename}
      onClose={() => { clear(); router.push('/all-tools'); }}
    />
  );
}
