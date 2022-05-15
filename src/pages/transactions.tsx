import {
  Center,
  IconButton,
  Progress,
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
import { ITransaction } from "../@types/accounts/transactions";
import NewTransaction from "../components/pages/transactions/NewTransaction";
import api from "../services/api";
import handlingErrors from "../utils/handlingErrors";

interface ITransactionFormatted extends ITransaction {
  formattedDate: string;
  color: string;
  formattedAmount: string;
}

const CategoriesPage: NextPage = () => {
  const [transactions, setTransactions] = useState<ITransactionFormatted[]>([]);
  const [loading, setLoading] = useState(true);

  const handlingDeleteTransaction = async (id: string) => {
    const toastId = toast.loading("Excluindo...");

    try {
      await api.delete(`/transactions/${id}`);

      const newTransactions = transactions.filter(
        (transaction) => transaction.id !== id
      );

      setTransactions(newTransactions);

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

  async function getTransactions() {
    try {
      setLoading(true);
      const { data } = await api.get<ITransaction[]>("/transactions");

      const newData = data.map((transaction: ITransaction) => {
        return {
          ...transaction,
          formattedDate: new Date(transaction.date).toLocaleDateString("pt-BR"),
          color: transaction.type === "credit" ? "green.400" : "red.400",
          formattedAmount: transaction.amount.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          }),
        };
      });

      setTransactions(newData);
      setLoading(false);
    } catch (error) {
      handlingErrors(error);
    }
  }

  useEffect(() => {
    getTransactions();
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
          Transações
          <span style={{ color: "#04e168" }}>.</span>
        </Text>
      </Center>
      <NewTransaction refreshGridAction={() => getTransactions()} />

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Ações</Th>
            <Th>Data</Th>
            <Th>Categoria</Th>
            <Th>Descrição</Th>
            <Th>Valor</Th>
            <Th>Conta</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions &&
            transactions.map((transaction) => {
              return (
                <Tr key={transaction.id}>
                  <Td>
                    <Link href={`/categories/show/${transaction.id}`}>
                      <IconButton
                        aria-label="Visualizar"
                        color="green.400"
                        variant="ghost"
                        fontSize="20px"
                        icon={<AiOutlineEye />}
                      />
                    </Link>

                    <Link href={`/categories/edit/${transaction.id}`}>
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
                      onClick={() => handlingDeleteTransaction(transaction.id)}
                      icon={<AiOutlineDelete />}
                    />
                  </Td>
                  <Td>{transaction.formattedDate}</Td>
                  <Td>{transaction.category?.name}</Td>
                  <Td>{transaction.description}</Td>
                  <Td color={transaction.color}>
                    {transaction.formattedAmount}
                  </Td>
                  <Td>{transaction.bankAccount.name}</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>

      {loading && <Progress my={2} size="xs" isIndeterminate />}
    </>
  );
};

export default CategoriesPage;