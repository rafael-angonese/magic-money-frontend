import React from 'react'

import { Pencil, Trash } from 'lucide-react'

import { Link } from '@/components/link/link'
import { IconButton } from '@/components/ui/icon-button/icon-button'
import { useDeleteDocumentStore } from '@/pages/documents/components/delete-document-modal/use-delete-document-store'
import { Document } from '@/types/document'

export interface ActionsProps {
  document: Document
}

export const Actions: React.FC<ActionsProps> = ({ document }) => {
  const { setId, setIsModalOpen } = useDeleteDocumentStore()

  const onDeleteClick = () => {
    setId(document.id)
    setIsModalOpen(true)
  }

  return (
    <>
      <IconButton hoverTitle="Editar" asChild>
        <Link to={`/documents/edit/${document.id}`}>
          <Pencil className="text-warning" size={18} />
        </Link>
      </IconButton>
      <IconButton onClick={onDeleteClick} hoverTitle="Excluir">
        <Trash className="text-error" size={18} />
      </IconButton>
    </>
  )
}
