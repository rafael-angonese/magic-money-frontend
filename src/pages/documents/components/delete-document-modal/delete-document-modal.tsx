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
import { useDeleteDocumentStore } from '@/pages/documents/components/delete-document-modal/use-delete-document-store'
import { deleteDocument } from '@/repositories/documents/delete-document'
import handlingRequestError from '@/utils/handling-request-error'

interface DeleteDocumentModalProps {
  onSuccess?: () => void
}

export const DeleteDocumentModal: React.FC<DeleteDocumentModalProps> = ({
  onSuccess,
}) => {
  const { id, setId, isModalOpen, setIsModalOpen } = useDeleteDocumentStore()
  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      await deleteDocument(id!)

      queryClient.invalidateQueries({
        queryKey: [queryKeys.documents],
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

          <DialogTitle>Realmente deseja excluir este documento?</DialogTitle>
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
