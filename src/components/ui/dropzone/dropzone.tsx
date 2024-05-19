import React from 'react'

import { DropzoneOptions, ErrorCode, useDropzone } from 'react-dropzone'
import { cnBase } from 'tailwind-variants'

import { FormMessage } from '@/components/ui/form-message/form-message'

const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
  if (!isDragActive) {
    return <span>Clique ou arraste e solte os arquivos aqui...</span>
  }

  if (isDragReject) {
    return (
      <span className="border-red-500 text-red-500">Arquivo não suportado</span>
    )
  }

  return <span className="border-green-500">Solte os arquivos</span>
}

const ErrorCodeI18n = {
  [ErrorCode.FileInvalidType]: 'Tipo de arquivo inválido',
  [ErrorCode.FileTooLarge]: 'Arquivo muito grande',
  [ErrorCode.FileTooSmall]: 'Arquivo muito pequeno',
  [ErrorCode.TooManyFiles]: 'Limite máximo de arquivos',
}

interface IDropZoneProps extends DropzoneOptions {
  onUpload: (files: File[]) => void
}

const Dropzone: React.FC<IDropZoneProps> = ({ onUpload, ...props }) => {
  const {
    getRootProps,
    getInputProps,
    fileRejections,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
    multiple: false,
    onDrop: onUpload,
    maxSize: 10000000,
    ...props,
  })

  return (
    <>
      <section>
        <div
          {...getRootProps()}
          className={cnBase(
            'border rounded border-gray-500 border-dashed cursor-pointer',
            // { '!border-red-500': isDragReject },
          )}
        >
          <input {...getInputProps()} />
          <p className="flex justify-center items-center p-4">
            {renderDragMessage(isDragActive, isDragReject)}
          </p>
        </div>

        {fileRejections &&
          fileRejections.map((fileRejection) => {
            return (
              <FormMessage key={fileRejection.file.name} className="block">
                Arquivo rejeitado: {fileRejection.file.name} -{' '}
                {fileRejection.errors.map((error) => {
                  const code = error.code as ErrorCode

                  if (code === ErrorCode.TooManyFiles) {
                    return ErrorCodeI18n[code] + `: ${props.maxFiles}`
                  } else {
                    return ErrorCodeI18n[code]
                  }
                })}
              </FormMessage>
            )
          })}
      </section>
    </>
  )
}

export default Dropzone
