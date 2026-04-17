export interface TextItem {
  str: string;
  transform: number[];
  fontSize: number;
  fontFamily: string;
  color: string;
  pageHeight: number;
  scale: number;
}

export interface TextEdit {
  pageIndex: number;
  itemIndex: number;
  originalText: string;
  newText: string;
  transform: number[];
  fontSize: number;
  fontFamily: string;
  color: [number, number, number];
  bgColor: [number, number, number];
}

export type EditsMap = Map<string, TextEdit>;
