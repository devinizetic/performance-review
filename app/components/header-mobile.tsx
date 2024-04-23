'use client';
import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDENAV_ITEMS } from '@/constants';
import { logout } from '../actions';
import { SideNavItem } from '@/types/types';

interface HeaderMobileProps {
  sideNavItems: SideNavItem[];
}

const HeaderMobile: React.FC<HeaderMobileProps> = ({ sideNavItems }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav
      className={`fixed inset-0 z-50 w-full md:hidden ${
        isOpen ? '' : 'pointer-events-none'
      }`}
    >
      {isOpen ? (
        <>
          <div className="absolute inset-0 right-0 w-full bg-white open" />
          <ul className="absolute grid w-full gap-3 px-10 py-16">
            {sideNavItems.map((item, idx) => {
              const isLastItem = idx === SIDENAV_ITEMS.length - 1; // Check if it's the last item
              const isLogout = item.isLogout;
              return (
                <div key={idx}>
                  <MenuItem>
                    {isLogout ? (
                      <Link
                        href={item.path}
                        onClick={() => logout()}
                        className={`flex w-full text-2xl ${
                          item.path === pathname ? 'font-bold' : ''
                        }`}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex w-full text-2xl ${
                          item.path === pathname ? 'font-bold' : ''
                        }`}
                      >
                        {item.title}
                      </Link>
                    )}
                  </MenuItem>

                  {!isLastItem && (
                    <MenuItem className="my-3 h-px w-full bg-gray-300" />
                  )}
                </div>
              );
            })}
          </ul>
        </>
      ) : (
        <></>
      )}

      <MenuToggle open={isOpen} toggle={() => setIsOpen(!isOpen)} />
    </nav>
  );
};

export default HeaderMobile;

const MenuItem = ({
  className,
  children
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return <li className={className}>{children}</li>;
};

const MenuToggle = ({ open, toggle }: { open: boolean; toggle: any }) => (
  <button
    onClick={toggle}
    className="pointer-events-auto absolute right-4 top-[14px] z-30 flex flex-col gap-[3px]"
  >
    <div
      className={`w-6 h-[3px] ${
        open ? 'bg-black' : 'bg-white'
      } transition-all duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`}
    />
    <div
      className={`w-6 h-[3px] bg-white transition-all duration-300 ${
        open ? 'opacity-0' : ''
      }`}
    />
    <div
      className={`w-6 h-[3px] ${
        open ? 'bg-black' : 'bg-white'
      } transition-all duration-300 ${
        open ? '-rotate-45 -translate-y-1.5' : ''
      }`}
    />
  </button>
);
