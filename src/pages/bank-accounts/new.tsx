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
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { IAccount } from "../../@types/accounts/accounts";
import api from "../../services/api";
import handlingErrors from "../../utils/handlingErrors";

interface IBankAccountFields {
  name: string;
  balance: number;
  account_id: string;
}

const INITIAL_FORM_STATE = {
  name: "",
  balance: 0,
  account_id: "",
};

export const FORM_VALIDATION = yup.object().shape({
  name: yup.string().required(),
  balance: yup.number().required(),
  account_id: yup.string().required(),
});

const NewAccountPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IBankAccountFields>({
    resolver: yupResolver(FORM_VALIDATION),
    defaultValues: INITIAL_FORM_STATE,
  });

  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  const onSubmit = async (data: IBankAccountFields) => {
    setLoading(true);

    try {
      const response = await api.post("/bank-accounts", data);

      toast.success("Registro criado com sucesso!");

      Router.push("/bank-accounts");
    } catch (error) {
      toast.error("Não foi possível criar esse registro!");
    } finally {
      setLoading(false);
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
          Criar Conta
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
              <FormControl isInvalid={!!errors?.balance}>
                <FormLabel>Saldo</FormLabel>
                <Input type="number" {...register("balance")} />
                <FormErrorMessage fontSize="1.25rem">
                  {errors?.balance?.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem colSpan={1}>
              <FormControl isInvalid={!!errors?.account_id}>
                <FormLabel>Conta</FormLabel>
                <Select
                  placeholder="Selecione uma Conta"
                  {...register("account_id")}
                >
                  {accounts.map((account) => {
                    return <option value={account.id}>{account.name}</option>;
                  })}
                </Select>
                <FormErrorMessage fontSize="1.25rem">
                  {errors?.account_id?.message}
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

export default NewAccountPage;
