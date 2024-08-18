import { atom } from 'jotai';

export const currentModeAtom = atom<'view' | 'edit'>('view');
