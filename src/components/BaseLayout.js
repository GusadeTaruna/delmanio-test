import { Sidebar } from "./Sidebar";
import { NavigationBar } from "./NavigationBar";
import { Flex } from "@chakra-ui/react";

export const BaseLayout = ({ children }) => {
  return (
    <div>
      <NavigationBar />
      <Flex>
        <Sidebar />
        {children}
      </Flex>
    </div>
  );
};
