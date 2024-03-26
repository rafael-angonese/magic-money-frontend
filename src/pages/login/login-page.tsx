import React from 'react'

import { Eye, EyeOff } from 'lucide-react'
import { Controller, FormProvider } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { FormControl } from '@/components/ui/form-control/form-control'
import { FormLabel } from '@/components/ui/form-label/form-label'
import { FormMessage } from '@/components/ui/form-message/form-message'
import { Input } from '@/components/ui/input/input'
import { Loader } from '@/components/ui/loader/loader'
import { Tooltip } from '@/components/ui/tooltip'
import { useLogin } from '@/pages/login/use-login'

const LoginPage: React.FC = () => {
  const { methods, onSubmit, isLoading, isShowPassword, setIsShowPassword } =
    useLogin()

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Controller
              control={methods.control}
              name="email"
              render={({ field }) => (
                <FormControl>
                  <FormLabel required>E-mail</FormLabel>

                  <Input {...field} placeholder="example@example.com" />

                  <FormMessage>{errors?.email?.message}</FormMessage>
                </FormControl>
              )}
            />

            <Controller
              control={methods.control}
              name="password"
              render={({ field }) => (
                <FormControl>
                  <FormLabel required>Senha</FormLabel>

                  <Input
                    {...field}
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder="*********"
                    className="pr-8"
                    endDecorator={
                      <React.Fragment>
                        {isShowPassword && (
                          <Tooltip title="Exibir senha">
                            <Eye
                              className="h-5 w-5"
                              onClick={() => setIsShowPassword(!isShowPassword)}
                            />
                          </Tooltip>
                        )}

                        {!isShowPassword && (
                          <Tooltip title="Ocultar senha">
                            <EyeOff
                              className="h-5 w-5"
                              onClick={() => setIsShowPassword(!isShowPassword)}
                            />
                          </Tooltip>
                        )}
                      </React.Fragment>
                    }
                  />

                  <FormMessage>{errors?.password?.message}</FormMessage>
                </FormControl>
              )}
            />

            <Button disabled={isLoading} type="submit" fullWidth>
              <Loader isLoading={isLoading} />
              Login
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default LoginPage
