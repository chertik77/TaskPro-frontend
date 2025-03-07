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

import { useSignupUser } from '../hooks/useSignupUser'

export const SignupForm = () => {
  const form = useAppForm(AuthContracts.SignupSchema, {
    defaultValues: { name: '', email: '', password: '' }
  })

  const { mutate: signup, isPending } = useSignupUser(form.reset)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => signup(data))}
        className='space-y-3.5'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  autoFocus
                  autoComplete='email'
                  className='text-white autofill:text-fill-white'
                  placeholder='Enter your name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
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
                  autoComplete='new-password'
                  className='text-white autofill:text-fill-white'
                  placeholder='Create a password'
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
          {isPending ? <Loader /> : 'Register Now'}
        </Button>
      </form>
    </Form>
  )
}
