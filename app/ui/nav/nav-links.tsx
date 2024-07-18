'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpenIcon, UsersIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import {
  BookOpenIcon as SolidBookOpenIcon,
  UsersIcon as SolidUsersIcon,
  Cog6ToothIcon as SolidCog6ToothIcon,
} from '@heroicons/react/24/solid';
import { MAX_WIDTH } from '@/constants/style';

const links = [
  { name: '내 책장', href: '/mine', defaultIcon: BookOpenIcon, selectedIcon: SolidBookOpenIcon },
  {
    name: '친구 책장',
    href: '/yours',
    defaultIcon: UsersIcon,
    selectedIcon: SolidUsersIcon,
  },
  { name: '설정', href: '/settings', defaultIcon: Cog6ToothIcon, selectedIcon: SolidCog6ToothIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul
      className={`w-full fixed bottom-0 left-1/2 transform -translate-x-1/2 ${MAX_WIDTH} px-3 md:px-8 py-2 flex justify-between bg-gray-50 dark:bg-zinc-700 border-t border-gray-200 dark:border-zinc-600`}
    >
      {links.map((link, index) => {
        const DefaultLinkIcon = link.defaultIcon;
        const SelectedLinkIcon = link.selectedIcon;
        return (
          <li key={`link-${index}`} className="h-10 md:h-12 px-3 flex-center grow gap-2 rounded-md text-sm font-medium">
            <Link href={link.href} className="text-main-theme-color">
              <div className="flex flex-col items-center">
                {pathname === link.href ? <SelectedLinkIcon className="w-6" /> : <DefaultLinkIcon className="w-6" />}
                <span>{link.name}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
