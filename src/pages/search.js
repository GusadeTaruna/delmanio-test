import SearchUser from "@/components/SearchUser";
import { getUsersData } from "@/services/GET_UsersData";
import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";

const Search = () => {
  const { data: userData } = useQuery("userData", getUsersData);

  return (
    <Box pt={"65px"} bg={"white"} width={"100%"}>
      <Box px={4} pb={2} borderBottom="1px" borderColor="gray.300" mb={2}>
        <Heading as={"h3"} size={"lg"} mb={1}>
          Search User
        </Heading>
        <Heading as={"h5"} size={"sm"} color={"blue.600"}>
          Search existing user
        </Heading>
      </Box>
      <SearchUser data={userData} />
    </Box>
  );
};

export default Search;
