'use client';

import { Box } from '@chakra-ui/react';
import { UserButton as ClerkUserButton } from '@clerk/nextjs';

export function UserButton() {
  return (
    <Box>
      <ClerkUserButton
        appearance={{
          elements: {
            avatarBox: 'w-8 h-8',
          },
        }}
        userProfileMode="navigation"
        userProfileUrl="/user-profile"
      />
    </Box>
  );
}
