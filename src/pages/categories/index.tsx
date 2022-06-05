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
  Tr
} from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { ICategory } from "../../@types/accounts/categories";
import api from "../../services/api";
import handlingErrors from "../../utils/handlingErrors";

const CategoriesPage: NextPage = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const handlingDeleteAccount = async (id: string) => {
    const toastId = toast.loading("Excluindo...");

    try {
      const response = await api.delete(`/categories/${id}`);

      const newCategories = categories.filter((category) => category.id !== id);

      setCategories(newCategories);

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
    async function getCategories() {
      try {
        const response = await api.get<ICategory[]>("/categories");

        setCategories(response.data);
      } catch (error) {
        handlingErrors(error);
      }
    }

    getCategories();
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
          Categorias
          <span style={{ color: "#04e168" }}>.</span>
        </Text>
      </Center>
      <Flex justifyContent="flex-end">
        <Link href={"/categories/new"} passHref>
          <Button colorScheme="teal">Nova Categoria</Button>
        </Link>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Ações</Th>
            <Th>Nome</Th>
            <Th>Tipo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories &&
            categories.map((account) => {
              return (
                <Tr key={account.id}>
                  <Td>
                    <Link href={`/categories/show/${account.id}`} passHref>
                      <IconButton
                        aria-label="Visualizar"
                        color="green.400"
                        variant="ghost"
                        fontSize="20px"
                        icon={<AiOutlineEye />}
                      />
                    </Link>

                    <Link href={`/categories/edit/${account.id}`} passHref>
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
                  <Td>{account.type}</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </>
  );
};

export default CategoriesPage;
