import { Box, Heading } from "@chakra-ui/react";

export const NavigationBar = () => {
  return (
    <Box
      p={4}
      bg="white"
      color="black"
      position="fixed"
      width="100%"
      zIndex="1000"
      borderBottom="1px"
      borderColor="gray.300"
    >
      <Heading as="h2" size="md">
        delman.io
      </Heading>
    </Box>
  );
};
