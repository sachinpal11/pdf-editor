'use client';

import { useRef, useEffect } from 'react';
import type { TextItem } from '@/types/pdf';
import type { FontOption } from '@/lib/fontOptions';

interface Props {
  item: TextItem;
  currentText: string;
  currentFontCss: string;
  bgColor: string;
  onChange: (text: string, fontCss: string) => void;
  isEdited: boolean;
  selectedFont: FontOption;
}

function buildBackground(bgColor: string, isEdited: boolean): string {
  if (!isEdited) return bgColor;
  const m = bgColor.match(/\d+/g);
  if (!m || m.length < 3) return 'rgba(251,191,36,0.30)';
  const [r, g, b] = m.map(Number);
  const blendR = Math.round(r * 0.7 + 251 * 0.3);
  const blendG = Math.round(g * 0.7 + 191 * 0.3);
  const blendB = Math.round(b * 0.7 + 36 * 0.3);
  return `rgb(${blendR},${blendG},${blendB})`;
}

export default function EditableSpan({
  item,
  currentText,
  currentFontCss,
  bgColor,
  onChange,
  isEdited,
  selectedFont,
}: Props) {
  const [, , , , x, y] = item.transform;
  const s = item.scale;
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current && spanRef.current.textContent !== currentText) {
      spanRef.current.textContent = currentText;
    }
  }, [currentText]);

  const background = buildBackground(bgColor, isEdited);

  return (
    <span
      ref={spanRef}
      contentEditable
      suppressContentEditableWarning
      onFocus={(e) => {
        e.currentTarget.style.fontFamily = selectedFont.css;
      }}
      onBlur={(e) => {
        const newText = e.currentTarget.textContent ?? '';
        onChange(newText, selectedFont.css);
      }}
      style={{
        position: 'absolute',
        left: `${x * s}px`,
        top: `${(item.pageHeight - y) * s}px`,
        transform: 'translateY(-100%)',
        fontSize: `${item.fontSize * s}px`,
        fontFamily: currentFontCss,
        color: item.color,
        whiteSpace: 'pre',
        background,
        outline: 'none',
        cursor: 'text',
        lineHeight: 1,
        borderRadius: '2px',
        padding: '0 2px',
        transition: 'box-shadow 0.15s',
        minWidth: '2px',
      }}
      className="hover:shadow-[0_0_0_2px_rgba(251,191,36,0.5)] focus:shadow-[0_0_0_2px_rgba(251,191,36,0.8)] focus:outline-none"
    >
      {currentText}
    </span>
  );
}
