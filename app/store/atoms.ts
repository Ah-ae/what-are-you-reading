import { atom } from 'jotai';

export const currentModeAtom = atom<'view' | 'edit'>('view');
export const selectedItemsAtom = atom<number[]>([]); // 삭제할 책 id를 담는 배열
