import React, { useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button/button'
import { DialogContent } from '@/components/ui/dialog-content/dialog-content'
import { DialogTitle } from '@/components/ui/dialog-title/dialog-title'
import { IconButton } from '@/components/ui/icon-button/icon-button'
import { Loader } from '@/components/ui/loader/loader'
import { Modal } from '@/components/ui/modal/modal'
import { ModalClose } from '@/components/ui/modal-close/modal-close'
import { ModalDialog } from '@/components/ui/modal-dialog/modal-dialog'
import { mutationKeys, queryKeys } from '@/constants/react-query-keys'
import { deleteBankAccount } from '@/repositories/bank-accounts/delete-bank-account'

export interface DeleteBankAccountProps {
  bankAccountId: string
}

export const DeleteBankAccount: React.FC<DeleteBankAccountProps> = ({
  bankAccountId,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [mutationKeys.bankAccounts.delete],
    mutationFn: deleteBankAccount,
    onSuccess: () => {
      setIsOpen(false)
      queryClient.invalidateQueries({
        queryKey: [queryKeys.bankAccounts],
      })
    },
  })

  const onSubmit = () => {
    try {
      mutateAsync(bankAccountId)
    } catch (error) {}
  }

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)} hoverTitle="Excluir">
        <Trash className="text-error" size={18} />
      </IconButton>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ModalDialog>
          <ModalClose />

          <DialogTitle>
            Realmente deseja excluir esta conta bancaria?
          </DialogTitle>
          <DialogContent>Essa ação não pode ser desfeita.</DialogContent>

          <div className="flex justify-end gap-2">
            <Button
              color="secondary"
              disabled={isPending}
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>

            <Button disabled={isPending} onClick={onSubmit}>
              <Loader isLoading={isPending} />
              Confirmar
            </Button>
          </div>
        </ModalDialog>
      </Modal>
    </>
  )
}
