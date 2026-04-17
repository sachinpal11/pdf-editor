'use client';

import { useRouter } from 'next/navigation';
import { usePdf } from '@/context/PdfContext';
import UploadPage from '@/components/UploadPage';

export default function Page() {
  const router = useRouter();
  const { setFile } = usePdf();

  return (
    <UploadPage
      onFile={(buf, name) => { setFile(buf, name); router.push('/editor'); }}
      onBack={() => router.push('/all-tools')}
    />
  );
}
