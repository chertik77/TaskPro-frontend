import { useSigninUser } from 'features/auth/hooks'

import { Button, Field, Loader } from 'components/ui'
import { useAppForm } from 'hooks'

import { SigninSchema } from '../auth.schema'

export const SigninForm = () => {
  const { handleSubmit, register, formState, reset } = useAppForm(SigninSchema)

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
      <Field
        {...register('password')}
        isPasswordInput
        autoComplete='current-password'
        className='text-white autofill:text-fill-white'
        inputPasswordPlaceholder='Confirm a password'
        inputName='password'
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
