'use client';

import { useReducer, useCallback } from 'react';
import type { TextEdit, EditsMap } from '@/types/pdf';

type Action =
  | { type: 'SET'; key: string; edit: TextEdit }
  | { type: 'CLEAR' };

function editsReducer(state: EditsMap, action: Action): EditsMap {
  const next = new Map(state);
  switch (action.type) {
    case 'SET':
      next.set(action.key, action.edit);
      return next;
    case 'CLEAR':
      return new Map();
    default:
      return state;
  }
}

export function useEdits() {
  const [edits, dispatch] = useReducer(editsReducer, new Map<string, TextEdit>());

  const setEdit = useCallback((key: string, edit: TextEdit) => {
    dispatch({ type: 'SET', key, edit });
  }, []);

  const clearEdits = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  return { edits, setEdit, clearEdits };
}
