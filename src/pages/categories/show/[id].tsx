import {
  Button,
  Center,
  Container,
  Flex,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { ICategory } from "../../../@types/accounts/categories";
import api from "../../../services/api";
import handlingErrors from "../../../utils/handlingErrors";
import isPresent from "../../../utils/isPresent";

const CategoryShowPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [account, setAccount] = useState<ICategory | null>(null);

  const handlingDeleteAccount = async () => {
    const toastId = toast.loading("Excluindo...");

    try {
      const response = await api.delete(`/categories/${id}`);

      toast.update(toastId, {
        render: "Registro excluído com sucesso!",
        type: "success",
        isLoading: false,
      });

      router.push("/categories");
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
    async function getCategory() {
      try {
        const response = await api.get<ICategory>(`/categories/${id}`);

        setAccount(response.data);
      } catch (error) {
        handlingErrors(error);
      }
    }

    if (isPresent(id)) {
      getCategory();
    }
  }, [id]);

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
          Visualizando Categoria
          <span style={{ color: "#04e168" }}>.</span>
        </Text>
      </Center>

      <Container maxW="container.xl" marginTop="1.72rem">
        <Flex justifyContent="flex-end">
          <Link href={`/categories/edit/${id}`} passHref>
            <Button leftIcon={<AiOutlineEdit />} color="yellow.400" mr="4">
              Editar
            </Button>
          </Link>

          <Button
            leftIcon={<AiOutlineDelete />}
            color="red.400"
            onClick={handlingDeleteAccount}
          >
            Excluir
          </Button>
        </Flex>
        <SimpleGrid columns={3} spacing={10}>
          <GridItem colSpan={1}>
            <FormLabel>Nome</FormLabel>
            <Input value={account?.name} disabled />
          </GridItem>
          <GridItem colSpan={1}>
            <FormLabel>Tipo</FormLabel>
            <Input value={account?.type} disabled />
          </GridItem>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default CategoryShowPage;
