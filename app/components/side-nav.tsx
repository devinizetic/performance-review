'use client';
import { SIDENAV_ITEMS } from '@/constants';
import { SideNavItem } from '@/types/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { logout } from '../actions';

interface SideNavProps {
  sideNavItems: SideNavItem[];
}

const SideNav: React.FC<SideNavProps> = ({ sideNavItems }) => {
  return (
    <div className=" bg-white h-full flex-1 border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex flex-col space-y-2">
          {sideNavItems.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();

  return (
    <div>
      {item.isLogout ? (
        <div
          className={` hover:bg-primary hover:bg-opacity-10  ${
            item.path === pathname ? 'bg-primary bg-opacity-10' : ''
          }`}
        >
          <Link
            href="#"
            onClick={() => logout()}
            className={`flex flex-row space-x-4 items-center p-2 `}
          >
            <span className="font-semibold text-xl flex ml-4">
              {item.title}
            </span>
          </Link>
        </div>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 hover:bg-primary hover:bg-opacity-10 ${
            item.path === pathname ? 'bg-primary bg-opacity-10 ' : ''
          }`}
        >
          <span className="font-semibold text-xl flex ml-4">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
