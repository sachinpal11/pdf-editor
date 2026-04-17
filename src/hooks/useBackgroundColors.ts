'use client';

import { useState, useEffect, RefObject } from 'react';
import type { TextItem } from '@/types/pdf';

export function useBackgroundColors(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  items: TextItem[],
  viewport: { width: number; height: number; scale: number } | null,
): string[] {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    if (!viewport || items.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sampled = items.map((item) => {
      const [, , , , x, y] = item.transform;
      const s = item.scale;
      const fs = item.fontSize * s;

      const topY = (item.pageHeight - y) * s - fs;

      const sampleX = Math.max(0, Math.floor(x * s));
      const sampleY = Math.max(0, Math.floor(topY) - 3);
      const sampleW = Math.min(Math.ceil(fs * 3), canvas.width - sampleX, 60);
      const sampleH = Math.min(4, sampleY + 1);

      if (sampleW <= 0 || sampleH <= 0) return 'rgb(255,255,255)';

      try {
        const imageData = ctx.getImageData(sampleX, sampleY, sampleW, sampleH);
        const data = imageData.data;
        let r = 0, g = 0, b = 0;
        const count = data.length / 4;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }
        return `rgb(${Math.round(r / count)},${Math.round(g / count)},${Math.round(b / count)})`;
      } catch {
        return 'rgb(255,255,255)';
      }
    });

    setColors(sampled);
  }, [items, viewport, canvasRef]);

  return colors;
}
