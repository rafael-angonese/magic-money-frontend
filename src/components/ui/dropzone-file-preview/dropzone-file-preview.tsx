import React, { ReactNode } from 'react'

import { File, Trash } from 'lucide-react'

import { Tooltip } from '@/components/ui/tooltip/tooltip'

interface DropzoneFilePreviewProps {
  children?: ReactNode
  onRemoveClick?: () => void
}

const DropzoneFilePreview: React.FC<DropzoneFilePreviewProps> = ({
  onRemoveClick,
  children,
}) => {
  return (
    <>
      <li className="flex items-center gap-x-2">
        <File size={32} />
        <div className="flex items-center">
          <span>{children}</span>
          {onRemoveClick && (
            <Tooltip title="Remover">
              <button
                onClick={onRemoveClick}
                className="ml-2 cursor-pointer text-red-500"
              >
                <Trash size={18} />
              </button>
            </Tooltip>
          )}
        </div>
      </li>
    </>
  )
}

export default DropzoneFilePreview
