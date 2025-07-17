import { Box } from '@chakra-ui/react';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={4}
    >
      <SignUp />
    </Box>
  );
}
