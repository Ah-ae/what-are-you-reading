'use client';

import { useAtomValue } from 'jotai';
import { keywordListAtom } from '@/store/atoms';

export default function KeywordList() {
  const keywords = useAtomValue(keywordListAtom);

  return keywords.length > 0 ? (
    <ul className="py-3">
      {keywords.map((keyword, index) => (
        <li key={index} className="py-2 first:border-t-[1px] border-b-[1px] dark:border-neutral-700">
          {keyword}
        </li>
      ))}
    </ul>
  ) : null;
}
