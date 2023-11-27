import { Box, Heading } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Box pt={"65px"} bg={"white"} width={"100%"}>
      <Box px={4} pb={2} borderBottom="1px" borderColor="gray.300" mb={2}>
        <Heading as={"h3"} size={"lg"} mb={1}>
          Page Not Found
        </Heading>
        <Heading as={"h5"} size={"sm"} color={"blue.600"}>
          The page you are looking for might be renamed, removed, or might never
          exist.
        </Heading>
      </Box>
    </Box>
  );
};

export default NotFound;
