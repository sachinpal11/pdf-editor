import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, FileText } from 'lucide-react';

interface SortablePDFItemProps {
  id: string;
  file: File;
  onRemove: (id: string) => void;
}

export const SortablePDFItem: React.FC<SortablePDFItemProps> = ({ id, file, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-4 bg-[#0D0D0D] border rounded-xl transition-all duration-200 select-none ${
        isDragging
          ? 'border-[#F5520C] shadow-[0_0_20px_rgba(245,82,12,0.2)] bg-[#121212]'
          : 'border-white/[0.08] hover:border-white/[0.16] hover:bg-[#111111]'
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-white p-1 rounded hover:bg-white/[0.05] transition-colors touch-none"
          style={{ touchAction: 'none' }}
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
        >
          <GripVertical size={18} />
        </button>

        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[#F5520C] shrink-0">
          <FileText size={20} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate pr-4">{file.name}</p>
          <p className="text-xs text-[#999999]">{formatSize(file.size)}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRemove(id)}
        className="text-gray-500 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition-all duration-200"
        aria-label="Remove file"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
