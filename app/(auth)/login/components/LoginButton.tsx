'use client';

import Image from 'next/image';
import googleLogo from '../../../g-logo.png';
import { useState } from 'react';

interface LoginButtonProps {
  onLogin: () => Promise<void>;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await onLogin();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#fff] border-[#d3d3d3] border-solid border-[1px] rounded-[4px] text-[#737373] cursor-pointerm-0 px-3 py-3 text-center flex items-center justify-center gap-3 w-[245px]"
    >
      <Image
        src={googleLogo}
        alt="Google logo"
        width="20"
        height="20"
        className={isLoading ? 'animate-spin' : ''}
      />
      <span className="flex-1">
        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión con Google'}
      </span>
    </button>
  );
};

export default LoginButton;
