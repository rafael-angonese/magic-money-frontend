import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as yup from "yup";
import { AuthContext } from "../contexts/AuthContext";


interface ILoginInputs {
  email: string;
  password: string;
}

const INITIAL_FORM_STATE = {
  email: "rafael@gmail.com",
  password: "123456",
};

export const FORM_VALIDATION = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage: NextPage = () => {
  const { signIn } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginInputs>({
    resolver: yupResolver(FORM_VALIDATION),
    defaultValues: INITIAL_FORM_STATE,
  });

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
    setLoading(true);

    await signIn(data);

    setLoading(false);
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
                  <FormLabel htmlFor="email">First email</FormLabel>
                  <Input
                    {...register("email")}
                    placeholder="Digite seu e-mail"
                    height="80px"
                    backgroundColor="gray.800"
                    focusBorderColor="purple.500"
                    borderRadius="sm"
                  />
                  <FormErrorMessage fontSize="1.25rem">
                    {errors?.email?.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Box mt="1rem">
                <FormControl isInvalid={!!errors?.password}>
                  <FormLabel htmlFor="password">Senha</FormLabel>

                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Digite sua senha"
                      id="password"
                      {...register("password")}
                      height="80px"
                      backgroundColor="gray.800"
                      focusBorderColor="purple.500"
                      borderRadius="sm"
                    />

                    <InputRightElement
                      fontSize="1.4em"
                      height="80px"
                      onClick={handleClick}
                      // eslint-disable-next-line react/no-children-prop
                      children={
                        show ? (
                          <AiFillEyeInvisible color="purple.500" />
                        ) : (
                          <AiFillEye color="purple.500" />
                        )
                      }
                    />
                  </InputGroup>

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
