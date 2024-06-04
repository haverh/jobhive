'use client';
import {
  UserIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const linksArray = [
  { name: 'Account', href: '?modal=true&tab=account&task=view', icon: UserIcon },
  { name: 'Links', href: '?modal=true&tab=links', icon: LinkIcon },
  
];

export function SettingsNavLinks() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const pathname = usePathname();
  console.log()

  return (
    <>
      {linksArray.map((link, ind) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center bg-gray-50 p-3 mr-1 text-sm font-medium hover:bg-yellow-100 hover:text-yellow-500",
              {
                "bg-yellow-100 text-yellow-500": link.name.toLowerCase() === tab,
                "rounded-tl-xl rounded-tr-md rounded-b-md": ind == 0,
                "rounded-md": ind !== 0,
              },
            )}
          >
            <LinkIcon className="w-6 h-6" />
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
