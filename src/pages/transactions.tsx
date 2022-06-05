import {
  Center,
  GridItem,
  IconButton,
  Progress,
  SimpleGrid,
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
import { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { ITransaction } from "../@types/accounts/transactions";
import InputMonth from "../components/InputMonth/InputMonth";
import TransactionForm from "../components/pages/transactions/TransactionForm";
import { AccountContext } from "../contexts/AccountContext";
import api from "../services/api";
import handlingErrors from "../utils/handlingErrors";
import toQueryString from "../utils/toQueryString";

export interface ITransactionFormatted extends ITransaction {
  formattedDate: string;
  color: string;
  formattedAmount: string;
}

const CategoriesPage: NextPage = () => {
  const [transactions, setTransactions] = useState<ITransactionFormatted[]>([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState<Date>(new Date());
  const { account } = useContext(AccountContext);
  const [editTransaction, setEditTransaction] =
    useState<ITransactionFormatted | null>(null);

  const handlingDeleteTransaction = async (id: string) => {
    const toastId = toast.loading("Excluindo...");

    try {
      await api.delete(`/transactions/${id}`);

      const TransactionForms = transactions.filter(
        (transaction) => transaction.id !== id
      );

      setTransactions(TransactionForms);

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

      const search = {
        account_id: account?.id,
        month: month,
      };

      const query = toQueryString(search);

      const { data } = await api.get<ITransaction[]>(`/transactions/${query}`);

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
      setLoading(false);
    }
  }

  useEffect(() => {
    if (account) {
      getTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, month]);

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
      <TransactionForm
        transaction={editTransaction}
        onClose={(refresh: boolean) => {
          setEditTransaction(null);
          if (refresh) {
            getTransactions();
          }
        }}
      />

      <SimpleGrid marginY={6} columns={12} spacing={10}>
        <GridItem colSpan={2}>
          <InputMonth value={month} onChange={(date) => setMonth(date)} />
        </GridItem>
      </SimpleGrid>

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
                    <Link href={`/categories/show/${transaction.id}`} passHref>
                      <IconButton
                        aria-label="Visualizar"
                        color="green.400"
                        variant="ghost"
                        fontSize="20px"
                        icon={<AiOutlineEye />}
                      />
                    </Link>

                    <IconButton
                      aria-label="Editar"
                      color="yellow.400"
                      variant="ghost"
                      fontSize="20px"
                      icon={<AiOutlineEdit />}
                      onClick={() => setEditTransaction(transaction)}
                    />

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
