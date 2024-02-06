'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface AvatarImageProps {
  src: string;
  userInitials: string;
}

const AvatarImage: React.FC<AvatarImageProps> = ({ src, userInitials }) => {
  const [hideImage, setHideImage] = useState(false);
  return (
    <div className="hidden md:block">
      <div className="h-8 w-8 rounded-full md:mr-6 bg-zinc-300 flex items-center justify-center text-center">
        {hideImage ? (
          <span className="font-semibold text-sm">{userInitials}</span>
        ) : (
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={src}
            alt="Avatar"
            onError={() => {
              setHideImage(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AvatarImage;
