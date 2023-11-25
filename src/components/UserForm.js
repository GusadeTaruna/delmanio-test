import { useState } from "react";
import { useMutation } from "react-query";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { IoIosAlert } from "react-icons/io";
import { postAddUser } from "@/services/POST_AddUser";

const UserForm = () => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const isErrorName = name === "";
  const isErrorEmail = email === "";

  const handleInputChangeName = (e) => setName(e.target.value);
  const handleInputChangeEmail = (e) => setEmail(e.target.value);

  const mutation = useMutation(postAddUser, {
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

      if (error) {
        toast({
          title: "Email already exists",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "User Created",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    },
  });

  const handleSubmit = async () => {
    mutation.mutate({ name, email });
  };

  return (
    <Box p={4} w={"fit-content"}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={isErrorName}>
          <FormLabel color={isErrorName && "red.600"} fontSize={"14px"}>
            Name
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleInputChangeName}
          />
          {isErrorName && (
            <FormErrorMessage>
              <IoIosAlert />
              <span style={{ marginLeft: "4px" }}>Please provide name</span>
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isErrorEmail}>
          <FormLabel color={isErrorEmail && "red.600"} fontSize={"14px"}>
            Email
          </FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChangeEmail}
          />
          {isErrorEmail && (
            <FormErrorMessage>
              <IoIosAlert />
              <span style={{ marginLeft: "4px" }}>Please provide email</span>
            </FormErrorMessage>
          )}
        </FormControl>

        <Box display={"flex"} justifyContent={"end"}>
          <Button
            size={"sm"}
            mt={"8px"}
            backgroundColor="blue.400"
            color="white"
            isLoading={mutation.isLoading}
            onClick={handleSubmit}
            isDisabled={isErrorEmail || isErrorName ? true : false}
            _hover={{
              backgroundColor: "blue.600",
            }}
            _disabled={{
              backgroundColor: "gray.200",
            }}
          >
            Submit User
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default UserForm;
