import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/logodev3.png';
import { createClient } from '@/utils/supabase/server';
import AvatarImage from './avatar-image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogoutButton } from './logout-button';
import UserRepository from '@/lib/repository/user-repository';
import { ADMIN_ROLE_ID } from '@/constants';
import { redirect } from 'next/navigation';

const Navbar: React.FC = async () => {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const { data: appUser } = await supabase
    .from('app_users')
    .select('full_name, avatar_url')
    .eq('id', session.user.id || '')
    .single();

  // Get user roles to check if admin
  const userRoles = await UserRepository.getUserRoles({
    id: session.user.id
  });
  // Get user roles to determine if they're an admin
  const isAdmin = userRoles.some(role => role.role_id === ADMIN_ROLE_ID);

  const names = appUser?.full_name?.split(' ') || [];
  const firstName = names[0] || '';
  const lastName = names[names.length - 1] || '';
  const initials = `${firstName[0]}${lastName[0]}`;
  const avatarImg = appUser?.avatar_url ?? '';

  const allNavItems = [
    {
      name: 'Dashboard',
      href: '/',
      isAdmin: false,
    },
    {
      name: 'Administración',
      href: '/admin',
      isAdmin: true,
    },
  ];

  const displayedNavItems = allNavItems.filter((item) => {
    if (item.isAdmin) {
      return isAdmin;
    }
    return true;
  }
  );

  return (
    <nav className="border-b bg-background">
      <div className="flex h-12 items-center px-4 justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="Logo" height={32} />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {displayedNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <AvatarImage
                src={avatarImg}
                userInitials={initials}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex flex-col space-y-1 leading-none p-2">
                <p className="font-medium">{appUser?.full_name}</p>
              </div>
              <DropdownMenuSeparator />
              <LogoutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;