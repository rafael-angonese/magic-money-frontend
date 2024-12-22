import { DocumentType } from '@/types/document'

export const documentTypeTranslations: Record<DocumentType, string> = {
  [DocumentType.INSS_IRRF]: 'INNS e IRRF',
  [DocumentType.DAS]: 'DAS',
  [DocumentType.ISSUED_NFSE]: 'NFSe Emitida',
  [DocumentType.RECEIVED_NFSE]: 'NFSe Recebida',
  [DocumentType.PAYSLIPS]: 'Pró-labore - Contracheque',
  [DocumentType.RECEIPT]: 'Recibo',
}

export interface DocumentTypeOption {
  value: keyof typeof DocumentType
  name: string
}

export const documentTypeOptions: DocumentTypeOption[] = (
  Object.keys(DocumentType) as (keyof typeof DocumentType)[]
).map((type) => {
  return {
    value: DocumentType[type],
    name: documentTypeTranslations[DocumentType[type]],
  }
})
