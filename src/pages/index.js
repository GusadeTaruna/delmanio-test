import { Box, Heading, useToast } from "@chakra-ui/react";
import { useQuery } from "react-query";
import TableList from "@/components/Table";
import { getSalesData } from "@/services/GET_SalesData";
import { useEffect } from "react";

const Home = () => {
  const toast = useToast();
  const { isLoading, data: salesData } = useQuery("salesData", getSalesData);

  useEffect(() => {
    if (isLoading) {
      toast({
        title: "Loading Sales Data...",
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
    { Header: "sales_id", accessor: "sales_id" },
    { Header: "item_id", accessor: "item_id" },
    { Header: "qty", accessor: "qty" },
    { Header: "consumen_name", accessor: "consumen_name" },
    { Header: "transaction_date", accessor: "transaction_date" },
  ];

  return (
    <Box pt={"65px"} bg={"white"} width={"100%"}>
      <Box px={4} pb={2} borderBottom="1px" borderColor="gray.300" mb={2}>
        <Heading as={"h3"} size={"lg"} mb={1}>
          Sales Dashboard
        </Heading>
        <Heading as={"h5"} size={"sm"} color={"blue.600"}>
          List of Sales Data
        </Heading>
      </Box>
      {salesData && <TableList columns={columns} data={salesData} />}
    </Box>
  );
};

export default Home;
