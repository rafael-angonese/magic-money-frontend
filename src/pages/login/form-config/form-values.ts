import zod from '@/lib/zod'
import { formValidation } from './form-validation'

export type FormValues = zod.infer<typeof formValidation>
