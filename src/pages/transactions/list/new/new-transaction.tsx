import React from 'react'

import { FormProvider } from 'react-hook-form'

import { DialogContent } from '@/components/ui/dialog-content/dialog-content'
import { DialogTitle } from '@/components/ui/dialog-title/dialog-title'
import { Modal } from '@/components/ui/modal/modal'
import { ModalClose } from '@/components/ui/modal-close/modal-close'
import { ModalDialog } from '@/components/ui/modal-dialog/modal-dialog'
import { useTransactionForm } from '@/pages/transactions/components/form/use-transaction-form'
import { useNewTransactionStore } from '@/pages/transactions/list/new/use-new-transaction-store'
import { TransactionType } from '@/types/transaction'

import { Form } from './form'

export interface NewTransactionProps {}

export const NewTransaction: React.FC<NewTransactionProps> = () => {
  const { transactionType, isModalOpen, setIsModalOpen, setTransactionType } =
    useNewTransactionStore()

  const methods = useTransactionForm()

  const onCloseClick = () => {
    setIsModalOpen(false)
    setTransactionType(null)
  }

  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isModalOpen}
        onClose={onCloseClick}
      >
        <ModalDialog>
          <ModalClose />

          <DialogTitle>
            Novo{' '}
            {transactionType && transactionType === TransactionType.DEBIT
              ? 'pagamento'
              : 'recebimento'}
          </DialogTitle>
          <DialogContent>Essa ação não pode ser desfeita.</DialogContent>

          <FormProvider {...methods}>
            <Form />
          </FormProvider>
        </ModalDialog>
      </Modal>
    </>
  )
}
