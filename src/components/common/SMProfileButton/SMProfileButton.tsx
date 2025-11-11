'use client';

import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../SMButton/SMButton';
import { User } from 'lucide-react';

interface SMProfileButtonProps {
  className?: string;
}

export const SMProfileButton: React.FC<SMProfileButtonProps> = ({ className }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {

    if (!session) {
      signIn('google', {
        callbackUrl: '/account',
        redirect: true,
      });
    } else {
      router.push('/account');
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="sm"
      className={`text-[#18A36C] hover:bg-[#F4F4F4] flex items-center gap-2 px-2 lg:px-3 py-2 text-sm ${className || ''}`}
    >
      <User className="w-4 h-4" />
      <span>Мой кабинет</span>
    </Button>
  );
};
