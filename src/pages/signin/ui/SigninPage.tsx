import { useAppForm } from '@/shared/lib'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Loader,
  PasswordInput
} from '@/shared/ui'

import { useSigninUser } from '../api/useSigninUser'
import { SigninSchema } from '../model/contract'

export const SigninPage = () => {
  const form = useAppForm(SigninSchema, {
    defaultValues: { email: '', password: '' }
  })

  const { mutate: signin, isPending } = useSigninUser(form.reset)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => signin(data))}
        className='space-y-3.5'>
        <FormField
          name='email'
          control={form.control}
          render={() => (
            <FormItem>
              <FormControl
                render={<Input />}
                autoFocus
                autoComplete='email'
                className='autofill:text-fill-white text-white'
                placeholder='Enter your email'
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='password'
          control={form.control}
          render={() => (
            <FormItem>
              <FormControl
                render={<PasswordInput />}
                autoComplete='current-password'
                className='autofill:text-fill-white text-white'
                placeholder='Confirm a password'
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='mt-6!'
          disabled={isPending}>
          {isPending ? <Loader /> : 'Log In Now'}
        </Button>
      </form>
    </Form>
  )
}
