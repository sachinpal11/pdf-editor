import { FileEdit, FilePlus, FileX, FileSearch, FileSignature, FileArchive, FileOutput, FileLock, LucideIcon } from 'lucide-react';

export interface Tool {
  icon: LucideIcon;
  label: string;
  desc: string;
  route: string | null;
  active: boolean;
}

export const tools: Tool[] = [
  { icon: FileEdit,      label: 'Edit PDF',      desc: 'Click any text to edit it',         route: '/upload', active: true  },
  { icon: FilePlus,      label: 'Merge PDF',     desc: 'Combine multiple PDFs into one',    route: null,      active: false },
  { icon: FileX,         label: 'Split PDF',     desc: 'Extract pages from a PDF',          route: null,      active: false },
  { icon: FileOutput,    label: 'PDF to Word',   desc: 'Convert PDF to editable Word',      route: null,      active: false },
  { icon: FileSearch,    label: 'Compress PDF',  desc: 'Reduce PDF file size',              route: null,      active: false },
  { icon: FileSignature, label: 'Sign PDF',      desc: 'Add your signature to a PDF',       route: null,      active: false },
  { icon: FileArchive,   label: 'PDF to ZIP',    desc: 'Archive PDFs into a ZIP',           route: null,      active: false },
  { icon: FileLock,      label: 'Protect PDF',   desc: 'Password-protect your PDF',         route: null,      active: false },
];
