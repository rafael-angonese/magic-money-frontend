
interface ICategoryType {
  type: string;
  name: string;
}

export const categoryTypes: ICategoryType[] = [
  { type: 'debit', name: 'Despesa' },
  { type: 'credit', name: 'Receita' },
]
