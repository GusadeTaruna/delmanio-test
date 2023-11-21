import {
  Button,
  Flex,
  Box,
  VStack,
  Icon,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
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

export const Sidebar = () => {
  const router = useRouter();
  const [isExpandedSidebar, setIsExpandedSidebar] = useState(true);
  const [localStorageChecked, setLocalStorageChecked] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const sidebarWidth = isExpandedSidebar ? "250px" : "70px";
  const buttonWidth = isExpandedSidebar ? "100%" : "70px";

  const isActive = (url) => router.pathname === url;

  useEffect(() => {
    const storedSidebarState = localStorage.getItem("sidebarState");
    setIsExpandedSidebar(storedSidebarState === "expanded" && !isMobile);
    setLocalStorageChecked(true);
  }, [isMobile]);

  useEffect(() => {
    if (localStorageChecked) {
      localStorage.setItem(
        "sidebarState",
        isExpandedSidebar ? "expanded" : "collapsed"
      );
    }
  }, [isExpandedSidebar, localStorageChecked]);

  if (!localStorageChecked) {
    return null;
  }

  return (
    <Flex
      direction="column"
      h="100vh"
      w={sidebarWidth}
      bg="gray.200"
      pt={"72px"}
      transition="width 0.3s"
    >
      <VStack spacing={4} align={"stretch"}>
        <Box w={buttonWidth}>
          <Button
            _hover={{
              color: "blue.600",
              boxShadow: "inset 3px 0px 0px 0px #2b6cb0",
            }}
            onClick={() => setIsExpandedSidebar(!isExpandedSidebar)}
            w="100%"
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
