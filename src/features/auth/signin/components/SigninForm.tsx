import { AuthContracts } from '@/entities/auth'

import { useAppForm } from '@/shared/hooks'
import { Button, Field, Loader, PasswordField } from '@/shared/ui'

import { useSigninUser } from '../hooks/useSigninUser'

export const SigninForm = () => {
  const { handleSubmit, register, formState, reset } = useAppForm(
    AuthContracts.SigninSchema
  )

  const { mutate: signin, isPending } = useSigninUser(reset)

  return (
    <form onSubmit={handleSubmit(data => signin(data))}>
      <Field
        autoFocus
        {...register('email')}
        placeholder='Enter your email'
        inputName='email'
        className='text-white autofill:text-fill-white'
        autoComplete='email'
        errors={formState.errors}
      />
      <PasswordField
        {...register('password')}
        autoComplete='current-password'
        className='text-white autofill:text-fill-white'
        placeholder='Confirm a password'
        errors={formState.errors}
      />
      <Button
        type='submit'
        disabled={isPending}>
        {isPending ? <Loader /> : 'Log In Now'}
      </Button>
    </form>
  )
}
