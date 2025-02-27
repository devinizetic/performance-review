import React from 'react';
import Image from 'next/image';
import logo from '../../public/images/logodev3.png';
import { createClient } from '@/utils/supabase/server';
import AvatarImage from './avatar-image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogoutButton } from './logout-button';

const Navbar: React.FC = async () => {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  
  const { data: appUser } = await supabase
    .from('app_users')
    .select('full_name, avatar_url')
    .eq('id', user?.id || '')
    .single();

  const names = appUser?.full_name?.split(' ') || [];
  const firstName = names[0] || '';
  const lastName = names[names.length - 1] || '';
  const initials = `${firstName[0]}${lastName[0]}`;
  const avatarImg = appUser?.avatar_url ?? '';

  return (
    <nav className="border-b bg-background">
      <div className="flex h-12 items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="Logo" height={32} />
        </div>

        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <AvatarImage
                src={avatarImg}
                userInitials={initials}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <LogoutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;