import React from 'react';
import Image from 'next/image';
import logo from '../../public/images/white-logo.png';
import { createClient } from '@/utils/supabase/server';
import AvatarImage from './avatar-image';

const Header: React.FC = async () => {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const { data: appUser, error } = await supabase
    .from('app_users')
    .select('full_name, avatar_url')
    .eq('id', user?.id || '')
    .single();

  const fullName = appUser?.full_name?.split(' ');
  const firstName = (fullName && fullName[0]) ?? '';
  const lastName = (fullName && fullName[fullName.length - 1]) ?? '';
  const avatarImg = appUser?.avatar_url ?? '';

  return (
    <div className="bg-primary shadow-lg sticky inset-x-0 top-0 z-30 h-full w-full border-b border-gray-200">
      <div className="h-full flex items-center justify-between">
        <div className="w-60 h-full flex items-center ml-6">
          <Image className="pr-20" src={logo} alt="Logo" />
        </div>
        <AvatarImage
          src={avatarImg}
          userInitials={`${firstName[0]}${lastName[0]}`}
        />
      </div>
    </div>
  );
};

export default Header;
