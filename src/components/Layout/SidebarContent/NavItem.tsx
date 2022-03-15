import { Flex, FlexProps, Icon, Link } from "@chakra-ui/react";
import React from "react";
import { LinkItemProps } from "./menuItens";

interface NavItemProps extends FlexProps {
  item: LinkItemProps;
}

const NavItem = ({ item }: NavItemProps) => {
  return (
    <Link
      href={item.path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
      >
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={item.icon}
        />

        {item.name}
      </Flex>
    </Link>
  );
};

export default NavItem;
