import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  Select,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { categoryTypes } from "../../constants/categoryTypes";
import api from "../../services/api";

interface ICategoryFields {
  name: string;
  type: string;
}

const INITIAL_FORM_STATE = {
  name: "",
  type: "entry",
};

export const FORM_VALIDATION = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
});

const NewCategoryPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICategoryFields>({
    resolver: yupResolver(FORM_VALIDATION),
    defaultValues: INITIAL_FORM_STATE,
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ICategoryFields) => {
    setLoading(true);

    try {
      const response = await api.post("/categories", data);

      toast.success("Registro criado com sucesso!");

      Router.push("/categories");
    } catch (error) {
      toast.error("Não foi possível criar esse registro!");
    } finally {
      setLoading(false);
    }
  };

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
          Criar Categoria
          <span style={{ color: "#04e168" }}>.</span>
        </Text>
      </Center>

      <Container maxW="container.xl" marginTop="1.72rem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={3} spacing={10}>
            <GridItem colSpan={1}>
              <FormControl isInvalid={!!errors?.name}>
                <FormLabel>Nome</FormLabel>
                <Input {...register("name")} />
                <FormErrorMessage fontSize="1.25rem">
                  {errors?.name?.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem colSpan={1}>
              <FormControl isInvalid={!!errors?.type}>
                <FormLabel>Tipo</FormLabel>
                <Select placeholder="Selecione o tipo" {...register("type")}>
                  {categoryTypes.map((type) => {
                    return <option value={type.type}>{type.name}</option>;
                  })}
                </Select>
                <FormErrorMessage fontSize="1.25rem">
                  {errors?.type?.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem colSpan={3}>
              <Button
                bg="purple.400"
                size="lg"
                _hover={{ bg: "purple.500" }}
                type="submit"
                isLoading={loading}
              >
                Salvar
              </Button>
            </GridItem>
          </SimpleGrid>
        </form>
      </Container>
    </>
  );
};

export default NewCategoryPage;
