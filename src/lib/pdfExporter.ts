import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type { TextEdit } from '@/types/pdf';
import { cssToStandardFont } from '@/lib/fontOptions';

export async function exportPdf(
  originalBuffer: ArrayBuffer,
  edits: Map<string, TextEdit>,
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(originalBuffer);
  const pages = pdfDoc.getPages();

  const fontCache = new Map<StandardFonts, Awaited<ReturnType<typeof pdfDoc.embedFont>>>();
  const getFont = async (standard: StandardFonts) => {
    if (!fontCache.has(standard)) {
      fontCache.set(standard, await pdfDoc.embedFont(standard));
    }
    return fontCache.get(standard)!;
  };

  const editsByPage = new Map<number, TextEdit[]>();
  for (const edit of edits.values()) {
    if (edit.originalText === edit.newText) continue;
    const arr = editsByPage.get(edit.pageIndex) ?? [];
    arr.push(edit);
    editsByPage.set(edit.pageIndex, arr);
  }

  for (const [pageIndex, pageEdits] of editsByPage) {
    const page = pages[pageIndex];

    for (const edit of pageEdits) {
      const [, , , , x, y] = edit.transform;
      const fs = edit.fontSize;
      const charWidth = fs * 0.6;

      const [bgR, bgG, bgB] = edit.bgColor;
      // Snap to white if very close to avoid visible boxes on white pages
      const finalBgR = bgR > 250 && bgG > 250 && bgB > 250 ? 255 : bgR;
      const finalBgG = bgR > 250 && bgG > 250 && bgB > 250 ? 255 : bgG;
      const finalBgB = bgR > 250 && bgG > 250 && bgB > 250 ? 255 : bgB;

      page.drawRectangle({
        x: x - 1,
        y: y - 2,
        width: Math.max(edit.originalText.length, edit.newText.length) * charWidth + 4,
        height: fs + 4,
        color: rgb(finalBgR / 255, finalBgG / 255, finalBgB / 255),
        opacity: 1,
      });

      const standardFont = cssToStandardFont(edit.fontFamily);
      const font = await getFont(standardFont);

      const [r, g, b] = edit.color;
      page.drawText(edit.newText, {
        x,
        y,
        size: fs,
        font,
        color: rgb(r / 255, g / 255, b / 255),
      });
    }
  }

  return pdfDoc.save();
}
