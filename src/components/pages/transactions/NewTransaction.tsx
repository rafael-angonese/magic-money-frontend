import { Button, Flex } from "@chakra-ui/react";
import React from "react";

const NewTransaction: React.FC = () => {

  return (
    <>
      <Flex justifyContent="flex-start">
        <Button marginRight="1rem" colorScheme="red">
          Criar recebimento
        </Button>
        <Button marginRight="1rem" colorScheme="green">
          Criar pagamento
        </Button>
        <Button marginRight="1rem" colorScheme="blue">
          Criar transferência
        </Button>
      </Flex>

    </>
  );
};

export default NewTransaction;
