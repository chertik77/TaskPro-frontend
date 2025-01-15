import { Button } from 'shared/ui/button'
import { Field, PasswordField } from 'shared/ui/field'
import { Loader } from 'shared/ui/loader'

import { useSigninUser } from 'features/auth/hooks'

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
