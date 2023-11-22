import { Button, Flex, Box, VStack, Icon } from "@chakra-ui/react";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdSpaceDashboard, MdPeople } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
import { HiSearch } from "react-icons/hi";
import { useRouter } from "next/router";

const menuItems = [
  { icon: MdSpaceDashboard, label: "Dashboard", url: "/" },
  { icon: MdPeople, label: "Users", url: "/users" },
  { icon: FaUserPlus, label: "Registration", url: "/registration" },
  { icon: HiSearch, label: "Search", url: "/search" },
];

export const Sidebar = ({ isExpandedSidebar, onToggleSidebar }) => {
  const router = useRouter();
  const sidebarWidth = isExpandedSidebar ? "250px" : "70px";
  const buttonWidth = isExpandedSidebar ? "100%" : "70px";

  const isActive = (url) => router.pathname === url;

  return (
    <Flex
      position="fixed"
      zIndex={999}
      direction="column"
      h="100vh"
      w={sidebarWidth}
      bg="gray.200"
      pt={"72px"}
      transition="width 0.3s"
      borderRight={"1px"}
      borderColor={"gray.300"}
    >
      <VStack spacing={4} align={"stretch"}>
        <Box w={buttonWidth}>
          <Button
            _hover={{
              color: "blue.600",
              boxShadow: "inset 3px 0px 0px 0px #2b6cb0",
            }}
            onClick={onToggleSidebar}
            w="100%"
            variant="ghost"
            leftIcon={<Icon as={HiMenuAlt2} />}
            justifyContent={isExpandedSidebar ? "left" : "center"}
            borderRadius={0}
          >
            {isExpandedSidebar && "Menu"}
          </Button>
        </Box>
        {menuItems.map((item, index) => (
          <Box key={index} w={buttonWidth}>
            <Button
              _hover={{
                color: "blue.600",
                boxShadow: "inset 3px 0px 0px 0px #2b6cb0",
              }}
              w="100%"
              leftIcon={<Icon as={item.icon} />}
              variant="ghost"
              justifyContent={isExpandedSidebar ? "left" : "center"}
              borderRadius={0}
              onClick={() => router.push(item.url)}
              color={isActive(item.url) && "blue.600"}
            >
              {isExpandedSidebar && item.label}
            </Button>
          </Box>
        ))}
      </VStack>
    </Flex>
  );
};
