import React, { useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'

import { AlertDialog } from '@/components/ui/alert-dialog/alert-dialog'
import { Button } from '@/components/ui/button/button'
import { IconButton } from '@/components/ui/icon-button/icon-button'
import { Loader } from '@/components/ui/loader/loader'
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
      <AlertDialog.Root open={isOpen}>
        <AlertDialog.Trigger asChild>
          <IconButton onClick={() => setIsOpen(true)} hoverTitle="Excluir">
            <Trash className="text-error" size={18} />
          </IconButton>
        </AlertDialog.Trigger>

        <AlertDialog.Content onEscapeKeyDown={() => setIsOpen(false)}>
          <AlertDialog.Header>
            <AlertDialog.Title>
              Realmente deseja excluir esta conta bancaria?
            </AlertDialog.Title>
            <AlertDialog.Description>
              Essa ação não pode ser desfeita.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel
              disabled={isPending}
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button disabled={isPending} onClick={onSubmit}>
                <Loader isLoading={isPending} />
                Confirmar
              </Button>
            </AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}
