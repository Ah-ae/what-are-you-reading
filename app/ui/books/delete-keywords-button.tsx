'use client';

import { useResetAtom } from 'jotai/utils';
import { keywordListAtom } from '@/store/atoms';

export default function DeleteKeywordsButton() {
  const resetKeywordList = useResetAtom(keywordListAtom);

  const handleDelete = () => {
    resetKeywordList();
  };

  return (
    <button onClick={handleDelete} className="text-main-theme-color dark:text-blue-500">
      목록 삭제
    </button>
  );
}
