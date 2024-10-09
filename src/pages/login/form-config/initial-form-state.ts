import isDev from '@/utils/is-dev'

import { FormValues } from './form-values'

export const initialFormState: FormValues = {
  email: isDev() ? 'pernsonal@admin.com' : '',
  password: isDev() ? '123456' : '',
}
