'use client';

import { useRef, useState } from 'react';
import { Upload, FileText } from 'lucide-react';

interface Props {
  onFile: (buf: ArrayBuffer, name: string) => void;
}

export default function UploadZone({ onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file: File) => {
    if (file.type === 'application/pdf') {
      const buf = await file.arrayBuffer();
      onFile(buf, file.name);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onClick={() => inputRef.current?.click()}
      className={`
        border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer
        transition-all duration-200 select-none
        ${dragging
          ? 'border-amber-400 bg-amber-50 scale-[1.02]'
          : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50/50'
        }
      `}
    >
      <div className="flex flex-col items-center gap-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${dragging ? 'bg-amber-100' : 'bg-gray-100'}`}>
          {dragging ? (
            <FileText className="w-8 h-8 text-amber-500" />
          ) : (
            <Upload className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <div>
          <p className="text-lg font-medium text-gray-700">
            {dragging ? 'Drop your PDF here' : 'Drop a PDF file here'}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            or{' '}
            <span className="text-amber-500 font-medium underline underline-offset-2">
              browse to upload
            </span>
          </p>
        </div>
        <p className="text-xs text-gray-400">Your file never leaves the browser</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
