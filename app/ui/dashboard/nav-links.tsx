'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  Cog8ToothIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Applications', href: '/dashboard/applications', icon: DocumentDuplicateIcon },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "hoverable nav-link flex h-full grow items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium md:h-[48px] md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-yellow-100 text-yellow-500": pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-5 h-5 md:w-6 md:h-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

export function Settings() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  
  return (
    <Link
      href='?modal=true&tab=account&task=view'
      className={clsx(
        "hoverable nav-link flex h-full w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium md:h-[48px] md:flex-none md:justify-start md:p-2 md:px-3",
        {
          "bg-yellow-100 text-yellow-500": modal,
        },
      )}
    >
      <Cog8ToothIcon className="w-6" />
      <p className="hidden md:block">Settings</p>
    </Link>
  )
}
