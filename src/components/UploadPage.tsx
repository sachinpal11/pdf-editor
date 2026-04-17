'use client';

import UploadZone from '@/components/UploadZone';
import { FileEdit, ArrowLeft } from 'lucide-react';

interface Props {
  onFile: (buf: ArrayBuffer, name: string) => void;
  onBack: () => void;
}

export default function UploadPage({ onFile, onBack }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50/30 flex flex-col">
      <header className="px-6 py-5 flex items-center gap-3">
        <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
          <FileEdit className="w-4 h-4 text-black" />
        </div>
        <span className="font-bold text-gray-900 text-lg tracking-tight">PDFEdit</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Upload your PDF</h2>
            <p className="text-gray-500 text-sm">Your file never leaves your browser</p>
          </div>
          <UploadZone onFile={onFile} />
        </div>
      </main>
    </div>
  );
}
