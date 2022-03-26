import { IAccount } from "./accounts";

export interface IBankAccount {
  id: string;
  user_id: string;
  account_id: string;
  name: string;
  balance: number;
  account?: IAccount
}
