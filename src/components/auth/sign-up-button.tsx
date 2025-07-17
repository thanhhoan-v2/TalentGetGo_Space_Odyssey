'use client';

import { Button } from '@chakra-ui/react';
import { SignUpButton as ClerkSignUpButton } from '@clerk/nextjs';
import { ReactNode } from 'react';

interface SignUpButtonProps {
  children?: ReactNode;
  mode?: 'redirect' | 'modal';
}

export function SignUpButton({
  children,
  mode = 'redirect',
}: SignUpButtonProps) {
  return (
    <ClerkSignUpButton mode={mode}>
      {children || <Button colorScheme="green">Sign Up</Button>}
    </ClerkSignUpButton>
  );
}
