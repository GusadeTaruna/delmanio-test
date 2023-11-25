import { Box, Heading } from "@chakra-ui/react";
import UserForm from "@/components/UserForm";

export default function Registration() {
  return (
    <Box pt={"65px"} bg={"white"} width={"100%"}>
      <Box px={4} pb={2} borderBottom="1px" borderColor="gray.300" mb={2}>
        <Heading as={"h3"} size={"lg"} mb={1}>
          User Registration
        </Heading>
        <Heading as={"h5"} size={"sm"} color={"blue.600"}>
          Add new User
        </Heading>
      </Box>
      <UserForm />
    </Box>
  );
}
