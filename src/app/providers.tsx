'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { AlertProvider } from '@/components/common/SMAlert/AlertProvider'

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <AlertProvider>
        {children}
      </AlertProvider>
    </SessionProvider>
  )
}