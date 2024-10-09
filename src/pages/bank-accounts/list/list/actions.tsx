import React from 'react'

import { Pencil, Trash } from 'lucide-react'

import { Link } from '@/components/link/link'
import { IconButton } from '@/components/ui/icon-button/icon-button'
import { useDeleteBankAccountStore } from '@/pages/bank-accounts/components/delete-bank-account-modal/use-delete-bank-account-store'
import { BankAccount } from '@/types/bank-account'

export interface ActionsProps {
  bankAccount: BankAccount
}

export const Actions: React.FC<ActionsProps> = ({ bankAccount }) => {
  const { setId, setIsModalOpen } = useDeleteBankAccountStore()

  const onDeleteClick = () => {
    setId(bankAccount.id)
    setIsModalOpen(true)
  }

  return (
    <>
      <IconButton hoverTitle="Editar" asChild>
        <Link to={`/bank-accounts/edit/${bankAccount.id}`}>
          <Pencil className="text-warning" size={18} />
        </Link>
      </IconButton>
      <IconButton onClick={onDeleteClick} hoverTitle="Excluir">
        <Trash className="text-error" size={18} />
      </IconButton>
    </>
  )
}
