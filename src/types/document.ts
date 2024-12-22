export enum DocumentType {
  INSS_IRRF = 'INSS_IRRF',
  DAS = 'DAS',
  ISSUED_NFSE = 'ISSUED_NFSE',
  RECEIVED_NFSE = 'RECEIVED_NFSE',
  PAYSLIPS = 'PAYSLIPS',
  RECEIPT = 'RECEIPT',
}

export interface Document {
  id: string
  date: string
  documentType: DocumentType
  createdAt: string
  updatedAt: string
}
