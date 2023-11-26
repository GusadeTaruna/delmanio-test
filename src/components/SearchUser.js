import { deleteUserData } from "@/services/DELETE_UserData";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { FixedSizeList as List } from "react-window";

const SearchUser = ({ data }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      toast({
        title: "Loading Users Data...",
        status: "loading",
        isClosable: false,
        position: "top",
      });
    } else {
      toast.closeAll();
    }
  }, [isLoading, toast]);

  const handleSearchUser = async (email) => {
    setSearchInput(email);
    setIsLoading(true);

    setTimeout(async () => {
      if (email === "") {
        setSearchResults([]);
      } else {
        const results = data.filter((item) =>
          item.email.toLowerCase().includes(email.toLowerCase())
        );
        setSearchResults(results);
      }

      setIsLoading(false);
    }, 1000);
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const UserDetailsList = ({ data }) => {
    return (
      <>
        {Object.entries(data).map(([key, value]) => (
          <div key={key} style={{ display: "flex" }}>
            <div className="label-wrap">{key}</div>
            <div className="info">: {value}</div>
          </div>
        ))}
      </>
    );
  };

  const mutation = useMutation(deleteUserData, {
    onMutate: () => {
      toast({
        title: "Please wait...",
        status: "loading",
        isClosable: false,
        position: "top",
      });
    },
    onSettled: (data, error, variables, context) => {
      toast.closeAll();
      if (!error) {
        onClose();
        toast({
          title: "User Deleted, Reloading Page...",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 500);
      } else {
        toast({
          title: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    },
  });

  const handleDeleteUser = async () => {
    const { id, name, email } = selectedUser;
    mutation.mutate({ id, name, email });
  };

  return (
    <Box p={4} w={"80%"}>
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search users by email"
          onChange={(e) => {
            handleSearchUser(e.target.value);
          }}
        />
      </InputGroup>

      {searchResults.length > 0 ? (
        searchResults.map((user, index) => (
          <Box
            key={index}
            border="1px solid #ddd"
            borderRadius={"6px"}
            px={10}
            py={28}
            textAlign={"center"}
            mt={4}
          >
            <Heading>{user.name}</Heading>
            <Text fontSize="md">{user.email}</Text>
            <hr style={{ margin: "12px auto", width: "60%" }} />
            <Button onClick={() => handleViewProfile(user)}>
              View User Profile
            </Button>
          </Box>
        ))
      ) : searchInput !== "" && !isLoading ? (
        <Box
          border="1px solid #ddd"
          borderRadius={"6px"}
          px={10}
          py={28}
          textAlign={"center"}
          mt={4}
        >
          <Heading>No data found</Heading>
          <Text fontSize="md">
            The data with the email inputted is not available.
          </Text>
        </Box>
      ) : (
        <Box
          border="1px solid #ddd"
          borderRadius={"6px"}
          px={10}
          py={28}
          textAlign={"center"}
          mt={4}
        >
          <Heading>The result will be shown here.</Heading>
          <Text fontStyle={"italic"} fontSize="md">
            type or search something...
          </Text>
        </Box>
      )}

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Heading size="lg" mt={3}>
              Users Detail
            </Heading>
            <Text fontSize="sm" mb={5}>
              This is inquiry about user with email: {selectedUser.email}
            </Text>
            <List
              height={500}
              width={600}
              itemCount={1}
              itemSize={Object.keys(selectedUser).length}
              style={{
                border: "1px solid #e3e3e3",
                padding: "8px",
                width: "100% !important",
              }}
            >
              {() => <UserDetailsList data={selectedUser} />}
            </List>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="ghost" ml={3} mr="auto" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDeleteUser}>
              Delete User
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SearchUser;
