import {
  Button,
  Center,
  Container, FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { IAccount } from "../../../@types/accounts/accounts";
import api from "../../../services/api";
import handlingErrors from "../../../utils/handlingErrors";
import isPresent from "../../../utils/isPresent";

interface IAccountFields {
  name: string;
  description: string;
}

const INITIAL_FORM_STATE = {
  name: "",
  description: "",
};

export const FORM_VALIDATION = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});

const AccountEditPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<IAccount | null>(null);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<IAccountFields>({
    resolver: yupResolver(FORM_VALIDATION),
    defaultValues: INITIAL_FORM_STATE,
  });

  const onSubmit = async (data: IAccountFields) => {
    setLoading(true);

    try {
      const response = await api.put(`/accounts/${id}`, data);

      toast.success("Registro criado com sucesso!");

      router.push("/accounts");
    } catch (error) {
      toast.error("Não foi possível criar esse registro!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getAccount() {
      try {
        const response = await api.get<IAccount>(`/accounts/${id}`);

        setAccount(response.data);

        setValue("name", response.data.name);
        setValue("description", response.data.description);
      } catch (error) {
        handlingErrors(error);
      }
    }

    if (isPresent(id)) {
      getAccount();
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
          Editando Conta
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
            <GridItem colSpan={2}>
              <FormControl isInvalid={!!errors?.description}>
                <FormLabel>Descrição</FormLabel>
                <Input {...register("description")} />
                <FormErrorMessage fontSize="1.25rem">
                  {errors?.description?.message}
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

export default AccountEditPage;
