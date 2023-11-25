import { getUserDetail } from "@/services/GET_UserDetail";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const SearchUser = ({ data, isLoading }) => {
  const [userData, setUserData] = useState();

  const handleSearchUser = async (email) => {
    const user = data.find(
      (item) => item.email.toLowerCase() === email.toLowerCase()
    );
    setUserData(user);
  };

  return (
    <Box p={4} w={"80%"}>
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search users"
          onChange={(e) => {
            handleSearchUser(e.target.value);
          }}
        />
      </InputGroup>

      {userData && (
        <Box
          border="1px solid #ddd"
          borderRadius={"6px"}
          px={10}
          py={28}
          textAlign={"center"}
        >
          <Heading>{userData.name}</Heading>
          <Text fontSize="md">{userData.email}</Text>
          <hr />
        </Box>
      )}
    </Box>
  );
};

export default SearchUser;
