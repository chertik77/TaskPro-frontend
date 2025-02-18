import { AuthContracts } from '@/entities/auth'

import { Button, Field, Loader, PasswordField } from '@/shared/components'
import { useAppForm } from '@/shared/hooks'

import { useSignupUser } from '../hooks/useSignupUser'

export const SignupForm = () => {
  const { handleSubmit, register, formState, reset } = useAppForm(
    AuthContracts.SignupSchema
  )

  const { mutate: signup, isPending } = useSignupUser(reset)

  return (
    <form onSubmit={handleSubmit(data => signup(data))}>
      <Field
        autoFocus
        errors={formState.errors}
        inputName='name'
        autoComplete='name'
        className='text-white autofill:text-fill-white'
        placeholder='Enter your name'
        {...register('name')}
      />
      <Field
        errors={formState.errors}
        inputName='email'
        autoComplete='email'
        className='text-white autofill:text-fill-white'
        placeholder='Enter your email'
        {...register('email')}
      />
      <PasswordField
        errors={formState.errors}
        autoComplete='new-password'
        className='text-white autofill:text-fill-white'
        placeholder='Create a password'
        {...register('password')}
      />
      <Button
        type='submit'
        disabled={isPending}>
        {isPending ? <Loader /> : 'Register Now'}
      </Button>
    </form>
  )
}
