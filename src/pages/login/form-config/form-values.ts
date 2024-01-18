import z from '@/lib/zod'
import { formValidation } from './form-validation'

export type FormValues = z.infer<typeof formValidation>
