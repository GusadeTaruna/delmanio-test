import { Box, Heading, useToast } from "@chakra-ui/react";
import { useQuery } from "react-query";
import TableList from "@/components/Table";
import { getUsersData } from "@/services/GET_UsersData";
import { useEffect } from "react";

export default function Users() {
  const toast = useToast();
  const { isLoading, data: userData } = useQuery("userData", getUsersData);

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

  const columns = [
    { Header: "id", accessor: "id" },
    { Header: "name", accessor: "name" },
    { Header: "email", accessor: "email" },
    { Header: "country_name", accessor: "country_name" },
    { Header: "device_id", accessor: "device_id" },
    { Header: "bitcoin_address", accessor: "bitcoin_address" },
    { Header: "login_ip", accessor: "login_ip" },
    { Header: "active_device_mac", accessor: "active_device_mac" },
    { Header: "notes", accessor: "notes" },
    { Header: "age", accessor: "age" },
    { Header: "referral_id", accessor: "referral_id" },
    { Header: "locale", accessor: "locale" },
    { Header: "favorite_music", accessor: "favorite_music" },
    { Header: "phone_number", accessor: "phone_number" },
    { Header: "twitter_username", accessor: "twitter_username" },
    { Header: "job", accessor: "job" },
    { Header: "invoice_email_address", accessor: "invoice_email_address" },
    { Header: "hmac_secret", accessor: "hmac_secret" },
    { Header: "favorite_quote", accessor: "favorite_quote" },
    { Header: "primary_color", accessor: "primary_color" },
    { Header: "secondary_color", accessor: "secondary_color" },
    { Header: "material", accessor: "material" },
    { Header: "shipping_address", accessor: "shipping_address" },
    { Header: "zip_code", accessor: "zip_code" },
    { Header: "latitude", accessor: "latitude" },
    { Header: "longitude", accessor: "longitude" },
    { Header: "favorite_animal", accessor: "favorite_animal" },
    { Header: "app_version", accessor: "app_version" },
    { Header: "timezone", accessor: "timezone" },
  ];

  return (
    <Box pt={"65px"} bg={"white"} width={"100%"}>
      <Box px={4} pb={2} borderBottom="1px" borderColor="gray.300" mb={2}>
        <Heading as={"h3"} size={"lg"} mb={1}>
          Users Data
        </Heading>
        <Heading as={"h5"} size={"sm"} color={"blue.600"}>
          List of Users Data
        </Heading>
      </Box>
      {userData && <TableList columns={columns} data={userData} />}
    </Box>
  );
}
