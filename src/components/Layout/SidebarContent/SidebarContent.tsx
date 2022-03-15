import { Box, BoxProps, CloseButton, Flex, Text } from "@chakra-ui/react";
import React from "react";
import menuItens from "./menuItens";
import NavItem from "./NavItem";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <>
      <Box
        transition="3s ease"
        bg="gray.900"
        borderRight="1px"
        borderRightColor="gray.700"
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex
          display={{ base: "flex", md: "none" }}
          h="20"
          alignItems="center"
          mx="8"
          justifyContent="space-between"
        >
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
          <CloseButton onClick={onClose} />
        </Flex>
        {menuItens.map((link) => (
          <NavItem key={link.path} item={link} />
        ))}
      </Box>
    </>
  );
};

export default SidebarContent;
