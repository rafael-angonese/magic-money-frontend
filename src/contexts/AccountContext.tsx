import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IAccount } from "../@types/accounts/accounts";
import { ACCOUNT_KEY } from "../config/constants";
import api from "../services/api";
import handlingErrors from "../utils/handlingErrors";

interface IAccountProviderProps {
  children: ReactNode;
}

interface IAccountContextType {
  accounts: IAccount[];
  account: IAccount | null;
  changeAccount: (account_id: string) => void;
}
export const AccountContext = createContext({} as IAccountContextType);

export function AccountProvider({ children }: IAccountProviderProps) {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [account, setAccount] = useState<IAccount | null>(null);

  const getAccounts = async () => {
    try {
      const { data } = await api.get<IAccount[]>("/accounts");

      setAccounts(data);
    } catch (error) {
      handlingErrors(error);
    }
  };

  useEffect(() => {
    const storagedAccount = localStorage.getItem(ACCOUNT_KEY);

    if (storagedAccount) {
      setAccount(JSON.parse(storagedAccount));
    }

    getAccounts();
  }, []);

  async function changeAccount(account_id: string) {

    const newAccount = accounts.find((item) => item.id === account_id)

    if(newAccount) {
      setAccount(newAccount);

      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(newAccount));

      toast.success("Conta alterada com sucesso!");
    }

  }

  return (
    <AccountContext.Provider value={{ account, changeAccount, accounts }}>
      {children}
    </AccountContext.Provider>
  );
}
