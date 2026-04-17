'use client';

import { useRouter } from 'next/navigation';
import HomePage from '@/components/HomePage';

export default function Page() {
  const router = useRouter();
  return <HomePage onUpload={() => router.push('/all-tools')} />;
}
