import { AuthContracts } from '@/entities/auth'

import { useAppForm } from '@/shared/hooks'
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

import { useSigninUser } from '../hooks/useSigninUser'

export const SigninForm = () => {
  const form = useAppForm(AuthContracts.SigninSchema, {
    defaultValues: { email: '', password: '' }
  })

  const { mutate: signin, isPending } = useSigninUser(form.reset)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => signin(data))}
        className='space-y-3.5'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  autoFocus
                  autoComplete='email'
                  className='text-white autofill:text-fill-white'
                  placeholder='Enter your email'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  autoComplete='current-password'
                  className='text-white autofill:text-fill-white'
                  placeholder='Confirm a password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='!mt-6'
          disabled={isPending}>
          {isPending ? <Loader /> : 'Log In Now'}
        </Button>
      </form>
    </Form>
  )
}
