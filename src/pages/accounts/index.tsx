import {
  Button,
  Center,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { IAccount } from "../../@types/accounts/accounts";
import api from "../../services/api";
import handlingErrors from "../../utils/handlingErrors";

const AccountsPage: NextPage = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  const handlingDeleteAccount = async (id: string) => {
    const toastId = toast.loading("Excluindo...");

    try {
      const response = await api.delete(`/accounts/${id}`);

      const newAccounts = accounts.filter((account) => account.id !== id);

      setAccounts(newAccounts);

      toast.update(toastId, {
        render: "Registro excluído com sucesso!",
        type: "success",
        isLoading: false,
      });
    } catch (error) {
      // fix https://github.com/fkhadra/react-toastify/issues/720
      setTimeout(() => {
        toast.update(toastId, {
          render: "Não foi possível excluir esse registro!",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }, 100);
    }
  };

  useEffect(() => {
    async function getAccounts() {
      try {
        const response = await api.get<IAccount[]>("/accounts");

        setAccounts(response.data);
      } catch (error) {
        handlingErrors(error);
      }
    }

    getAccounts();
  }, []);

  return (
    <>
      <Center>
        <Text
          as="h1"
          fontWeight="bold"
          color="grey.50"
          fontSize="4rem"
          marginTop="1.72rem"
          lineHeight="5.75rem"
          wordBreak="break-word"
        >
          Contas
          <span style={{ color: "#04e168" }}>.</span>
        </Text>
      </Center>
      <Flex justifyContent="flex-end">
        <Link href={"/accounts/new"}>
          <Button colorScheme="teal">Nova Conta</Button>
        </Link>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Ações</Th>
            <Th>Nome</Th>
            <Th>Descrição</Th>
          </Tr>
        </Thead>
        <Tbody>
          {accounts &&
            accounts.map((account) => {
              return (
                <Tr key={account.id}>
                  <Td>
                    <Link href={`/accounts/show/${account.id}`}>
                      <IconButton
                        aria-label="Visualizar"
                        color="green.400"
                        variant="ghost"
                        fontSize="20px"
                        icon={<AiOutlineEye />}
                      />
                    </Link>

                    <Link href={`/accounts/edit/${account.id}`}>
                      <IconButton
                        aria-label="Editar"
                        color="yellow.400"
                        variant="ghost"
                        fontSize="20px"
                        icon={<AiOutlineEdit />}
                      />
                    </Link>

                    <IconButton
                      aria-label="Excluir"
                      color="red.400"
                      variant="ghost"
                      fontSize="20px"
                      onClick={() => handlingDeleteAccount(account.id)}
                      icon={<AiOutlineDelete />}
                    />
                  </Td>
                  <Td>{account.name}</Td>
                  <Td>{account.description}</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </>
  );
};

export default AccountsPage;
