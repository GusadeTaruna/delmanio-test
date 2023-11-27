import { useForm } from "react-hook-form";
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
  const { handleSubmit, register, formState } = useForm();
  const { errors } = formState;

  const mutation = useMutation(postAddUser, {
    onMutate: () => {
      toast({
        title: "Please wait...",
        status: "loading",
        isClosable: false,
        position: "top",
      });
    },
    onSettled: (data, error) => {
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

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Box p={4} w={"fit-content"}>
      <VStack
        spacing={4}
        align="stretch"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl isInvalid={!!errors.name}>
          <FormLabel color={errors.name && "red.600"} fontSize={"14px"}>
            Name
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: "Please provide name" })}
          />
          {errors.name && (
            <FormErrorMessage>
              <IoIosAlert />
              <span style={{ marginLeft: "4px" }}>{errors.name.message}</span>
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel color={errors.email && "red.600"} fontSize={"14px"}>
            Email
          </FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Please provide email",
              minLength: {
                value: 3,
                message: "Please input minimal 3 character",
              },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please provide valid email format",
              },
            })}
          />
          {errors.email && (
            <FormErrorMessage>
              <IoIosAlert />
              <span style={{ marginLeft: "4px" }}>{errors.email.message}</span>
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
            type="submit"
            isDisabled={formState.isSubmitting}
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
