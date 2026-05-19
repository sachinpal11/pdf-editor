'use client';

import { useRef, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Upload, FileText, Loader2, Plus, Trash2, ArrowRight } from 'lucide-react';
import { SortablePDFItem } from './SortablePDFItem';
import { mergePdfs } from '@/lib/pdfUtils';

interface FileItem {
  id: string;
  file: File;
}

export default function MergeTool() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Avoid triggering drag on simple clicks
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setError(null);

    const validFiles: FileItem[] = [];
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        validFiles.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
        });
      }
    }

    if (validFiles.length === 0) {
      setError('Please select valid PDF files.');
      return;
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClear = () => {
    setFiles([]);
    setError(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please upload at least 2 PDF files to merge.');
      return;
    }

    setMerging(true);
    setError(null);

    try {
      const rawFiles = files.map((item) => item.file);
      const mergedPdfBytes = await mergePdfs(rawFiles);

      // Trigger download
      const blob = new Blob([mergedPdfBytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `merged_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('Merge error:', err);
      setError(err.message || 'An error occurred while merging your PDF files.');
    } finally {
      setMerging(false);
    }
  };

  return (
    <div className="w-full relative z-10">
      {/* Glow Effects */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: -200, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 500,
          background: 'radial-gradient(ellipse at center,rgba(255,90,20,0.15) 0%,transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        {files.length === 0 ? (
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
                  {dragging ? 'Drop your PDFs here' : 'Drop multiple PDF files here'}
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
        ) : (
          /* File List and Controls */
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-[#0D0D0D] border border-white/[0.08] rounded-2xl">
              <div>
                <h3 className="text-lg font-semibold text-white">Files to merge ({files.length})</h3>
                <p className="text-xs text-[#999999] mt-0.5">Drag items using the handle on the left to reorder.</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] hover:border-white/[0.2] bg-white/[0.02] hover:bg-white/[0.06] text-sm font-medium transition-all duration-200 text-white"
                >
                  <Plus size={16} />
                  Add PDFs
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-white/[0.08] hover:border-red-500/30 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all duration-200"
                  title="Clear all files"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Sortable List */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={files.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-3">
                  {files.map((item) => (
                    <SortablePDFItem
                      key={item.id}
                      id={item.id}
                      file={item.file}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleMerge}
                disabled={files.length < 2 || merging}
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
                style={{
                  background: 'linear-gradient(0deg,#F5520C 0%,#FF823E 100%)',
                  border: '1.5px solid rgba(255,154,100,0.79)',
                  boxShadow: '0 0 25px rgba(245,82,12,0.3)',
                }}
              >
                {merging ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Merging PDF Files...
                  </>
                ) : (
                  <>
                    Merge and Download
                    <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
