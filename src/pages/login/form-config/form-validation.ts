import zod from '@/lib/zod'
import { formLabels } from './form-labels'

export const formValidation = zod.object({
  email: zod.string().email().describe(formLabels.email),
  password: zod.string().describe(formLabels.password),
})
