import { PDFDocument } from 'pdf-lib';

/**
 * Merges multiple PDF files into a single Uint8Array representing the merged PDF.
 * @param files Array of PDF Files to merge
 * @returns Promise<Uint8Array> Merged PDF data
 */
export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  if (files.length === 0) {
    throw new Error('No files provided for merging.');
  }

  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    try {
      const fileBytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    } catch (error) {
      console.error(`Error loading or copying pages from file: ${file.name}`, error);
      throw new Error(`Failed to process "${file.name}". It might be corrupted or password-protected.`);
    }
  }

  return await mergedPdf.save();
}

/**
 * Extracts specific pages from a PDF and returns a new PDF as a Uint8Array.
 * @param file PDF file to split
 * @param pageIndexes 0-indexed array of page indices to extract (e.g. [0, 2, 3])
 * @returns Promise<Uint8Array> New PDF data containing only the selected pages
 */
export async function extractPdfPages(file: File, pageIndexes: number[]): Promise<Uint8Array> {
  if (pageIndexes.length === 0) {
    throw new Error('No pages selected for extraction.');
  }

  try {
    const fileBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBytes);
    const splitPdf = await PDFDocument.create();

    const copiedPages = await splitPdf.copyPages(pdfDoc, pageIndexes);
    copiedPages.forEach((page) => splitPdf.addPage(page));

    return await splitPdf.save();
  } catch (error) {
    console.error('Error extracting pages:', error);
    throw new Error(`Failed to extract pages from "${file.name}".`);
  }
}

