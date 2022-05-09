
interface ICategoryType {
  type: string;
  name: string;
}

export const categoryTypes: ICategoryType[] = [
  { type: 'expense', name: 'Despesa' },
  { type: 'revenue', name: 'Receita' },
]
