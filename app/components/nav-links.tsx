'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpenIcon, UsersIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import {
  BookOpenIcon as SolidBookOpenIcon,
  UsersIcon as SolidUsersIcon,
  Cog6ToothIcon as SolidCog6ToothIcon,
} from '@heroicons/react/24/solid';

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
    <>
      {links.map((link, index) => {
        const DefaultLinkIcon = link.defaultIcon;
        const SelectedLinkIcon = link.selectedIcon;
        return (
          <Link
            key={`link-${index}`}
            href={link.href}
            className="h-10 md:h-12 px-3 flex-center grow gap-2 rounded-md text-sm font-medium"
          >
            <div className="flex flex-col items-center">
              {pathname === link.href ? <SelectedLinkIcon className="w-6" /> : <DefaultLinkIcon className="w-6" />}
              <p>{link.name}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}
