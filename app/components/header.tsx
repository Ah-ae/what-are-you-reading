import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

type Props = { title: string };

export default function Header({ title }: Props) {
  return (
    <header className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-zinc-600">
      <Link href={``}>
        <PlusIcon className="size-6 font-bold" />
      </Link>
      <h2 className="text-2xl font-medium">{title}</h2>
      <button className="text-lg font-medium text-main-theme-color">편집</button>
    </header>
  );
}
