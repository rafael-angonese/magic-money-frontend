import React from 'react'

import { Button } from '@/components/ui/button/button'
import { useNewTransactionStore } from '@/pages/transactions/list/new/use-new-transaction-store'
import { TransactionType } from '@/types/transaction'

export const FormActions: React.FC = () => {
  const { setIsModalOpen, setTransactionType } = useNewTransactionStore()

  const onNewCreditClick = () => {
    setIsModalOpen(true)
    setTransactionType(TransactionType.CREDIT)
  }

  const onNewDebitClick = () => {
    setIsModalOpen(true)
    setTransactionType(TransactionType.DEBIT)
  }

  return (
    <>
      <div className=" flex gap-2">
        <Button onClick={onNewCreditClick} color="success">
          Criar recebimento
        </Button>
        <Button onClick={onNewDebitClick} color="error">
          Criar pagamento
        </Button>
      </div>
    </>
  )
}
