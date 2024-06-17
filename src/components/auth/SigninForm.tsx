import { Button, Field, Loader } from 'components/ui'

import { useAppForm } from 'hooks'
import { useGoogleOneTap, useSigninUser } from 'hooks/auth'

import { SigninSchema } from 'lib/schemas'

export const SigninForm = () => {
  const { handleSubmit, register, formState, reset } =
    useAppForm<SigninSchema>(SigninSchema)

  useGoogleOneTap()

  const { mutate, isPending } = useSigninUser(reset)

  return (
    <>
      <form onSubmit={handleSubmit(data => mutate(data))}>
        <Field
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
    </>
  )
}
