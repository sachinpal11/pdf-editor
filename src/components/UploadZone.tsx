'use client';

import { useRef, useState } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';

interface Props {
  onFile: (buf: ArrayBuffer, name: string) => void;
}

export default function UploadZone({ onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File) => {
    if (file.type === 'application/pdf') {
      setLoading(true);
      try {
        const buf = await file.arrayBuffer();
        onFile(buf, file.name);
      } catch (error) {
        setLoading(false);
        console.error('Error reading file:', error);
      }
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (loading) return;
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); if (!loading) setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onClick={() => !loading && inputRef.current?.click()}
      className={`transition-all duration-200 select-none rounded-[20px] py-16 px-8 text-center border-2 border-dashed
        ${loading ? 'cursor-wait border-[rgba(245,82,12,0.3)] bg-[rgba(245,82,12,0.02)]' : 'cursor-pointer'}
        ${dragging && !loading
          ? 'border-[#F5520C] bg-[rgba(245,82,12,0.06)] scale-[1.02] shadow-[0_0_40px_rgba(245,82,12,0.12)]'
          : !loading ? 'border-white/[0.12] bg-white/[0.02] hover:border-[rgba(245,82,12,0.5)] hover:bg-[rgba(245,82,12,0.04)]' : ''
        }`}
    >
      <div className="flex flex-col items-center gap-5">
        {/* Icon / Spinner */}
        <div
          className={`w-[72px] h-[72px] rounded-full flex items-center justify-center transition-all duration-200
            ${loading ? 'bg-[rgba(245,82,12,0.1)] border border-[rgba(245,82,12,0.2)]' : 
              dragging ? 'bg-[rgba(245,82,12,0.15)] border border-[rgba(245,82,12,0.4)]' : 'bg-white/[0.05] border border-white/[0.08]'}`}
        >
          {loading ? (
            <Loader2 size={30} color="#F5520C" className="animate-spin" />
          ) : dragging ? (
            <FileText size={30} color="#F5520C" />
          ) : (
            <Upload size={30} color="#555555" />
          )}
        </div>

        {/* Text */}
        <div>
          <p className={`text-[17px] font-semibold mb-2 ${loading || dragging ? 'text-white' : 'text-[#CCCCCC]'}`}>
            {loading ? 'Processing your PDF...' : dragging ? 'Drop your PDF here' : 'Drop a PDF file here'}
          </p>
          {!loading && (
            <p className="text-[13px] text-[#555555]">
              or <span className="text-[#F5520C] font-medium">browse to upload</span>
            </p>
          )}
          {loading && (
            <p className="text-[13px] text-[#555555]">
              This will only take a moment
            </p>
          )}
        </div>

        {/* Format badge */}
        {!loading && (
          <div className="flex items-center gap-2">
            <span className="bg-[rgba(245,82,12,0.1)] text-[#F5520C] border border-[rgba(245,82,12,0.2)] rounded-[6px] px-2.5 py-[3px] text-[11px] font-semibold">
              PDF
            </span>
            <span className="text-[11px] text-[#444444]">Max 100MB · Stays in your browser</span>
          </div>
        )}
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
