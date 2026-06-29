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

import { useSignupUser } from '../api/useSignupUser'
import { SignupSchema } from '../model/contract'

export const SignupPage = () => {
  const form = useAppForm(SignupSchema, {
    defaultValues: { name: '', email: '', password: '' }
  })

  const { mutate: signup, isPending } = useSignupUser(form.reset)

  const shouldAutoFocus = useShouldAutoFocus()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => signup(data))}
        className='space-y-3.5'>
        <FormField
          control={form.control}
          name='name'
          render={() => (
            <FormItem>
              <FormLabel className='text-white/50'>Name</FormLabel>
              <FormControl
                render={<Input />}
                autoFocus={shouldAutoFocus}
                autoComplete='name'
                className='autofill:text-fill-white text-white'
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={() => (
            <FormItem>
              <FormLabel className='text-white/50'>Email</FormLabel>
              <FormControl
                render={<Input />}
                autoComplete='email'
                className='autofill:text-fill-white text-white'
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={() => (
            <FormItem>
              <FormLabel className='text-white/50'>Password</FormLabel>
              <FormControl
                render={<PasswordInput />}
                autoComplete='new-password'
                className='autofill:text-fill-white text-white'
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='mt-6!'
          disabled={isPending}>
          {isPending ? <Loader /> : 'Register Now'}
        </Button>
      </form>
    </Form>
  )
}
