'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface TabItem {
  key: string;
  label: string;
}

type Props = {
  tabs: TabItem[];
};

export default function Tab({ tabs }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleTabClick = (key: string) => {
    setActiveTab(key);

    const params = new URLSearchParams(searchParams);
    params.set('target', key);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="w-2/3 mx-auto mt-3">
      <div className="p-1 flex justify-between bg-zinc-200 dark:bg-zinc-800 rounded">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 px-2 py-1 ${
              activeTab === tab.key ? 'rounded bg-white shadow dark:text-neutral-700 ' : 'text-gray-500'
            } border-r-2 last:border-r-0 border-zinc-300 dark:border-zinc-600 text-center transition-colors duration-300 focus:outline-none`}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
