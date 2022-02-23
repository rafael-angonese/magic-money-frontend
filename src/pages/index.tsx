import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

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

import Head from "next/head";

import Input from "../components/Input";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const handleLogin = async (event: any) => {
    event.preventDefault();

    // const schema = yup.object().shape({
    //     email: yup.string().required().email(),
    //     password: yup.string().required()
    // });

    const data = {
      email: login,
      password: password,
    };

    // const validation = await yupValidator(schema, data);
    // setError(validation);
    // if (validation) return;

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
      setError(error);
      toast({
        title: "Crendecias inválidas",
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

            <Box>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Digite seu e-mail"
                  height="80px"
                  value={login}
                  onChange={(event) => setLogin(event.target.value)}
                />
                <FormErrorMessage fontSize="1.25rem">
                  {/* {form.errors.name} */}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box mt="1rem">
              <FormControl isInvalid={true}>
                <FormLabel htmlFor="password">Senha</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="Digite sua senha"
                    height="80px"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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
                <FormErrorMessage fontSize="1.25rem">
                  senha invalida
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Button
              as="button"
              isLoading={false}
              marginTop="1.2rem"
              type="submit"
              bg="purple.400"
              _hover={{ bg: "purple.500" }}
              height="76px"
            >
              <Text fontSize="1.24rem">ENTRAR</Text>
            </Button>
          </Flex>
        </Center>
      </SimpleGrid>
    </>
  );
};

export default LoginPage;
