import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Flex,
  Text,
  Center,
  Heading,
  FormControl,
  Box,
  FormErrorMessage,
  SimpleGrid,
  Button,
  FormLabel,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import Input from "../components/Input";

interface ILoginInputs {
  email: string;
  password: string;
}

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

export const FORM_VALIDATION = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginInputs>({
    resolver: yupResolver(FORM_VALIDATION),
    defaultValues: INITIAL_FORM_STATE,
  });



  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const onSubmit: SubmitHandler<ILoginInputs> = (data) => {
    console.log(data);

    setLoading(true);

    try {
      // const response = await axios.post('/authenticate', data);

      // await setAuthToken(response.data.token);

      setLoading(false);

      toast({
        title: "Login efetuado com sucesso!",
        status: "success",
        position: "top-right",
        isClosable: true,
      });
      router.push("/chats");
    } catch (error) {
      setLoading(false);
      // setError(error);
      toast({
        title: "Credências inválidas",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 1, lg: 2 }}
        p="5%"
        spacing={10}
        height="100vh"
      >
        <Center>
          <Flex flexDirection="column">
            <Text
              as="h1"
              fontWeight="bold"
              color="grey.50"
              fontSize="6rem"
              marginTop="1.72rem"
              lineHeight="5.75rem"
              wordBreak="break-word"
            >
              Contando os <br /> plaque de 100
              <span style={{ color: "#04e168" }}>.</span>
            </Text>
            <Text color="grey.50" fontSize="2rem" mt="1.75rem">
              Simplificando a gestão financeira para gnomos e fadas do mundo
              mágico.
            </Text>
          </Flex>
        </Center>

        <Center>
          <Flex
            flexDirection="column"
            maxW="600px"
            width="100%"
            height="100%"
            maxH="600px"
            padding="2.75rem 2.75rem"
            bg="gray.600"
            borderRadius="md"
          >
            <Heading
              textAlign="center"
              color="grey.50"
              fontWeight="bold"
              fontSize="2.25rem"
              marginBottom={8}
            >
              Faça seu login
            </Heading>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <FormControl isInvalid={!!errors?.email}>
                  <FormLabel>Email</FormLabel>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="email"
                        placeholder="Digite seu e-mail"
                        height="80px"
                        {...field}
                      />
                    )}
                  />
                  <FormErrorMessage fontSize="1.25rem">
                    {errors?.email?.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Box mt="1rem">
                <FormControl isInvalid={!!errors?.password}>
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <InputGroup>
                        <Input
                          type={show ? "text" : "password"}
                          placeholder="Digite sua senha"
                          height="80px"
                          {...field}
                        />

                        <InputRightElement
                          fontSize="1.4em"
                          height="80px"
                          onClick={handleClick}
                          children={
                            show ? (
                              <ViewIcon color="purple.500" />
                            ) : (
                              <ViewOffIcon color="purple.500" />
                            )
                          }
                        />
                      </InputGroup>
                    )}
                  />
                  <FormErrorMessage fontSize="1.25rem">
                    {errors?.password?.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Button
                as="button"
                marginTop="1.2rem"
                type="submit"
                bg="purple.400"
                _hover={{ bg: "purple.500" }}
                height="76px"
                width="100%"
                isLoading={loading}
              >
                <Text fontSize="1.24rem">ENTRAR</Text>
              </Button>
            </form>
          </Flex>
        </Center>
      </SimpleGrid>
    </>
  );
};

export default LoginPage;
