import { Box } from '@chakra-ui/react';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={4}
    >
      <SignIn />
    </Box>
  );
}
