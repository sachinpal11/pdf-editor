import { StandardFonts } from 'pdf-lib';

export interface FontOption {
  label: string;
  css: string;
  standard: StandardFonts;
}

export const FONT_OPTIONS: FontOption[] = [
  { label: 'Helvetica',       css: 'Helvetica, Arial, sans-serif',              standard: StandardFonts.Helvetica },
  { label: 'Times New Roman', css: '"Times New Roman", Times, serif',            standard: StandardFonts.TimesRoman },
  { label: 'Courier New',     css: '"Courier New", Courier, monospace',          standard: StandardFonts.Courier },
  { label: 'Helvetica Bold',  css: 'Helvetica, Arial, sans-serif',              standard: StandardFonts.HelveticaBold },
  { label: 'Times Bold',      css: '"Times New Roman", Times, serif',            standard: StandardFonts.TimesRomanBold },
  { label: 'Times Italic',    css: '"Times New Roman", Times, serif',            standard: StandardFonts.TimesRomanItalic },
  { label: 'Courier Bold',    css: '"Courier New", Courier, monospace',          standard: StandardFonts.CourierBold },
];

export const DEFAULT_FONT = FONT_OPTIONS[0];

export function cssToStandardFont(css: string): StandardFonts {
  const match = FONT_OPTIONS.find((f) => f.css === css);
  return match?.standard ?? StandardFonts.Helvetica;
}
