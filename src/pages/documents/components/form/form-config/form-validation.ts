import { DocumentTypeOption } from '@/constants/document-type'
import z from '@/lib/zod'

import { formLabels } from './form-labels'

export const formValidation = z.object({
  date: z.date().describe(formLabels.date),
  documentType: z
    .object({
      value: z.string().describe(formLabels.documentType),
      name: z.string().describe(formLabels.documentType),
    })
    .describe(formLabels.documentType) as z.ZodType<DocumentTypeOption>,
  file: z
    .instanceof(File)
    .nullable()
    .superRefine((arg, ctx): arg is File => {
      if (!(arg instanceof File)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Selecione um arquivo',
          fatal: true,
        })
      }

      return z.NEVER
    })
    .describe(formLabels.file),
})
