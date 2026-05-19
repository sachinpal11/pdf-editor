'use client';

import { useRef, useState, useEffect } from 'react';
import { Upload, FileText, Loader2, ArrowRight, RefreshCw, Layers } from 'lucide-react';
import { usePdfDocument } from '@/hooks/usePdfDocument';
import { PageThumbnail } from './PageThumbnail';
import { extractPdfPages } from '@/lib/pdfUtils';

// Helper to parse page range string like "1, 3-5" into a set of 0-based page indices
function parseRangeString(str: string, maxPages: number): Set<number> {
  const selected = new Set<number>();
  const parts = str.split(',');

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (trimmed.includes('-')) {
      const [startStr, endStr] = trimmed.split('-');
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (!isNaN(start) && !isNaN(end) && start <= end) {
        const min = Math.max(1, start);
        const max = Math.min(maxPages, end);
        for (let i = min; i <= max; i++) {
          selected.add(i - 1); // 0-indexed
        }
      }
    } else {
      const num = parseInt(trimmed, 10);
      if (!isNaN(num) && num >= 1 && num <= maxPages) {
        selected.add(num - 1); // 0-indexed
      }
    }
  }

  return selected;
}

// Helper to format selected 0-based page indices into a string like "1, 3-5"
function formatRange(selectedIndices: number[]): string {
  if (selectedIndices.length === 0) return '';

  const sorted = [...selectedIndices].sort((a, b) => a - b);
  const ranges: string[] = [];

  let start = sorted[0];
  let end = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === end + 1) {
      end = sorted[i];
    } else {
      if (start === end) {
        ranges.push(`${start + 1}`);
      } else {
        ranges.push(`${start + 1}-${end + 1}`);
      }
      start = sorted[i];
      end = sorted[i];
    }
  }

  if (start === end) {
    ranges.push(`${start + 1}`);
  } else {
    ranges.push(`${start + 1}-${end + 1}`);
  }

  return ranges.join(', ');
}

export default function SplitTool() {
  const [file, setFile] = useState<File | null>(null);
  const [buffer, setBuffer] = useState<ArrayBuffer | null>(null);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [rangeText, setRangeText] = useState('');
  const [dragging, setDragging] = useState(false);
  const [splitting, setSplitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { pdf, numPages, loading: pdfLoading, error: pdfError } = usePdfDocument(buffer);

  // Sync component errors with PDF loading errors
  useEffect(() => {
    if (pdfError) {
      setError(pdfError);
    }
  }, [pdfError]);

  // Set default selection to all pages when PDF is loaded
  useEffect(() => {
    if (pdf && numPages > 0) {
      const allPages = new Set<number>();
      for (let i = 0; i < numPages; i++) {
        allPages.add(i);
      }
      setSelectedPages(allPages);
      setRangeText(formatRange(Array.from(allPages)));
    }
  }, [pdf, numPages]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleFile = async (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
      setError('Please select a valid PDF file.');
      return;
    }

    setError(null);
    setFile(selectedFile);

    try {
      const arrayBuf = await selectedFile.arrayBuffer();
      setBuffer(arrayBuf);
    } catch (err) {
      console.error('Error reading PDF file:', err);
      setError('Failed to read file.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const togglePageSelection = (index: number) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      setRangeText(formatRange(Array.from(next)));
      return next;
    });
  };

  const handleRangeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRangeText(val);
    if (numPages > 0) {
      setSelectedPages(parseRangeString(val, numPages));
    }
  };

  const selectAll = () => {
    if (numPages > 0) {
      const next = new Set<number>();
      for (let i = 0; i < numPages; i++) {
        next.add(i);
      }
      setSelectedPages(next);
      setRangeText(formatRange(Array.from(next)));
    }
  };

  const deselectAll = () => {
    setSelectedPages(new Set());
    setRangeText('');
  };

  const handleSplit = async () => {
    if (!file) return;
    if (selectedPages.size === 0) {
      setError('Please select at least one page to extract.');
      return;
    }

    setSplitting(true);
    setError(null);

    try {
      const pageIndexes = Array.from(selectedPages).sort((a, b) => a - b);
      const splitPdfBytes = await extractPdfPages(file, pageIndexes);

      // Trigger download
      const blob = new Blob([splitPdfBytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const originalName = file.name.replace(/\.pdf$/i, '');
      a.download = `${originalName}_extracted.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('Split error:', err);
      setError(err.message || 'An error occurred while extracting PDF pages.');
    } finally {
      setSplitting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setBuffer(null);
    setSelectedPages(new Set());
    setRangeText('');
    setError(null);
  };

  return (
    <div className="w-full relative z-10">
      <div className="relative z-10 flex flex-col gap-6">
        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        {!file ? (
          /* Upload Zone */
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onClick={() => inputRef.current?.click()}
            className={`transition-all duration-200 select-none rounded-[20px] py-16 px-8 text-center border-2 border-dashed cursor-pointer
              ${dragging
                ? 'border-[#F5520C] bg-[rgba(245,82,12,0.06)] scale-[1.02] shadow-[0_0_40px_rgba(245,82,12,0.12)]'
                : 'border-white/[0.12] bg-white/[0.02] hover:border-[rgba(245,82,12,0.5)] hover:bg-[rgba(245,82,12,0.04)]'
              }`}
          >
            <div className="flex flex-col items-center gap-5">
              {/* Icon */}
              <div
                className={`w-[72px] h-[72px] rounded-full flex items-center justify-center transition-all duration-200
                  ${dragging
                    ? 'bg-[rgba(245,82,12,0.15)] border border-[rgba(245,82,12,0.4)]'
                    : 'bg-white/[0.05] border border-white/[0.08]'}`}
              >
                {dragging ? (
                  <FileText size={30} color="#F5520C" />
                ) : (
                  <Upload size={30} color="#555555" />
                )}
              </div>

              {/* Text */}
              <div>
                <p className={`text-[17px] font-semibold mb-2 ${dragging ? 'text-white' : 'text-[#CCCCCC]'}`}>
                  {dragging ? 'Drop your PDF here' : 'Drop a PDF file here'}
                </p>
                <p className="text-[13px] text-[#555555]">
                  or <span className="text-[#F5520C] font-medium">browse to upload</span>
                </p>
              </div>

              {/* Format badge */}
              <div className="flex items-center gap-2">
                <span className="bg-[rgba(245,82,12,0.1)] text-[#F5520C] border border-[rgba(245,82,12,0.2)] rounded-[6px] px-2.5 py-[3px] text-[11px] font-semibold">
                  PDF
                </span>
                <span className="text-[11px] text-[#444444]">Max 100MB · Stays in your browser</span>
              </div>
            </div>
          </div>
        ) : pdfLoading ? (
          /* Loader */
          <div className="flex flex-col items-center justify-center py-20 bg-[#0D0D0D] border border-white/[0.08] rounded-2xl">
            <Loader2 size={32} className="text-[#F5520C] animate-spin mb-4" />
            <p className="text-sm text-[#999999]">Analyzing document pages...</p>
          </div>
        ) : pdf ? (
          /* Controls and PDF Thumbnail Grid */
          <div className="flex flex-col gap-6">
            {/* Header Control Panel */}
            <div className="flex flex-col gap-5 p-5 bg-[#0D0D0D] border border-white/[0.08] rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-md font-semibold text-white truncate max-w-[280px]" title={file.name}>
                    {file.name}
                  </h3>
                  <p className="text-xs text-[#999999] mt-0.5">
                    {selectedPages.size} of {numPages} pages selected
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={selectAll}
                    className="px-3 py-1.5 rounded-lg border border-white/[0.05] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.06] text-xs font-medium transition-colors text-white"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={deselectAll}
                    className="px-3 py-1.5 rounded-lg border border-white/[0.05] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.06] text-xs font-medium transition-colors text-white"
                  >
                    Deselect All
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-1.5 rounded-lg border border-white/[0.05] hover:border-red-500/30 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                    title="Upload different file"
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
              </div>

              {/* Range Input Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="range-input" className="text-xs text-[#999999] font-medium flex items-center gap-1.5">
                  <Layers size={13} className="text-[#F5520C]" />
                  Enter page range to extract (e.g. 1, 3-5)
                </label>
                <input
                  id="range-input"
                  type="text"
                  value={rangeText}
                  onChange={handleRangeInputChange}
                  placeholder="e.g. 1, 3-5"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/[0.08] focus:border-[#F5520C]/60 bg-black/30 text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Thumbnail Grid Wrapper */}
            <div className="relative">
              {/* Top fade overlay */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#0A0A0A]/90 to-transparent pointer-events-none z-20" />
              
              {/* Bottom fade overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none z-20" />

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-h-[560px] py-4 px-2 overflow-y-auto pr-2 custom-scrollbar">
                {Array.from({ length: numPages }).map((_, index) => (
                  <PageThumbnail
                    key={index}
                    pdf={pdf}
                    pageIndex={index}
                    selected={selectedPages.has(index)}
                    onClick={() => togglePageSelection(index)}
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleSplit}
                disabled={selectedPages.size === 0 || splitting}
                className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-[14px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
                style={{
                  background: 'linear-gradient(0deg,#F5520C 0%,#FF823E 100%)',
                  border: '1.5px solid rgba(255,154,100,0.79)',
                  boxShadow: '0 0 25px rgba(245,82,12,0.3)',
                }}
              >
                {splitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Extracting Pages...
                  </>
                ) : (
                  <>
                    Extract & Download
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
