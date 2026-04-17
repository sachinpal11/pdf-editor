'use client';

import { RefObject } from 'react';
import { useTextLayer } from '@/hooks/useTextLayer';
import { useBackgroundColors } from '@/hooks/useBackgroundColors';
import EditableSpan from './EditableSpan';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { EditsMap, TextEdit } from '@/types/pdf';
import type { FontOption } from '@/lib/fontOptions';

interface Props {
  pdf: PDFDocumentProxy;
  pageIndex: number;
  viewport: { width: number; height: number; scale: number };
  edits: EditsMap;
  selectedFont: FontOption;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  onEdit: (key: string, edit: TextEdit) => void;
}

export default function TextLayer({ pdf, pageIndex, viewport, edits, selectedFont, canvasRef, onEdit }: Props) {
  const { items } = useTextLayer(pdf, pageIndex, viewport);
  const bgColors = useBackgroundColors(canvasRef, items, viewport);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: viewport.width,
        height: viewport.height,
        pointerEvents: 'none',
      }}
    >
      {items.map((item, itemIndex) => {
        const key = `${pageIndex}-${itemIndex}`;
        const edit = edits.get(key);
        const currentText = edit?.newText ?? item.str;
        const currentFontCss = edit?.fontFamily ?? item.fontFamily;
        const isEdited = !!edit && edit.newText !== edit.originalText;
        const bgColor = bgColors[itemIndex] ?? 'rgb(255,255,255)';

        return (
          <div key={key} style={{ pointerEvents: 'auto' }}>
            <EditableSpan
              item={item}
              currentText={currentText}
              currentFontCss={currentFontCss}
              isEdited={isEdited}
              bgColor={bgColor}
              selectedFont={selectedFont}
              onChange={(newText, fontCss) => {
                const parseRgb = (str: string): [number, number, number] => {
                  const m = str.match(/\d+/g);
                  if (m && m.length >= 3) {
                    return [parseInt(m[0]), parseInt(m[1]), parseInt(m[2])];
                  }
                  return [255, 255, 255];
                };
                onEdit(key, {
                  pageIndex,
                  itemIndex,
                  originalText: edit?.originalText ?? item.str,
                  newText,
                  transform: item.transform,
                  fontSize: item.fontSize,
                  fontFamily: fontCss,
                  color: parseRgb(item.color),
                  bgColor: parseRgb(bgColor),
                });
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
