'use client';

import { useRouter } from 'next/navigation';
import Navbar from './landing/Navbar';
import ToolsHeader from './all-tools/ToolsHeader';
import ToolsGrid from './all-tools/ToolsGrid';
import Footer from './landing/Footer';

export default function AllToolsPage() {
  const router = useRouter();

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      <Navbar onGetStarted={() => router.push('/all-tools')} />
      <main className="max-w-[960px] mx-auto px-6 pt-[120px] pb-20">
        <ToolsHeader />
        <ToolsGrid />
      </main>
      <Footer />
    </div>
  );
}
