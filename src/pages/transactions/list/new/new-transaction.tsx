import React from 'react'

import { FormProvider } from 'react-hook-form'
import { tv } from 'tailwind-variants'

import { DialogContent } from '@/components/ui/dialog-content/dialog-content'
import { DialogTitle } from '@/components/ui/dialog-title/dialog-title'
import { Modal } from '@/components/ui/modal/modal'
import { ModalClose } from '@/components/ui/modal-close/modal-close'
import { ModalDialog } from '@/components/ui/modal-dialog/modal-dialog'
import { useTransactionForm } from '@/pages/transactions/components/form/use-transaction-form'
import { useNewTransactionStore } from '@/pages/transactions/list/new/use-new-transaction-store'
import { TransactionType } from '@/types/transaction'

import { Form } from './form'

const modalVariants = tv({
  slots: {
    dialog: 'border !rounded',
    title: '',
  },
  variants: {
    color: {
      CREDIT: {
        dialog: '!border-green-500',
        title: '!text-green-500',
      },
      DEBIT: {
        dialog: '!border-red-500',
        title: '!text-red-500',
      },
    },
  },
})

export interface NewTransactionProps {}

export const NewTransaction: React.FC<NewTransactionProps> = () => {
  const { transactionType, isModalOpen, setIsModalOpen, setTransactionType } =
    useNewTransactionStore()

  const { dialog, title } = modalVariants()

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
        <ModalDialog className={dialog({ color: transactionType! })}>
          <ModalClose />

          <DialogTitle className={title({ color: transactionType! })}>
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
