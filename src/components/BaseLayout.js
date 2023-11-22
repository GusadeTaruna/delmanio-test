import { useState, useEffect } from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { NavigationBar } from "./NavigationBar";

export const BaseLayout = ({ children }) => {
  const [isExpandedSidebar, setIsExpandedSidebar] = useState(true);
  const [localStorageChecked, setLocalStorageChecked] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

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
    <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
      <NavigationBar />
      <Flex>
        <Sidebar
          isExpandedSidebar={isExpandedSidebar}
          onToggleSidebar={() => setIsExpandedSidebar(!isExpandedSidebar)}
        />
        <Flex
          width={"100%"}
          marginLeft={isExpandedSidebar ? "250px" : "70px"}
          transition="margin-left 0.3s"
        >
          {children}
        </Flex>
      </Flex>
    </div>
  );
};
