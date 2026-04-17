'use client';

import { useState } from 'react';
import HomePage from '@/components/HomePage';
import EditorPage from '@/components/EditorPage';

type AppState =
  | { view: 'home' }
  | { view: 'editor'; buffer: ArrayBuffer; filename: string };

export default function Page() {
  const [state, setState] = useState<AppState>({ view: 'home' });

  if (state.view === 'editor') {
    return (
      <EditorPage
        buffer={state.buffer}
        filename={state.filename}
        onClose={() => setState({ view: 'home' })}
      />
    );
  }

  return (
    <HomePage
      onFile={(buf, name) => setState({ view: 'editor', buffer: buf, filename: name })}
    />
  );
}
