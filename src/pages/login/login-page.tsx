import { Button } from '@/components/ui/button/button'
import { Form } from '@/components/ui/form/form'
import { Input } from '@/components/ui/input/input'
import { InputGroup } from '@/components/ui/input-group/input-group'
import { InputRightElement } from '@/components/ui/input-right-element/input-right-element'
import { Tooltip } from '@/components/ui/tooltip'
import { useLogin } from '@/pages/login/use-login'
import { Eye, EyeOff } from 'lucide-react'
import React from 'react'

const LoginPage: React.FC = () => {
  const { methods, onSubmit, isLoading, isShowPassword, setIsShowPassword } =
    useLogin()

  const { handleSubmit } = methods

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Form.Provider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Form.Field
              control={methods.control}
              name="email"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label required>E-mail</Form.Label>
                  <Form.Control>
                    <Input {...field} placeholder="example@example.com" />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <Form.Field
              control={methods.control}
              name="password"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label required>Senha</Form.Label>
                  <InputGroup>
                    <Form.Control>
                      <Input
                        {...field}
                        type={isShowPassword ? 'text' : 'password'}
                        placeholder="*********"
                        className="pr-8"
                      />
                    </Form.Control>
                    <InputRightElement>
                      {isShowPassword && (
                        <Tooltip.Component content="Exibir senha">
                          <Eye
                            className="h-5 w-5"
                            onClick={() => setIsShowPassword(!isShowPassword)}
                          />
                        </Tooltip.Component>
                      )}
                      {!isShowPassword && (
                        <Tooltip.Component content="Ocultar senha">
                          <EyeOff
                            className="h-5 w-5"
                            onClick={() => setIsShowPassword(!isShowPassword)}
                          />
                        </Tooltip.Component>
                      )}
                    </InputRightElement>
                  </InputGroup>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <Button
              isLoading={isLoading}
              disabled={isLoading}
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Form.Provider>
      </div>
    </>
  )
}

export default LoginPage
