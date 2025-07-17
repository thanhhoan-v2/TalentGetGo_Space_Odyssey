import { Box } from '@chakra-ui/react';
import { UserProfile } from '@clerk/nextjs';

export default function UserProfilePage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={4}
    >
      <UserProfile />
    </Box>
  );
}
