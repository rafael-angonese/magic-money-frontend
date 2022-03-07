import { NextPage } from "next";

import { Text, Center } from "@chakra-ui/react";

import api from "../services/api";
import { useEffect } from "react";

const DashboardPage: NextPage = () => {
  useEffect(() => {
    async function getUsers() {
      const response = await api.get("/users");

      console.log(response);
    }

    getUsers();
  }, []);

  return (
    <>
      <Center>
        <Text
          as="h1"
          fontWeight="bold"
          color="grey.50"
          fontSize="6rem"
          marginTop="1.72rem"
          lineHeight="5.75rem"
          wordBreak="break-word"
        >
          Dashboard page
          <span style={{ color: "#04e168" }}>.</span>
        </Text>
      </Center>
    </>
  );
};

export default DashboardPage;
