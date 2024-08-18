import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

export const currentModeAtom = atom<'view' | 'edit'>('view');
export const selectedItemsAtom = atomWithReset<number[]>([]); // 삭제할 책 id를 담는 배열
