const FONT_FAMILY_MAP: Record<string, string> = {
  helvetica: 'Helvetica, Arial, sans-serif',
  times: '"Times New Roman", Times, serif',
  courier: '"Courier New", Courier, monospace',
  arial: 'Arial, Helvetica, sans-serif',
  georgia: 'Georgia, serif',
  verdana: 'Verdana, Geneva, sans-serif',
};

function resolveFontFamily(pdfFontName: string): string {
  const lower = pdfFontName.toLowerCase();
  for (const [key, value] of Object.entries(FONT_FAMILY_MAP)) {
    if (lower.includes(key)) return value;
  }
  return 'Helvetica, Arial, sans-serif';
}

function resolveColor(item: Record<string, unknown>): string {
  if (item.color && Array.isArray(item.color)) {
    const [r, g, b] = item.color as number[];
    return `rgb(${r}, ${g}, ${b})`;
  }
  return 'rgb(0, 0, 0)';
}

export function extractTextItems(
  textContent: { items: unknown[] },
  viewport: { height: number; scale: number },
) {
  return textContent.items
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === 'object' &&
        item !== null &&
        'str' in item &&
        typeof (item as Record<string, unknown>).str === 'string' &&
        ((item as Record<string, unknown>).str as string).trim() !== '',
    )
    .map((item) => {
      const transform = item.transform as number[];
      const [a, b] = transform;
      const fontSize = Math.hypot(a, b);
      const fontFamily = resolveFontFamily((item.fontName as string) ?? '');
      const color = resolveColor(item);
      return {
        str: item.str as string,
        transform,
        fontSize,
        fontFamily,
        color,
        pageHeight: viewport.height / viewport.scale,
        scale: viewport.scale,
      };
    });
}
