import * as m from 'motion/react-m'

import { formVariants, useAppForm, useShouldAutoFocus } from '@/shared/lib'
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

import { useSigninUser } from '../api/useSigninUser'
import { SigninSchema } from '../model/contract'

export const SigninPage = () => {
  const form = useAppForm(SigninSchema, {
    defaultValues: { email: '', password: '' }
  })

  const { mutate: signin, isPending } = useSigninUser(form.reset)

  const shouldAutoFocus = useShouldAutoFocus()

  return (
    <Form {...form}>
      <m.form
        variants={formVariants.container}
        initial='hidden'
        animate='show'
        onSubmit={form.handleSubmit(data => signin(data))}
        className='space-y-3.5'>
        <m.div variants={formVariants.field}>
          <FormField
            name='email'
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel className='text-white/50'>Email</FormLabel>
                <FormControl
                  render={<Input />}
                  autoFocus={shouldAutoFocus}
                  autoComplete='email'
                  className='autofill:text-fill-white text-white'
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </m.div>
        <m.div variants={formVariants.field}>
          <FormField
            name='password'
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel className='text-white/50'>Password</FormLabel>
                <FormControl
                  render={<PasswordInput />}
                  autoComplete='current-password'
                  className='autofill:text-fill-white text-white'
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </m.div>
        <m.div variants={formVariants.field}>
          <Button
            type='submit'
            className='mt-6!'
            disabled={isPending}>
            {isPending ? <Loader /> : 'Log In Now'}
          </Button>
        </m.div>
      </m.form>
    </Form>
  )
}
