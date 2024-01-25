import isDev from '@/utils/is-dev'
import { FormValues } from './form-values'

export const initialFormState: FormValues = {
  email: isDev() ? 'admin@admin.com' : '',
  password: isDev() ? '12345678' : '',
}
