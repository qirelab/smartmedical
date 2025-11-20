'use client';

import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '../SMButton/SMButton';
import { User } from 'lucide-react';

interface SMProfileButtonProps {
  className?: string;
  onAuthModalOpen?: () => void;
}

export const SMProfileButton: React.FC<SMProfileButtonProps> = ({ className, onAuthModalOpen }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (!session) {
      if (onAuthModalOpen) {
        onAuthModalOpen();
      } else {
        signIn('google', {
          callbackUrl: '/account',
          redirect: true,
        });
      }
    } else {
      // Если пользователь уже на странице аккаунта, не делаем ничего
      if (pathname?.startsWith('/account')) {
        return;
      }
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
      <span>{session ? 'Мой кабинет' : 'Войти'}</span>
    </Button>
  );
};
