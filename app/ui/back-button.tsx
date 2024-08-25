'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function BackButton({ className = '', children = '뒤로' }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button onClick={handleClick} className={`flex gap-1 text-main-theme-color dark:text-blue-500 ${className}`}>
      <ChevronLeftIcon className="size-6 stroke-2" />
      <span>{children}</span>
    </button>
  );
}
