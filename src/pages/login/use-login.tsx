import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import { formValidation } from '@/pages/login/form-config/form-validation'
import { FormValues } from '@/pages/login/form-config/form-values'
import { initialFormState } from '@/pages/login/form-config/initial-form-state'
import { authRepository } from '@/repositories/auth/auth-repository'
import { useAuthStore } from '@/store/use-auth-store'
import handlingRequestError from '@/utils/handling-request-error'

export const useLogin = () => {
  const { state } = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState(false)
  const { signIn } = useAuthStore()
  const navigate = useNavigate()

  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: initialFormState,
    resolver: zodResolver(formValidation),
  })

  const onSubmit = async ({ email, password }: FormValues) => {
    try {
      setIsLoading(true)
      const { data } = await authRepository.login({
        email,
        password,
      })

      signIn({
        token: data.token,
        refreshToken: data.refreshToken,
      })
      navigate(state?.path || '/home')
    } catch (error) {
      handlingRequestError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    methods,
    onSubmit,
    isLoading,
    isShowPassword,
    setIsShowPassword,
  }
}
