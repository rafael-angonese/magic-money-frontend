import React, { useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/ui/button/button'
import { DialogContent } from '@/components/ui/dialog-content/dialog-content'
import { DialogTitle } from '@/components/ui/dialog-title/dialog-title'
import { Loader } from '@/components/ui/loader/loader'
import { Modal } from '@/components/ui/modal/modal'
import { ModalClose } from '@/components/ui/modal-close/modal-close'
import { ModalDialog } from '@/components/ui/modal-dialog/modal-dialog'
import { queryKeys } from '@/constants/react-query-keys'
import { useDeleteBankAccountStore } from '@/pages/bank-accounts/components/delete-bank-account-modal/use-delete-bank-account-store'
import { deleteBankAccount } from '@/repositories/bank-accounts/delete-bank-account'
import handlingRequestError from '@/utils/handling-request-error'

interface DeleteBankAccountModalProps {
  onSuccess?: () => void
}

export const DeleteBankAccountModal: React.FC<DeleteBankAccountModalProps> = ({
  onSuccess,
}) => {
  const { id, setId, isModalOpen, setIsModalOpen } = useDeleteBankAccountStore()
  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      await deleteBankAccount(id!)

      queryClient.invalidateQueries({
        queryKey: [queryKeys.bankAccounts],
      })
      onClose()
      onSuccess && onSuccess()
    } catch (error) {
      handlingRequestError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onClose = () => {
    setId(null)
    setIsModalOpen(false)
  }

  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isModalOpen}
        onClose={onClose}
      >
        <ModalDialog>
          <ModalClose />

          <DialogTitle>
            Realmente deseja excluir esta conta bancaria?
          </DialogTitle>
          <DialogContent>Essa ação não pode ser desfeita.</DialogContent>

          <div className="flex justify-end gap-2">
            <Button color="secondary" disabled={isLoading} onClick={onClose}>
              Cancelar
            </Button>

            <Button disabled={isLoading} onClick={onSubmit}>
              <Loader isLoading={isLoading} />
              Confirmar
            </Button>
          </div>
        </ModalDialog>
      </Modal>
    </>
  )
}
