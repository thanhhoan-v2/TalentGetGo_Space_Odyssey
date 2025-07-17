'use client';

import { Button } from '@chakra-ui/react';
import { SignInButton as ClerkSignInButton } from '@clerk/nextjs';
import { ReactNode } from 'react';

interface SignInButtonProps {
  children?: ReactNode;
  mode?: 'redirect' | 'modal';
}

export function SignInButton({
  children,
  mode = 'redirect',
}: SignInButtonProps) {
  return (
    <ClerkSignInButton mode={mode}>
      {children || <Button colorScheme="blue">Sign In</Button>}
    </ClerkSignInButton>
  );
}
