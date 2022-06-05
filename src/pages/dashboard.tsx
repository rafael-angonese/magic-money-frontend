import { Center, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";
import api from "../services/api";

const DashboardPage: NextPage = () => {
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await api.get("/users");
        console.log(response);
      } catch (error) {}
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
          Dashboard
          <span style={{ color: "#04e168" }}>.</span>
        </Text>
      </Center>
    </>
  );
};

export default DashboardPage;
