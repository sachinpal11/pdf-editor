'use client';

import UploadZone from '@/components/UploadZone';
import { Shield, Zap, FileEdit } from 'lucide-react';

interface Props {
  onFile: (buf: ArrayBuffer, name: string) => void;
}

export default function HomePage({ onFile }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50/30 flex flex-col">
      <header className="px-6 py-5 flex items-center gap-3">
        <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
          <FileEdit className="w-4 h-4 text-black" />
        </div>
        <span className="font-bold text-gray-900 text-lg tracking-tight">PDFEdit</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Edit PDFs in your browser
            </h1>
            <p className="text-gray-500 text-lg">
              Click any text to edit it. Download when done. No uploads, no accounts.
            </p>
          </div>

          <UploadZone onFile={onFile} />

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 mx-auto bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs font-medium text-gray-700">100% Private</p>
              <p className="text-xs text-gray-400">File never leaves your device</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 mx-auto bg-amber-100 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-xs font-medium text-gray-700">Instant Editing</p>
              <p className="text-xs text-gray-400">No wait, no processing</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 mx-auto bg-blue-100 rounded-xl flex items-center justify-center">
                <FileEdit className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-xs font-medium text-gray-700">Font Preserved</p>
              <p className="text-xs text-gray-400">Keeps original look & feel</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-xs text-gray-400">
        Works entirely in your browser — no server, no storage, no tracking.
      </footer>
    </div>
  );
}
