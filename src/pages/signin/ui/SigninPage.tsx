import { useAppForm, useShouldAutoFocus } from '@/shared/lib'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Loader,
  PasswordInput
} from '@/shared/ui'

import { usePasskeyAutofill } from '../api/usePasskeyAutofill'
import { useSigninUser } from '../api/useSigninUser'
import { SigninSchema } from '../model/contract'

export const SigninPage = () => {
  const form = useAppForm(SigninSchema, {
    defaultValues: { email: '', password: '' }
  })

  const { mutate: signin, isPending } = useSigninUser(form.reset)

  const shouldAutoFocus = useShouldAutoFocus()

  usePasskeyAutofill()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => signin(data))}
        noValidate
        className='space-y-3.5'>
        <div>
          <FormField
            name='email'
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel className='text-white/50'>Email</FormLabel>
                <FormControl
                  render={<Input />}
                  autoFocus={shouldAutoFocus}
                  type='email'
                  autoComplete='username webauthn'
                  spellCheck={false}
                  required
                  className='autofill:text-fill-white text-white'
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            name='password'
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel className='text-white/50'>Password</FormLabel>
                <FormControl
                  render={<PasswordInput />}
                  autoComplete='current-password'
                  required
                  className='autofill:text-fill-white text-white'
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button
            type='submit'
            className='mt-6!'
            disabled={isPending}>
            {isPending ? <Loader /> : 'Log In Now'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
