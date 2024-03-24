import React, { useState } from 'react'

import { Button } from '@/components/ui/button/button'

export const FormActions: React.FC = () => {
  const [isShowForm, setIsShowForm] = useState(false)

  const onNewFormClick = () => {
    setIsShowForm(true)
  }

  return (
    <>
      <div className=" flex gap-2">
        <Button onClick={onNewFormClick} color="success">
          Criar recebimento
        </Button>
        <Button onClick={onNewFormClick} color="error">
          Criar pagamento
        </Button>
      </div>

      {isShowForm && <>Novo recebimento</>}
    </>
  )
}
